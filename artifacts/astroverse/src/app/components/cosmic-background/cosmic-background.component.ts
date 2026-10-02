import { Component } from '@angular/core';

@Component({
  selector: 'app-cosmic-background',
  standalone: true,
  template: `
    <div class="atmosphere" aria-hidden="true">
      <div class="nebula-layer nebula-layer-one">
        <img class="nebula-image center-crop" src="assets/nebula-master.png" alt="" draggable="false">
      </div>
      <div class="nebula-layer nebula-layer-two">
        <img class="nebula-image right-crop" src="assets/nebula-master.png" alt="" draggable="false">
      </div>
      <div class="nebula-layer nebula-layer-three">
        <img class="nebula-image left-crop" src="assets/nebula-master.png" alt="" draggable="false">
      </div>
      <div class="starfield"></div>
      <i class="dust dust-a"></i>
      <i class="dust dust-b"></i>
      <i class="dust dust-c"></i>
      <i class="dust dust-d"></i>
    </div>`,
})
export class CosmicBackgroundComponent {}