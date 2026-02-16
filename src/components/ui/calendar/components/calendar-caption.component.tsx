import { useMemo, memo } from 'react';
import { useNavigation, useDayPicker } from 'react-day-picker';
import { getYear, setYear, subMonths, addMonths, setMonth } from 'date-fns';
import { CalendarYearPicker } from './calendar-year-picker.component';
import { CalendarMonthPicker } from './calendar-month-picker.component';
import { CalendarNavButton } from './calendar-nav-button.component';
import type { CalendarCaptionProps } from '../calendar.types';

export const CalendarCaption = memo(
  ({
    displayMonth,
    id,
    prevMonthLabel = 'Previous Month',
    nextMonthLabel = 'Next Month',
  }: CalendarCaptionProps) => {
    const { goToMonth } = useNavigation();
    const { locale, fromYear, toYear } = useDayPicker();

    const currentYear = getYear(displayMonth);

    const years = useMemo(() => {
      const startYear = fromYear || new Date().getFullYear();
      const endYear = toYear || startYear + 10;
      return Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);
    }, [fromYear, toYear]);

    const handleYearChange = (newYear: number) => {
      goToMonth(setYear(displayMonth, newYear));
    };

    const handleMonthChange = (newMonth: number) => {
      goToMonth(setMonth(displayMonth, newMonth));
    };

    return (
      <div className="flex flex-col mb-4 gap-4" id={id}>
        <div className="flex relative px-0 min-h-8 items-end justify-between">
          <CalendarMonthPicker
            currentMonth={displayMonth}
            onMonthChange={handleMonthChange}
            locale={locale}
          />
          <div>
            <CalendarYearPicker
              currentYear={currentYear}
              years={years}
              onYearChange={handleYearChange}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <CalendarNavButton
            direction="left"
            onClick={() => goToMonth(subMonths(displayMonth, 1))}
            label={prevMonthLabel}
          />

          <CalendarNavButton
            direction="right"
            onClick={() => goToMonth(addMonths(displayMonth, 1))}
            label={nextMonthLabel}
          />
        </div>
      </div>
    );
  },
);
