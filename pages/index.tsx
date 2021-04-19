import React from 'react';
import getCruxReports from '../api/getCruxReports';
import { getTopic } from '../app/helpers';
import { Topic, CruxRecords, FieldDataScore } from '../app/typings';
import Home from '../components/Home';

export async function getStaticProps() {
  const reports = await getCruxReports();
  const topic = getTopic();

  return {
    props: {
      topic,
      cruxRecords: reports.cruxRecords,
      scores: reports.scores
    }
  };
}

type IndexProps = {
  topic: Topic;
  cruxRecords: CruxRecords;
  scores: FieldDataScore[];
};

export default function Index({ topic, cruxRecords, scores }: IndexProps) {
  return <Home scores={scores} topic={topic} cruxRecords={cruxRecords} />;
}
