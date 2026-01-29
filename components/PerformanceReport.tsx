'use client';

import { CruxRecords, FieldDataScore, Topic } from '../app/typings';
import useIntersectionObserver from '../hooks/use-intersection-observer';
import React, { useRef } from 'react';
import ScoringGuide from './ScoringGuide';
import PerformanceItem from './PerformanceItem';
import ScoringInformation from './ScoringInformation';
import {
  getRecordUrl,
  getScoreByUrl,
  getSiteNameFromUrl,
  formatScore
} from '../app/helpers';

type Props = {
  report: CruxRecords;
  topic: Topic;
  scores: FieldDataScore[];
  type: 'url' | 'origin';
};

const Head = () => {
  return (
    <div className="grid grid-cols-12 gap-0 sm:gap-2">
      <div className="col-span-4"></div>
      <div className="col-span-7 text-center"></div>
      <div className="col-span-1 text-center">
        <span className="block sm:hidden">Pts</span>
        <span className="hidden sm:block">Points</span>
      </div>
    </div>
  );
};

export default function PerformanceReport({
  report,
  topic,
  scores,
  type
}: Props) {
  const elementRef = useRef(null);
  const [isVisible] = useIntersectionObserver({ elementRef, threshold: 0.5 });

  return (
    <div className="grid grid-cols-1 gap-2" ref={elementRef}>
      <Head />
      {report
        .map((result) => {
          const url = getRecordUrl(result.record, type);

          if (result.record.metrics === null) {
            return {
              url,
              score: 0
            };
          }

          return {
            ...result,
            url,
            score: getScoreByUrl(scores, url)
          };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, 10)
        .map((result, index) => {
          const site = getSiteNameFromUrl(topic.sites, type, result.url);
          return (
            <PerformanceItem
              index={index}
              key={result.url}
              points={formatScore(result.score) || 0}
              isVisible={isVisible}
              label={site.name}
              badge={site.colour}
            />
          );
        })}
      <div className="mt-8">
        <ScoringGuide type="PERFORMANCE" />
      </div>
      <div className="mt-4 text-gray-200 text-center">
        <ScoringInformation />
      </div>
    </div>
  );
}
