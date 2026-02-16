import type { DayPickerSingleProps, CaptionProps } from 'react-day-picker';
import type { Locale } from 'date-fns';

export type CalendarProps = DayPickerSingleProps & {
  onSave?: () => void;
  onClear?: () => void;
  clearLabel?: string;
  saveLabel?: string;
  prevMonthLabel?: string;
  nextMonthLabel?: string;
};

export type CalendarYearPickerProps = {
  currentYear: number;
  years: number[];
  onYearChange: (year: number) => void;
};

export type CalendarMonthPickerProps = {
  currentMonth: Date;
  onMonthChange: (month: number) => void;
  locale?: Locale;
};

export type CalendarCaptionProps = CaptionProps & {
  prevMonthLabel?: string;
  nextMonthLabel?: string;
};

export type CalendarFooterProps = {
  onSave?: () => void;
  onClear?: () => void;
  saveLabel: string;
  clearLabel: string;
};

export type CalendarNavButtonProps = {
  onClick: () => void;
  direction: 'left' | 'right';
  label: string;
};
