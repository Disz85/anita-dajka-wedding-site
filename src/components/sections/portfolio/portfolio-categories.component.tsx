'use client';

import { PortfolioCategoriesProps } from './portfolio-categories.types';
import { PortfolioCategoryItem } from './portfolio-category-item.component';

export const PortfolioCategories = ({ items }: PortfolioCategoriesProps) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col w-full">
      {items.map((item) => (
        <PortfolioCategoryItem key={item._key} item={item} />
      ))}
    </div>
  );
};
