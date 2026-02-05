export type ScrollDirection = 'up' | 'down' | null;

export type UseScrollDirectionOptions = {
  threshold?: number;
  scrollThreshold?: number;
};

export type UseScrollDirectionResult = {
  scrollDirection: ScrollDirection;
  isScrolled: boolean;
  scrollY: number;
};
