import { groq } from 'next-sanity';

export const getPageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    title,
    subtitle,
    description,
    "slug": slug.current,
    sections[] {
      _type,
      _key,
      
      // Hero Section
      _type == "heroSection" => {
        title,
        subtitle,
        items[] {
          _key,
          image {
            asset-> {
              url,
              metadata { lqip }
            }
          },
          title,
          subtitle,
          alt
        }
      },

      // Introduction Section
      _type == "introductionSection" => {
        title,
        subtitle,
        description,
        image {
          asset-> {
            url,
            metadata {
              lqip,
              dimensions { width, height }
            }
          },
          alt
        },
        ctaLabel,
        ctaUrl
      },

      // Highlights Section
      _type == "highlightsSection" => {
        title,
        subtitle,
        description,
        items[] {
          _key,
          image {
            asset-> {
              url,
              metadata {
                lqip,
                dimensions { width, height }
              }
            }
          },
          title,
          alt,
          description
        }
      },

      // Video Section
      _type == "videoSection" => {
        title,
        subtitle,
        description,
        video {
          asset-> { url }
        },
        poster {
          asset-> {
            url,
            metadata { lqip }
          }
        },
        posterAlt
      },

      // Portfolio Section
      _type == "portfolioSection" => {
        title,
        subtitle,
        description,
        items[] {
          _key,
          title,
          link,
          "image": image.asset->url,
          "imageHotspot": image.hotspot,
          "imageCrop": image.crop,
          "imageAlt": image.alt,
          textAlignment
        }
      },
      
      // Testimonials Section
       _type == "testimonialsSection" => {
        title,
        subtitle,
        testimonials[] {
          author,
          text
        }
      },

      // Gallery Section
      _type == "gallerySection" => {
        title,
        subtitle,
        description,
        items[] {
          _key,
          title,
          subtitle,
          link,
          "image": image.asset->url,
          "imageHotspot": image.hotspot,
          "imageCrop": image.crop,
          "imageAlt": image.alt,
          "lqip": image.asset->metadata.lqip
        }
      },
      
      // Story Section
      _type == "storySection" => {
        items[] {
          _key,
          mainImage {
            asset-> {
              url,
              metadata {
                lqip
              }
            },
            alt
          },
          secondMainImage {
            asset-> {
              url,
              metadata {
                lqip
              }
            },
            alt
          },
          secondaryImage {
            asset-> {
              url,
              metadata {
                lqip
              }
            },
            alt
          },
          title,
          description,
          layout
        }
      },

      // Contact Section
      _type == "contactSection" => {
        title,
        subtitle,
        redirectUrl
      }
    },
    seo {
      title,
      description,
      "image": image.asset->url
    }
  }
`;
import {
  HeroSectionData,
  IntroductionSectionData,
  HighlightsSectionData,
  VideoSectionData,
  TestimonialsSectionData,
} from './home.queries';

export type ContactSectionData = {
  title?: {
    hu?: string;
    en?: string;
  };
  subtitle?: {
    hu?: string;
    en?: string;
  };
  redirectUrl?: string;
};

export type PortfolioItem = {
  _key: string;
  title: {
    hu?: string;
    en?: string;
  };
  link: string;
  image: string;
  imageHotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  imageCrop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  imageAlt?: string;
  textAlignment?: 'left' | 'center' | 'right';
};

export type PortfolioPageData = {
  _id: string;
  title?: {
    hu?: string;
    en?: string;
  };
  subtitle?: {
    hu?: string;
    en?: string;
  };
  description?: {
    hu?: string;
    en?: string;
  };
  items: PortfolioItem[];
  seo?: Record<string, unknown>;
};

export type GalleryItem = {
  _key: string;
  title: {
    hu?: string;
    en?: string;
  };
  subtitle?: {
    hu?: string;
    en?: string;
  };
  link: string;
  image: string;
  imageHotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  imageCrop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  imageAlt?: string;
  lqip?: string;
};

export type GallerySectionData = {
  title?: {
    hu?: string;
    en?: string;
  };
  subtitle?: {
    hu?: string;
    en?: string;
  };
  description?: {
    hu?: string;
    en?: string;
  };
  items: GalleryItem[];
};

export type StoryItem = {
  _key: string;
  mainImage: {
    asset: {
      url: string;
      metadata: {
        lqip?: string;
      };
    };
    alt?: string;
  };
  secondMainImage?: {
    asset: {
      url: string;
      metadata: {
        lqip?: string;
      };
    };
    alt?: string;
  };
  secondaryImage: {
    asset: {
      url: string;
      metadata: {
        lqip?: string;
      };
    };
    alt?: string;
  };
  title?: {
    hu?: string;
    en?: string;
  };
  description?: {
    hu?: string;
    en?: string;
  };
  layout: 'left' | 'right' | 'left-bottom' | 'right-bottom';
};

export type StorySectionData = {
  items: StoryItem[];
};

export type BaseSection = {
  _key: string;
};

export type SectionData =
  | ({ _type: 'heroSection' } & BaseSection & HeroSectionData)
  | ({ _type: 'introductionSection' } & BaseSection & IntroductionSectionData)
  | ({ _type: 'highlightsSection' } & BaseSection & HighlightsSectionData)
  | ({ _type: 'videoSection' } & BaseSection & VideoSectionData)
  | ({ _type: 'portfolioSection' } & BaseSection & PortfolioPageData)
  | ({ _type: 'testimonialsSection' } & BaseSection & TestimonialsSectionData)
  | ({ _type: 'gallerySection' } & BaseSection & GallerySectionData)
  | ({ _type: 'storySection' } & BaseSection & StorySectionData)
  | ({ _type: 'contactSection' } & BaseSection & ContactSectionData);

type LocalizedString = {
  hu?: string;
  en?: string;
};

export type PageData = {
  title: string;
  subtitle?: LocalizedString;
  description?: LocalizedString;
  slug: string;
  sections: SectionData[];
  seo?: {
    title?: string;
    description?: string;
    image?: string;
  };
};

export const getPortfolioPageQuery = groq`
  *[_type == "portfolio"][0] {
    _id,
    title,
    subtitle,
    description,
    items[] {
      _key,
      title,
      link,
      "image": image.asset->url,
      "imageHotspot": image.hotspot,
      "imageCrop": image.crop,
      "imageAlt": image.alt,
      textAlignment
    },
    "seo": seo {
      ...,
      "image": image.asset->url
    }
  }
`;
