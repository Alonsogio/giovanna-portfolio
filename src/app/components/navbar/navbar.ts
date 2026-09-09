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

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;

    document.documentElement.classList.toggle('dark', this.isDarkMode);

    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
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
    /*
     * Se voltar para desktop,
     * fecha o menu automaticamente.
     */

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
