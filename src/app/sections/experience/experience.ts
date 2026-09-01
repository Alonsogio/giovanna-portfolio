import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [],
  templateUrl: './experience.html',
  styleUrl: './experience.css',
})
export class Experience implements AfterViewInit, OnDestroy {
  @ViewChild('experienceSection', { static: true })
  experienceSection!: ElementRef<HTMLElement>;

  private ctx?: gsap.Context;

  ngAfterViewInit(): void {
    this.initExperienceAnimation();
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }

  private initExperienceAnimation(): void {
    const section = this.experienceSection?.nativeElement;

    if (!section) {
      return;
    }

    this.ctx = gsap.context(() => {
      const steps = gsap.utils.toArray<HTMLElement>('.experience-step');

      const progressFill = section.querySelector<HTMLElement>('.experience-progress-fill');

      const counterCurrent = section.querySelector<HTMLElement>('.experience-counter-current');

      const backgroundWord = section.querySelector<HTMLElement>('.experience-background-word');

      const orbs = gsap.utils.toArray<HTMLElement>('.experience-orb');

      const label = section.querySelector<HTMLElement>('.experience-label');

      const words = gsap.utils.toArray<HTMLElement>('.experience-word');

      const intro = section.querySelector<HTMLElement>('.experience-intro');

      const bottom = section.querySelector<HTMLElement>('.experience-bottom');

      /*
       * =========================================================
       * REDUCED MOTION
       * =========================================================
       */

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        gsap.set([label, ...words, intro, ...steps, bottom].filter(Boolean), {
          opacity: 1,
          y: 0,
          x: 0,
        });

        if (progressFill) {
          gsap.set(progressFill, {
            height: '100%',
          });
        }

        return;
      }

      /*
       * =========================================================
       * INITIAL STATE
       * =========================================================
       */

      gsap.set(label, {
        opacity: 0,
        y: 18,
      });

      gsap.set(words, {
        opacity: 0,
        y: 28,
      });

      gsap.set(intro, {
        opacity: 0,
        y: 22,
      });

      gsap.set(steps, {
        opacity: 0.28,
        x: 0,
      });

      gsap.set(bottom, {
        opacity: 0,
        y: 18,
      });

      if (progressFill) {
        gsap.set(progressFill, {
          height: '0%',
        });
      }

      /*
       * =========================================================
       * SECTION INTRO
       * =========================================================
       */

      const introTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 78%',
          once: true,
        },
      });

      introTimeline
        .to(label, {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: 'power3.out',
        })
        .to(
          words,
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.07,
            ease: 'power3.out',
          },
          '-=0.38',
        )
        .to(
          intro,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
          },
          '-=0.38',
        );

      /*
       * =========================================================
       * PROCESS PROGRESS
       * =========================================================
       */

      if (progressFill) {
        gsap.to(progressFill, {
          height: '100%',
          ease: 'none',

          scrollTrigger: {
            trigger: '.experience-process',
            start: 'top 58%',
            end: 'bottom 58%',
            scrub: 0.4,
          },
        });
      }

      /*
       * =========================================================
       * STEP REVEAL
       * =========================================================
       */

      steps.forEach((step, index) => {
        const number = step.querySelector<HTMLElement>('.experience-step-number');

        const content = step.querySelector<HTMLElement>('.experience-step-content');

        gsap.fromTo(
          step,
          {
            opacity: 0.28,
            x: -8,
          },
          {
            opacity: 1,
            x: 5,
            duration: 0.7,
            ease: 'power3.out',

            scrollTrigger: {
              trigger: step,
              start: 'top 68%',
              end: 'top 42%',
              scrub: 0.5,

              onEnter: () => {
                this.activateStep(steps, step, counterCurrent, index);
              },

              onEnterBack: () => {
                this.activateStep(steps, step, counterCurrent, index);
              },
            },
          },
        );

        /*
         * Pequeno movimento interno do conteúdo.
         */

        if (content) {
          gsap.fromTo(
            content,
            {
              y: 20,
              opacity: 0.45,
            },
            {
              y: 0,
              opacity: 1,
              ease: 'power2.out',

              scrollTrigger: {
                trigger: step,
                start: 'top 72%',
                end: 'top 45%',
                scrub: 0.5,
              },
            },
          );
        }

        /*
         * Movimento sutil do número.
         */

        if (number) {
          gsap.fromTo(
            number,
            {
              y: 8,
              opacity: 0.55,
            },
            {
              y: 0,
              opacity: 1,
              ease: 'power2.out',

              scrollTrigger: {
                trigger: step,
                start: 'top 70%',
                end: 'top 45%',
                scrub: 0.5,
              },
            },
          );
        }
      });

      /*
       * =========================================================
       * BACKGROUND PARALLAX
       * =========================================================
       */

      if (backgroundWord) {
        gsap.to(backgroundWord, {
          y: -80,
          ease: 'none',

          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      /*
       * =========================================================
       * ORB PARALLAX
       * =========================================================
       */

      if (orbs.length) {
        orbs.forEach((orb, index) => {
          gsap.to(orb, {
            y: index === 0 ? -45 : -30,
            ease: 'none',

            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          });
        });
      }

      /*
       * =========================================================
       * BOTTOM NOTE
       * =========================================================
       */

      gsap.to(bottom, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',

        scrollTrigger: {
          trigger: bottom,
          start: 'top 82%',
          once: true,
        },
      });

      /*
       * =========================================================
       * REFRESH
       * =========================================================
       */

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, section);
  }

  /*
   * ===========================================================
   * ACTIVE STEP
   * ===========================================================
   */

  private activateStep(
    steps: HTMLElement[],
    activeStep: HTMLElement,
    counterCurrent: HTMLElement | null,
    index: number,
  ): void {
    steps.forEach((step) => {
      step.classList.remove('is-active');
    });

    activeStep.classList.add('is-active');

    if (counterCurrent) {
      counterCurrent.textContent = String(index + 1).padStart(2, '0');

      gsap.fromTo(
        counterCurrent,
        {
          opacity: 0.35,
          y: 4,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
        },
      );
    }
  }
}
