import { Component } from '@angular/core';
import { NgFor, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-yantra',
  standalone: true,
  imports: [NgFor, NgSwitch, NgSwitchCase, NgSwitchDefault],
  template: `
    <svg class="yantra-svg" viewBox="0 0 300 300" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="budha-line" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#D7FFE8"></stop>
          <stop offset="48%" stop-color="#9CFFD0"></stop>
          <stop offset="100%" stop-color="#45D991"></stop>
        </linearGradient>
        <radialGradient id="budha-bindu">
          <stop offset="0%" stop-color="#F0FFF7"></stop>
          <stop offset="38%" stop-color="#B7FFD9"></stop>
          <stop offset="100%" stop-color="#55E99B" stop-opacity="0"></stop>
        </radialGradient>
        <filter id="budha-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="1.8" result="soft"></feGaussianBlur>
          <feMerge><feMergeNode in="soft"></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge>
        </filter>
        <filter id="budha-core-glow" x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="4" result="halo"></feGaussianBlur>
          <feMerge><feMergeNode in="halo"></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge>
        </filter>
      </defs>

      <g [ngSwitch]="theme.activeTheme().yantra" stroke="currentColor" stroke-width=".95" stroke-linejoin="round">
        <g *ngSwitchCase="'lotus'">
          <circle cx="150" cy="150" r="113" opacity=".4"></circle><circle cx="150" cy="150" r="92" opacity=".48"></circle>
          <g *ngFor="let petal of petals(16)" [attr.transform]="'rotate(' + (petal * 22.5) + ' 150 150)'">
            <path d="M150 48 C134 74 132 101 150 127 C168 101 166 74 150 48Z" opacity=".8"></path>
            <path d="M150 69 C142 88 142 103 150 115 C158 103 158 88 150 69Z" opacity=".38"></path>
          </g>
          <g *ngFor="let petal of petals(12)" [attr.transform]="'rotate(' + (petal * 30) + ' 150 150)'"><path d="M150 90 C125 111 127 143 150 161 C173 143 175 111 150 90Z" opacity=".63"></path></g>
          <path d="M150 93 201 180 150 208 99 180Z" opacity=".72"></path><path d="M150 208 201 120 150 92 99 120Z" opacity=".6"></path>
        </g>

        <g *ngSwitchCase="'budha'" class="budha-yantra" stroke="url(#budha-line)" stroke-linecap="round" stroke-linejoin="round" filter="url(#budha-glow)">
          <!-- Fine outer rings and dotted orbital guide: bright but not heavy. -->
          <circle cx="150" cy="150" r="127" stroke-width="1.05" opacity=".68"></circle>
          <circle cx="150" cy="150" r="119" stroke-width=".55" opacity=".43" stroke-dasharray="1 3"></circle>
          <circle cx="150" cy="150" r="105" stroke-width=".8" opacity=".56"></circle>
          <circle cx="150" cy="150" r="94" stroke-width=".65" opacity=".42"></circle>
          <circle cx="150" cy="150" r="80" stroke-width=".58" opacity=".34"></circle>
          <circle cx="150" cy="150" r="64" stroke-width=".55" opacity=".36"></circle>
          <circle cx="150" cy="150" r="48" stroke-width=".52" opacity=".32"></circle>
          <circle cx="150" cy="150" r="34" stroke-width=".48" opacity=".3"></circle>
          <circle cx="150" cy="150" r="20" stroke-width=".45" opacity=".28"></circle>

          <!-- Twelve-fold lotus arcs woven between the ring and triangle lattice. -->
          <g *ngFor="let petal of petals(12)" [attr.transform]="'rotate(' + (petal * 30) + ' 150 150)'">
            <path d="M150 30 C132 49 130 67 150 84 C170 67 168 49 150 30Z" stroke-width=".62" opacity=".56"></path>
            <path d="M150 58 C136 76 138 94 150 108 C162 94 164 76 150 58Z" stroke-width=".55" opacity=".4"></path>
            <path d="M150 86 C128 103 130 125 150 139 C170 125 172 103 150 86Z" stroke-width=".62" opacity=".45"></path>
          </g>

          <!-- Multiple mathematically generated, interlocking triangles create the dense woven core. -->
          <g *ngFor="let radius of budhaLayers">
            <polygon [attr.points]="trianglePoints(radius, -90)" stroke-width=".66" [attr.opacity]="triangleOpacity(radius)"></polygon>
            <polygon [attr.points]="trianglePoints(radius, 90)" stroke-width=".66" [attr.opacity]="triangleOpacity(radius)"></polygon>
            <polygon [attr.points]="trianglePoints(radius * .91, -60)" stroke-width=".48" [attr.opacity]="triangleOpacity(radius) * .72"></polygon>
            <polygon [attr.points]="trianglePoints(radius * .91, 60)" stroke-width=".48" [attr.opacity]="triangleOpacity(radius) * .72"></polygon>
          </g>

          <!-- Radial connectors and luminous intersection points add the holographic depth. -->
          <g *ngFor="let ray of petals(12)" [attr.transform]="'rotate(' + (ray * 30) + ' 150 150)'">
            <line x1="150" y1="23" x2="150" y2="42" stroke-width=".8" opacity=".75"></line>
            <line x1="150" y1="58" x2="150" y2="128" stroke-width=".48" opacity=".27"></line>
            <circle cx="150" cy="44" r="1.15" fill="#D7FFE8" stroke="none" opacity=".92"></circle>
            <circle cx="150" cy="83" r=".85" fill="#B7FFD9" stroke="none" opacity=".72"></circle>
          </g>
        </g>

        <g *ngSwitchCase="'orbit'">
          <circle cx="150" cy="150" r="105" opacity=".55"></circle><circle cx="150" cy="150" r="79" opacity=".48"></circle><circle cx="150" cy="150" r="48" opacity=".74"></circle>
          <ellipse cx="150" cy="150" rx="31" ry="112" transform="rotate(30 150 150)" opacity=".8"></ellipse>
          <ellipse cx="150" cy="150" rx="31" ry="112" transform="rotate(90 150 150)" opacity=".8"></ellipse>
          <ellipse cx="150" cy="150" rx="31" ry="112" transform="rotate(150 150 150)" opacity=".8"></ellipse>
          <path d="M150 39 214 187 150 261 86 187Z" opacity=".45"></path><path d="M39 150 187 86 261 150 187 214Z" opacity=".45"></path>
          <g *ngFor="let p of petals(8)" [attr.transform]="'rotate(' + (p * 45) + ' 150 150)'"><path d="M150 75 Q181 111 150 150 Q119 111 150 75Z" opacity=".57"></path></g>
        </g>
        <g *ngSwitchCase="'hexagram'">
          <circle cx="150" cy="150" r="112" opacity=".48"></circle><circle cx="150" cy="150" r="86" opacity=".36"></circle>
          <path d="M150 36 249 207H51Z" opacity=".82"></path><path d="M150 264 51 93H249Z" opacity=".82"></path>
          <path d="M150 61 227 194H73Z" opacity=".48"></path><path d="M150 239 73 106H227Z" opacity=".48"></path>
          <path d="M150 72 228 150 150 228 72 150Z" opacity=".63"></path>
          <g *ngFor="let p of petals(6)" [attr.transform]="'rotate(' + (p * 60) + ' 150 150)'"><path d="M150 91 C132 112 136 137 150 150 C164 137 168 112 150 91Z" opacity=".63"></path></g>
        </g>
        <g *ngSwitchCase="'flame'">
          <circle cx="150" cy="150" r="109" opacity=".43"></circle><circle cx="150" cy="150" r="77" opacity=".42"></circle>
          <g *ngFor="let p of petals(8)" [attr.transform]="'rotate(' + (p * 45) + ' 150 150)'">
            <path d="M150 37 C117 84 123 112 150 151 C177 112 183 84 150 37Z" opacity=".75"></path>
            <path d="M150 76 C132 104 138 123 150 143 C162 123 168 104 150 76Z" opacity=".55"></path>
          </g>
          <path d="M150 81 219 150 150 219 81 150Z" opacity=".55"></path><path d="M150 100 200 187 150 216 100 187Z" opacity=".7"></path>
        </g>
        <g *ngSwitchCase="'solar'">
          <circle cx="150" cy="150" r="109" opacity=".47"></circle><circle cx="150" cy="150" r="87" opacity=".64"></circle><circle cx="150" cy="150" r="59" opacity=".75"></circle>
          <g *ngFor="let p of petals(24)" [attr.transform]="'rotate(' + (p * 15) + ' 150 150)'"><path d="M150 28 155 83 150 94 145 83Z" opacity=".75"></path></g>
          <g *ngFor="let p of petals(12)" [attr.transform]="'rotate(' + (p * 30) + ' 150 150)'"><path d="M150 67 C169 91 168 119 150 139 C132 119 131 91 150 67Z" opacity=".57"></path></g>
          <path d="M150 91 209 150 150 209 91 150Z" opacity=".75"></path><circle cx="150" cy="150" r="33" opacity=".88"></circle>
        </g>
        <g *ngSwitchDefault><circle cx="150" cy="150" r="108"></circle></g>
      </g>

      <g *ngIf="theme.activeTheme().yantra === 'budha'" pointer-events="none">
        <circle cx="150" cy="150" r="12" fill="url(#budha-bindu)" filter="url(#budha-core-glow)"></circle>
        <circle cx="150" cy="150" r="2.3" fill="#E8FFF2" filter="url(#budha-core-glow)"></circle>
      </g>
    </svg>`,
})
export class YantraComponent {
  readonly budhaLayers = [110, 100, 90, 80, 70, 60, 51, 43, 36, 29, 23, 18, 13, 9];

  constructor(readonly theme: ThemeService) {}

  petals(count: number): number[] {
    return Array.from({ length: count }, (_, i) => i);
  }

  trianglePoints(radius: number, rotation: number): string {
    return Array.from({ length: 3 }, (_, index) => {
      const angle = (rotation + index * 120 - 90) * Math.PI / 180;
      const x = 150 + Math.cos(angle) * radius;
      const y = 150 + Math.sin(angle) * radius;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    }).join(' ');
  }

  triangleOpacity(radius: number): number {
    return radius > 75 ? 0.34 : radius > 40 ? 0.48 : 0.62;
  }
}
