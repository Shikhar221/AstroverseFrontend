import { Component } from '@angular/core';
import { HomePage } from './pages/home/home.page';

@Component({
  selector: 'astroverse-root',
  standalone: true,
  imports: [HomePage],
  template: '<app-home></app-home>',
})
export class AppComponent {}