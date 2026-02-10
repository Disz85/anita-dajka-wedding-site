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
  title: {
    hu?: string;
    en?: string;
  };
  subtitle: {
    hu?: string;
    en?: string;
  };
  description: {
    hu?: string;
    en?: string;
  };
  items: PortfolioItem[];
  seo?: Record<string, unknown>;
};
