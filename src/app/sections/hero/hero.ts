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

      duration: 0.8,

      ease: 'power3.out',

      delay: 0.1,

      clearProps: 'transform',
    });

    // =======================================================
    // INITIAL VISUAL
    // =======================================================

    gsap.from(visual, {
      y: 16,

      scale: 0.985,

      duration: 1,

      ease: 'power3.out',

      delay: 0.15,

      clearProps: 'transform',
    });

    // =======================================================
    // SCROLL — CONTENT
    // =======================================================

    gsap.to(content, {
      y: -70,

      opacity: 0.45,

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
  // DESTROY
  // =========================================================

  ngOnDestroy(): void {
    // =======================================================
    // KILL GSAP
    // =======================================================

    ScrollTrigger.getAll().forEach((trigger) => {
      trigger.kill();
    });

    // =======================================================
    // KILL GSAP TWEENS
    // =======================================================

    gsap.killTweensOf(this.heroContent.nativeElement);

    gsap.killTweensOf(this.heroVisual.nativeElement);
  }
}
