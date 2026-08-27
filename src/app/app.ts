import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Hero } from './sections/hero/hero';
import { About } from './sections/about/about';
import { PageReveal } from "./components/page-reveal/page-reveal";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Hero, About, PageReveal],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('giovanna-portfolio');
}
