import { groq } from 'next-sanity';

export const homeHighlightsQuery = groq`
  *[_type == "home"][0] {
    highlightsSection {
      title {
        hu,
        en
      },
      subtitle {
        hu,
        en
      },
      description {
        hu,
        en
      },
      items[] {
        image {
          asset-> {
            url,
            metadata {
              lqip,
              dimensions {
                width,
                height
              }
            }
          }
        },
        title {
          hu,
          en
        },
        alt {
          hu,
          en
        },
        description {
          hu,
          en
        }
      }
    }
  }
`;

export type LocalizedString = {
  hu?: string;
  en?: string;
};

export type SanityHighlightItem = {
  image: {
    asset: {
      url: string;
      metadata: {
        lqip?: string;
        dimensions: {
          width: number;
          height: number;
        };
      };
    };
  };
  title: LocalizedString;
  alt: LocalizedString;
  description: LocalizedString;
};

export type HighlightsSectionData = {
  title: LocalizedString;
  subtitle: LocalizedString;
  description: LocalizedString;
  items: SanityHighlightItem[];
};

export type HomeHighlightsResponse = {
  highlightsSection: HighlightsSectionData;
};
