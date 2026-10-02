import { Component, ElementRef, EventEmitter, HostListener, Input, Output, SimpleChanges, OnChanges, ViewChild } from '@angular/core';
import { NgFor } from '@angular/common';
import { PlanetId } from '../../models/planet-theme.model';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [NgFor],
  template: `
    <div class="menu-backdrop" [class.open]="open" (click)="dismiss()" aria-hidden="true"></div>
    <aside id="planet-selector" class="planet-drawer" [class.open]="open" role="dialog" aria-modal="true" aria-label="Choose an active planet" [attr.aria-hidden]="!open" [attr.inert]="!open ? '' : null">
      <header class="drawer-top">
        <div><div class="drawer-kicker">AstroVerse · Planetary field</div><h2 class="drawer-title">Choose your<br>current orbit.</h2></div>
        <button #closeButton class="close-menu" type="button" aria-label="Close planet selector" (click)="dismiss()">×</button>
      </header>
      <nav class="planet-list" aria-label="Planets">
        <button *ngFor="let planet of theme.themes" class="planet-option" [class.selected]="theme.activeTheme().id === planet.id" [attr.aria-current]="theme.activeTheme().id === planet.id ? 'true' : null" [attr.aria-label]="'Select ' + planet.name" type="button" (click)="choose(planet.id)">
          <span class="planet-mark" aria-hidden="true">{{ planet.glyph }}</span>
          <span><span class="planet-name">{{ planet.name }}</span><span class="planet-sub">{{ planet.signature }}</span></span>
          <span class="planet-check" aria-hidden="true"></span>
        </button>
      </nav>
      <footer class="drawer-foot"><span>{{ theme.activeTheme().glyph }}</span> &nbsp; A quieter way to read the sky.<br>One planet. One present moment.</footer>
    </aside>`,
})
export class SideMenuComponent implements OnChanges {
  @Input() open = false;
  @Output() closed = new EventEmitter<void>();
  @ViewChild('closeButton') closeButton?: ElementRef<HTMLButtonElement>;
  constructor(readonly theme: ThemeService) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open']?.currentValue) setTimeout(() => this.closeButton?.nativeElement.focus(), 40);
  }
  choose(id: PlanetId): void { this.theme.selectPlanet(id); this.dismiss(); }
  dismiss(): void { this.closed.emit(); }
  @HostListener('document:keydown.escape') onEscape(): void { if (this.open) this.dismiss(); }
}