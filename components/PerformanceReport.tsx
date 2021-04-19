import { CruxRecords, FieldDataScore, Topic } from '../app/typings';
import useIntersectionObserver from '../hooks/use-intersection-observer';
import React, { useRef } from 'react';
import ScoringGuide from './ScoringGuide';
import PerformanceItem from './PerformanceItem';
import ScoringInformation from './ScoringInformation';

type Props = {
  cruxRecords: CruxRecords;
  topic: Topic;
  scores: FieldDataScore[];
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

const getRecordUrl = (record) => record.key.url;
const getScoreByUrl = (scores, url) =>
  scores.find((score) => score.id.startsWith(url))?.score;
const formatScore = (score) => +Number(score * 100).toFixed(0);

export default function PerformanceReport({
  cruxRecords,
  topic,
  scores
}: Props) {
  const elementRef = useRef(null);
  const [isVisible] = useIntersectionObserver({ elementRef, threshold: 0.5 });

  return (
    <div className="grid grid-cols-1 gap-2" ref={elementRef}>
      <Head />
      {cruxRecords
        .map((result) => {
          const url = getRecordUrl(result.record);
          return {
            ...result,
            url,
            score: getScoreByUrl(scores, url)
          };
        })
        .sort((a, b) => b.score - a.score)
        .map((result, index) => {
          return (
            <PerformanceItem
              index={index}
              key={result.url}
              points={formatScore(result.score) || 0}
              isVisible={isVisible}
              label={topic.sites[result.url]?.name}
              badge={topic.sites[result.url]?.colour}
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
