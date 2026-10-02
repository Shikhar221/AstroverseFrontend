import { Component, ElementRef, HostListener, signal, ViewChild } from '@angular/core';
import { CosmicBackgroundComponent } from '../../components/cosmic-background/cosmic-background.component';
import { ZodiacWheelComponent } from '../../components/zodiac-wheel/zodiac-wheel.component';
import { YantraComponent } from '../../components/yantra/yantra.component';
import { PlanetaryStatusComponent } from '../../components/planetary-status/planetary-status.component';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CosmicBackgroundComponent, ZodiacWheelComponent, YantraComponent, PlanetaryStatusComponent, SideMenuComponent],
  template: `
    <main class="cosmos" aria-label="AstroVerse planetary view">
      <app-cosmic-background></app-cosmic-background>
      <header class="topbar">
        <button #menuTrigger class="menu-trigger" type="button" aria-label="Open planet selector" [attr.aria-expanded]="menuOpen()" aria-controls="planet-selector" (click)="openMenu()">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h18M3 12h13M3 17h18"></path></svg>
        </button>
        <span class="wordmark">AstroVerse</span><span class="top-rule" aria-hidden="true"></span>
      </header>
      <app-planetary-status></app-planetary-status>
      <section class="instrument" aria-label="Current planetary yantra and zodiac wheel">
        <div class="aura"></div>
        <div class="zodiac-holder"><app-zodiac-wheel></app-zodiac-wheel></div>
        <div class="yantra-holder" [class.budha-integrated-holder]="theme.activeTheme().yantra === 'budha'"><app-yantra></app-yantra></div>
        @if (theme.activeTheme().yantra === 'budha') {
          <div class="budha-beej-fixed" aria-hidden="true">बं</div>
        }
      </section>

      <nav class="bottom-nav" aria-label="Primary navigation">
        <button class="nav-item active" type="button" aria-current="page">
          <span class="nav-icon" aria-hidden="true">⌂</span><span>Dashboard</span>
        </button>
        <button class="nav-item" type="button">
          <span class="nav-icon" aria-hidden="true">◫</span><span>Panchang</span>
        </button>
        <button class="nav-item" type="button">
          <span class="nav-icon nav-chat" aria-hidden="true">◌</span><span>Ask AI</span>
        </button>
        <button class="nav-item" type="button">
          <span class="nav-icon" aria-hidden="true">◇</span><span>Remedies</span>
        </button>
        <button class="nav-item" type="button">
          <span class="nav-icon" aria-hidden="true">⋯</span><span>More</span>
        </button>
      </nav>

      <app-side-menu [open]="menuOpen()" (closed)="closeMenu()"></app-side-menu>
    </main>`,
})
export class HomePage {
  readonly menuOpen = signal(false);
  @ViewChild('menuTrigger') menuTrigger?: ElementRef<HTMLButtonElement>;
  constructor(readonly theme: ThemeService) {}
  openMenu(): void { this.menuOpen.set(true); }
  closeMenu(): void {
    const wasOpen = this.menuOpen();
    this.menuOpen.set(false);
    if (wasOpen) setTimeout(() => this.menuTrigger?.nativeElement.focus(), 30);
  }
  @HostListener('document:keydown.escape') escape(): void { this.closeMenu(); }
}