import { ComponentProps } from 'react';
import { FieldError } from 'react-hook-form';

export type InputProps = ComponentProps<'input'> & {
  label: string;
  error?: FieldError;
  required?: boolean;
};
