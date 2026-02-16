import { ComponentProps } from 'react';

export type FieldSetProps = ComponentProps<'fieldset'> & {
  legend: string;
};
