export type PlanetId = 'jupiter' | 'mercury' | 'saturn' | 'mars' | 'sun';

export interface PlanetTheme {
  id: PlanetId;
  name: string;
  glyph: string;
  adjective: string;
  lordName: string;
  primary: string;
  glow: string;
  faint: string;
  nebulaOne: string;
  nebulaTwo: string;
  nebulaThree: string;
  yantra: 'lotus' | 'orbit' | 'hexagram' | 'flame' | 'solar';
  signature: string;
}

/** Replaceable local presentation boundary; deliberately contains no calculations. */
export interface AstroVisualState {
  ascendantLord: PlanetId;
  activePlanet: PlanetId;
  syncStatus: 'Strong';
  communicationLatency: '5ms';
  currentSwara: 'Pingala Nadi (Heating)';
  dashaWindow: 'Open for Dasha';
}