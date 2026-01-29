import React from 'react';
import SiteDetails from './SiteDetails';
import ScoringGuide from './ScoringGuide';
import { CruxRecords, FieldDataScore, Topic } from '../app/typings';
import {
  getRecordUrl,
  getScoreByUrl,
  getSiteNameFromUrl
} from '../app/helpers';

type Props = {
  report: CruxRecords;
  topic: Topic;
  scores: FieldDataScore[];
  type: 'url' | 'origin';
};

const SitesList = ({ report, topic, scores, type }: Props) => {
  return (
    <>
      {report
        .filter((result) => result && result.record.metrics)
        .map((result) => {
          const url = getRecordUrl(result.record, type);
          return {
            ...result,
            url,
            score: getScoreByUrl(scores, url)
          };
        })
        .sort((a, b) => b.score - a.score)
        .map((result, index) => {
          const site = getSiteNameFromUrl(topic.sites, type, result.url);
          const {
            record: { metrics },
            score
          } = result;

          return (
            <div key={result.url}>
              <SiteDetails
                topic={topic}
                metrics={metrics}
                url={result.url}
                score={score}
                label={site.name}
              />
              {index !== report.length - 1 ? (
                <hr className="border-gray-500 pb-8 mt-8" />
              ) : (
                <hr className="border-gray-500 pb-8 mt-8 block sm:hidden" />
              )}
            </div>
          );
        })}
      <div className="mt-4 sm:mt-12">
        <ScoringGuide type="FIELD_DATA" />
        <div className="mt-4 text-gray-200 text-center">
          <p>
            <a
              href="https://web.dev/vitals/"
              className="underline"
              title="Core Web Vitals"
              rel="noopener"
            >
              Core Web Vitals
            </a>{' '}
            are a common set of signals critical to all web experiences. The
            Core Web Vitals metrics are{' '}
            <a
              href="https://web.dev/inp"
              className="underline"
              title="Interaction to Next Paint (INP)"
              rel="noopener"
            >
              Interaction to Next Paint (INP)
            </a>
            ,{' '}
            <a
              href="https://web.dev/lcp/"
              className="underline"
              title="Largest Contentful Paint (LCP)"
              rel="noopener"
            >
              Largest Contentful Paint (LCP)
            </a>
            , and{' '}
            <a
              href="https://web.dev/cls/"
              className="underline"
              title="Cumulative Layout Shift (CLS)"
              rel="noopener"
            >
              Cumulative Layout Shift (CLS)
            </a>
            , with their respective thresholds. A page passes the Core Web
            Vitals assessment if the 75th percentiles of all three metrics are
            Good. Otherwise, the page does not pass the assessment.
          </p>
          <p className="mt-4">
            The Full Report link opens{' '}
            <a
              href="https://pagespeed.web.dev/"
              className="underline"
              title="PageSpeed Insights"
              target="_blank"
              rel="noopener"
            >
              PageSpeed Insights
            </a>
            , which shows Lab Data (Lighthouse) that may differ from Field Data shown above.
          </p>
        </div>
      </div>
    </>
  );
};

export default SitesList;
