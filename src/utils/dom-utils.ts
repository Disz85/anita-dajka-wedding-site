export const readOrientation = (
  dataset: DOMStringMap | undefined,
): 'portrait' | 'landscape' | undefined => {
  const orientation = dataset?.orientation;
  if (orientation === 'portrait' || orientation === 'landscape') {
    return orientation;
  }
  return undefined;
};
