import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { TextareaProps } from './textarea.types';
import { labelClasses, inputClasses, errorClasses } from '../form.styles';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, required, className, ...props }, ref) => {
    return (
      <div className={className}>
        <label
          htmlFor={props.id}
          className={cn(
            labelClasses,
            'font-heading text-base font-light italic leading-normal text-gray-500',
          )}
        >
          {label} {required && <span className="text-accent ml-1">*</span>}
        </label>
        <textarea
          ref={ref}
          className={cn(
            inputClasses,
            'min-h-[120px] resize-y font-heading text-base font-light italic leading-normal text-primary',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
          )}
          aria-invalid={!!error}
          {...props}
        />
        {error && <p className={errorClasses}>{error.message}</p>}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
