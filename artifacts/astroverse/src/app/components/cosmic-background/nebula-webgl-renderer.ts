const VERTEX_SHADER = `
  attribute vec2 a_position;
  varying vec2 v_uv;

  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision mediump float;

  uniform sampler2D u_nebula;
  uniform vec2 u_resolution;
  uniform vec2 u_image_size;
  uniform float u_time;
  varying vec2 v_uv;

  float hash(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  float valueNoise(vec2 p) {
    vec2 cell = floor(p);
    vec2 local = fract(p);
    local = local * local * (3.0 - 2.0 * local);

    float a = hash(cell);
    float b = hash(cell + vec2(1.0, 0.0));
    float c = hash(cell + vec2(0.0, 1.0));
    float d = hash(cell + vec2(1.0, 1.0));
    return mix(mix(a, b, local.x), mix(c, d, local.x), local.y);
  }

  vec2 coverUv(vec2 uv, float horizontalPosition) {
    float viewportAspect = u_resolution.x / u_resolution.y;
    float imageAspect = u_image_size.x / u_image_size.y;
    vec2 result = uv;

    if (viewportAspect < imageAspect) {
      float visibleWidth = viewportAspect / imageAspect;
      result.x = uv.x * visibleWidth + (1.0 - visibleWidth) * horizontalPosition;
    } else {
      float visibleHeight = imageAspect / viewportAspect;
      result.y = uv.y * visibleHeight + (1.0 - visibleHeight) * 0.5;
    }

    return result;
  }

  vec2 smokeFlow(vec2 uv, float phase) {
    // Continuous multi-scale atmospheric flow. Two independent domains
    // move at different rates/directions so the nebula never visually settles.
    vec2 field = uv * vec2(3.15, 2.65);
    vec2 slowDrift = vec2(u_time * 0.090, -u_time * 0.066);
    vec2 rollingDrift = vec2(-u_time * 0.037, u_time * 0.051);

    float slowX = valueNoise(
      field + slowDrift + vec2(phase * 0.73, phase * 0.37)
    );
    float slowY = valueNoise(
      field * 1.19 - slowDrift * 0.86 + vec2(8.7 + phase, 3.1 - phase)
    );
    vec2 broadWarp = (vec2(slowX, slowY) - 0.5) * 0.078;

    vec2 rollingField = (uv + broadWarp) * vec2(5.1, 4.2);
    float rollX = valueNoise(
      rollingField + rollingDrift + vec2(phase * 1.17, 2.4)
    );
    float rollY = valueNoise(
      rollingField * 1.27 - rollingDrift * 0.91 + vec2(6.2, phase * 0.83)
    );
    vec2 rollingWarp = (vec2(rollX, rollY) - 0.5) * 0.034;

    vec2 detailField = (uv + broadWarp + rollingWarp) * vec2(8.0, 6.4);
    float detailX = valueNoise(
      detailField + vec2(-u_time * 0.048 + phase, u_time * 0.037)
    );
    float detailY = valueNoise(
      detailField * 1.21 + vec2(u_time * 0.041, -u_time * 0.052 + phase)
    );

    return broadWarp + rollingWarp + (vec2(detailX, detailY) - 0.5) * 0.016;
  }

  float luminance(vec3 color) {
    return dot(color, vec3(0.299, 0.587, 0.114));
  }

  void main() {
    vec2 mainUv = coverUv(v_uv, 0.50);
    vec2 rightUv = coverUv(v_uv, 0.68);
    vec2 leftUv = coverUv(v_uv, 0.32);

    vec2 flowA = smokeFlow(mainUv, 0.0);
    vec2 flowB = smokeFlow(mainUv + vec2(2.13, 5.7), 13.0);
    vec2 mainSample = clamp(mainUv + flowA, 0.001, 0.999);
    vec2 rightSample = clamp(rightUv + flowB * 0.82, 0.001, 0.999);
    vec2 leftSample = clamp(leftUv + flowA * -0.46 + flowB * 0.62, 0.001, 0.999);

    float mainCloud = luminance(texture2D(u_nebula, mainSample).rgb);
    float rightCloud = luminance(texture2D(u_nebula, rightSample).rgb);
    float leftCloud = luminance(texture2D(u_nebula, leftSample).rgb);
    float cloudLuminance = mainCloud * 0.76 + rightCloud * 0.17 + leftCloud * 0.07;
    // Lift the darkest source pixels into the planet's dark color family.
    // This prevents the raw black of the monochrome master from becoming
    // black on screen; the nebula should transition dark-green -> green -> light-green.
    cloudLuminance = 0.22 + pow(clamp(cloudLuminance, 0.0, 1.0), 0.88) * 0.78;

    gl_FragColor = vec4(vec3(cloudLuminance), 1.0);
  }
`;

