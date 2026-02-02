import { groq } from 'next-sanity';
import { Settings as SanitySettings } from '@/types/sanity.types';

// GROQ query for site settings (contact info)
export const settingsQuery = groq`
  *[_type == "settings"][0] {
    siteTitle,
    siteDescription,
    phone,
    email,
    instagramUrl,
    facebookUrl
  }
`;

// Contract-based type
export type SiteSettings = SanitySettings;
