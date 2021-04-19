import { apiCrux } from '../api/getCruxReports';

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

export type FID = {
  percentiles: Percentiles;
  histogram: Histogram[];
};

export type LCP = {
  percentiles: Percentiles;
  histogram: Histogram[];
};

export type Site = {
  colour: string;
  name?: string;
};

export type Sites = {
  [url: string]: Site;
};

export type ApiCruxReportMetrics = {
  cumulative_layout_shift?: CLS;
  first_contentful_paint?: FCP;
  first_input_delay?: FID;
  largest_contentful_paint?: LCP;
};

export type Topic = {
  url: string;
  favicon: string;
  title: string;
  description: string;
  siteNames: string;
  sites: Sites;
};

export type Topics = {
  [key: string]: Topic;
};

export type MetricType = 'fcp' | 'lcp' | 'fid' | 'cls';

export type FieldDataScore = {
  id: string;
  score: number;
  scores: any;
  metrics: any;
};

export type Unwrap<T> = T extends (...args: any) => Promise<infer U> ? U : T;

export type CruxRecords = Unwrap<typeof apiCrux>;

export type Reports = {
  cruxRecords: CruxRecords;
  scores: FieldDataScore[];
};
