import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { NebulaWebGLRenderer } from './nebula-webgl-renderer';

@Component({
  selector: 'app-cosmic-background',
  standalone: true,
  template: `
    <div #atmosphere class="atmosphere" aria-hidden="true">
      <svg class="nebula-filter-definitions" width="0" height="0" focusable="false">
        <defs>
          <filter id="nebula-smoke-flow" x="-12%" y="-12%" width="124%" height="124%">
            <feTurbulence type="fractalNoise" baseFrequency="0.010 0.014" numOctaves="1" seed="8" result="flow-noise">
              <animate attributeName="baseFrequency" dur="48s" values="0.010 0.014;0.013 0.009;0.009 0.012;0.010 0.014" keyTimes="0;0.34;0.72;1" calcMode="spline" keySplines=".45 0 .55 1;.45 0 .55 1;.45 0 .55 1" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="flow-noise" scale="17" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="nebula-smoke-static" x="-12%" y="-12%" width="124%" height="124%">
            <feTurbulence type="fractalNoise" baseFrequency="0.010 0.014" numOctaves="1" seed="8" result="flow-noise" />
            <feDisplacementMap in="SourceGraphic" in2="flow-noise" scale="11" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      <canvas #nebulaCanvas class="nebula-canvas"></canvas>
      <canvas #fallbackCanvas class="nebula-fallback-canvas"></canvas>
      <img #nebulaSource class="nebula-source" src="assets/nebula-master.png" alt="" draggable="false">
      <div class="starfield"></div>
      <i class="dust dust-a"></i>
      <i class="dust dust-b"></i>
      <i class="dust dust-c"></i>
      <i class="dust dust-d"></i>
    </div>`,
})
export class CosmicBackgroundComponent implements AfterViewInit, OnDestroy {
  @ViewChild('atmosphere', { static: true }) private atmosphere!: ElementRef<HTMLElement>;
  @ViewChild('nebulaCanvas', { static: true }) private canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('fallbackCanvas', { static: true }) private fallbackCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('nebulaSource', { static: true }) private sourceImage!: ElementRef<HTMLImageElement>;

  private renderer?: NebulaWebGLRenderer;

  constructor(private readonly zone: NgZone) {}

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.renderer = new NebulaWebGLRenderer(
        this.canvas.nativeElement,
        this.fallbackCanvas.nativeElement,
        this.sourceImage.nativeElement,
        this.atmosphere.nativeElement,
      );
      this.renderer.start();
    });
  }

  ngOnDestroy(): void {
    this.renderer?.destroy();
  }
}