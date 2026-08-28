import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  revealGroup,
  revealOnScroll,
  subtleParallax,
  cleanupScrollAnimations,
} from '../../core/animations/scroll.animations';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements AfterViewInit, OnDestroy {
  // ==================================================
  // ELEMENT
  // ==================================================

  @ViewChild('aboutSection')
  aboutSection!: ElementRef<HTMLElement>;

  // ==================================================
  // STATS
  // ==================================================

  stats = [
    {
      value: 8,
      suffix: '+',
      label: 'Coffees consumed',
    },
    {
      value: 10,
      suffix: '+',
      label: 'Projects completed',
    },
    {
      value: 3,
      suffix: '+',
      label: 'Years coding',
    },
  ];

  // ==================================================
  // ANIMATED STATS
  // ==================================================

  animatedStats: number[] = [0, 0, 0];

  // ==================================================
  // INTERSECTION OBSERVER
  // ==================================================

  private observer?: IntersectionObserver;

  // ==================================================
  // COUNTER ANIMATION
  // ==================================================

  private animationFrame?: number;

  private hasAnimated = false;

  // ==================================================
  // GSAP ANIMATIONS
  // ==================================================

  private gsapAnimations: any[] = [];

  // ==================================================
  // CONSTRUCTOR
  // ==================================================

  constructor(private cdr: ChangeDetectorRef) {}

  // ==================================================
  // INIT
  // ==================================================

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.createObserver();
      this.createScrollAnimations();
    });
  }

  // ==================================================
  // GSAP — SCROLL ANIMATIONS
  // ==================================================

  private createScrollAnimations(): void {
    if (!this.aboutSection?.nativeElement) {
      return;
    }

    const section = this.aboutSection.nativeElement;

    // ==================================================
    // HEADER
    // ==================================================

    const header = section.querySelector('header');

    if (header) {
      this.gsapAnimations.push(
        revealOnScroll(header as HTMLElement, {
          y: 40,
          duration: 1,
          start: 'top 90%',
        }),
      );
    }

    // ==================================================
    // LEFT CONTENT
    // ==================================================

    const leftContent = section.querySelector('.about-left-content');

    if (leftContent) {
      this.gsapAnimations.push(
        revealOnScroll(leftContent as HTMLElement, {
          y: 35,
          duration: 1,
          start: 'top 85%',
        }),
      );
    }

    // ==================================================
    // RIGHT CONTENT
    // ==================================================

    const rightContent = section.querySelector('.about-right-content');

    if (rightContent) {
      this.gsapAnimations.push(
        revealOnScroll(rightContent as HTMLElement, {
          y: 35,
          duration: 1,
          delay: 0.1,
          start: 'top 85%',
        }),
      );
    }

    // ==================================================
    // 3D OBJECT
    // ==================================================

    const spline = section.querySelector('.about-spline');

    if (spline) {
      this.gsapAnimations.push(
        revealOnScroll(spline as HTMLElement, {
          y: 30,
          duration: 1.2,
          start: 'top 90%',
        }),
      );

      // ==================================================
      // 3D PARALLAX
      // ==================================================

      this.gsapAnimations.push(
        subtleParallax(spline as HTMLElement, {
          y: -25,
          start: 'top bottom',
          end: 'bottom top',
        }),
      );
    }

    // ==================================================
    // STATS
    // ==================================================

    const stats = Array.from(section.querySelectorAll('.about-stat')) as HTMLElement[];

    if (stats.length) {
      this.gsapAnimations.push(
        revealGroup(stats, {
          y: 25,
          duration: 0.8,
          stagger: 0.12,
          start: 'top 90%',
        }),
      );
    }

    // ==================================================
    // BOTTOM META
    // ==================================================

    const bottomMeta = section.querySelector('.about-bottom-meta');

    if (bottomMeta) {
      this.gsapAnimations.push(
        revealOnScroll(bottomMeta as HTMLElement, {
          y: 20,
          duration: 0.8,
          start: 'top 95%',
        }),
      );
    }
  }

  // ==================================================
  // INTERSECTION OBSERVER
  // ==================================================

  private createObserver(): void {
    if (!this.aboutSection?.nativeElement) {
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (!entry) {
          return;
        }

        // ==================================================
        // START COUNTER
        // ==================================================

        if (entry.isIntersecting && !this.hasAnimated) {
          this.hasAnimated = true;

          this.animateStats();

          this.observer?.disconnect();
        }
      },
      {
        /*
         * Começa quando aproximadamente 15% da
         * seção entra na viewport.
         */
        threshold: 0.15,
      },
    );

    this.observer.observe(this.aboutSection.nativeElement);
  }

  // ==================================================
  // ANIMATE STATS
  // ==================================================

  private animateStats(): void {
    const duration = 1400;

    const startTime = performance.now();

    const animate = (currentTime: number): void => {
      const elapsed = currentTime - startTime;

      const progress = Math.min(elapsed / duration, 1);

      // ==================================================
      // EASE OUT CUBIC
      // ==================================================

      const easedProgress = 1 - Math.pow(1 - progress, 3);

      // ==================================================
      // UPDATE VALUES
      // ==================================================

      this.animatedStats = this.stats.map((stat) => Math.floor(stat.value * easedProgress));

      this.cdr.detectChanges();

      // ==================================================
      // CONTINUE
      // ==================================================

      if (progress < 1) {
        this.animationFrame = requestAnimationFrame(animate);
      } else {
        // ==================================================
        // FINAL VALUES
        // ==================================================

        this.animatedStats = this.stats.map((stat) => stat.value);

        this.cdr.detectChanges();

        this.animationFrame = undefined;
      }
    };

    this.animationFrame = requestAnimationFrame(animate);
  }

  // ==================================================
  // DESTROY
  // ==================================================

  ngOnDestroy(): void {
    // ==================================================
    // INTERSECTION OBSERVER
    // ==================================================

    this.observer?.disconnect();

    // ==================================================
    // COUNTER
    // ==================================================

    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);

      this.animationFrame = undefined;
    }

    // ==================================================
    // GSAP SCROLL ANIMATIONS
    // ==================================================

    if (this.aboutSection?.nativeElement) {
      cleanupScrollAnimations(this.aboutSection.nativeElement);
    }
  }
}
