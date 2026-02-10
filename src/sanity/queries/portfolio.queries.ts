import { groq } from 'next-sanity';

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
      "imageAlt": image.alt
    },
    "seo": seo {
      ...,
      "image": image.asset->url
    }
  }
`;
