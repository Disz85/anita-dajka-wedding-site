import { cn } from '@/lib/utils';

/**
 * Custom Long Arrow Icons - significantly thinned and extended version.
 * Using 0.8 stroke width and an extended 80-unit viewBox for a longer shaft.
 */
export const LongArrowRight = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 80 8"
    fill="none"
    className={cn('w-full h-full overflow-visible', className)}
    aria-hidden="true"
  >
    <path d="M0 4H79" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
    <path
      d="M75 1L79 4L75 7"
      stroke="currentColor"
      strokeWidth="0.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const LongArrowLeft = () => (
  <svg viewBox="0 0 80 8" fill="none" className="w-full h-full overflow-visible" aria-hidden="true">
    <path d="M80 4H1" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
    <path
      d="M5 1L1 4L5 7"
      stroke="currentColor"
      strokeWidth="0.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
