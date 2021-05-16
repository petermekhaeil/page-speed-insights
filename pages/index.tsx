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
      reports
    }
  };
}

type IndexProps = {
  topic: Topic;
  reports: {
    resultByUrl: CruxRecords;
    resultByOrigin: CruxRecords;
    scoresByUrl: FieldDataScore[];
    scoresByOrigin: FieldDataScore[];
  };
};

export default function Index({ topic, reports }: IndexProps) {
  return (
    <Home
      topic={topic}
      scoresByUrl={reports.scoresByUrl}
      scoresByOrigin={reports.scoresByOrigin}
      resultByUrl={reports.resultByUrl}
      resultByOrigin={reports.resultByOrigin}
    />
  );
}
