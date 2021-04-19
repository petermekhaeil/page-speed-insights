import { Topics } from '../app/typings';
import sitesF1 from './f1';
import sitesSgTelco from './sg_telco';

export const apiKey = process.env.GOOGLE_API_KEY;

export const topics: Topics = {
  F1: {
    url: 'https://f1-page-speed-insights.netlify.app/',
    favicon:
      'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏎️</text></svg>',
    title: 'F1 Page Speed Insights',
    description: 'F1 Page Speed Insights',
    siteNames: 'Teams',
    sites: sitesF1
  },
  'SG-ECOMMERCE': {
    url: 'https://sg-page-speed-insights.netlify.app/',
    favicon:
      'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🇸🇬</text></svg>',
    title: 'Singapore E-Commerce Page Speed Insights',
    description: 'Singapore E-Commerce Page Speed Insights',
    siteNames: 'Sites',
    sites: sitesSgTelco
  }
};
