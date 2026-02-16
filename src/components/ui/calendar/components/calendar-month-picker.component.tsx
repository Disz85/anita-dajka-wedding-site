import { useState, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { format, setMonth } from 'date-fns';
import { cn } from '@/lib/utils';
import { useClickOutside } from '@/hooks/use-click-outside/use-click-outside.hook';
import type { CalendarMonthPickerProps } from '../calendar.types';
import { yearPickerVariants, YEAR_PICKER_TRANSITION } from './calendar-year-picker.variants';

export const CalendarMonthPicker = memo(
  ({ currentMonth, onMonthChange, locale }: CalendarMonthPickerProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));
    const listId = 'month-picker-list';

    const months = useMemo(() => {
      return Array.from({ length: 12 }, (_, i) => {
        const date = setMonth(new Date(), i);
        try {
          return {
            index: i,
            name: format(date, 'MMMM', { locale }),
          };
        } catch {
          return {
            index: i,
            name: date.toLocaleString(locale?.code || 'hu', { month: 'long' }),
          };
        }
      });
    }, [locale]);

    const currentMonthName = months[currentMonth.getMonth()].name;

    return (
      <div ref={containerRef} className="relative z-50">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 group focus:outline-none cursor-pointer"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={listId}
        >
          <span className="font-nav text-2xl uppercase tracking-[0.2em] text-primary leading-none group-hover:opacity-80 transition-opacity">
            {currentMonthName}
          </span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={yearPickerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={YEAR_PICKER_TRANSITION}
              className="absolute top-full left-0 mt-2 min-w-[180px] bg-white border border-gray-100 shadow-xl overflow-hidden"
            >
              <ul
                id={listId}
                role="listbox"
                className="py-1 m-0 list-none max-h-[300px] overflow-y-auto"
              >
                {months.map((month) => (
                  <li key={month.index} role="none">
                    <button
                      type="button"
                      role="option"
                      aria-selected={currentMonth.getMonth() === month.index}
                      onClick={() => {
                        onMonthChange(month.index);
                        setIsOpen(false);
                      }}
                      className={cn(
                        'w-full text-left px-4 py-2 text-sm font-subtitle flex items-center justify-between hover:bg-gray-50 transition-colors uppercase tracking-wider',
                        currentMonth.getMonth() === month.index
                          ? 'text-primary font-medium'
                          : 'text-gray-500',
                      )}
                    >
                      {month.name}
                      {currentMonth.getMonth() === month.index && (
                        <Check size={12} className="ml-2" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  },
);
