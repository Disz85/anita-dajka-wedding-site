import { cn } from '@/lib/utils';
import { SectionHeaderProps } from './section-header.types';
import { Typography } from '@/components/ui/typography/typography.component';
import { containerVariants } from '@/components/ui/container/container.variants';
import { HEADING_TAG_MAP, HEADING_VARIANT_MAP } from './section-header.constants';

export const SectionHeader = ({
  id,
  title,
  subtitle,
  className,
  isOverlapping,
  headingLevel = 2,
  subtitleTag = 'p',
  subtitlePosition = 'top',
  titleSize = 'default',
  size = 'default',
  align = 'center',
  subtitleTone,
}: SectionHeaderProps) => {
  const HeadingTag = HEADING_TAG_MAP[headingLevel] || 'h2';
  const headingVariant = HEADING_VARIANT_MAP[headingLevel] || 'h2';

  const titleSizeClass = {
    default: 'text-fluid-h2',
    small: 'text-fluid-h2-sm',
    contact: 'text-[22px] md:text-[30px] leading-[1.1]',
  }[titleSize];

  const alignmentClasses = {
    center: 'text-center items-center',
    left: 'text-left items-start',
    right: 'text-right items-end',
    responsive: 'text-center items-center md:text-left md:items-start',
  }[align];

  return (
    <hgroup
      className={cn(
        containerVariants({ size }),
        'flex',
        alignmentClasses,
        subtitlePosition === 'top' ? 'flex-col-reverse' : 'flex-col',
        isOverlapping && 'header-overlap mb-6 md:mb-0',
        className,
      )}
    >
      <Typography
        id={id}
        variant={headingVariant}
        as={HeadingTag}
        tone="primary"
        className={cn(
          'font-heading font-light uppercase tracking-widest',
          titleSize !== 'contact' && 'leading-none',
          titleSizeClass,
          subtitlePosition === 'top' ? 'mt-4' : 'mt-0',
          subtitlePosition === 'bottom' ? 'mb-2' : 'mb-0',
        )}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography
          as={subtitleTag}
          variant="subtitle"
          tone={subtitleTone}
          className={cn(
            'text-fluid-subtitle font-normal',
            subtitlePosition === 'top' ? 'mb-0' : 'mb-1',
          )}
        >
          {subtitle}
        </Typography>
      )}
    </hgroup>
  );
};
