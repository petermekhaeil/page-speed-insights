import { getSiteDetailsByKey } from '../app/helpers';
import { Reports, FieldDataScore, MetricType } from '../app/typings';
import { apiKey } from '../config';

const CRUX_API_URL = 'https://chromeuxreport.googleapis.com/v1/records:queryRecord';

type CruxResponse = {
  record?: {
    key: { url?: string; origin?: string };
    metrics?: {
      cumulative_layout_shift?: {
        histogram: Array<{ start: string; end?: string; density: number }>;
        percentiles: { p75: string };
      };
      first_contentful_paint?: {
        histogram: Array<{ start: number; end?: number; density: number }>;
        percentiles: { p75: number };
      };
      interaction_to_next_paint?: {
        histogram: Array<{ start: number; end?: number; density: number }>;
        percentiles: { p75: number };
      };
      largest_contentful_paint?: {
        histogram: Array<{ start: number; end?: number; density: number }>;
        percentiles: { p75: number };
      };
    };
  };
  error?: { code: number; message: string };
};

/**
 * Core Web Vitals thresholds (from web.dev)
 * Good: metric passes threshold
 * Needs Improvement: between good and poor
 * Poor: metric fails threshold
 */
const THRESHOLDS = {
  lcp: { good: 2500, poor: 4000 },    // milliseconds
  fcp: { good: 1800, poor: 3000 },    // milliseconds
  inp: { good: 200, poor: 500 },      // milliseconds
  cls: { good: 0.1, poor: 0.25 },     // unitless
};

/**
 * Calculate score based on Core Web Vitals thresholds.
 * Returns a score from 0 to 1 where:
 * - 1.0 = excellent (well below good threshold)
 * - 0.9 = good (at or below good threshold)
 * - 0.5 = needs improvement (between good and poor)
 * - 0.0 = poor (at or above poor threshold)
 */
function calculateScore(metric: MetricType, value: number): number {
  const threshold = THRESHOLDS[metric];
  if (!threshold) return 0;

  const { good, poor } = threshold;

  if (value <= good * 0.5) {
    // Excellent - well below threshold
    return 1.0;
  } else if (value <= good) {
    // Good - scales from 0.9 to 1.0
    const ratio = value / good;
    return 0.9 + (1 - ratio) * 0.1;
  } else if (value <= poor) {
    // Needs improvement - scales from 0.5 to 0.9
    const ratio = (value - good) / (poor - good);
    return 0.9 - ratio * 0.4;
  } else {
    // Poor - scales from 0 to 0.5
    const overage = value / poor;
    return Math.max(0, 0.5 - (overage - 1) * 0.25);
  }
}

/**
 * Fetch CrUX data for a URL or origin
 */
