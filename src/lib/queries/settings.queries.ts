import { groq } from 'next-sanity';

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

// TypeScript types for site settings
export interface SiteSettings {
  siteTitle?: string;
  siteDescription?: string;
  phone?: string;
  email?: string;
  instagramUrl?: string;
  facebookUrl?: string;
}
