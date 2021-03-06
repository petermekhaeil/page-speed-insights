import { topics } from '../config';

export const toSeconds = (ms: number) => (ms / 1000).toFixed(3);

export const roundDown = (value: number) => Math.floor(value * 100);

export const getColourFromRange = (value: number): string => {
  const Good = '#0cce6b';
  const NeedsImprovement = '#ffa400';
  const Poor = '#ff4e42';

  if (value >= 90) {
    return Good;
  } else if (value >= 50 && value <= 89) {
    return NeedsImprovement;
  } else {
    return Poor;
  }
};

export const getColourForType = (
  type: string,
  value: number
): string | undefined => {
  const Good = '#0cce6b';
  const NeedsImprovement = '#ffa400';
  const Poor = '#ff4e42';

  if (type === 'FCP') {
    if (value <= 1000) {
      return Good;
    } else if (value > 1000 && value <= 3000) {
      return NeedsImprovement;
    } else return Poor;
  } else if (type === 'FID') {
    if (value <= 100) {
      return Good;
    } else if (value > 100 && value <= 300) {
      return NeedsImprovement;
    } else return Poor;
  } else if (type === 'LCP') {
    if (value <= 2500) {
      return Good;
    } else if (value > 2500 && value <= 4000) {
      return NeedsImprovement;
    } else return Poor;
  } else if (type === 'CLS') {
    if (value <= 0.1) {
      return Good;
    } else if (value > 0.1 && value <= 0.25) {
      return NeedsImprovement;
    } else return Poor;
  }
};

export const getTopic = () => topics[process.env.TOPIC as keyof typeof topics];

export const getSiteDetailsByKey = (key: string) => {
  const topic = getTopic();
  return Object.keys(topic.sites).map((site) => {
    return topic.sites[site][key];
  });
};

export const getRecordUrl = (record, type) => record.key[type];

export const getScoreByUrl = (scores, url) =>
  scores.find((score) => score.id.startsWith(url))?.score;

export const formatScore = (score) => +Number(score * 100).toFixed(0);

export const getSiteNameFromUrl = (sites, type, url) => {
  const siteKey = Object.keys(sites).find((siteName) =>
    sites[siteName][type].startsWith(url)
  );
  return sites[siteKey];
};
