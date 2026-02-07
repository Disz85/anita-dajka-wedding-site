import { cn } from '@/lib/utils';
import { TypographyProps } from './typography.types';
import { typographyVariants } from './typography.variants';

import { defaultElementMap } from './typography.maps';

export const Typography = ({
  className,
  variant,
  tone,
  as: AsProp,
  children,
  ...props
}: TypographyProps) => {
  const Component = AsProp || defaultElementMap[variant || 'p'] || 'p';

  return (
    <Component className={cn(typographyVariants({ variant, tone, className }))} {...props}>
      {children}
    </Component>
  );
};
