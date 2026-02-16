import { ComponentProps } from 'react';
import { FieldError } from 'react-hook-form';

export type TextareaProps = ComponentProps<'textarea'> & {
  label: string;
  error?: FieldError;
  required?: boolean;
};
