import { memo } from 'react';
import {
  LongArrowLeft,
  LongArrowRight,
} from '@/components/ui/icons/long-arrows/long-arrows.component';
import type { CalendarNavButtonProps } from '../calendar.types';

export const CalendarNavButton = memo(({ onClick, direction, label }: CalendarNavButtonProps) => {
  const isLeft = direction === 'left';

  return (
    <button
      type="button"
      onClick={onClick}
      className="p-2 text-primary hover:opacity-60 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
      aria-label={label}
    >
      <div className="w-12 h-2">{isLeft ? <LongArrowLeft /> : <LongArrowRight />}</div>
    </button>
  );
});

CalendarNavButton.displayName = 'CalendarNavButton';
