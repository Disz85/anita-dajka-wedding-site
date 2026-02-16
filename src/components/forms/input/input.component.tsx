import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { InputProps } from './input.types';
import { errorClasses } from '../form.styles';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, required, type = 'text', ...props }, ref) => {
    return (
      <div className={cn('group relative z-0 w-full mb-5')}>
        <input
          ref={ref}
          type={type}
          id={props.id}
          className={cn(
            'peer block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 py-2.5 font-heading text-base font-light italic leading-normal text-primary focus:border-black focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-black',
            error && 'border-red-500 focus:border-red-500',
          )}
          placeholder=" "
          required={required}
          {...props}
        />
        <label
          htmlFor={props.id}
          className={cn(
            'absolute top-3 -z-10 origin-left -translate-y-6 scale-75 transform font-heading text-base font-light italic leading-normal text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-primary dark:text-gray-400 peer-focus:dark:text-black rtl:peer-focus:translate-x-1/4',
            error && 'text-red-500 peer-focus:text-red-500',
          )}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {error && <p className={errorClasses}>{error.message}</p>}
      </div>
    );
  },
);
Input.displayName = 'Input';
