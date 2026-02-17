import { cn } from '@/lib/utils';
import { ContainerProps } from './container.types';
import { containerVariants } from './container.variants';

export const Container = ({
  children,
  className,
  size,
  withPaddingForDesktop,
  withPadding,
  ...props
}: ContainerProps) => {
  return (
    <div
      className={cn(containerVariants({ size, withPaddingForDesktop, withPadding, className }))}
      {...props}
    >
      {children}
    </div>
  );
};
