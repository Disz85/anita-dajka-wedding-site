import { describe, expect, test } from 'bun:test';
import { cn } from './utils';

describe('utils', () => {
  test('cn merges classes correctly', () => {
    // Normal merge
    expect(cn('w-full', 'h-full')).toBe('w-full h-full');

    // Tailwind conflict resolution (last wins)
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');

    // Conditional classes
    expect(cn('p-4', true && 'm-4', false && 'border')).toBe('p-4 m-4');
  });
});
