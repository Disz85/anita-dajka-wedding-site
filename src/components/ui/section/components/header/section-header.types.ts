export type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  className?: string;
  isOverlapping?: boolean;
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  subtitleTag?: 'span' | 'p' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};
