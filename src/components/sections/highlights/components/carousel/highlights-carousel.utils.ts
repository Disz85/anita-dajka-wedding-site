import { EmblaCarouselType } from 'embla-carousel';
import { TWEEN_FACTORS, PARALLAX_FACTORS } from './highlights-carousel.config';
import { readOrientation } from '@/utils/dom-utils';
import { EmblaEngine, TweenContext } from './highlights-carousel.types';

/**
 * Service class for handling Embla Carousel scale/tween animations.
 * Centralizes animation logic for better maintainability and organization.
 * Follows SRP by separating calculation, application, and orchestration logic.
 */
export class HighlightsTweenService {
  /**
   * Orchestrates the tweening for all slides in the carousel.
   * Flattens the nested iteration logic for better readability.
   */
  static tweenSlides(emblaApi: EmblaCarouselType, context: TweenContext): void {
    const { engine } = context;

    emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      const slideIndexes = engine.slideRegistry[snapIndex] ?? [];
      this.tweenSnap(emblaApi, scrollSnap, slideIndexes, context);
    });
  }

  /**
   * Processes all slides within a single scroll snap.
   */
  private static tweenSnap(
    emblaApi: EmblaCarouselType,
    scrollSnap: number,
    slideIndexes: number[],
    context: TweenContext,
  ): void {
    slideIndexes.forEach((slideIndex) =>
      this.tweenSingleSlide(emblaApi, slideIndex, scrollSnap, context),
    );
  }

  /**
   * Applies the tween effect to a single slide if it shouldn't be skipped.
   */
  private static tweenSingleSlide(
    emblaApi: EmblaCarouselType,
    slideIndex: number,
    scrollSnap: number,
    context: TweenContext,
  ): void {
    if (this.shouldSkipSlide(slideIndex, context)) {
      return;
    }

    const diffToTarget = this.calculateLoopDiff(slideIndex, scrollSnap, context);
    this.applySlideScale(emblaApi, slideIndex, diffToTarget);
    this.applySlideParallax(emblaApi, slideIndex, diffToTarget);
  }

  /**
   * Checks if a slide should be skipped (e.g., if it's not in view during scroll).
   */
  private static shouldSkipSlide(slideIndex: number, context: TweenContext): boolean {
    const { slidesInView, isScrollEvent } = context;
    return isScrollEvent && !slidesInView.includes(slideIndex);
  }

  /**
   * Calculates the distance difference to target snap, accounting for looping.
   */
  private static calculateLoopDiff(
    slideIndex: number,
    scrollSnap: number,
    context: TweenContext,
  ): number {
    const { engine, scrollProgress } = context;
    const diffToTarget = scrollSnap - scrollProgress;

    if (!engine.options.loop) {
      return diffToTarget;
    }

    return this.adjustDiffForLoop(engine, slideIndex, scrollSnap, scrollProgress, diffToTarget);
  }

  /**
   * Adjusts the distance difference based on Embla's loop point mapping.
   * Uses 'find' and early returns to avoid deep nesting and unnecessary iterations.
   */
  private static adjustDiffForLoop(
    engine: EmblaEngine,
    slideIndex: number,
    scrollSnap: number,
    scrollProgress: number,
    initialDiff: number,
  ): number {
    const loopPoint = engine.slideLooper.loopPoints.find(
      (point) => point.index === slideIndex && point.target() !== 0,
    );

    if (loopPoint === undefined) {
      return initialDiff;
    }

    const sign = Math.sign(loopPoint.target());

    if (sign === -1) {
      return scrollSnap - (1 + scrollProgress);
    }

    if (sign === 1) {
      return scrollSnap + (1 - scrollProgress);
    }

    return initialDiff;
  }

  /**
   * Calculates and applies the scale transform to a specific slide element.
   */
  private static applySlideScale(
    emblaApi: EmblaCarouselType,
    slideIndex: number,
    diffToTarget: number,
  ): void {
    const slideNode = emblaApi.slideNodes()[slideIndex];
    // Get orientation from data attribute (set by HighlightsSlide component)
    const orientation = readOrientation(slideNode?.dataset);
    const scaleValue = this.calculateScaleValue(diffToTarget, orientation);
    this.setTransformScale(emblaApi, slideIndex, scaleValue);
  }

  /**
   * Applies the parallax transform to the image element within a slide.
   */
  private static applySlideParallax(
    emblaApi: EmblaCarouselType,
    slideIndex: number,
    diffToTarget: number,
  ): void {
    const slideNode = emblaApi.slideNodes()[slideIndex];
    // Get orientation from data attribute
    const orientation = readOrientation(slideNode?.dataset);

    // Use orientation-specific parallax factor
    const parallaxFactor = orientation ? PARALLAX_FACTORS[orientation] : PARALLAX_FACTORS.portrait;

    const parallaxValue = diffToTarget * parallaxFactor * 100 * -1;
    const imageNode = slideNode?.querySelector('.embla__parallax__img');

    if (imageNode instanceof HTMLElement) {
      imageNode.style.transform = `translate3d(${parallaxValue}%, 0, 0)`;
    }
  }

  /**
   * Computes the scale factor (0 to 1) based on distance to center and orientation.
   */
  private static calculateScaleValue(
    diffToTarget: number,
    orientation?: 'portrait' | 'landscape',
  ): number {
    const tweenFactor = orientation ? TWEEN_FACTORS[orientation] : TWEEN_FACTORS.portrait;
    const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor);
    return Math.min(Math.max(tweenValue, 0), 1);
  }

  /**
   * Updates the DOM to apply the transition.
   */
  private static setTransformScale(
    emblaApi: EmblaCarouselType,
    slideIndex: number,
    scale: number,
  ): void {
    const slideNode = emblaApi.slideNodes()[slideIndex];
    const innerNode = slideNode?.querySelector('.embla__slide__inner');

    if (innerNode instanceof HTMLElement) {
      innerNode.style.transform = `scale(${scale})`;
    }
  }
}
