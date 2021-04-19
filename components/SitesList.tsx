import React from 'react';
import SiteDetails from './SiteDetails';
import ScoringGuide from './ScoringGuide';
import { CruxRecords, FieldDataScore, Topic } from '../app/typings';

type Props = {
  cruxRecords: CruxRecords;
  topic: Topic;
  scores: FieldDataScore[];
};

const SitesList = ({ cruxRecords, topic, scores }: Props) => {
  return (
    <>
      {cruxRecords
        .map((result) => {
          const url = result.record.key.url || '';
          return {
            ...result,
            url,
            score: scores.find((score) => score.id.startsWith(url))?.score || 0
          };
        })
        .sort((a, b) => b.score - a.score)
        .map((result, index) => {
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
                label={topic.sites[result.url]?.name}
              />
              {index !== cruxRecords.length - 1 ? (
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
              href="https://web.dev/fid"
              className="underline"
              title="First Input Delay (FID)"
              rel="noopener"
            >
              First Input Delay (FID)
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
        </div>
      </div>
    </>
  );
};

export default SitesList;
