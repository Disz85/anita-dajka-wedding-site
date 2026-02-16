import { useState } from 'react';
import { format } from 'date-fns';
import { hu, enUS } from 'date-fns/locale';
import { useTranslations } from 'next-intl';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar/calendar.component';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover/popover.component';
import { errorClasses } from '../form.styles';
import { DatePickerProps } from './date-picker.types';

export function DatePicker({
  value,
  onChange,
  label,
  error,
  disabled,
  required,
  fromYear = new Date().getFullYear(),
  toYear = new Date().getFullYear() + 10,
  className,
  locale = 'hu',
}: DatePickerProps) {
  const date = value ? new Date(value) : undefined;
  const currentLocale = locale === 'hu' ? hu : enUS;
  const t = useTranslations('contact');
  const [isOpen, setIsOpen] = useState(false);

  const handleClear = () => {
    onChange?.(undefined);
  };

  const handleSave = () => {
    setIsOpen(false);
  };

  return (
    <div className={cn('group relative z-0 w-full mb-5', className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            className={cn(
              'peer block w-full text-left appearance-none border-0 border-b border-gray-300 bg-transparent px-0 py-2.5 font-heading text-base font-light italic leading-normal text-primary focus:border-black focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-black disabled:opacity-50 disabled:cursor-not-allowed',
              !date && 'text-transparent',
              error && 'border-red-500 focus:border-red-500',
            )}
          >
            {date ? (
              format(date, 'PPP', { locale: currentLocale })
            ) : (
              <span>{t('form.pickDatePlaceholder')}</span>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(selectedDate: Date | undefined) => {
              onChange?.(selectedDate ? format(selectedDate, 'yyyy-MM-dd') : undefined);
            }}
            initialFocus
            captionLayout="dropdown-buttons"
            fromYear={fromYear}
            toYear={toYear}
            locale={currentLocale}
            labels={{
              labelMonthDropdown: () => `${t('form.calendar.month')}:`,
              labelYearDropdown: () => `${t('form.calendar.year')}:`,
            }}
            clearLabel={t('form.calendar.clear')}
            saveLabel={t('form.calendar.save')}
            prevMonthLabel={t('form.calendar.prevMonth')}
            nextMonthLabel={t('form.calendar.nextMonth')}
            onClear={handleClear}
            onSave={handleSave}
            disabled={(date: Date) => date < new Date('1900-01-01')}
          />
        </PopoverContent>
      </Popover>

      <label
        className={cn(
          'absolute top-3 -z-10 origin-left transform font-heading text-base font-light italic leading-normal text-gray-500 duration-300 pointer-events-none',
          'peer-data-[state=open]:-translate-y-6 peer-data-[state=open]:scale-75 peer-data-[state=open]:font-medium peer-data-[state=open]:text-primary',
          value ? '-translate-y-6 scale-75 font-medium text-primary' : 'translate-y-0 scale-100',
          error && 'text-red-500 peer-data-[state=open]:text-red-500',
        )}
      >
        {label} {required && <span className="text-accent ml-1">*</span>}
      </label>

      <CalendarIcon
        className={cn(
          'pointer-events-none absolute right-0 bottom-3 h-5 w-5',
          value ? 'text-primary' : 'text-gray-400',
        )}
        strokeWidth={1.5}
      />

      {error && <p className={errorClasses}>{error.message}</p>}
    </div>
  );
}
