import { FieldSetProps } from './fieldset.types';

export const FieldSet = ({ legend, children, ...props }: FieldSetProps) => {
  return (
    <fieldset className="space-y-6" {...props}>
      <legend className="sr-only">{legend}</legend>
      {children}
    </fieldset>
  );
};
