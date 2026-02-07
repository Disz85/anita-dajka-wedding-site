import { cn } from '@/lib/utils';
import { SectionDescriptionProps } from './section-description.types';
import { Typography } from '@/components/ui/typography/typography.component';

export const SectionDescription = ({
  children,
  align = 'center',
  className,
  maxWidth = 'max-w-[600px]',
  as: Component = 'p',
}: SectionDescriptionProps) => {
  const alignStyles = {
    left: 'text-left mr-auto',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  return (
    <div className={cn('w-full px-4 mt-8 md:mb-4', alignStyles[align], maxWidth, className)}>
      <Typography
        as={Component}
        variant="p"
        tone="primary"
        className="text-sm leading-relaxed tracking-wide"
      >
        {children}
      </Typography>
    </div>
  );
};
