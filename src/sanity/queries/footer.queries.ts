import { groq } from 'next-sanity';

export const footerQuery = groq`
  *[_type == "footer"][0] {
    brandName {
      hu,
      en
    },
    tagline {
      hu,
      en
    },
    instagramHandle,
    instagramImages[] {
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          },
          lqip
        }
      }
    }
  }
`;

export type FooterImage = {
  asset: {
    _id: string;
    url: string;
    metadata?: {
      dimensions?: { width: number; height: number };
      lqip?: string;
    };
  };
};

export type FooterData = {
  brandName?: { hu?: string; en?: string };
  tagline?: { hu?: string; en?: string };
  instagramHandle?: string;
  instagramImages?: FooterImage[];
} | null;
