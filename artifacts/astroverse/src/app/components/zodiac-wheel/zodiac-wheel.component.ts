import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-zodiac-wheel',
  standalone: true,
  imports: [NgFor],
  template: `
    <svg class="zodiac-svg" viewBox="0 0 400 400" aria-hidden="true">
      <circle class="outer" cx="200" cy="200" r="188"></circle>
      <circle class="inner" cx="200" cy="200" r="163"></circle>
      <circle class="inner" cx="200" cy="200" r="145"></circle>
      <g class="ticks"><line *ngFor="let tick of ticks" x1="200" y1="9" x2="200" [attr.y2]="tick % 3 === 0 ? 25 : 17" [attr.transform]="'rotate(' + (tick * 5) + ' 200 200)'"></line></g>
    </svg>
    <div class="zodiac-glyph" aria-hidden="true">
      <span *ngFor="let sign of signs; let i = index" [style.left.%]="glyphX(i)" [style.top.%]="glyphY(i)" style="transform:translate(-50%,-50%)">{{ sign }}</span>
    </div>`,
})
export class ZodiacWheelComponent {
  readonly signs = ['♈︎','♉︎','♊︎','♋︎','♌︎','♍︎','♎︎','♏︎','♐︎','♑︎','♒︎','♓︎'];
  readonly ticks = Array.from({ length: 72 }, (_, i) => i);
  glyphX(index: number): number {
    const angle = (index * 30 - 90) * Math.PI / 180;
    return 50 + Math.cos(angle) * 42.9;
  }
  glyphY(index: number): number {
    const angle = (index * 30 - 90) * Math.PI / 180;
    return 50 + Math.sin(angle) * 42.9;
  }
}