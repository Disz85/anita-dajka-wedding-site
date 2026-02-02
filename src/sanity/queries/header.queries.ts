import { groq } from 'next-sanity';
import { Header as SanityHeader, NavLink as SanityNavLink } from '@/types/sanity.types';

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
    logoAlt {
      hu,
      en
    },
    leftNavigation[] {
      label {
        hu,
        en
      },
      href,
      isExternal,
      isHighlighted
    },
    rightNavigation[] {
      label {
        hu,
        en
      },
      href,
      isExternal,
      isHighlighted
    }
  }
`;

// Re-exporting refined types for the frontend to ensure strictness where needed
// but basing them on the "Contract" (Sanity types)
export type NavLink = SanityNavLink;
export type HeaderData = SanityHeader;
