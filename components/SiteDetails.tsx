import React from 'react';
import { ApiCruxReportMetrics, Topic } from '../app/typings';
import Bar from './Bar';
import Gauge from './Gauge';
import CoreWebVital from './CoreWebVital';

type Props = {
  metrics: ApiCruxReportMetrics | null;
  topic: Topic;
  score: number;
  label: string;
  url: string;
};

const SiteDetails = ({ metrics, url, score, label }: Props) => {
  const cls = metrics?.cumulative_layout_shift?.histogram;
  const fcp = metrics?.first_contentful_paint?.histogram;
  const inp = metrics?.interaction_to_next_paint?.histogram;
  const lcp = metrics?.largest_contentful_paint?.histogram;

  const clsScore = metrics?.cumulative_layout_shift?.percentiles.p75 ?? 0;
  const inpScore = metrics?.interaction_to_next_paint?.percentiles.p75 ?? 0;
  const lcpScore = metrics?.largest_contentful_paint?.percentiles.p75 ?? 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="col-span-1">
        <h3 className="text-xl sm:text-2xl" id={url}>
          {label}
        </h3>
        <h4 className="text-md mb-8">
          <a href={url} target="_blank" rel="noopener">
            {url}
          </a>
        </h4>
        <div className="mx-auto text-center w-1/2">
          <Gauge value={Math.round(score * 100)} />
          <CoreWebVital cls={clsScore} inp={inpScore} lcp={lcpScore} />
          <div className="mt-4 hidden sm:block">
            <a
              href={`https://developers.google.com/speed/pagespeed/insights/?url=${url}`}
              className="underline"
              title="Core Web Vitals"
              rel="noopener"
              target="_blank"
            >
              Full Report
            </a>
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <h4 className="text-lg mb-4 mt-4">First Contentful Paint (FCP)</h4>
        <Bar histogram={fcp } />
        <h4 className="text-lg mb-4 mt-4">Largest Contentful Paint (LCP)</h4>
        <Bar histogram={lcp } />
        <h4 className="text-lg mb-4 mt-4">Interaction to Next Paint (INP)</h4>
        <Bar histogram={inp } />
        <h4 className="text-lg mb-4 mt-4">Cumulative Layout Shift (CLS)</h4>
        <Bar histogram={cls } />
      </div>
      <div className="mt-4 block sm:hidden text-center">
        <a
          href={`https://developers.google.com/speed/pagespeed/insights/?url=${url}`}
          className="underline"
          title="Core Web Vitals"
          rel="noopener"
          target="_blank"
        >
          Full Report
        </a>
      </div>
    </div>
  );
};

export default SiteDetails;