export class NebulaWebGLRenderer {
  private gl: WebGLRenderingContext | null = null;
  private program: WebGLProgram | null = null;
  private buffer: WebGLBuffer | null = null;
  private texture: WebGLTexture | null = null;
  private timeUniform: WebGLUniformLocation | null = null;
  private resolutionUniform: WebGLUniformLocation | null = null;
  private imageSizeUniform: WebGLUniformLocation | null = null;
  private animationFrame: number | null = null;
  private resizeObserver?: ResizeObserver;
  private motionPreference?: MediaQueryList;
  private reducedMotion = false;
  private startTime = 0;
  private destroyed = false;
  private canvas2d: CanvasRenderingContext2D | null = null;
  private fallbackAnimationFrame: number | null = null;
  private fallbackWidth = 0;
  private fallbackHeight = 0;
  private sourceCanvas?: HTMLCanvasElement;
  private sourceContext?: CanvasRenderingContext2D;

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly fallbackCanvas: HTMLCanvasElement,
    private readonly sourceImage: HTMLImageElement,
    private readonly atmosphere: HTMLElement,
  ) {}

  start(): void {
    if (this.sourceImage.complete && this.sourceImage.naturalWidth > 0) {
      this.initialize();
      return;
    }

    this.sourceImage.addEventListener('load', this.handleImageLoad);
    this.sourceImage.addEventListener('error', this.handleImageError);
  }

  destroy(): void {
    this.destroyed = true;
    this.sourceImage.removeEventListener('load', this.handleImageLoad);
    this.sourceImage.removeEventListener('error', this.handleImageError);
    this.canvas.removeEventListener('webglcontextlost', this.handleContextLost);
    window.removeEventListener('resize', this.handleResize);
    this.stopFallbackAnimation();
    this.motionPreference?.removeEventListener('change', this.handleMotionPreference);
    this.resizeObserver?.disconnect();
    this.stopAnimation();
    this.releaseResources();
  }

  private readonly handleImageLoad = (): void => {
    this.initialize();
  };

  private readonly handleImageError = (): void => {
    this.useStaticFallback(new Error('The nebula texture could not be loaded.'));
  };

  private readonly handleContextLost = (): void => {
    this.useStaticFallback(new Error('The WebGL context was lost.'));
  };

  private readonly handleResize = (): void => {
    this.resizeCanvas();
    if (this.reducedMotion) this.draw(0);
  };

  private readonly handleMotionPreference = (event: MediaQueryListEvent): void => {
    this.reducedMotion = event.matches;
    this.stopAnimation();

    if (this.reducedMotion) {
      this.draw(0);
      return;
    }

    this.startTime = performance.now();
    this.animationFrame = requestAnimationFrame(this.renderFrame);
  };

  private initialize(): void {
    if (this.destroyed || this.gl) return;

    try {
      const gl = this.canvas.getContext('webgl', {
        alpha: false,
        antialias: false,
        depth: false,
        stencil: false,
        powerPreference: 'low-power',
      });
      if (!gl) throw new Error('WebGL is unavailable in this browser.');

      this.gl = gl;
      this.program = this.createProgram(gl);
      gl.useProgram(this.program);

      const position = gl.getAttribLocation(this.program, 'a_position');
      if (position < 0) throw new Error('The nebula shader has no position attribute.');

      this.buffer = gl.createBuffer();
      if (!this.buffer) throw new Error('Could not allocate the nebula vertex buffer.');
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

      this.texture = gl.createTexture();
      if (!this.texture) throw new Error('Could not allocate the nebula texture.');
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.sourceImage);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      this.timeUniform = gl.getUniformLocation(this.program, 'u_time');
      this.resolutionUniform = gl.getUniformLocation(this.program, 'u_resolution');
      this.imageSizeUniform = gl.getUniformLocation(this.program, 'u_image_size');
      const sampler = gl.getUniformLocation(this.program, 'u_nebula');
      if (!this.timeUniform || !this.resolutionUniform || !this.imageSizeUniform || !sampler) {
        throw new Error('A required nebula shader uniform is unavailable.');
      }

      gl.uniform1i(sampler, 0);
      gl.uniform2f(this.imageSizeUniform, this.sourceImage.naturalWidth, this.sourceImage.naturalHeight);
      gl.disable(gl.DEPTH_TEST);
      gl.disable(gl.BLEND);
      gl.clearColor(0, 0, 0, 1);

      this.canvas.addEventListener('webglcontextlost', this.handleContextLost);
      this.motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.reducedMotion = this.motionPreference.matches;
      this.motionPreference.addEventListener('change', this.handleMotionPreference);
      this.resizeObserver = new ResizeObserver(this.handleResize);
      this.resizeObserver.observe(this.canvas);
      window.addEventListener('resize', this.handleResize, { passive: true });

      this.atmosphere.classList.remove('webgl-unavailable', 'canvas-fallback');
      this.fallbackCanvas.style.opacity = '0';
      this.setRendererState('webgl');
      this.resizeCanvas();
      this.startTime = performance.now();
      if (this.reducedMotion) this.draw(0);
      else this.animationFrame = requestAnimationFrame(this.renderFrame);
    } catch (error) {
      this.useStaticFallback(error);
    }
  }

  private createProgram(gl: WebGLRenderingContext): WebGLProgram {
    const vertex = this.compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragment = this.compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    const program = gl.createProgram();
    if (!program) throw new Error('Could not allocate the nebula shader program.');

    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const message = gl.getProgramInfoLog(program) || 'Unknown shader link error.';
      gl.deleteProgram(program);
      throw new Error(message);
    }
    return program;
  }

  private compileShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader {
    const shader = gl.createShader(type);
    if (!shader) throw new Error('Could not allocate a nebula shader.');
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const message = gl.getShaderInfoLog(shader) || 'Unknown shader compile error.';
      gl.deleteShader(shader);
      throw new Error(message);
    }
    return shader;
  }

  private resizeCanvas(): void {
    const gl = this.gl;
    if (!gl) return;

    const bounds = this.canvas.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
    const width = Math.max(1, Math.round(bounds.width * pixelRatio));
    const height = Math.max(1, Math.round(bounds.height * pixelRatio));
    if (this.canvas.width === width && this.canvas.height === height) return;

    this.canvas.width = width;
    this.canvas.height = height;
    gl.viewport(0, 0, width, height);
    if (this.resolutionUniform) gl.uniform2f(this.resolutionUniform, width, height);
  }

  private readonly renderFrame = (timestamp: number): void => {
    this.animationFrame = null;
    if (this.destroyed || !this.gl) return;

    const seconds = this.reducedMotion ? 0 : (timestamp - this.startTime) * 0.001;
    this.draw(seconds);
    if (!this.reducedMotion) this.animationFrame = requestAnimationFrame(this.renderFrame);
  };

  private draw(seconds: number): void {
    const gl = this.gl;
    if (!gl || !this.timeUniform) return;
    gl.uniform1f(this.timeUniform, seconds);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  private stopAnimation(): void {
    if (this.animationFrame === null) return;
    cancelAnimationFrame(this.animationFrame);
    this.animationFrame = null;
  }

  private useStaticFallback(error: unknown): void {
    if (this.destroyed) return;
    this.stopAnimation();
    this.releaseResources();

    try {
      const context = this.fallbackCanvas.getContext('2d', { alpha: false, desynchronized: true });
      if (!context) throw new Error('Canvas 2D is unavailable in this browser.');

      this.canvas2d = context;
      this.prepareFallbackSource();
      this.resizeCanvasFallback();
      this.atmosphere.classList.remove('webgl-unavailable');
      this.atmosphere.classList.add('canvas-fallback');
      this.fallbackCanvas.style.opacity = '1';
      this.setRendererState('canvas');
      console.info('AstroVerse is using Canvas 2D atmospheric deformation because WebGL is unavailable.', error);
      this.startFallbackAnimation();
    } catch (fallbackError) {
      this.atmosphere.classList.remove('canvas-fallback');
      this.atmosphere.classList.add('webgl-unavailable');
      this.setRendererState('canvas-unavailable');
      console.warn('AstroVerse could not initialize either WebGL or Canvas 2D nebula rendering.', fallbackError);
    }
  }

  private prepareFallbackSource(): void {
    if (this.sourceCanvas && this.sourceContext) return;
    const canvas = document.createElement('canvas');
    canvas.width = this.sourceImage.naturalWidth;
    canvas.height = this.sourceImage.naturalHeight;
    const context = canvas.getContext('2d', { alpha: false });
    if (!context) throw new Error('Could not create the nebula source canvas.');
    context.drawImage(this.sourceImage, 0, 0);
    this.sourceCanvas = canvas;
    this.sourceContext = context;
  }

  private resizeCanvasFallback(): void {
    if (!this.canvas2d) return;
    const bounds = this.fallbackCanvas.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
    this.fallbackWidth = Math.max(1, Math.round(bounds.width * dpr));
    this.fallbackHeight = Math.max(1, Math.round(bounds.height * dpr));
    this.fallbackCanvas.width = this.fallbackWidth;
    this.fallbackCanvas.height = this.fallbackHeight;
  }

  private startFallbackAnimation(): void {
    this.stopFallbackAnimation();
    this.fallbackAnimationFrame = requestAnimationFrame(this.renderFallbackFrame);
  }

  private readonly renderFallbackFrame = (timestamp: number): void => {
    this.fallbackAnimationFrame = null;
    if (this.destroyed || !this.canvas2d) return;
    this.drawCanvasFallback(timestamp * 0.001);
    this.fallbackAnimationFrame = requestAnimationFrame(this.renderFallbackFrame);
  };

  private drawCanvasFallback(seconds: number): void {
    const context = this.canvas2d;
    const source = this.sourceCanvas;
    if (!context || !source || !this.fallbackWidth || !this.fallbackHeight) return;

    const viewportAspect = this.fallbackWidth / this.fallbackHeight;
    const imageAspect = source.width / source.height;
    let sourceX = 0;
    let sourceY = 0;
    let sourceWidth = source.width;
    let sourceHeight = source.height;

    if (viewportAspect < imageAspect) {
      sourceWidth = source.height * viewportAspect;
      sourceX = (source.width - sourceWidth) * 0.5;
    } else {
      sourceHeight = source.width / viewportAspect;
      sourceY = (source.height - sourceHeight) * 0.5;
    }

    context.clearRect(0, 0, this.fallbackWidth, this.fallbackHeight);

    const bands = 72;
    const bandHeight = this.fallbackHeight / bands;
    for (let band = 0; band < bands; band++) {
      const y = band * bandHeight;
      const v = (band + 0.5) / bands;
      const phase = v * 7.2;
      const waveA = Math.sin(seconds * 0.13 + phase * 0.72) * 9;
      const waveB = Math.sin(seconds * 0.29 - phase * 0.43 + 1.7) * 4.5;
      const waveC = Math.sin(seconds * 0.47 + phase * 0.21 + 4.2) * 2;
      const xDisplacement = waveA + waveB + waveC;
      const yDisplacement =
        Math.sin(seconds * 0.11 + phase * 0.55) * 2.8 +
        Math.sin(seconds * 0.25 - phase * 0.31) * 1.4;

      const sy = sourceY + v * sourceHeight;
      const sh = Math.max(1, sourceHeight / bands);
      context.drawImage(
        source,
        sourceX,
        sy,
        sourceWidth,
        sh,
        xDisplacement,
        y + yDisplacement,
        this.fallbackWidth,
        bandHeight + 1,
      );
    }
  }

  private stopFallbackAnimation(): void {
    if (this.fallbackAnimationFrame !== null) {
      cancelAnimationFrame(this.fallbackAnimationFrame);
      this.fallbackAnimationFrame = null;
    }
    this.canvas2d = null;
  }

  private setRendererState(mode: 'webgl' | 'canvas' | 'canvas-unavailable'): void {
    this.atmosphere.dataset['renderer'] = mode;
    this.atmosphere.dataset['rendererDebug'] =
      new URLSearchParams(window.location.search).get('debugRenderer') === '1' ? 'true' : 'false';
  }

  private releaseResources(): void {
    if (!this.gl) return;
    if (this.texture) this.gl.deleteTexture(this.texture);
    if (this.buffer) this.gl.deleteBuffer(this.buffer);
    if (this.program) this.gl.deleteProgram(this.program);
    this.texture = null;
    this.buffer = null;
    this.program = null;
    this.gl = null;
  }
}