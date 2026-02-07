import React from 'react';
import { PortableTextComponents } from '@portabletext/react';
import { Typography } from './typography.component';

export const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <Typography variant="introBody" tone="primary" className="mb-4 last:mb-0">
        {children}
      </Typography>
    ),
    // Map other standard styles if needed to our typography system
    h1: ({ children }) => (
      <Typography variant="h1" tone="primary" className="mb-6 mt-10">
        {children}
      </Typography>
    ),
    h2: ({ children }) => (
      <Typography variant="h2" tone="primary" className="mb-4 mt-8">
        {children}
      </Typography>
    ),
    h3: ({ children }) => (
      <Typography variant="h3" tone="primary" className="mb-3 mt-6">
        {children}
      </Typography>
    ),
    h4: ({ children }) => (
      <Typography variant="h4" tone="primary" className="mb-2 mt-4">
        {children}
      </Typography>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 italic my-6">
        <Typography variant="p" tone="primary">
          {children}
        </Typography>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a
          href={value.href}
          rel={rel}
          className="text-primary underline hover:opacity-80 transition-opacity"
        >
          {children}
        </a>
      );
    },
  },
};
