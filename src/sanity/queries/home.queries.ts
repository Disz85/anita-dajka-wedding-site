import { groq } from 'next-sanity';
import type { PortableTextBlock } from 'next-sanity';

export const homePageQuery = groq`
  *[_type == "home"][0] {
    heroSection {
      title {
        hu,
        en
      },
      subtitle {
        hu,
        en
      },
      items[] {
        _key,
        image {
          asset-> {
            url,
            metadata {
              lqip
            }
          }
        },
        title {
          hu,
          en
        },
        subtitle {
          hu,
          en
        },
        alt {
          hu,
          en
        }
      }
    },
    introductionSection {
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
        },
        alt {
          hu,
          en
        }
      },
      ctaLabel {
        hu,
        en
      },
      ctaUrl
    },
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
    },
    videoSection {
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
      video {
        asset-> {
          url
        }
      },
      poster {
        asset-> {
          url,
          metadata {
            lqip
          }
        }
      },
      posterAlt {
        hu,
        en
      }
    }
  }
`;

// Keep the old export for backwards compatibility
export const homeHighlightsQuery = homePageQuery;

export type LocalizedString = {
  hu?: string;
  en?: string;
};

// Hero Section Types
export type SanityHeroItem = {
  _key: string;
  image: {
    asset: {
      url: string;
      metadata: {
        lqip?: string;
      };
    };
  };
  title?: LocalizedString;
  subtitle?: LocalizedString;
  alt: LocalizedString;
};

export type HeroSectionData = {
  title: LocalizedString;
  subtitle: LocalizedString;
  items: SanityHeroItem[];
};

// Highlights Section Types
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

// Video Section Types
export type VideoSectionData = {
  title: LocalizedString;
  subtitle?: LocalizedString;
  description: LocalizedString;
  video: {
    asset: {
      url: string;
    };
  };
  poster: {
    asset: {
      url: string;
      metadata: {
        lqip?: string;
      };
    };
  };
  posterAlt?: LocalizedString;
};

export type LocalizedBlockContent = {
  hu?: PortableTextBlock[];
  en?: PortableTextBlock[];
};

// Introduction Section Types
export type IntroductionSectionData = {
  title: LocalizedString;
  subtitle?: LocalizedString;
  description: LocalizedBlockContent;
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
    alt: LocalizedString;
  };
  ctaLabel?: LocalizedString;
  ctaUrl?: string;
};

// Combined Response Type
export type HomePageResponse = {
  heroSection: HeroSectionData;
  introductionSection?: IntroductionSectionData;
  highlightsSection: HighlightsSectionData;
  videoSection?: VideoSectionData;
};

// Keep the old export for backwards compatibility
export type HomeHighlightsResponse = HomePageResponse;
