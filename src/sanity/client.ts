import { createClient } from 'next-sanity';
import { siteConfig } from '@/config/site.config';

export const { projectId, dataset, apiVersion } = siteConfig.sanity;

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
});
