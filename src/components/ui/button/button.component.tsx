import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';
import { buttonVariants } from './button.variants';
import { ButtonProps } from './button.types';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot : 'button';
    return (
      <Component className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        <span className="relative z-10">{props.children}</span>
      </Component>
    );
  },
);
Button.displayName = 'Button';
