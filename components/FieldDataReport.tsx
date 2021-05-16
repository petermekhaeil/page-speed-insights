import React from 'react';
import { FieldDataScore, Topic } from '../app/typings';
import {
  getColourForType,
  getRecordUrl,
  getScoreByUrl,
  getSiteNameFromUrl,
  toSeconds
} from '../app/helpers';
import ScoringGuide from './ScoringGuide';
import { CruxRecords } from '../app/typings';
import styles from './FieldDataReport.module.css';

type Props = {
  report: CruxRecords;
  topic: Topic;
  scores: FieldDataScore[];
  type: string;
};

export default function FieldDataReport({
  report,
  topic,
  scores,
  type
}: Props) {
  const handleClick = (id: string) => {
    if (typeof document !== 'undefined') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="grid grid-cols-1 gap-2">
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-4"></div>
        <div className="col-span-2 text-center">
          <span className="lg:hidden">CLS</span>
          <span className="hidden lg:block">Cumulative Layout Shift (CLS)</span>
        </div>
        <div className="col-span-2 text-center">
          <span className="lg:hidden">FCP</span>
          <span className="hidden lg:block">First Contentful Paint (FCP)</span>
        </div>
        <div className="col-span-2 text-center">
          <span className="lg:hidden">FID</span>
          <span className="hidden lg:block">First Input Delay (FID)</span>
        </div>
        <div className="col-span-2 text-center">
          <span className="lg:hidden">LCP</span>
          <span className="hidden lg:block">
            Largest Contentful Paint (LCP)
          </span>
        </div>
      </div>

      {report
        .filter((result) => result)
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
            url
          } = result;

          const cls = metrics.cumulative_layout_shift?.percentiles.p75 || 0;
          const fcp = metrics.first_contentful_paint?.percentiles.p75 || 0;
          const fid = metrics.first_input_delay?.percentiles.p75 || 0;
          const lcp = metrics.largest_contentful_paint?.percentiles.p75 || 0;
          const label = site.name;
          const badge = site.colour;

          return (
            <div className="grid grid-cols-12 gap-0 sm:gap-2" key={url}>
              <div className="col-span-4">
                <div className={styles.index}>{index + 1}</div>
                <div
                  className={styles.badge}
                  style={{ backgroundColor: badge }}
                >
                  &nbsp;
                </div>
                <div className={styles.label}>
                  <a onClick={() => handleClick(url)}>{label}</a>
                </div>
              </div>
              <div
                className={styles.value}
                style={{
                  color: getColourForType('CLS', Number(cls))
                }}
              >
                {Number(cls).toFixed(3)}
              </div>
              <div
                className={styles.value}
                style={{ color: getColourForType('FCP', fcp as number) }}
              >
                {toSeconds(fcp as number)}
              </div>
              <div
                className={styles.value}
                style={{ color: getColourForType('FID', fid as number) }}
              >
                {toSeconds(fid as number)}
              </div>
              <div
                className={styles.value}
                style={{ color: getColourForType('LCP', lcp as number) }}
              >
                {toSeconds(lcp as number)}
              </div>
            </div>
          );
        })}
      <div className="mt-8">
        <ScoringGuide type="FIELD_DATA" />
      </div>
      <div className="mt-4 text-gray-200 text-center">
        <p>
          <a
            title="PageSpeed Insights"
            target="_blank"
            rel="noopener"
            className="underline"
            href="https://developers.google.com/speed/docs/insights/v5/about"
          >
            Field data
          </a>{' '}
          collected over the last 28 days by{' '}
          <a
            title="CrUX"
            target="_blank"
            rel="noopener"
            className="underline"
            href="https://developers.google.com/web/tools/chrome-user-experience-report"
          >
            CrUX
          </a>
          .
        </p>
      </div>
    </div>
  );
}
