export type Histogram = {
  start: string | number;
  end: string | number;
  density: number;
};

export type Percentiles = {
  p75: string | number;
};

export type CLS = {
  percentiles: Percentiles;
  histogram: Histogram[];
};

export type FCP = {
  percentiles: Percentiles;
  histogram: Histogram[];
};

export type INP = {
  percentiles: Percentiles;
  histogram: Histogram[];
};

export type LCP = {
  percentiles: Percentiles;
  histogram: Histogram[];
};

export type Site = {
  colour: string;
  name: string;
  url: string;
  origin: string;
};

export type Sites = {
  [url: string]: Site;
};

export type ApiCruxReportMetrics = {
  cumulative_layout_shift?: CLS;
  first_contentful_paint?: FCP;
  interaction_to_next_paint?: INP;
  largest_contentful_paint?: LCP;
};

export type Topic = {
  slug: string;
  favicon: string;
  title: string;
  description: string;
  siteNames: string;
  sites: Sites;
};

export type Topics = {
  [key: string]: Topic;
};

export type MetricType = 'fcp' | 'lcp' | 'inp' | 'cls';

export type FieldDataScore = {
  id: string;
  score: number;
  scores: { lcp: number; inp: number; cls: number };
  metrics: ApiCruxReportMetrics | null;
};

export type CruxRecord = {
  record: {
    key: { url?: string; origin?: string };
    metrics: ApiCruxReportMetrics | null;
  };
};

export type CruxRecords = CruxRecord[];

export type Reports = {
  resultByUrl: CruxRecord[];
  resultByOrigin: CruxRecord[];
  scoresByUrl: FieldDataScore[];
  scoresByOrigin: FieldDataScore[];
};
