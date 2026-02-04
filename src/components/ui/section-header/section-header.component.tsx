import { cn } from '@/lib/utils';
import { SectionHeaderProps } from './section-header.types';
import { HEADING_MAP } from './section-header.constants';

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
  const TitleTag = HEADING_MAP[headingLevel];
  const SubtitleTag = subtitleTag;

  return (
    <hgroup
      className={cn(
        'container mx-auto text-center flex flex-col',
        isOverlapping && 'header-overlap mb-6 md:mb-0',
        className,
      )}
    >
      {subtitle && (
        <SubtitleTag className="font-subtitle mb-1 tracking-[0.2em] font-normal text-primary uppercase text-fluid-subtitle">
          {subtitle}
        </SubtitleTag>
      )}
      <TitleTag className="font-heading font-light uppercase text-primary leading-none tracking-widest text-fluid-h2">
        {title}
      </TitleTag>
    </hgroup>
  );
};
