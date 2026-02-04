import { cn } from '@/lib/utils';
import { SectionDescriptionProps } from './section-description.types';

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
    <div className={cn('w-full px-4 mt-8 mb-12', alignStyles[align], maxWidth, className)}>
      <Component className="font-body text-sm text-primary leading-relaxed tracking-wide">
        {children}
      </Component>
    </div>
  );
};
