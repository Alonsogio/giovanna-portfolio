import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

import * as THREE from 'three';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.html',
})
export class Hero implements AfterViewInit, OnDestroy {
  @ViewChild('threadsCanvas', { static: true })
  threadsCanvas!: ElementRef<HTMLDivElement>;

  private scene!: THREE.Scene;
  private camera!: THREE.OrthographicCamera;
  private renderer!: THREE.WebGLRenderer;

  private lines!: THREE.LineSegments;
  private geometry!: THREE.BufferGeometry;
  private material!: THREE.LineBasicMaterial;

  private animationId = 0;
  private time = 0;

  ngAfterViewInit(): void {
    this.initThreads();
    this.animate();
  }

  private initThreads(): void {
    const container = this.threadsCanvas.nativeElement;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // ============================================
    // SCENE
    // ============================================

    this.scene = new THREE.Scene();

    // ============================================
    // CAMERA
    // ============================================

    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);

    this.camera.position.z = 2;

    // ============================================
    // RENDERER
    // ============================================

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.renderer.setSize(width, height);

    this.renderer.setClearColor(0x000000, 0);

    this.renderer.domElement.style.width = '100%';
    this.renderer.domElement.style.height = '100%';
    this.renderer.domElement.style.display = 'block';

    container.appendChild(this.renderer.domElement);

    // ============================================
    // THREADS
    // ============================================

    this.createThreads();

    window.addEventListener('resize', this.handleResize);
  }

  private createThreads(): void {
    const lines = 18;
    const pointsPerLine = 100;

    const positions: number[] = [];

    for (let line = 0; line < lines; line++) {
      const offset = (line / (lines - 1)) * 2 - 1;

      for (let point = 0; point < pointsPerLine - 1; point++) {
        const x1 = (point / pointsPerLine) * 2 - 1;

        const x2 = ((point + 1) / pointsPerLine) * 2 - 1;

        const y1 = offset + Math.sin(x1 * 3 + line * 0.4) * 0.08;

        const y2 = offset + Math.sin(x2 * 3 + line * 0.4) * 0.08;

        positions.push(
          x1,
          y1,
          0,

          x2,
          y2,
          0,
        );
      }
    }

    this.geometry = new THREE.BufferGeometry();

    this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

    this.material = new THREE.LineBasicMaterial({
      color: 0x7c3aed,
      transparent: true,
      opacity: 0.12,
      depthWrite: false,
    });

    this.lines = new THREE.LineSegments(this.geometry, this.material);

    this.scene.add(this.lines);
  }

  private animate = (): void => {
    this.animationId = requestAnimationFrame(this.animate);

    this.time += 0.01;

    const position = this.geometry.getAttribute('position') as THREE.BufferAttribute;

    const lines = 18;
    const pointsPerLine = 100;

    let index = 0;

    for (let line = 0; line < lines; line++) {
      const offset = (line / (lines - 1)) * 2 - 1;

      for (let point = 0; point < pointsPerLine - 1; point++) {
        const x1 = (point / pointsPerLine) * 2 - 1;

        const x2 = ((point + 1) / pointsPerLine) * 2 - 1;

        const y1 = offset + Math.sin(x1 * 3 + line * 0.4 + this.time) * 0.08;

        const y2 = offset + Math.sin(x2 * 3 + line * 0.4 + this.time) * 0.08;

        position.setXYZ(index, x1, y1, 0);

        index++;

        position.setXYZ(index, x2, y2, 0);

        index++;
      }
    }

    position.needsUpdate = true;

    this.renderer.render(this.scene, this.camera);
  };

  private handleResize = (): void => {
    if (!this.renderer) {
      return;
    }

    const container = this.threadsCanvas.nativeElement;

    const width = container.clientWidth || 500;

    const height = container.clientHeight || 500;

    this.renderer.setSize(width, height);
  };

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);

    window.removeEventListener('resize', this.handleResize);

    this.geometry?.dispose();
    this.material?.dispose();
    this.renderer?.dispose();

    if (this.renderer?.domElement) {
      this.renderer.domElement.remove();
    }
  }
}
