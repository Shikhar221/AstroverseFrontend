import { Component } from '@angular/core';

@Component({
  selector: 'app-cosmic-background',
  standalone: true,
  template: `<div class="starfield" aria-hidden="true"></div><i class="dust dust-a"></i><i class="dust dust-b"></i><i class="dust dust-c"></i><i class="dust dust-d"></i>`,
})
export class CosmicBackgroundComponent {}