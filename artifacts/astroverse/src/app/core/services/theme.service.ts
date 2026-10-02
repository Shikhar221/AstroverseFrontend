import { Injectable, signal } from '@angular/core';
import { AstroVisualState, PlanetId, PlanetTheme } from '../../models/planet-theme.model';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly themes: PlanetTheme[] = [
    { id: 'jupiter', name: 'Jupiter', glyph: '♃', adjective: 'Jovian', lordName: 'Guru (Jupiter)', primary: '#D9A441', glow: 'rgba(217,164,65,.46)', faint: 'rgba(217,164,65,.21)', nebulaOne: 'rgba(174,111,37,.43)', nebulaTwo: 'rgba(112,66,34,.36)', nebulaThree: 'rgba(136,100,42,.28)', yantra: 'lotus', signature: 'Wisdom · Expansion' },
    { id: 'mercury', name: 'Mercury', glyph: '☿', adjective: 'Mercurial', lordName: 'Budha (Mercury)', primary: '#43C66C', glow: 'rgba(67,198,108,.44)', faint: 'rgba(67,198,108,.2)', nebulaOne: 'rgba(39,131,83,.44)', nebulaTwo: 'rgba(61,117,83,.34)', nebulaThree: 'rgba(120,134,51,.27)', yantra: 'orbit', signature: 'Mind · Movement' },
    { id: 'saturn', name: 'Saturn', glyph: '♄', adjective: 'Saturnian', lordName: 'Shani (Saturn)', primary: '#536DCE', glow: 'rgba(83,109,206,.46)', faint: 'rgba(83,109,206,.21)', nebulaOne: 'rgba(53,67,145,.46)', nebulaTwo: 'rgba(60,69,116,.36)', nebulaThree: 'rgba(86,77,126,.29)', yantra: 'hexagram', signature: 'Time · Resolve' },
    { id: 'mars', name: 'Mars', glyph: '♂', adjective: 'Martian', lordName: 'Mangala (Mars)', primary: '#D84635', glow: 'rgba(216,70,53,.46)', faint: 'rgba(216,70,53,.21)', nebulaOne: 'rgba(143,49,38,.46)', nebulaTwo: 'rgba(126,56,50,.36)', nebulaThree: 'rgba(151,83,48,.29)', yantra: 'flame', signature: 'Force · Courage' },
    { id: 'sun', name: 'Sun', glyph: '☉', adjective: 'Solar', lordName: 'Surya (Sun)', primary: '#FFD45A', glow: 'rgba(255,212,90,.5)', faint: 'rgba(255,212,90,.24)', nebulaOne: 'rgba(185,128,39,.5)', nebulaTwo: 'rgba(142,90,31,.38)', nebulaThree: 'rgba(171,142,64,.3)', yantra: 'solar', signature: 'Radiance · Self' },
  ];

  readonly visualState = signal<AstroVisualState>({
    ascendantLord: 'jupiter',
    activePlanet: 'jupiter',
    syncStatus: 'Strong',
    communicationLatency: '5ms',
    currentSwara: 'Pingala Nadi (Heating)',
    dashaWindow: 'Open for Dasha',
  });
  readonly activeTheme = signal(this.themes[0]);

  constructor() {
    this.applyTheme(this.themes[0]);
  }

  selectPlanet(id: PlanetId): void {
    const theme = this.themes.find((item) => item.id === id);
    if (!theme) return;
    this.activeTheme.set(theme);
    this.visualState.update((state) => ({ ...state, activePlanet: id }));
    this.applyTheme(theme);
  }

  private applyTheme(theme: PlanetTheme): void {
    const root = document.documentElement;
    root.style.setProperty('--planet', theme.primary);
    root.style.setProperty('--planet-soft', theme.glow);
    root.style.setProperty('--planet-faint', theme.faint);
    root.style.setProperty('--nebula-one', theme.nebulaOne);
    root.style.setProperty('--nebula-two', theme.nebulaTwo);
    root.style.setProperty('--nebula-three', theme.nebulaThree);
  }
}