import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements AfterViewInit, OnDestroy {
  // =========================================================
  // SECTION
  // =========================================================

  @ViewChild('contactSection', { static: true })
  contactSection!: ElementRef<HTMLElement>;

  // =========================================================
  // INTERNAL
  // =========================================================

  private sectionElement!: HTMLElement;

  // =========================================================
  // CONSTRUCTOR
  // =========================================================

  constructor(public languageService: LanguageService) {}

  // =========================================================
  // LIFECYCLE
  // =========================================================

  ngAfterViewInit(): void {
    this.sectionElement = this.contactSection.nativeElement;
  }

  // =========================================================
  // CLEANUP
  // =========================================================

  ngOnDestroy(): void {
    // Reserved for future animations / ScrollTrigger cleanup.
  }
}
