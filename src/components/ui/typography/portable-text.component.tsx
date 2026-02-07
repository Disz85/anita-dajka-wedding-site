import React from 'react';
import { PortableText, PortableTextProps } from '@portabletext/react';
import { portableTextComponents } from './typography.portable-text';

/**
 * A wrapper around PortableText that uses the project's typography system by default.
 */
export const CustomPortableText = (props: PortableTextProps) => {
  return <PortableText components={portableTextComponents} {...props} />;
};
