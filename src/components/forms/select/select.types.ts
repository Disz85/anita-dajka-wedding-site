import { ComponentProps } from 'react';
import { FieldError } from 'react-hook-form';

export type SelectProps = ComponentProps<'select'> & {
  label: string;
  error?: FieldError;
  required?: boolean;
};
