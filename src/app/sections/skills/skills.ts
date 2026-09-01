import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-skills',
  standalone: true,
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills implements AfterViewInit, OnDestroy {
  // =========================================================
  // SECTION
  // =========================================================

  @ViewChild('skillsSection', { static: true })
  skillsSection!: ElementRef<HTMLElement>;

  // =========================================================
  // INTERNAL
  // =========================================================

  private sectionElement!: HTMLElement;

  // =========================================================
  // MOUSE
  // =========================================================

  private mouseX = 0;
  private mouseY = 0;

  private targetMouseX = 0;
  private targetMouseY = 0;

  private animationFrameId?: number;

  // =========================================================
  // INTERSECTION OBSERVER
  // =========================================================

  private revealObserver?: IntersectionObserver;

  // =========================================================
  // LIFECYCLE
  // =========================================================

  ngAfterViewInit(): void {
    this.sectionElement = this.skillsSection.nativeElement;

    // -------------------------------------------------------
    // INITIAL MOUSE POSITION
    // -------------------------------------------------------

    this.mouseX = window.innerWidth / 2;
    this.mouseY = window.innerHeight / 2;

    this.targetMouseX = this.mouseX;
    this.targetMouseY = this.mouseY;

    // -------------------------------------------------------
    // INITIAL CSS VARIABLES
    // -------------------------------------------------------

    this.sectionElement.style.setProperty('--skills-scroll', '0');

    this.sectionElement.style.setProperty('--skills-mouse-x', `${this.mouseX}px`);

    this.sectionElement.style.setProperty('--skills-mouse-y', `${this.mouseY}px`);

    // -------------------------------------------------------
    // START
    // -------------------------------------------------------

    this.startMouseAnimation();

    this.updateScrollProgress();

    this.setupScrollReveal();
  }

  // =========================================================
  // SCROLL REVEAL
  // =========================================================

  private setupScrollReveal(): void {
    if (!this.sectionElement) {
      return;
    }

    const section = this.sectionElement;

    /*
     * Importante:
     *
     * O estado "ready" é adicionado somente quando o JS
     * já está funcionando.
     *
     * Assim o conteúdo continua normal quando JS falha.
     */

    section.classList.add('skills-scroll-ready');

    // -------------------------------------------------------
    // FALLBACK
    // -------------------------------------------------------

    if (typeof IntersectionObserver === 'undefined') {
      section.classList.add('skills-scroll-visible');

      return;
    }

    // -------------------------------------------------------
    // OBSERVER
    // -------------------------------------------------------

    this.revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            /*
             * Entrou na viewport.
             *
             * Ativa todas as animações.
             */

            section.classList.add('skills-scroll-visible');
          } else {
            /*
             * Saiu da viewport.
             *
             * Remove a classe para que, quando voltar,
             * as animações aconteçam novamente.
             */

            section.classList.remove('skills-scroll-visible');
          }
        });
      },
      {
        /*
         * Um pequeno pedaço da seção precisa estar
         * visível para disparar.
         */

        threshold: 0.08,

        /*
         * Ativa um pouco antes da seção chegar
         * completamente ao viewport.
         */

        rootMargin: '0px 0px -10% 0px',
      },
    );

    this.revealObserver.observe(section);
  }

  // =========================================================
  // MOUSE
  // =========================================================

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.sectionElement) {
      return;
    }

    const rect = this.sectionElement.getBoundingClientRect();

    const insideSection =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;

    // -------------------------------------------------------
    // OUTSIDE
    // -------------------------------------------------------

    if (!insideSection) {
      this.sectionElement.classList.remove('skills-cursor-active');

      return;
    }

    // -------------------------------------------------------
    // INSIDE
    // -------------------------------------------------------

    this.sectionElement.classList.add('skills-cursor-active');

    this.targetMouseX = event.clientX;

    this.targetMouseY = event.clientY;

    this.updateCardPointer(event);
  }

  // =========================================================
  // CARD SPOTLIGHT
  // =========================================================

  private updateCardPointer(event: MouseEvent): void {
    if (!this.sectionElement) {
      return;
    }

    const target = event.target as HTMLElement | null;

    const card = target?.closest('.skill-card') as HTMLElement | null;

    if (!card) {
      return;
    }

    const rect = card.getBoundingClientRect();

    if (rect.width <= 0 || rect.height <= 0) {
      return;
    }

    const x = ((event.clientX - rect.left) / rect.width) * 100;

    const y = ((event.clientY - rect.top) / rect.height) * 100;

    const clampedX = Math.max(0, Math.min(100, x));

    const clampedY = Math.max(0, Math.min(100, y));

    card.style.setProperty('--card-x', `${clampedX}%`);

    card.style.setProperty('--card-y', `${clampedY}%`);
  }

  // =========================================================
  // SMOOTH CURSOR ORB
  // =========================================================

  private startMouseAnimation(): void {
    const animate = (): void => {
      if (!this.sectionElement) {
        this.animationFrameId = requestAnimationFrame(animate);

        return;
      }

      // -----------------------------------------------------
      // SMOOTH X
      // -----------------------------------------------------

      this.mouseX += (this.targetMouseX - this.mouseX) * 0.12;

      // -----------------------------------------------------
      // SMOOTH Y
      // -----------------------------------------------------

      this.mouseY += (this.targetMouseY - this.mouseY) * 0.12;

      // -----------------------------------------------------
      // CSS VARIABLES
      // -----------------------------------------------------

      this.sectionElement.style.setProperty('--skills-mouse-x', `${this.mouseX}px`);

      this.sectionElement.style.setProperty('--skills-mouse-y', `${this.mouseY}px`);

      // -----------------------------------------------------
      // NEXT FRAME
      // -----------------------------------------------------

      this.animationFrameId = requestAnimationFrame(animate);
    };

    this.animationFrameId = requestAnimationFrame(animate);
  }

  // =========================================================
  // WINDOW SCROLL
  // =========================================================

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.updateScrollProgress();
  }

  // =========================================================
  // SCROLL PROGRESS
  // =========================================================

  private updateScrollProgress(): void {
    if (!this.sectionElement) {
      return;
    }

    const rect = this.sectionElement.getBoundingClientRect();

    const viewportHeight = window.innerHeight;

    const totalDistance = viewportHeight + rect.height;

    if (totalDistance <= 0) {
      return;
    }

    const currentPosition = viewportHeight - rect.top;

    let progress = currentPosition / totalDistance;

    progress = Math.max(0, Math.min(1, progress));

    this.sectionElement.style.setProperty('--skills-scroll', progress.toFixed(3));
  }

  // =========================================================
  // RESIZE
  // =========================================================

  @HostListener('window:resize')
  onWindowResize(): void {
    this.updateScrollProgress();

    /*
     * Mantém o centro do cursor correto
     * caso o viewport seja redimensionado.
     */

    if (!this.sectionElement.classList.contains('skills-cursor-active')) {
      this.targetMouseX = window.innerWidth / 2;

      this.targetMouseY = window.innerHeight / 2;
    }
  }

  // =========================================================
  // CLEANUP
  // =========================================================

  ngOnDestroy(): void {
    if (this.animationFrameId !== undefined) {
      cancelAnimationFrame(this.animationFrameId);
    }

    this.revealObserver?.disconnect();

    if (this.sectionElement) {
      this.sectionElement.classList.remove('skills-cursor-active');

      this.sectionElement.classList.remove('skills-scroll-ready');

      this.sectionElement.classList.remove('skills-scroll-visible');
    }
  }
}
