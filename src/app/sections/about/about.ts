import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements AfterViewInit, OnDestroy {
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
  // OBSERVER
  // ==================================================

  private observer?: IntersectionObserver;

  private animationFrame?: number;

  private hasAnimated = false;

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
    });
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

        if (entry && entry.isIntersecting && !this.hasAnimated) {
          this.hasAnimated = true;

          this.animateStats();

          this.observer?.disconnect();
        }
      },
      {
        threshold: 0.15,
      },
    );

    this.observer.observe(this.aboutSection.nativeElement);
  }

  // ==================================================
  // ANIMATE STATS
  // ==================================================

  private animateStats(): void {
    const duration = 1800;

    const startTime = performance.now();

    const animate = (currentTime: number): void => {
      const elapsed = currentTime - startTime;

      const progress = Math.min(elapsed / duration, 1);

      // Smooth easing

      const easedProgress = 1 - Math.pow(1 - progress, 4);

      this.animatedStats = this.stats.map((stat) => Math.floor(stat.value * easedProgress));

      // Force Angular update

      this.cdr.detectChanges();

      if (progress < 1) {
        this.animationFrame = requestAnimationFrame(animate);
      } else {
        this.animatedStats = this.stats.map((stat) => stat.value);

        this.cdr.detectChanges();
      }
    };

    this.animationFrame = requestAnimationFrame(animate);
  }

  // ==================================================
  // DESTROY
  // ==================================================

  ngOnDestroy(): void {
    this.observer?.disconnect();

    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }
}
