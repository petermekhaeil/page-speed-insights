import React from 'react';
import styles from './Home.module.css';
import Footer from './Footer';
import PerformanceReport from './PerformanceReport';
import FieldDataReport from './FieldDataReport';
import SitesList from './SitesList';
import { Topic, CruxRecords, FieldDataScore } from '../app/typings';

type HomeProps = {
  topic: Topic;
  resultByOrigin: CruxRecords;
  resultByUrl: CruxRecords;
  scoresByUrl: FieldDataScore[];
  scoresByOrigin: FieldDataScore[];
};

const Home = ({
  topic,
  resultByOrigin,
  resultByUrl,
  scoresByUrl,
  scoresByOrigin
}: HomeProps) => {
  return (
    <div className={styles.root}>
      <main className="container mx-auto px-4">
        <h1 className={styles.heading}>{topic.title}</h1>
        <hr className={styles.rule} />
        <h2 className={styles.headingSection}>Performance Score by Origin</h2>
        <p className={styles.sectionDescription}>
          Aggregated performance data across all pages on each domain.
        </p>
        <PerformanceReport
          topic={topic}
          report={resultByOrigin}
          scores={scoresByOrigin}
          type="origin"
        />
        <hr className={styles.rule} />
        <h2 className={styles.headingSection}>Performance Score by URL</h2>
        <p className={styles.sectionDescription}>
          Performance data for specific pages tracked in this dashboard.
        </p>
        <PerformanceReport
          topic={topic}
          report={resultByUrl}
          scores={scoresByUrl}
          type="url"
        />
        <hr className={styles.rule} />
        <h2 className={styles.headingSection}>Field Data Scores</h2>
        <p className={styles.sectionDescription}>
          Core Web Vitals metrics collected from real users over the last 28 days.
        </p>
        <FieldDataReport
          topic={topic}
          report={resultByOrigin}
          scores={scoresByOrigin}
          type="origin"
        />
        <hr className={styles.rule} />
        <h2 className={styles.headingSection}>{topic.siteNames}</h2>
        <p className={styles.sectionDescription}>
          Detailed breakdown of each site with histograms showing user experience distribution.
        </p>
        <SitesList
          topic={topic}
          report={resultByOrigin}
          scores={scoresByOrigin}
          type="origin"
        />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
