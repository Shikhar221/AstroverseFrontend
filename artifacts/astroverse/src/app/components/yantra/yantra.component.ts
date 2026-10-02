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
          <!-- Budha/Mercury sacred geometry: circular only.
               The outer square/Bhupur and planetary glyph are intentionally excluded. -->
          <g class="budha-outer-rings">
            <circle cx="150" cy="150" r="116" stroke-width="2.2" opacity=".92"></circle>
            <circle cx="150" cy="150" r="106" stroke-width="1.35" opacity=".62"></circle>
            <circle cx="150" cy="150" r="95" stroke-width="1.05" opacity=".42"></circle>
            <circle cx="150" cy="150" r="84" stroke-width="1.65" opacity=".78"></circle>
            <circle cx="150" cy="150" r="72" stroke-width="1.0" opacity=".44"></circle>
          </g>

          <!-- Controlled radial construction, kept subordinate to the main rings. -->
          <g opacity=".30">
            <g *ngFor="let p of petals(12)" [attr.transform]="'rotate(' + (p * 30) + ' 150 150)'">
              <path d="M150 38V68" stroke-width=".75"></path>
              <circle cx="150" cy="38" r="1.1" fill="currentColor" stroke="none"></circle>
            </g>
          </g>

          <!-- Main sacred-geometry lattice: fewer, deliberate interlocking triangles. -->
          <g class="budha-main-geometry">
            <path d="M150 48L236 198L64 198Z" stroke-width="1.45" opacity=".82"></path>
            <path d="M150 252L64 102L236 102Z" stroke-width="1.45" opacity=".78"></path>

            <path d="M150 65L221 188L79 188Z" stroke-width="1.05" opacity=".62"></path>
            <path d="M150 235L79 112L221 112Z" stroke-width="1.05" opacity=".58"></path>

            <path d="M150 74L226 150L150 226L74 150Z" stroke-width="1.12" opacity=".68"></path>
            <path d="M150 91L209 150L150 209L91 150Z" stroke-width=".95" opacity=".56"></path>

            <path d="M108 108L192 108L192 192L108 192Z" transform="rotate(15 150 150)" stroke-width=".9" opacity=".46"></path>
            <path d="M116 116L184 116L184 184L116 184Z" transform="rotate(-15 150 150)" stroke-width=".82" opacity=".38"></path>
          </g>

          <!-- Strong inner boundary, matching the reference's visual hierarchy. -->
          <circle cx="150" cy="150" r="57" stroke-width="1.85" opacity=".84"></circle>
          <circle cx="150" cy="150" r="44" stroke-width="1.15" opacity=".58"></circle>

          <!-- Compact central yantra lattice. No Mercury glyph in the center. -->
          <g class="budha-center-geometry">
            <path d="M150 111L184 130L184 170L150 189L116 170L116 130Z" stroke-width="1.25" opacity=".78"></path>
            <path d="M150 121L175 135L175 165L150 179L125 165L125 135Z" stroke-width="1.0" opacity=".64"></path>
            <path d="M150 126L171 150L150 174L129 150Z" stroke-width="1.15" opacity=".82"></path>
            <path d="M150 130L168 150L150 170L132 150Z" stroke-width=".78" opacity=".48"></path>
            <circle cx="150" cy="150" r="8" stroke-width="1.25" opacity=".86"></circle>
            <circle cx="150" cy="150" r="2.3" fill="currentColor" stroke="none" opacity=".9"></circle>
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
