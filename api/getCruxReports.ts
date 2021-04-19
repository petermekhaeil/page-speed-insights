import { Audit } from 'lighthouse';
import nodeFetch from 'node-fetch';
import { createBatch } from 'crux-api/batch';
import { getTopic } from '../app/helpers';
import { Reports, FieldDataScore, MetricType } from '../app/typings';
import { apiKey } from '../config';

const batch = createBatch({ key: apiKey, fetch: nodeFetch });

export const apiCrux = async (urls: string[]) => {
  const opts = urls.map((url) => {
    return { url: url };
  });

  const records = await batch(opts);

  return records;
};

function normalizeMetricValue(metric: MetricType, value: number) {
  return metric === 'cls' ? Number(value) : value;
}

/**
 * Recommended ranks (https://web.dev/metrics/):
 *
 * FCP: Fast < 1.0 s,   Slow > 3.0 s
 * LCP: Fast < 2.5 s,   Slow > 4.0 s
 * FID: Fast < 100 ms,  Slow > 300 ms
 * CLS: Fast < 0.10,    Slow > 0.25
 *
 * `p10` value is calibrated to return 0.9 for the fast value,
 * `median` value returns 0.5.
 *
 * The logic is taken from Lighthouse:
 * https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/metrics/largest-contentful-paint.js#L45
 *
 * @param {Metric} metric
 */
function getMetricRange(metric: MetricType) {
  switch (metric) {
    case 'fcp':
      return { p10: 1000, median: 3000 };
    case 'lcp':
      return { p10: 2500, median: 4000 };
    case 'fid':
      return { p10: 100, median: 300 };
    case 'cls':
      return { p10: 0.1, median: 0.25 };
    default:
      throw new Error(`Invalid metric range: ${metric}`);
  }
}

const getCruxReports = async (): Promise<Reports> => {
  const topic = getTopic();
  const urls = Object.keys(topic.sites);

  const cruxRecords = await apiCrux(urls);

  /*
    Scoring taken from https://github.com/treosh/lighthouse-plugin-field-performance

    The scoring algorithm weighs values for Largest Contentful Paint (LCP),
    First Input Delay (FID), and Cumulative Layout Shift (CLS) and picks a
    minimum score. It uses Core Web Vitals assessment that expects all its
    metrics to pass thresholds. For example, https://edition.cnn.com/ has
    LCP 5.9 s (15), FID 20 ms (100), and CLS 0.02 (100). It has poor mark
    in the Search Console, and the score is 15. (Note: FCP and the origin
    values do not affect the score, see the source)
    */

  const scores = cruxRecords.map(
    (result): FieldDataScore => {
      const metrics = result?.record.metrics;
      const lcp = metrics?.largest_contentful_paint?.percentiles.p75;
      const fid = metrics?.first_input_delay?.percentiles.p75;
      const cls = metrics?.cumulative_layout_shift?.percentiles.p75;

      const lcpValue = normalizeMetricValue('lcp', lcp as number);
      const fidValue = normalizeMetricValue('fid', fid as number);
      const clsValue = normalizeMetricValue('cls', cls as number);

      const lcpScore = Audit.computeLogNormalScore(
        getMetricRange('lcp'),
        lcpValue
      );
      const fidScore = Audit.computeLogNormalScore(
        getMetricRange('fid'),
        fidValue
      );
      const clsScore = Audit.computeLogNormalScore(
        getMetricRange('cls'),
        clsValue
      );

      const score = Math.min(lcpScore, fidScore, clsScore);

      return {
        id: result?.record.key.url || '',
        score: score,
        scores: { lcp: lcpScore, fid: fidScore, cls: clsScore },
        metrics
      };
    }
  );

  return {
    cruxRecords: cruxRecords.filter(Boolean),
    scores: scores.filter((score) => score.score)
  };
};

export default getCruxReports;
