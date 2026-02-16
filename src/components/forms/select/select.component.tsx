import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { SelectProps } from './select.types';
import { labelClasses, inputClasses, errorClasses } from '../form.styles';
import { ChevronDown } from 'lucide-react';

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, required, children, className, ...props }, ref) => {
    return (
      <div className={cn('w-full', className)}>
        <label htmlFor={props.id} className={labelClasses}>
          {label} {required && <span className="text-accent ml-1">*</span>}
        </label>
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              inputClasses,
              'appearance-none',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
            )}
            aria-invalid={!!error}
            {...props}
          >
            {children}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
        {error && <p className={errorClasses}>{error.message}</p>}
      </div>
    );
  },
);

Select.displayName = 'Select';
