import { Component, HostListener, OnInit } from '@angular/core';

import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  isDarkMode = false;

  isMobileMenuOpen = false;

  constructor(public languageService: LanguageService) {}

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');

    this.isDarkMode = savedTheme === 'dark';

    document.documentElement.classList.toggle('dark', this.isDarkMode);
  }

  /* =========================================================
     THEME
     ========================================================= */

  toggleTheme(event: MouseEvent): void {
    const nextIsDark = !this.isDarkMode;

    const documentWithTransition = document as Document & {
      startViewTransition?: (callback: () => void) => {
        finished: Promise<void>;
      };
    };

    const startViewTransition = documentWithTransition.startViewTransition;

    /*
     * Fallback para navegadores sem suporte
     */
    if (!startViewTransition) {
      this.applyTheme(nextIsDark);
      return;
    }

    /*
     * Pega o botão que foi clicado
     */
    const button = event.currentTarget as HTMLElement;
    const rect = button.getBoundingClientRect();

    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    /*
     * Distância necessária para o círculo
     * cobrir a tela inteira.
     */
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    /*
     * Passamos a posição e o raio para o CSS.
     */
    document.documentElement.style.setProperty('--theme-transition-x', `${x}px`);

    document.documentElement.style.setProperty('--theme-transition-y', `${y}px`);

    document.documentElement.style.setProperty('--theme-transition-radius', `${maxRadius}px`);

    startViewTransition.call(document, () => {
      this.applyTheme(nextIsDark);
    });
  }

  private applyTheme(isDark: boolean): void {
    this.isDarkMode = isDark;

    document.documentElement.classList.toggle('dark', isDark);

    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  /* =========================================================
     LANGUAGE
     ========================================================= */

  toggleLanguage(): void {
    this.languageService.toggleLanguage();
  }

  /* =========================================================
     MOBILE MENU
     ========================================================= */

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;

    this.updateBodyScroll();
  }

  closeMobileMenu(): void {
    if (!this.isMobileMenuOpen) {
      return;
    }

    this.isMobileMenuOpen = false;

    this.updateBodyScroll();
  }

  private updateBodyScroll(): void {
    document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
  }

  /* =========================================================
     ESC — CLOSE MENU
     ========================================================= */

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (!this.isMobileMenuOpen) {
      return;
    }

    this.closeMobileMenu();
  }

  /* =========================================================
     RESIZE
     ========================================================= */

  @HostListener('window:resize')
  onWindowResize(): void {
    if (window.innerWidth > 900 && this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  }

  /* =========================================================
     CLEANUP
     ========================================================= */

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }
}
