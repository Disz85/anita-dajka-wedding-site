import type { PortableTextBlock } from 'next-sanity';

export const getLocalizedValue = <T>(
  value: { hu?: T; en?: T } | undefined | null,
  locale: string,
): T | undefined => {
  if (value === undefined || value === null) {
    return undefined;
  }

  const { hu, en } = value;

  if (locale === 'hu') {
    return hu ?? en;
  }

  if (locale === 'en') {
    return en ?? hu;
  }

  return hu ?? en;
};

export const toPlainText = (blocks: PortableTextBlock[] = []): string => {
  if (!blocks) {
    return '';
  }

  return blocks
    .map((block) => {
      if (block._type !== 'block' || !block.children) {
        return '';
      }

      return block.children
        .map((child) => {
          if ('text' in child && typeof child.text === 'string') {
            return child.text;
          }
          return '';
        })
        .join('');
    })
    .join('\n\n');
};
