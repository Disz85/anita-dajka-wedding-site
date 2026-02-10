import { cn } from '@/lib/utils';
import { ContainerProps } from './container.types';
import { containerVariants } from './container.variants';

export const Container = ({
  children,
  className,
  size,
  withPaddingForDesktop,
  ...props
}: ContainerProps) => {
  return (
    <div className={cn(containerVariants({ size, withPaddingForDesktop, className }))} {...props}>
      {children}
    </div>
  );
};
