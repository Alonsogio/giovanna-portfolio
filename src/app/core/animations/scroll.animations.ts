import { gsap } from 'gsap';

import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   REVEAL ON SCROLL
   ========================================================= */

export function revealOnScroll(
  element: HTMLElement,
  options?: {
    y?: number;
    duration?: number;
    delay?: number;
    start?: string;
    end?: string;
    scrub?: boolean | number;
  },
): gsap.core.Tween {
  const {
    y = 28,
    duration = 0.8,
    delay = 0,
    start = 'top 85%',
    end = 'top 45%',
    scrub = 0.8,
  } = options ?? {};

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
        end,

        scrub,

        toggleActions: 'play none none reverse',
      },
    },
  );
}

/* =========================================================
   REVEAL GROUP
   ========================================================= */

export function revealGroup(
  elements: HTMLElement[],
  options?: {
    y?: number;
    duration?: number;
    stagger?: number;
    start?: string;
    end?: string;
    scrub?: boolean | number;
  },
): gsap.core.Tween {
  const {
    y = 24,
    duration = 0.8,
    stagger = 0.08,
    start = 'top 85%',
    end = 'top 45%',
    scrub = 0.8,
  } = options ?? {};

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
        end,

        scrub,

        toggleActions: 'play none none reverse',
      },
    },
  );
}

/* =========================================================
   SUBTLE PARALLAX
   ========================================================= */

export function subtleParallax(
  element: HTMLElement,
  options?: {
    y?: number;
    start?: string;
    end?: string;
    scrub?: number;
  },
): gsap.core.Tween {
  const { y = -40, start = 'top bottom', end = 'bottom top', scrub = 1.2 } = options ?? {};

  return gsap.to(element, {
    y,

    ease: 'none',

    scrollTrigger: {
      trigger: element,

      start,
      end,

      scrub,
    },
  });
}

/* =========================================================
   WAVE PARALLAX
   ========================================================= */

export function waveParallax(
  element: HTMLElement,
  options?: {
    y?: number;
    start?: string;
    end?: string;
    scrub?: number;
  },
): gsap.core.Tween {
  const { y = -80, start = 'top bottom', end = 'bottom top', scrub = 1 } = options ?? {};

  return gsap.fromTo(
    element,

    {
      y: 0,
    },

    {
      y,

      ease: 'none',

      scrollTrigger: {
        trigger: element,

        start,
        end,

        scrub,
      },
    },
  );
}

/* =========================================================
   TEXT REVEAL — WORD BY WORD
   ========================================================= */

export function revealWords(
  element: HTMLElement,
  options?: {
    start?: string;
    end?: string;
    y?: number;
    stagger?: number;
  },
): gsap.core.Timeline {
  const { start = 'top 82%', end = 'top 45%', y = 22, stagger = 0.035 } = options ?? {};

  const originalText = element.textContent?.trim() ?? '';

  if (!originalText) {
    return gsap.timeline();
  }

  /*
   * Guarda o texto original para não duplicar
   * as palavras caso a função seja chamada novamente.
   */

  if (!element.dataset['wordsPrepared']) {
    const words = originalText.split(/\s+/);

    element.innerHTML = words.map((word) => `<span class="work-word">${word}</span>`).join(' ');

    element.dataset['wordsPrepared'] = 'true';
  }

  const words = Array.from(element.querySelectorAll('.work-word')) as HTMLElement[];

  gsap.set(words, {
    opacity: 0,
    y,
  });

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: element,

      start,
      end,

      scrub: 0.7,
    },
  });

  timeline.to(words, {
    opacity: 1,
    y: 0,

    stagger,

    ease: 'power2.out',

    duration: 0.35,
  });

  return timeline;
}

/* =========================================================
   CLEANUP
   ========================================================= */

export function cleanupScrollAnimations(element?: HTMLElement): void {
  if (!element) {
    ScrollTrigger.getAll().forEach((trigger) => {
      trigger.kill();
    });

    return;
  }

  ScrollTrigger.getAll().forEach((trigger) => {
    if (trigger.trigger === element) {
      trigger.kill();
    }
  });
}
