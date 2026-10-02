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
          <!-- Compact Budha mandala: contained inside the independent rashi wheel. -->
          <defs>
            <linearGradient id="budha-line" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#B9F2A0"></stop>
              <stop offset="52%" stop-color="#8BE6A0"></stop>
              <stop offset="100%" stop-color="#BFD879"></stop>
            </linearGradient>
          </defs>
          <g class="budha-integrated" stroke="url(#budha-line)" stroke-linejoin="round">
            <!-- Inner yantra boundary; deliberately separated from the rashi ring. -->
            <circle cx="150" cy="150" r="105" stroke-width="2.0" opacity=".88"></circle>
            <circle cx="150" cy="150" r="96" stroke-width="1.05" opacity=".58"></circle>
            <circle cx="150" cy="150" r="87" stroke-width="1.35" opacity=".72"></circle>
            <circle cx="150" cy="150" r="73" stroke-width=".85" opacity=".48"></circle>
            <circle cx="150" cy="150" r="59" stroke-width="1.15" opacity=".62"></circle>

            <!-- Large but contained interlocking triangles. -->
            <path d="M150 46 L241 204 L59 204 Z" stroke-width="1.05" opacity=".66"></path>
            <path d="M150 254 L59 96 L241 96 Z" stroke-width="1.05" opacity=".66"></path>
            <path d="M150 54 L233 150 L150 246 L67 150 Z" stroke-width=".9" opacity=".56"></path>
            <path d="M68 150 L150 68 L232 150 L150 232 Z" stroke-width=".8" opacity=".46"></path>

            <!-- Secondary rotated triangles, kept inside the yantra boundary. -->
            <path d="M150 62 L218 194 L82 194 Z" transform="rotate(16 150 150)" stroke-width=".68" opacity=".48"></path>
            <path d="M150 238 L82 106 L218 106 Z" transform="rotate(16 150 150)" stroke-width=".68" opacity=".48"></path>
            <path d="M150 62 L218 194 L82 194 Z" transform="rotate(-16 150 150)" stroke-width=".62" opacity=".40"></path>
            <path d="M150 238 L82 106 L218 106 Z" transform="rotate(-16 150 150)" stroke-width=".62" opacity=".40"></path>

            <!-- Compact inner lattice. -->
            <path d="M150 76 L214 150 L150 224 L86 150 Z" stroke-width=".85" opacity=".55"></path>
            <path d="M150 86 L205 118 L205 182 L150 214 L95 182 L95 118 Z" stroke-width=".72" opacity=".48"></path>
            <path d="M150 99 L194 125 L194 175 L150 201 L106 175 L106 125 Z" stroke-width=".62" opacity=".42"></path>

            <!-- Central geometric bindu, no planetary glyph. -->
            <circle cx="150" cy="150" r="37" stroke-width="1.0" opacity=".62"></circle>
            <path d="M150 111 L184 131 L184 169 L150 189 L116 169 L116 131 Z" stroke-width=".9" opacity=".58"></path>
            <path d="M150 121 L175 150 L150 179 L125 150 Z" stroke-width=".8" opacity=".52"></path>
            <path d="M150 132 L168 150 L150 168 L132 150 Z" stroke-width=".72" opacity=".58"></path>
            <circle cx="150" cy="150" r="5" stroke-width=".9" opacity=".78"></circle>
            <circle cx="150" cy="150" r="1.7" fill="#D8F7B4" stroke="none" opacity=".95"></circle>
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
