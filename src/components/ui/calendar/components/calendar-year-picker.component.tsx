import { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useClickOutside } from '@/hooks/use-click-outside/use-click-outside.hook';
import type { CalendarYearPickerProps } from '../calendar.types';
import {
  yearPickerVariants,
  YEAR_PICKER_TRANSITION,
  chevronVariants,
  CHEVRON_TRANSITION,
} from './calendar-year-picker.variants';

export const CalendarYearPicker = memo(
  ({ currentYear, years, onYearChange }: CalendarYearPickerProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));
    const listId = 'year-picker-list';

    return (
      <div ref={containerRef} className="relative z-50">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1 font-subtitle text-sm text-primary cursor-pointer focus:outline-none"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={listId}
        >
          <span>{currentYear}</span>
          <motion.div
            variants={chevronVariants}
            animate={isOpen ? 'open' : 'closed'}
            transition={CHEVRON_TRANSITION}
          >
            <ChevronDown size={14} />
          </motion.div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={yearPickerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={YEAR_PICKER_TRANSITION}
              className="absolute top-full right-0 mt-2 min-w-[100px] bg-white border border-gray-100 shadow-xl overflow-hidden"
            >
              <ul
                id={listId}
                role="listbox"
                className="py-1 m-0 list-none max-h-[200px] overflow-y-auto"
              >
                {years.map((year) => (
                  <li key={year} role="none">
                    <button
                      type="button"
                      role="option"
                      aria-selected={currentYear === year}
                      onClick={() => {
                        onYearChange(year);
                        setIsOpen(false);
                      }}
                      className={cn(
                        'w-full text-left px-4 text-xl font-heading flex items-center justify-between hover:bg-gray-50 transition-colors',
                        currentYear === year ? 'text-primary font-medium' : 'text-gray-500',
                      )}
                    >
                      {year}
                      {currentYear === year && <Check size={12} className="ml-2" />}
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

CalendarYearPicker.displayName = 'CalendarYearPicker';
