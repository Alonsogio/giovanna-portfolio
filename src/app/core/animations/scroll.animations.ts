import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function revealOnScroll(
  element: HTMLElement,
  options?: {
    y?: number;
    duration?: number;
    delay?: number;
    start?: string;
  },
): gsap.core.Tween {
  const { y = 28, duration = 0.8, delay = 0, start = 'top 85%' } = options ?? {};

  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y,
    },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start,
        once: true,
      },
    },
  );
}

export function revealGroup(
  elements: HTMLElement[],
  options?: {
    y?: number;
    duration?: number;
    stagger?: number;
    start?: string;
  },
): gsap.core.Tween {
  const { y = 24, duration = 0.8, stagger = 0.08, start = 'top 85%' } = options ?? {};

  return gsap.fromTo(
    elements,
    {
      opacity: 0,
      y,
    },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: elements[0],
        start,
        once: true,
      },
    },
  );
}

export function subtleParallax(
  element: HTMLElement,
  options?: {
    y?: number;
    start?: string;
    end?: string;
  },
): gsap.core.Tween {
  const { y = -40, start = 'top bottom', end = 'bottom top' } = options ?? {};

  return gsap.to(element, {
    y,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start,
      end,
      scrub: 1.2,
    },
  });
}

export function cleanupScrollAnimations(element: HTMLElement): void {
  ScrollTrigger.getAll().forEach((trigger) => {
    if (trigger.trigger === element) {
      trigger.kill();
    }
  });
}
