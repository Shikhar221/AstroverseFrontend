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
          <!-- Mercury/Budha yantra: circular sacred-geometry reconstruction.
               No outer Bhupur/square enclosure or surrounding inscriptions. -->
          <circle cx="150" cy="150" r="116" opacity=".38"></circle>
          <circle cx="150" cy="150" r="106" opacity=".62"></circle>
          <circle cx="150" cy="150" r="96" opacity=".28"></circle>
          <circle cx="150" cy="150" r="84" opacity=".56"></circle>
          <circle cx="150" cy="150" r="72" opacity=".28"></circle>
          <circle cx="150" cy="150" r="60" opacity=".52"></circle>
          <circle cx="150" cy="150" r="48" opacity=".30"></circle>
          <circle cx="150" cy="150" r="36" opacity=".55"></circle>
          <circle cx="150" cy="150" r="20" opacity=".34"></circle>

          <!-- Fine 12-fold radial construction. -->
          <g *ngFor="let p of petals(12)" [attr.transform]="'rotate(' + (p * 30) + ' 150 150)'">
            <path d="M150 34V266" opacity=".14"></path>
            <path d="M150 43V72" opacity=".34"></path>
            <circle cx="150" cy="43" r="1.15" fill="currentColor" stroke="none" opacity=".65"></circle>
          </g>

          <!-- Four nested opposing triangle systems create the dense lattice
               seen in the reference, rather than the previous atom/orbit motif. -->
          <path d="M150 35L250 208L50 208Z" opacity=".62"></path>
          <path d="M150 265L50 92L250 92Z" opacity=".58"></path>

          <path d="M150 51L235 198L65 198Z" opacity=".42"></path>
          <path d="M150 249L65 102L235 102Z" opacity=".40"></path>

          <path d="M150 68L218 186L82 186Z" opacity=".58"></path>
          <path d="M150 232L82 114L218 114Z" opacity=".54"></path>

          <path d="M150 82L201 170L99 170Z" opacity=".36"></path>
          <path d="M150 218L99 130L201 130Z" opacity=".34"></path>

          <!-- Rotated diamond/square families, entirely inside the circle. -->
          <path d="M150 43L257 150L150 257L43 150Z" opacity=".44"></path>
          <path d="M150 61L239 150L150 239L61 150Z" opacity=".31"></path>
          <path d="M150 78L222 150L150 222L78 150Z" opacity=".46"></path>
          <path d="M150 94L206 150L150 206L94 150Z" opacity=".30"></path>

          <!-- Offset rotated square creates the characteristic layered
               crossing lines without introducing the forbidden outer square. -->
          <path d="M104 104H196V196H104Z" transform="rotate(15 150 150)" opacity=".34"></path>
          <path d="M114 114H186V186H114Z" transform="rotate(-15 150 150)" opacity=".28"></path>

          <!-- Central interlocking hexagonal/triangular lattice. -->
          <path d="M150 92L200 121L200 179L150 208L100 179L100 121Z" opacity=".54"></path>
          <path d="M150 103L190 127L190 173L150 197L110 173L110 127Z" opacity=".36"></path>
          <path d="M150 112L183 150L150 188L117 150Z" opacity=".52"></path>
          <circle cx="150" cy="150" r="27" opacity=".62"></circle>
          <circle cx="150" cy="150" r="15" opacity=".30"></circle>
          <circle cx="150" cy="150" r="5" opacity=".72"></circle>

          <!-- Small intersection markers. -->
          <g *ngFor="let p of petals(12)" [attr.transform]="'rotate(' + (p * 30) + ' 150 150)'">
            <circle cx="150" cy="72" r="1.4" fill="currentColor" stroke="none" opacity=".58"></circle>
            <circle cx="150" cy="96" r="1" fill="currentColor" stroke="none" opacity=".42"></circle>
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
