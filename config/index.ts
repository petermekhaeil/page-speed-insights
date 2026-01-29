import { Topics } from '../app/typings';
import sitesF1 from './f1';
import sitesSgTelco from './sg_telco';

export const apiKey = process.env.GOOGLE_API_KEY;

export const topics: Topics = {
  f1: {
    slug: 'f1',
    favicon:
      'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏎️</text></svg>',
    title: 'F1 Teams',
    description: 'Page Speed Insights for Formula 1 team websites',
    siteNames: 'Teams',
    sites: sitesF1
  },
  'sg-ecommerce': {
    slug: 'sg-ecommerce',
    favicon:
      'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🇸🇬</text></svg>',
    title: 'Singapore E-Commerce',
    description: 'Page Speed Insights for Singapore e-commerce websites',
    siteNames: 'Sites',
    sites: sitesSgTelco
  }
};

export const getTopicBySlug = (slug: string) => topics[slug];
export const getAllTopicSlugs = () => Object.keys(topics);
