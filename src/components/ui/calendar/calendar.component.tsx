'use client';

import { memo } from 'react';
import { DayPicker, DayPickerSingleProps } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { CalendarCaption } from './components/calendar-caption.component';
import { CalendarFooter } from './components/calendar-footer.component';
import type { CalendarProps } from './calendar.types';

export * from './calendar.types';

const Calendar = memo(
  ({
    className,
    classNames,
    showOutsideDays = true,
    onSave,
    onClear,
    clearLabel = 'Clear',
    saveLabel = 'Save',
    prevMonthLabel = 'Previous Month',
    nextMonthLabel = 'Next Month',
    ...props
  }: CalendarProps) => {
    const dayPickerProps = props as DayPickerSingleProps;

    return (
      <DayPicker
        showOutsideDays={showOutsideDays}
        className={cn('p-6 bg-white', className)}
        classNames={{
          months: 'flex flex-col space-y-4',
          month: 'space-y-6',
          nav: 'hidden',
          table: 'w-full border-collapse space-y-1',
          head_row: 'flex',
          head_cell: 'font-subtitle w-10 font-normal text-xs uppercase',
          row: 'flex w-full',
          cell: 'h-10 w-10 text-center p-0 relative focus-within:relative focus-within:z-20',
          day: cn(
            'h-10 w-10 p-0 font-heading text-lg font-light transition-all hover:bg-gray-100 flex items-center justify-center',
          ),
          day_selected:
            'bg-primary text-white hover:bg-primary hover:text-white focus:bg-primary focus:text-white',
          day_today: 'text-accent font-bold',
          day_outside: 'text-gray-300 opacity-50',
          day_disabled: 'text-gray-200 opacity-50',
          day_hidden: 'invisible',
          dropdown:
            'rdp-dropdown bg-transparent font-heading italic text-xl outline-none cursor-pointer hover:text-primary transition-colors appearance-none text-right',
          vhidden: 'sr-only',
          ...classNames,
        }}
        components={{
          Caption: (captionProps) => (
            <CalendarCaption
              {...captionProps}
              prevMonthLabel={prevMonthLabel}
              nextMonthLabel={nextMonthLabel}
            />
          ),
          Footer: () => (
            <CalendarFooter
              onSave={onSave}
              onClear={onClear}
              saveLabel={saveLabel}
              clearLabel={clearLabel}
            />
          ),
        }}
        onSelect={dayPickerProps.onSelect}
        selected={dayPickerProps.selected}
        {...dayPickerProps}
      />
    );
  },
);
Calendar.displayName = 'Calendar';

export { Calendar };
