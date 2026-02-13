import { type PortfolioItem } from '@/sanity/queries/page.queries';

export type PortfolioCategoriesProps = {
  items: PortfolioItem[];
};

export type PortfolioCategoryItemProps = {
  item: PortfolioItem;
};
