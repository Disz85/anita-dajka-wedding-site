import { groq } from 'next-sanity';

// GROQ query for header configuration
export const headerQuery = groq`
  *[_type == "header"][0] {
    logo {
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    },
    logoAlt,
    leftNavigation[] {
      label,
      href,
      isExternal,
      isHighlighted
    },
    rightNavigation[] {
      label,
      href,
      isExternal,
      isHighlighted
    }
  }
`;

// TypeScript types for header data
export interface NavLink {
  label: {
    hu: string;
    en: string;
  };
  href: string;
  isExternal?: boolean;
  isHighlighted?: boolean;
}

export interface HeaderData {
  logo: {
    asset: {
      _id: string;
      url: string;
      metadata?: {
        dimensions?: {
          width: number;
          height: number;
        };
      };
    };
  } | null;
  logoAlt?: {
    hu: string;
    en: string;
  };
  leftNavigation: NavLink[];
  rightNavigation: NavLink[];
}
