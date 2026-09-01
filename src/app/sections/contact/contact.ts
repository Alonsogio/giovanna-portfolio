import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements AfterViewInit, OnDestroy {
  @ViewChild('contactSection')
  contactSection!: ElementRef<HTMLElement>;

  @ViewChild('contactContent')
  contactContent!: ElementRef<HTMLElement>;

  private ctx?: gsap.Context;

  ngAfterViewInit(): void {
    this.initAnimations();
  }

  private initAnimations(): void {
    const section = this.contactSection.nativeElement;
    const content = this.contactContent.nativeElement;

    this.ctx = gsap.context(() => {
      /*
       * =========================================================
       * ELEMENTS
       * =========================================================
       */

      const label = content.querySelector('.contact-label');
      const headerLine = content.querySelector('.contact-header-line');

      const words = content.querySelectorAll('.contact-word');
      const intro = content.querySelector('.contact-intro');

      const contactLinks = content.querySelectorAll('.contact-link');
      const availability = content.querySelector('.contact-availability');
      const bottom = content.querySelector('.contact-bottom');

      const purpleOrb = section.querySelector('.contact-orb--purple');
      const blueOrb = section.querySelector('.contact-orb--blue');

      const backgroundWord = section.querySelector('.contact-background-word');

      /*
       * =========================================================
       * INITIAL STATE
       * =========================================================
       */

      if (label) {
        gsap.set(label, {
          opacity: 0,
          y: 20,
        });
      }

      if (headerLine) {
        gsap.set(headerLine, {
          scaleX: 0,
          transformOrigin: 'left center',
        });
      }

      if (words.length) {
        gsap.set(words, {
          opacity: 0,
          y: 55,
          rotateX: -35,
        });
      }

      if (intro) {
        gsap.set(intro, {
          opacity: 0,
          y: 24,
        });
      }

      if (contactLinks.length) {
        gsap.set(contactLinks, {
          opacity: 0,
          y: 45,
        });
      }

      if (availability) {
        gsap.set(availability, {
          opacity: 0,
          y: 20,
        });
      }

      if (bottom) {
        gsap.set(bottom, {
          opacity: 0,
          y: 20,
        });
      }

      if (backgroundWord) {
        gsap.set(backgroundWord, {
          opacity: 0,
          scale: 0.96,
        });
      }

      if (purpleOrb || blueOrb) {
        gsap.set(
          [purpleOrb, blueOrb].filter((element): element is Element => element !== null),
          {
            opacity: 0,
          },
        );
      }

      /*
       * =========================================================
       * MAIN SCROLL ANIMATION
       * =========================================================
       */

      const introTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      if (backgroundWord) {
        introTimeline.to(backgroundWord, {
          opacity: 1,
          scale: 1,
          duration: 1.4,
          ease: 'power3.out',
        });
      }

      const orbs = [purpleOrb, blueOrb].filter((element): element is Element => element !== null);

      if (orbs.length) {
        introTimeline.to(
          orbs,
          {
            opacity: 1,
            duration: 1.2,
            ease: 'power2.out',
          },
          '-=1.1',
        );
      }

      if (label) {
        introTimeline.to(
          label,
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: 'power3.out',
          },
          '-=0.8',
        );
      }

      if (headerLine) {
        introTimeline.to(
          headerLine,
          {
            scaleX: 1,
            duration: 0.65,
            ease: 'power3.out',
          },
          '-=0.4',
        );
      }

      if (words.length) {
        introTimeline.to(
          words,
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: 'power3.out',
          },
          '-=0.35',
        );
      }

      if (intro) {
        introTimeline.to(
          intro,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
          },
          '-=0.4',
        );
      }

      /*
       * =========================================================
       * CONTACT LINKS
       * =========================================================
       */

      if (contactLinks.length) {
        introTimeline.to(
          contactLinks,
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.12,
            ease: 'power3.out',
          },
          '-=0.2',
        );
      }

      /*
       * =========================================================
       * AVAILABILITY
       * =========================================================
       */

      if (availability) {
        introTimeline.to(
          availability,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
          },
          '-=0.3',
        );
      }

      /*
       * =========================================================
       * BOTTOM
       * =========================================================
       */

      if (bottom) {
        introTimeline.to(
          bottom,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
          },
          '-=0.25',
        );
      }

      /*
       * =========================================================
       * BACKGROUND PARALLAX
       * =========================================================
       */

      if (backgroundWord) {
        gsap.to(backgroundWord, {
          yPercent: -12,
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

      if (purpleOrb) {
        gsap.to(purpleOrb, {
          y: -70,
          x: 25,
          ease: 'none',

          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }

      if (blueOrb) {
        gsap.to(blueOrb, {
          y: 55,
          x: -20,
          ease: 'none',

          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.8,
          },
        });
      }

      /*
       * =========================================================
       * MOUSE EFFECT
       * =========================================================
       */

      const handleMouseMove = (event: MouseEvent): void => {
        const rect = section.getBoundingClientRect();

        if (!rect.width || !rect.height) {
          return;
        }

        const mouseX = (event.clientX - rect.left) / rect.width - 0.5;

        const mouseY = (event.clientY - rect.top) / rect.height - 0.5;

        if (purpleOrb) {
          gsap.to(purpleOrb, {
            x: mouseX * 30,
            y: mouseY * 20,
            duration: 1.2,
            ease: 'power3.out',
            overwrite: 'auto',
          });
        }

        if (blueOrb) {
          gsap.to(blueOrb, {
            x: mouseX * -25,
            y: mouseY * -18,
            duration: 1.4,
            ease: 'power3.out',
            overwrite: 'auto',
          });
        }
      };

      section.addEventListener('mousemove', handleMouseMove, { passive: true });

      /*
       * =========================================================
       * CONTACT LINK HOVER
       * =========================================================
       */

      contactLinks.forEach((link) => {
        const arrow = link.querySelector('.contact-link-arrow');
        const icon = link.querySelector('.contact-link-icon');

        const handleEnter = (): void => {
          gsap.to(link, {
            y: -5,
            duration: 0.4,
            ease: 'power3.out',
          });

          if (arrow) {
            gsap.to(arrow, {
              x: 3,
              y: -3,
              scale: 1.08,
              duration: 0.3,
              ease: 'power3.out',
            });
          }

          if (icon) {
            gsap.to(icon, {
              y: -2,
              scale: 1.04,
              duration: 0.3,
              ease: 'power3.out',
            });
          }
        };

        const handleLeave = (): void => {
          gsap.to(link, {
            y: 0,
            duration: 0.5,
            ease: 'power3.out',
          });

          if (arrow) {
            gsap.to(arrow, {
              x: 0,
              y: 0,
              scale: 1,
              duration: 0.35,
              ease: 'power3.out',
            });
          }

          if (icon) {
            gsap.to(icon, {
              y: 0,
              scale: 1,
              duration: 0.35,
              ease: 'power3.out',
            });
          }
        };

        link.addEventListener('mouseenter', handleEnter);
        link.addEventListener('mouseleave', handleLeave);
      });

      /*
       * =========================================================
       * SCROLLTRIGGER REFRESH
       * =========================================================
       */

      ScrollTrigger.refresh();
    }, section);
  }

  /*
   * =========================================================
   * DESTROY
   * =========================================================
   */

  ngOnDestroy(): void {
    this.ctx?.revert();
  }
}
