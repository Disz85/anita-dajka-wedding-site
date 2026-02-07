import { containerVariants } from '@/components/ui/container/container.variants';
import { VariantProps } from 'class-variance-authority';

export type SectionHeaderProps = {
  id?: string;
  title: string;
  subtitle?: string;
  className?: string;
  isOverlapping?: boolean;
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  subtitleTag?: 'span' | 'p' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  subtitlePosition?: 'top' | 'bottom';
  titleSize?: 'default' | 'small';
} & VariantProps<typeof containerVariants>;
