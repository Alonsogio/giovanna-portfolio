import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Hero } from './sections/hero/hero';
import { About } from './sections/about/about';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Hero, About],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('giovanna-portfolio');
}
