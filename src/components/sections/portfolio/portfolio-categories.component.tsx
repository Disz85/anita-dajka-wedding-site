'use client';

import { PortfolioCategoriesProps } from './portfolio-categories.types';
import { PortfolioCategoryItem } from './portfolio-category-item.component';

export const PortfolioCategories = ({ items }: PortfolioCategoriesProps) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col w-full gap-4 md:gap-12">
      {items.map((item) => (
        <PortfolioCategoryItem key={item._key} item={item} />
      ))}
    </div>
  );
};
