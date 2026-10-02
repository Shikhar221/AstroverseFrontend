import { Injectable, signal } from '@angular/core';
import { AstroVisualState, PlanetId, PlanetTheme } from '../../models/planet-theme.model';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly themes: PlanetTheme[] = [
    { id: 'jupiter', name: 'Jupiter', glyph: '♃', adjective: 'Jovian', lordName: 'Guru (Jupiter)', primary: '#D9A441', glow: 'rgba(217,164,65,.46)', faint: 'rgba(217,164,65,.21)', nebulaOne: 'rgba(174,111,37,.43)', nebulaTwo: 'rgba(112,66,34,.36)', nebulaThree: 'rgba(124,77,30,.28)', nebulaHue: -8, nebulaSaturation: 2.65, yantra: 'lotus', signature: 'Wisdom · Expansion' },
    { id: 'mercury', name: 'Mercury', glyph: '☿', adjective: 'Mercurial', lordName: 'Budha (Mercury)', primary: '#A6E8B8', glow: 'rgba(120,220,158,.40)', faint: 'rgba(80,185,120,.20)', nebulaOne: 'rgba(15,122,73,.52)', nebulaTwo: 'rgba(26,101,68,.40)', nebulaThree: 'rgba(62,150,96,.32)', nebulaHue: 96, nebulaSaturation: 1.45, yantra: 'budha', signature: 'Mind · Movement' },
    { id: 'saturn', name: 'Saturn', glyph: '♄', adjective: 'Saturnian', lordName: 'Shani (Saturn)', primary: '#536DCE', glow: 'rgba(83,109,206,.46)', faint: 'rgba(83,109,206,.21)', nebulaOne: 'rgba(53,67,145,.46)', nebulaTwo: 'rgba(60,69,116,.36)', nebulaThree: 'rgba(86,77,126,.29)', nebulaHue: 205, nebulaSaturation: 2.2, yantra: 'hexagram', signature: 'Time · Resolve' },
    { id: 'mars', name: 'Mars', glyph: '♂', adjective: 'Martian', lordName: 'Mangala (Mars)', primary: '#D84635', glow: 'rgba(216,70,53,.46)', faint: 'rgba(216,70,53,.21)', nebulaOne: 'rgba(143,49,38,.46)', nebulaTwo: 'rgba(126,56,50,.36)', nebulaThree: 'rgba(151,83,48,.29)', nebulaHue: 318, nebulaSaturation: 2.3, yantra: 'flame', signature: 'Force · Courage' },
    { id: 'sun', name: 'Sun', glyph: '☉', adjective: 'Solar', lordName: 'Surya (Sun)', primary: '#FFD45A', glow: 'rgba(255,212,90,.5)', faint: 'rgba(255,212,90,.24)', nebulaOne: 'rgba(185,128,39,.5)', nebulaTwo: 'rgba(142,90,31,.38)', nebulaThree: 'rgba(171,142,64,.3)', nebulaHue: 5, nebulaSaturation: 2.5, yantra: 'solar', signature: 'Radiance · Self' },
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
    root.style.setProperty('--nebula-hue', `${theme.nebulaHue}deg`);
    root.style.setProperty('--nebula-saturation', `${theme.nebulaSaturation}`);
    root.style.setProperty('--nebula-contrast', theme.id === 'mercury' ? '1.10' : '1.18');
    root.style.setProperty('--nebula-brightness', theme.id === 'mercury' ? '1.06' : '.94');
    root.style.setProperty('--cosmos-center', theme.id === 'mercury' ? 'rgba(16,70,45,.26)' : 'rgba(21,21,25,.22)');
    root.style.setProperty('--cosmos-edge', theme.id === 'mercury' ? 'rgba(4,35,22,.22)' : 'rgba(7,8,12,.64)');
    root.style.setProperty('--vignette-opacity', theme.id === 'mercury' ? '.07' : '.34');
  }
}