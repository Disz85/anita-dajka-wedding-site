import { cn } from '@/lib/utils';
import { SectionHeaderProps } from './section-header.types';
import { Typography } from '@/components/ui/typography/typography.component';

/**
 * Reusable Section Header component following SEO best practices.
 * Uses semantic <hgroup> for better grouping of titles and subtitles.
 * Implements fluid typography using 'clamp' for responsive font sizes.
 */

export const SectionHeader = ({
  title,
  subtitle,
  className,
  isOverlapping,
  headingLevel = 2,
  subtitleTag = 'p',
}: SectionHeaderProps) => {
  const headingVariant =
    headingLevel === 1 ? 'h1' : headingLevel === 2 ? 'h2' : headingLevel === 3 ? 'h3' : 'h4';

  const HeadingTag = `h${headingLevel}` as const;

  return (
    <hgroup
      className={cn(
        'container mx-auto text-center flex flex-col',
        isOverlapping && 'header-overlap mb-6 md:mb-0',
        className,
      )}
    >
      {subtitle && (
        <Typography
          as={subtitleTag}
          variant="subtitle"
          tone="primary"
          className="mb-1 text-fluid-subtitle font-normal"
        >
          {subtitle}
        </Typography>
      )}
      <Typography
        variant={headingVariant}
        as={HeadingTag}
        tone="primary"
        className="font-heading font-light uppercase leading-none tracking-widest text-fluid-h2"
      >
        {title}
      </Typography>
    </hgroup>
  );
};
