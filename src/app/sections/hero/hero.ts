import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero implements AfterViewInit, OnDestroy {
  // =========================================================
  // ELEMENTS
  // =========================================================

  @ViewChild('heroSection', { static: true })
  heroSection!: ElementRef<HTMLElement>;

  @ViewChild('heroContent', { static: true })
  heroContent!: ElementRef<HTMLElement>;

  @ViewChild('heroVisual', { static: true })
  heroVisual!: ElementRef<HTMLElement>;

  // =========================================================
  // LIFECYCLE
  // =========================================================

  ngAfterViewInit(): void {
    this.initAnimations();
  }

  // =========================================================
  // GSAP — ANIMATIONS
  // =========================================================

  private initAnimations(): void {
    const section = this.heroSection.nativeElement;
    const content = this.heroContent.nativeElement;
    const visual = this.heroVisual.nativeElement;

    // =======================================================
    // INITIAL CONTENT
    // =======================================================

    gsap.from(content, {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.1,
      clearProps: 'transform,opacity',
    });

    // =======================================================
    // INITIAL VISUAL
    // =======================================================

    gsap.from(visual, {
      y: 16,
      opacity: 0,
      scale: 0.985,
      duration: 1,
      ease: 'power3.out',
      delay: 0.15,
      clearProps: 'transform,opacity',
    });

    // =======================================================
    // PREPARE TITLE
    // =======================================================

    const title = content.querySelector<HTMLElement>('h1');

    if (title) {
      this.prepareWords(title);

      this.animateWordsOnScroll(title, {
        start: 'top 82%',
        end: 'top 55%',
        y: 14,
      });
    }

    // =======================================================
    // PREPARE DESCRIPTION
    // =======================================================

    const description = content.querySelector<HTMLElement>('p.mt-7');

    if (description) {
      this.prepareWords(description);

      this.animateWordsOnScroll(description, {
        start: 'top 88%',
        end: 'top 65%',
        y: 10,
      });
    }

    // =======================================================
    // SCROLL — CONTENT
    // =======================================================

    gsap.to(content, {
      y: -70,

      ease: 'none',

      scrollTrigger: {
        trigger: section,

        start: 'top top',
        end: 'bottom top',

        scrub: 1.2,

        invalidateOnRefresh: true,
      },
    });

    // =======================================================
    // SCROLL — VISUAL
    // =======================================================

    gsap.to(visual, {
      y: -50,
      scale: 0.96,

      ease: 'none',

      scrollTrigger: {
        trigger: section,

        start: 'top top',
        end: 'bottom top',

        scrub: 1.4,

        invalidateOnRefresh: true,
      },
    });

    // =======================================================
    // REFRESH
    // =======================================================

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }

  // =========================================================
  // PREPARE WORDS
  // =========================================================

  private prepareWords(element: HTMLElement): void {
    if (element.dataset['wordsPrepared'] === 'true') {
      return;
    }

    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) => {
        if (!node.textContent?.trim()) {
          return NodeFilter.FILTER_REJECT;
        }

        return NodeFilter.FILTER_ACCEPT;
      },
    });

    const textNodes: Text[] = [];

    let currentNode: Node | null;

    while ((currentNode = walker.nextNode())) {
      textNodes.push(currentNode as Text);
    }

    textNodes.forEach((textNode) => {
      const text = textNode.textContent ?? '';

      const fragment = document.createDocumentFragment();

      const parts = text.split(/(\s+)/);

      parts.forEach((part) => {
        if (!part) {
          return;
        }

        // ===================================================
        // KEEP SPACES
        // ===================================================

        if (/^\s+$/.test(part)) {
          fragment.appendChild(document.createTextNode(part));

          return;
        }

        // ===================================================
        // WORD
        // ===================================================

        const span = document.createElement('span');

        span.className = element.tagName === 'H1' ? 'hero-content-word' : 'hero-description-word';

        span.textContent = part;

        fragment.appendChild(span);
      });

      textNode.parentNode?.replaceChild(fragment, textNode);
    });

    element.dataset['wordsPrepared'] = 'true';
  }

  // =========================================================
  // WORD SCROLL ANIMATION
  // =========================================================

  private animateWordsOnScroll(
    element: HTMLElement,
    options?: {
      start?: string;
      end?: string;
      y?: number;
    },
  ): void {
    const { start = 'top 82%', end = 'top 55%', y = 14 } = options ?? {};

    const words = Array.from(
      element.querySelectorAll<HTMLElement>('.hero-content-word, .hero-description-word'),
    );

    if (!words.length) {
      return;
    }

    // =======================================================
    // INITIAL WORD STATE
    // =======================================================

    gsap.set(words, {
      opacity: 0,
      y,
    });

    // =======================================================
    // WORD REVEAL
    // =======================================================

    gsap.to(words, {
      opacity: 1,
      y: 0,

      duration: 0.35,

      stagger: {
        each: 0.035,
      },

      ease: 'power2.out',

      scrollTrigger: {
        trigger: element,

        start,
        end,

        scrub: 0.25,

        /*
         * IMPORTANTE:
         *
         * Não usamos "once: false" com uma animação
         * que deixa o elemento permanentemente invisível.
         *
         * O estado final fica preservado depois da entrada.
         */
      },
    });
  }

  // =========================================================
  // DESTROY
  // =========================================================

  ngOnDestroy(): void {
    // =======================================================
    // KILL SCROLL TRIGGERS
    // =======================================================

    ScrollTrigger.getAll().forEach((trigger) => {
      trigger.kill();
    });

    // =======================================================
    // KILL TWEENS
    // =======================================================

    gsap.killTweensOf(this.heroContent.nativeElement);

    gsap.killTweensOf(this.heroVisual.nativeElement);
  }
}