async function fetchCrux(
  key: { url?: string; origin?: string }
): Promise<CruxResponse | null> {
  try {
    const response = await fetch(`${CRUX_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(key),
    });

    if (!response.ok) {
      if (response.status === 404) {
        // No CrUX data for this URL/origin
        return null;
      }
      console.warn(`CrUX API error for ${key.url || key.origin}: ${response.status}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.warn(`Failed to fetch CrUX for ${key.url || key.origin}:`, error);
    return null;
  }
}

/**
 * Extract scores from CrUX response
 */
function extractScores(crux: CruxResponse | null, id: string): FieldDataScore {
  const metrics = crux?.record?.metrics;

  if (!metrics) {
    return {
      id,
      score: -1,
      scores: { lcp: 0, inp: 0, cls: 0 },
      metrics: null,
    };
  }

  // Get p75 values
  const lcpValue = metrics.largest_contentful_paint?.percentiles.p75;
  const inpValue = metrics.interaction_to_next_paint?.percentiles.p75;
  const clsValue = metrics.cumulative_layout_shift?.percentiles.p75;

  // Calculate individual scores
  const lcpScore = lcpValue != null ? calculateScore('lcp', Number(lcpValue)) : 1;
  const inpScore = inpValue != null ? calculateScore('inp', Number(inpValue)) : 1;
  const clsScore = clsValue != null ? calculateScore('cls', Number(clsValue)) : 1;

  // Overall score is minimum of available Core Web Vitals (LCP, INP, CLS)
  // All three metrics must be present for a complete assessment
  const availableScores = [
    lcpValue != null ? lcpScore : null,
    inpValue != null ? inpScore : null,
    clsValue != null ? clsScore : null,
  ].filter((s): s is number => s !== null);

  // If any Core Web Vital is missing, cap the score at 0.89 (incomplete data)
  const hasAllMetrics = lcpValue != null && inpValue != null && clsValue != null;
  const rawScore = availableScores.length > 0 ? Math.min(...availableScores) : -1;
  const overallScore = rawScore > 0 && !hasAllMetrics ? Math.min(rawScore, 0.89) : rawScore;

  // Convert to our metrics format
  const formattedMetrics = {
    cumulative_layout_shift: metrics.cumulative_layout_shift
      ? {
          percentiles: { p75: metrics.cumulative_layout_shift.percentiles.p75 },
          histogram: metrics.cumulative_layout_shift.histogram.map((h) => ({
            start: h.start,
            end: h.end ?? h.start,
            density: h.density,
          })),
        }
      : undefined,
    first_contentful_paint: metrics.first_contentful_paint
      ? {
          percentiles: { p75: metrics.first_contentful_paint.percentiles.p75 },
          histogram: metrics.first_contentful_paint.histogram.map((h) => ({
            start: h.start,
            end: h.end ?? h.start,
            density: h.density,
          })),
        }
      : undefined,
    interaction_to_next_paint: metrics.interaction_to_next_paint
      ? {
          percentiles: { p75: metrics.interaction_to_next_paint.percentiles.p75 },
          histogram: metrics.interaction_to_next_paint.histogram.map((h) => ({
            start: h.start,
            end: h.end ?? h.start,
            density: h.density,
          })),
        }
      : undefined,
    largest_contentful_paint: metrics.largest_contentful_paint
      ? {
          percentiles: { p75: metrics.largest_contentful_paint.percentiles.p75 },
          histogram: metrics.largest_contentful_paint.histogram.map((h) => ({
            start: h.start,
            end: h.end ?? h.start,
            density: h.density,
          })),
        }
      : undefined,
  };

  return {
    id,
    score: overallScore,
    scores: { lcp: lcpScore, inp: inpScore, cls: clsScore },
    metrics: formattedMetrics,
  };
}

/**
 * Create a record structure for compatibility
 */
function createRecord(crux: CruxResponse | null, key: { url?: string; origin?: string }) {
  return {
    record: {
      key,
      metrics: crux?.record?.metrics ? extractScores(crux, key.url || key.origin || '').metrics : null,
    },
  };
}

export const apiCruxByUrl = async (urls: string[]) => {
  const results = await Promise.all(
    urls.map(async (url) => {
      const crux = await fetchCrux({ url });
      return { crux, url };
    })
  );

  return results.map(({ crux, url }) => createRecord(crux, { url }));
};

export const apiCruxByOrigin = async (origins: string[]) => {
  const results = await Promise.all(
    origins.map(async (origin) => {
      const crux = await fetchCrux({ origin });
      return { crux, origin };
    })
  );

  return results.map(({ crux, origin }) => createRecord(crux, { origin }));
};

const getCruxReports = async (): Promise<Reports> => {
  const urls = getSiteDetailsByKey('url');
  const origins = getSiteDetailsByKey('origin');

  if (!apiKey) {
    console.warn('GOOGLE_API_KEY is not set. Returning empty data.');
    return {
      resultByUrl: [],
      resultByOrigin: [],
      scoresByUrl: [],
      scoresByOrigin: [],
    };
  }

  console.log(`Fetching CrUX data for ${urls.length} URLs and ${origins.length} origins...`);

  try {
    // Fetch all CrUX data
    const [urlResults, originResults] = await Promise.all([
      Promise.all(urls.map((url) => fetchCrux({ url }))),
      Promise.all(origins.map((origin) => fetchCrux({ origin }))),
    ]);

    // Create records
    const resultByUrl = urls.map((url, i) => createRecord(urlResults[i], { url }));
    const resultByOrigin = origins.map((origin, i) => createRecord(originResults[i], { origin }));

    // Extract scores
    const scoresByUrl = urls.map((url, i) => extractScores(urlResults[i], url));
    const scoresByOrigin = origins.map((origin, i) => extractScores(originResults[i], origin));

    return {
      resultByUrl,
      resultByOrigin,
      scoresByUrl,
      scoresByOrigin,
    };
  } catch (error) {
    console.error('Error fetching CrUX data:', error);
    return {
      resultByUrl: [],
      resultByOrigin: [],
      scoresByUrl: [],
      scoresByOrigin: [],
    };
  }
};

export default getCruxReports;
