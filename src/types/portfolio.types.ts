export interface PortfolioItem {
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
}

export interface PortfolioPageData {
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
  }; // Assuming localazedText structure
  items: PortfolioItem[];
  seo?: Record<string, unknown>;
}
