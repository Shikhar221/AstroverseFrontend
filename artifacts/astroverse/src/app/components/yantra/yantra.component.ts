import { Component } from '@angular/core';
import { NgFor, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-yantra',
  standalone: true,
  imports: [NgFor, NgSwitch, NgSwitchCase, NgSwitchDefault],
  template: `
    <svg class="yantra-svg" viewBox="0 0 300 300" fill="none" aria-hidden="true">
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

        <g *ngSwitchCase="'budha'">
          <!-- Integrated Budha mandala: no outer square and no planetary glyph.
               Geometry expands toward the rashi wheel so the two systems read as one instrument. -->
          <defs>
            <linearGradient id="budha-line" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#C4F4A7"></stop>
              <stop offset="48%" stop-color="#8BE6A0"></stop>
              <stop offset="100%" stop-color="#D8C66A"></stop>
            </linearGradient>
          </defs>

          <g class="budha-integrated" stroke="url(#budha-line)" stroke-linejoin="round">
            <!-- Large circular structure -->
            <circle cx="150" cy="150" r="136" stroke-width="1.8" opacity=".88"></circle>
            <circle cx="150" cy="150" r="125" stroke-width="1.0" opacity=".54"></circle>
            <circle cx="150" cy="150" r="112" stroke-width="1.35" opacity=".72"></circle>
            <circle cx="150" cy="150" r="96" stroke-width=".85" opacity=".44"></circle>
            <circle cx="150" cy="150" r="79" stroke-width="1.25" opacity=".62"></circle>
            <circle cx="150" cy="150" r="61" stroke-width=".8" opacity=".42"></circle>

            <!-- Large interlocking triangles reaching toward the rashi ring -->
            <path d="M150 18 L264 216 L36 216 Z" stroke-width="1.15" opacity=".70"></path>
            <path d="M150 282 L36 84 L264 84 Z" stroke-width="1.15" opacity=".70"></path>

            <path d="M150 28 L257 150 L150 272 L43 150 Z" stroke-width="1.0" opacity=".64"></path>
            <path d="M44 150 L150 43 L256 150 L150 257 Z" stroke-width=".9" opacity=".52"></path>

            <!-- Rotated secondary triangle pairs -->
            <path d="M150 39 L238 201 L62 201 Z" transform="rotate(15 150 150)" stroke-width=".82" opacity=".52"></path>
            <path d="M150 261 L62 99 L238 99 Z" transform="rotate(15 150 150)" stroke-width=".82" opacity=".52"></path>
            <path d="M150 39 L238 201 L62 201 Z" transform="rotate(-15 150 150)" stroke-width=".72" opacity=".44"></path>
            <path d="M150 261 L62 99 L238 99 Z" transform="rotate(-15 150 150)" stroke-width=".72" opacity=".44"></path>

            <!-- Inner sacred lattice -->
            <path d="M150 57 L231 150 L150 243 L69 150 Z" stroke-width="1.0" opacity=".58"></path>
            <path d="M150 67 L222 108 L222 192 L150 233 L78 192 L78 108 Z" stroke-width=".85" opacity=".54"></path>
            <path d="M150 76 L214 113 L214 187 L150 224 L86 187 L86 113 Z" stroke-width=".75" opacity=".42"></path>

            <g opacity=".58">
              <g *ngFor="let p of petals(12)" [attr.transform]="'rotate(' + (p * 30) + ' 150 150)'">
                <path d="M150 56 L184 150 L150 244 L116 150 Z" stroke-width=".62"></path>
              </g>
            </g>

            <!-- Dense central geometry, ending in a bindu rather than a planet symbol -->
            <circle cx="150" cy="150" r="45" stroke-width="1.15" opacity=".66"></circle>
            <circle cx="150" cy="150" r="33" stroke-width=".9" opacity=".52"></circle>
            <path d="M150 103 L191 127 L191 173 L150 197 L109 173 L109 127 Z" stroke-width="1.0" opacity=".66"></path>
            <path d="M150 112 L182 131 L182 169 L150 188 L118 169 L118 131 Z" stroke-width=".78" opacity=".54"></path>
            <path d="M150 119 L177 150 L150 181 L123 150 Z" stroke-width="1.0" opacity=".68"></path>
            <path d="M150 128 L169 150 L150 172 L131 150 Z" stroke-width=".7" opacity=".52"></path>
            <circle cx="150" cy="150" r="7" stroke-width="1.0" opacity=".82"></circle>
            <circle cx="150" cy="150" r="1.8" fill="#D8F7B4" stroke="none" opacity=".95"></circle>
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
    </svg>`,
})
export class YantraComponent {
  constructor(readonly theme: ThemeService) {}
  petals(count: number): number[] { return Array.from({ length: count }, (_, i) => i); }
}
