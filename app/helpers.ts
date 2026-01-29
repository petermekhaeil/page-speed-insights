import { Site, Sites, FieldDataScore, Topic } from './typings';

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
  } else if (type === 'INP') {
    // INP thresholds: Good <= 200ms, Needs Improvement 200-500ms, Poor > 500ms
    if (value <= 200) {
      return Good;
    } else if (value > 200 && value <= 500) {
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

export const getSiteDetailsByKey = (topic: Topic, key: keyof Site) => {
  return Object.values(topic.sites).map((site) => {
    return site[key];
  });
};

export const getRecordUrl = (
  record: { key: { url?: string; origin?: string } },
  type: 'url' | 'origin'
): string => record.key[type] ?? '';

export const getScoreByUrl = (scores: FieldDataScore[], url: string): number =>
  scores.find((score) => score.id.startsWith(url))?.score ?? 0;

export const formatScore = (score: number) => +Number(score * 100).toFixed(0);

export const getSiteNameFromUrl = (
  sites: Sites,
  type: 'url' | 'origin',
  url: string
): Site => {
  const siteKey = Object.keys(sites).find((siteName) =>
    sites[siteName][type].startsWith(url)
  );
  return sites[siteKey ?? ''] ?? { colour: '', name: '', url: '', origin: '' };
};
