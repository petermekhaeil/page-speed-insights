import Head from 'next/head';
import React from 'react';
import styles from './Home.module.css';
import Footer from './Footer';
import PerformanceReport from './PerformanceReport';
import FieldDataReport from './FieldDataReport';
import SitesList from './SitesList';

const Home = ({ topic, cruxRecords, scores }) => {
  return (
    <div className={styles.root}>
      <Head>
        <title>{topic.title}</title>
        <link rel="icon" href={topic.favicon} />
        <meta name="description" content={topic.description} />
        <meta property="og:title" content={topic.title} />
        <meta property="og:description" content={topic.description} />
        <meta property="og:url" content={topic.url} />
        <meta property="og:site_name" content={topic.title} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@PMekhaeil" />
      </Head>

      <main className="container mx-auto px-4">
        <h1 className={styles.heading}>{topic.title}</h1>
        <hr className={styles.rule} />
        <h2 className={styles.headingSection}>Performance Score</h2>
        <PerformanceReport
          topic={topic}
          cruxRecords={cruxRecords}
          scores={scores}
        />
        <hr className={styles.rule} />
        <h2 className={styles.headingSection}>Field Data Scores</h2>
        <FieldDataReport
          topic={topic}
          cruxRecords={cruxRecords}
          scores={scores}
        />
        <hr className={styles.rule} />
        <h2 className={styles.headingSection}>{topic.siteNames}</h2>
        <SitesList topic={topic} cruxRecords={cruxRecords} scores={scores} />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
