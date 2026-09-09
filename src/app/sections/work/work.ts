import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

import { CommonModule } from '@angular/common';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { LanguageService } from '../../core/services/language.service';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './work.html',
  styleUrl: './work.css',
})
export class Work implements AfterViewInit, OnDestroy {
  // ==================================================
  // SECTION
  // ==================================================

  @ViewChild('workSection', { static: true })
  workSection!: ElementRef<HTMLElement>;

  // ==================================================
  // PROJECTS
  // ==================================================

  projects = [
    {
      number: '01',
      category: 'Web / Portfolio',
      year: '2026',
      tags: ['Angular', 'TypeScript', 'Tailwind CSS', 'GSAP'],
      image: '/images/work/portfolio.png',
    },
    {
      number: '02',
      category: 'Web / Experience',
      year: '2026',
      tags: ['HTML', 'CSS', 'JavaScript'],
      image: '/images/work/sweetcake.png',
    },
  ];

  // ==================================================
  // GSAP CONTEXT
  // ==================================================

  private ctx?: gsap.Context;

  // ==================================================
  // CONSTRUCTOR
  // ==================================================

  constructor(public languageService: LanguageService) {}

  // ==================================================
  // INIT
  // ==================================================

  ngAfterViewInit(): void {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.createAnimations();
      });
    });
  }

  // ==================================================
  // CREATE ALL ANIMATIONS
  // ==================================================

  private createAnimations(): void {
    if (!this.workSection?.nativeElement) {
      return;
    }

    const section = this.workSection.nativeElement;

    this.ctx = gsap.context(() => {
      this.createScrollAnimations(section);

      ScrollTrigger.refresh();
    }, section);
  }

  // ==================================================
  // SCROLL ANIMATIONS
  // ==================================================

  private createScrollAnimations(section: HTMLElement): void {
    // ==================================================
    // HEADER
    // ==================================================

    const header = section.querySelector('.work-header');

    if (header) {
      gsap.fromTo(
        header,
        {
          opacity: 0,
          y: 70,
        },
        {
          opacity: 1,
          y: 0,
          ease: 'none',

          scrollTrigger: {
            trigger: header,
            start: 'top 95%',
            end: 'top 45%',
            scrub: 1,
          },
        },
      );
    }

    // ==================================================
    // HEADER LINE
    // ==================================================

    const headerLine = section.querySelector('.work-header-line');

    if (headerLine) {
      gsap.fromTo(
        headerLine,
        {
          scaleX: 0,
          transformOrigin: 'left center',
        },
        {
          scaleX: 1,
          ease: 'none',

          scrollTrigger: {
            trigger: headerLine,
            start: 'top 92%',
            end: 'top 55%',
            scrub: 1,
          },
        },
      );
    }

    // ==================================================
    // INTRO
    // ==================================================

    const intro = section.querySelector('.work-intro');

    if (intro) {
      gsap.fromTo(
        intro,
        {
          opacity: 0,
          y: 35,
        },
        {
          opacity: 1,
          y: 0,
          ease: 'none',

          scrollTrigger: {
            trigger: intro,
            start: 'top 90%',
            end: 'top 55%',
            scrub: 1,
          },
        },
      );
    }

    // ==================================================
    // VIEW ALL BUTTON
    // ==================================================

    const button = section.querySelector('.work-projects-button');

    if (button) {
      gsap.fromTo(
        button,
        {
          opacity: 0,
          y: 35,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: 'none',

          scrollTrigger: {
            trigger: button,
            start: 'top 90%',
            end: 'top 55%',
            scrub: 1,
          },
        },
      );
    }

    // ==================================================
    // CORNER ORBITS ENTRANCE
    // ==================================================

    const cornerOrbits = section.querySelector('.work-corner-orbits');

    if (cornerOrbits) {
      gsap.fromTo(
        cornerOrbits,
        {
          opacity: 0,
          scale: 0.94,
        },
        {
          opacity: 1,
          scale: 1,
          ease: 'none',

          scrollTrigger: {
            trigger: cornerOrbits,
            start: 'top 95%',
            end: 'top 60%',
            scrub: 1,
          },
        },
      );
    }

    // ==================================================
    // PROJECTS
    // ==================================================

    const projects = Array.from(section.querySelectorAll('.work-project')) as HTMLElement[];

    projects.forEach((project, index) => {
      const visual = project.querySelector('.work-project-visual') as HTMLElement | null;

      const info = project.querySelector('.work-project-info') as HTMLElement | null;

      const number = project.querySelector('.work-project-number') as HTMLElement | null;

      const title = project.querySelector('.work-project-title') as HTMLElement | null;

      const technologies = project.querySelector(
        '.work-project-technologies',
      ) as HTMLElement | null;

      const description = project.querySelector('.work-project-description') as HTMLElement | null;

      const caseLink = project.querySelector('.work-case-link') as HTMLElement | null;

      // ==================================================
      // PROJECT VISUAL
      // ==================================================

      if (visual) {
        gsap.fromTo(
          visual,
          {
            opacity: 0,
            y: 100,
            scale: 0.92,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: 'none',

            scrollTrigger: {
              trigger: project,
              start: 'top 92%',
              end: 'top 35%',
              scrub: 1.2,
            },
          },
        );
      }

      // ==================================================
      // PROJECT INFO
      // ==================================================

      if (info) {
        gsap.fromTo(
          info,
          {
            opacity: 0,
            x: index % 2 === 0 ? 70 : -70,
          },
          {
            opacity: 1,
            x: 0,
            ease: 'none',

            scrollTrigger: {
              trigger: project,
              start: 'top 82%',
              end: 'top 38%',
              scrub: 1,
            },
          },
        );
      }

      // ==================================================
      // PROJECT NUMBER
      // ==================================================

      if (number) {
        gsap.fromTo(
          number,
          {
            opacity: 0,
            y: 25,
          },
          {
            opacity: 1,
            y: 0,
            ease: 'none',

            scrollTrigger: {
              trigger: project,
              start: 'top 78%',
              end: 'top 48%',
              scrub: 1,
            },
          },
        );
      }

      // ==================================================
      // PROJECT TITLE
      // ==================================================

      if (title) {
        gsap.fromTo(
          title,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            ease: 'none',

            scrollTrigger: {
              trigger: project,
              start: 'top 74%',
              end: 'top 43%',
              scrub: 1,
            },
          },
        );
      }

      // ==================================================
      // TECHNOLOGIES
      // ==================================================

      if (technologies) {
        gsap.fromTo(
          technologies,
          {
            opacity: 0,
            y: 25,
          },
          {
            opacity: 1,
            y: 0,
            ease: 'none',

            scrollTrigger: {
              trigger: project,
              start: 'top 70%',
              end: 'top 40%',
              scrub: 1,
            },
          },
        );
      }

      // ==================================================
      // DESCRIPTION
      // ==================================================

      if (description) {
        gsap.fromTo(
          description,
          {
            opacity: 0,
            y: 25,
          },
          {
            opacity: 1,
            y: 0,
            ease: 'none',

            scrollTrigger: {
              trigger: project,
              start: 'top 66%',
              end: 'top 38%',
              scrub: 1,
            },
          },
        );
      }

      // ==================================================
      // CASE LINK
      // ==================================================

      if (caseLink) {
        gsap.fromTo(
          caseLink,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            ease: 'none',

            scrollTrigger: {
              trigger: project,
              start: 'top 62%',
              end: 'top 36%',
              scrub: 1,
            },
          },
        );
      }

      // ==================================================
      // VISUAL PARALLAX
      // ==================================================

      if (visual) {
        gsap.to(visual, {
          yPercent: -5,
          ease: 'none',

          scrollTrigger: {
            trigger: project,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }
    });

    // ==================================================
    // DIVIDERS
    // ==================================================

    const dividers = Array.from(section.querySelectorAll('.work-project-divider')) as HTMLElement[];

    dividers.forEach((divider) => {
      gsap.fromTo(
        divider,
        {
          scaleX: 0,
          transformOrigin: 'left center',
        },
        {
          scaleX: 1,
          ease: 'none',

          scrollTrigger: {
            trigger: divider,
            start: 'top 90%',
            end: 'top 55%',
            scrub: 1,
          },
        },
      );
    });

    // ==================================================
    // BOTTOM
    // ==================================================

    const bottom = section.querySelector('.work-bottom');

    if (bottom) {
      gsap.fromTo(
        bottom,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          ease: 'none',

          scrollTrigger: {
            trigger: bottom,
            start: 'top 92%',
            end: 'top 55%',
            scrub: 1,
          },
        },
      );
    }
  }

  // ==================================================
  // DESTROY
  // ==================================================

  ngOnDestroy(): void {
    this.ctx?.revert();

    ScrollTrigger.getAll().forEach((trigger) => {
      const triggerElement = trigger.trigger;

      if (
        triggerElement instanceof HTMLElement &&
        this.workSection?.nativeElement.contains(triggerElement)
      ) {
        trigger.kill();
      }
    });

    ScrollTrigger.refresh();
  }
}
