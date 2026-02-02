import createImageUrlBuilder from '@sanity/image-url';
import { dataset, projectId } from './client';

// Define the type locally to avoid deep import issues with @sanity/image-url
// This matches the library's internal type definition roughly but avoids the import error.
export type SanityImageSource =
  | string
  | { _ref: string }
  | { _id?: string; url?: string; assetId?: string }
  | { asset?: { _ref: string } | { _id: string; url: string } | { _ref: string; _type: string } };

const imageBuilder = createImageUrlBuilder({
  projectId: projectId ?? '',
  dataset: dataset ?? '',
});

export const urlForImage = (source: SanityImageSource) => {
  return imageBuilder.image(source).auto('format').fit('max');
};
