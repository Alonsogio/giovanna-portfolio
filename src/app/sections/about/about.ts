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

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  revealGroup,
  revealOnScroll,
  subtleParallax,
  cleanupScrollAnimations,
} from '../../core/animations/scroll.animations';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements AfterViewInit, OnDestroy {
  // =========================================================
  // ELEMENT
  // =========================================================

  @ViewChild('aboutSection', { static: true })
  aboutSection!: ElementRef<HTMLElement>;

  // =========================================================
  // STATS
  // =========================================================

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

  // =========================================================
  // ANIMATED STATS
  // =========================================================

  animatedStats: number[] = [0, 0, 0];

  // =========================================================
  // COUNTER
  // =========================================================

  private animationFrame?: number;

  private hasAnimated = false;

  // =========================================================
  // GSAP ANIMATIONS
  // =========================================================

  private gsapAnimations: gsap.core.Animation[] = [];

  private scrollTriggers: ScrollTrigger[] = [];

  // =========================================================
  // CONSTRUCTOR
  // =========================================================

  constructor(private cdr: ChangeDetectorRef) {}

  // =========================================================
  // INIT
  // =========================================================

  ngAfterViewInit(): void {
    requestAnimationFrame(() => {
      this.createScrollAnimations();
      this.createStatsTrigger();

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    });
  }

  // =========================================================
  // GSAP — SCROLL ANIMATIONS
  // =========================================================

  private createScrollAnimations(): void {
    const section = this.aboutSection.nativeElement;

    // =======================================================
    // HEADER
    // =======================================================

    const header = section.querySelector('header');

    if (header instanceof HTMLElement) {
      this.gsapAnimations.push(
        revealOnScroll(header, {
          y: 35,
          duration: 0.75,
          start: 'top 88%',
        }),
      );
    }

    // =======================================================
    // TITLE
    // =======================================================

    const title = section.querySelector('.about-title');

    if (title instanceof HTMLElement) {
      gsap.set(title, {
        opacity: 0,
        y: 24,
      });

      const titleAnimation = gsap.to(title, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 88%',
          end: 'top 65%',
          scrub: 0.7,
        },
      });

      this.gsapAnimations.push(titleAnimation);
    }

    // =======================================================
    // LEFT CONTENT
    // =======================================================

    const leftContent = section.querySelector('.about-left-content');

    if (leftContent instanceof HTMLElement) {
      this.gsapAnimations.push(
        revealOnScroll(leftContent, {
          y: 30,
          duration: 0.8,
          start: 'top 86%',
        }),
      );
    }

    // =======================================================
    // RIGHT CONTENT
    // =======================================================

    const rightContent = section.querySelector('.about-right-content');

    if (rightContent instanceof HTMLElement) {
      this.gsapAnimations.push(
        revealOnScroll(rightContent, {
          y: 30,
          duration: 0.8,
          delay: 0.08,
          start: 'top 86%',
        }),
      );
    }

    // =======================================================
    // BODY TEXT
    // =======================================================

    const bodyText = Array.from(section.querySelectorAll('.about-body-text')).filter(
      (element): element is HTMLElement => element instanceof HTMLElement,
    );

    if (bodyText.length) {
      this.gsapAnimations.push(
        revealGroup(bodyText, {
          y: 20,
          duration: 0.65,
          stagger: 0.08,
          start: 'top 88%',
        }),
      );
    }

    // =======================================================
    // 3D OBJECT
    // =======================================================

    const spline = section.querySelector('.about-spline');

    if (spline instanceof HTMLElement) {
      // -------------------------------------------------------
      // REVEAL
      // -------------------------------------------------------

      this.gsapAnimations.push(
        revealOnScroll(spline, {
          y: 35,
          duration: 1,
          start: 'top 90%',
        }),
      );

      // -------------------------------------------------------
      // PARALLAX
      // -------------------------------------------------------

      this.gsapAnimations.push(
        subtleParallax(spline, {
          y: -28,
          start: 'top bottom',
          end: 'bottom top',
        }),
      );
    }

    // =======================================================
    // ORB GLOW PARALLAX
    // =======================================================

    const orbGlow = section.querySelector('.about-orb-glow');

    if (orbGlow instanceof HTMLElement) {
      this.gsapAnimations.push(
        subtleParallax(orbGlow, {
          y: -45,
          start: 'top bottom',
          end: 'bottom top',
        }),
      );
    }

    // =======================================================
    // BACKGROUND PURPLE GLOW
    // =======================================================

    const purpleGlow = section.querySelector('.about-purple-glow');

    if (purpleGlow instanceof HTMLElement) {
      this.gsapAnimations.push(
        subtleParallax(purpleGlow, {
          y: -55,
          start: 'top bottom',
          end: 'bottom top',
        }),
      );
    }

    // =======================================================
    // BACKGROUND BLUE GLOW
    // =======================================================

    const blueGlow = section.querySelector('.about-blue-glow');

    if (blueGlow instanceof HTMLElement) {
      this.gsapAnimations.push(
        subtleParallax(blueGlow, {
          y: -35,
          start: 'top bottom',
          end: 'bottom top',
        }),
      );
    }

    // =======================================================
    // ORBIT DOTS
    // =======================================================

    const orbitDots = Array.from(section.querySelectorAll('.about-orbit-dot')).filter(
      (element): element is HTMLElement => element instanceof HTMLElement,
    );

    orbitDots.forEach((dot, index) => {
      const animation = gsap.to(dot, {
        y: index % 2 === 0 ? -16 : 12,
        x: index % 2 === 0 ? 8 : -8,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      this.gsapAnimations.push(animation);
    });

    // =======================================================
    // STATS REVEAL
    // =======================================================

    const stats = Array.from(section.querySelectorAll('.about-stat')).filter(
      (element): element is HTMLElement => element instanceof HTMLElement,
    );

    if (stats.length) {
      this.gsapAnimations.push(
        revealGroup(stats, {
          y: 22,
          duration: 0.7,
          stagger: 0.1,
          start: 'top 90%',
        }),
      );
    }

    // =======================================================
    // BOTTOM META
    // =======================================================

    const bottomMeta = section.querySelector('.about-bottom-meta');

    if (bottomMeta instanceof HTMLElement) {
      this.gsapAnimations.push(
        revealOnScroll(bottomMeta, {
          y: 18,
          duration: 0.7,
          start: 'top 94%',
        }),
      );
    }

    // =======================================================
    // SECTION ATMOSPHERE PARALLAX
    // =======================================================

    const atmosphere = section.querySelector('.about-section-atmosphere');

    if (atmosphere instanceof HTMLElement) {
      this.gsapAnimations.push(
        subtleParallax(atmosphere, {
          y: -25,
          start: 'top bottom',
          end: 'bottom top',
        }),
      );
    }

    // =======================================================
    // FINAL REFRESH
    // =======================================================

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }

  // =========================================================
  // STATS — SCROLL TRIGGER
  // =========================================================

  // =========================================================
  // STATS — SCROLL TRIGGER
  // =========================================================

  private createStatsTrigger(): void {
    const section = this.aboutSection.nativeElement;

    const firstStat = section.querySelector('.about-stat');

    if (!(firstStat instanceof HTMLElement)) {
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: firstStat,
      start: 'top 80%',
      once: true,

      onEnter: () => {
        if (this.hasAnimated) {
          return;
        }

        this.hasAnimated = true;
        this.animateStats();
      },
    });

    this.scrollTriggers.push(trigger);
  }

  // =========================================================
  // ANIMATE STATS
  // =========================================================

  private animateStats(): void {
    const duration = 1400;

    const startTime = performance.now();

    const animate = (currentTime: number): void => {
      const elapsed = currentTime - startTime;

      const progress = Math.min(elapsed / duration, 1);

      // =====================================================
      // EASE OUT CUBIC
      // =====================================================

      const easedProgress = 1 - Math.pow(1 - progress, 3);

      // =====================================================
      // UPDATE VALUES
      // =====================================================

      this.animatedStats = this.stats.map((stat) => Math.floor(stat.value * easedProgress));

      this.cdr.detectChanges();

      // =====================================================
      // CONTINUE
      // =====================================================

      if (progress < 1) {
        this.animationFrame = requestAnimationFrame(animate);
      } else {
        this.animatedStats = this.stats.map((stat) => stat.value);

        this.cdr.detectChanges();

        this.animationFrame = undefined;
      }
    };

    this.animationFrame = requestAnimationFrame(animate);
  }

  // =========================================================
  // DESTROY
  // =========================================================

  ngOnDestroy(): void {
    // =======================================================
    // COUNTER
    // =======================================================

    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);

      this.animationFrame = undefined;
    }

    // =======================================================
    // GSAP ANIMATIONS
    // =======================================================

    this.gsapAnimations.forEach((animation) => {
      animation.kill();
    });

    this.gsapAnimations = [];

    // =======================================================
    // SCROLL TRIGGERS
    // =======================================================

    this.scrollTriggers.forEach((trigger) => {
      trigger.kill();
    });

    this.scrollTriggers = [];

    // =======================================================
    // CLEANUP
    // =======================================================

    if (this.aboutSection?.nativeElement) {
      cleanupScrollAnimations(this.aboutSection.nativeElement);
    }
  }
}
