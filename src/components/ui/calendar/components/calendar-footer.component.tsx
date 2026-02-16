import { memo } from 'react';
import { Button } from '@/components/ui/button/button.component';
import type { CalendarFooterProps } from '../calendar.types';

export const CalendarFooter = memo(
  ({ onSave, onClear, saveLabel, clearLabel }: CalendarFooterProps) => {
    return (
      <tfoot className="w-full">
        <tr>
          <td colSpan={7}>
            <div className="flex cursor-pointer flex-col gap-2">
              <div className="flex justify-between items-center gap-4 mt-4">
                <Button
                  variant="link"
                  size="none"
                  onClick={onClear}
                  className="text-primary hover:text-primary/80 transition-colors"
                  type="button"
                >
                  {clearLabel}
                </Button>

                <Button variant="primary" onClick={onSave} type="button">
                  {saveLabel}
                </Button>
              </div>
            </div>
          </td>
        </tr>
      </tfoot>
    );
  },
);
