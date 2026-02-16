import * as React from 'react';

export type DatePickerProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  value?: string;
  onChange?: (date: string | undefined) => void;
  label?: string;
  error?: { message?: string };
  disabled?: boolean;
  required?: boolean;
  fromYear?: number;
  toYear?: number;
  locale?: string;
};
