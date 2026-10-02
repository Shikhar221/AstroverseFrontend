import { Component } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-planetary-status',
  standalone: true,
  template: `
    <div class="readout sync"><span class="dynamic-line">{{ theme.activeTheme().adjective }} Sync:</span><strong>{{ state().syncStatus }}</strong></div>
    <div class="readout latency"><span class="label">Communication</span><strong>Latency: {{ state().communicationLatency }}</strong></div>
    <div class="readout swara"><span class="label">Current Swara:</span><strong>{{ state().currentSwara }}</strong></div>
    <div class="readout window"><strong>{{ theme.activeTheme().lordName }}</strong><span class="label">Window:</span><strong>{{ state().dashaWindow }}</strong></div>`,
})
export class PlanetaryStatusComponent {
  constructor(readonly theme: ThemeService) {}
  get state() { return this.theme.visualState; }
}