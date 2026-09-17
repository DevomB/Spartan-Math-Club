"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";

/**
 * Two Lorenz trajectories whose initial conditions differ by 1e-5.
 * They trace the same path, then visibly diverge: sensitive dependence on
 * initial conditions, live. Integrated with RK4; paused offscreen; drawn
 * once statically under prefers-reduced-motion.
 */

const SIGMA = 10;
const BETA = 8 / 3;
const DT = 0.005;
const STEPS_PER_FRAME = 4;
const TRAIL = 2400;
const CHUNK = 48;
const EPSILON = 1e-5;

type Vec = [number, number, number];

function derivative([x, y, z]: Vec, rho: number): Vec {
  return [SIGMA * (y - x), x * (rho - z) - y, x * y - BETA * z];
}

function rk4(p: Vec, rho: number, dt: number): Vec {
  const k1 = derivative(p, rho);
  const k2 = derivative([p[0] + (dt / 2) * k1[0], p[1] + (dt / 2) * k1[1], p[2] + (dt / 2) * k1[2]], rho);
  const k3 = derivative([p[0] + (dt / 2) * k2[0], p[1] + (dt / 2) * k2[1], p[2] + (dt / 2) * k2[2]], rho);
  const k4 = derivative([p[0] + dt * k3[0], p[1] + dt * k3[1], p[2] + dt * k3[2]], rho);
  return [
    p[0] + (dt / 6) * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]),
    p[1] + (dt / 6) * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]),
    p[2] + (dt / 6) * (k1[2] + 2 * k2[2] + 2 * k3[2] + k4[2]),
  ];
}

class Trail {
  readonly buffer = new Float32Array(TRAIL * 3);
  head = 0;
  length = 0;
  point: Vec;

  constructor(start: Vec) {
    this.point = start;
  }

  push(p: Vec) {
    this.point = p;
    this.buffer.set(p, this.head * 3);
    this.head = (this.head + 1) % TRAIL;
    this.length = Math.min(this.length + 1, TRAIL);
  }

  /** i = 0 is the oldest retained point. */
  at(i: number): number {
    return ((this.head - this.length + i) % TRAIL + TRAIL) % TRAIL;
  }
}

const COLORS = {
  a: [255, 210, 63],
  b: [79, 179, 255],
} as const;

export function LorenzField({ children }: { children?: ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rhoRef = useRef(28);
  const resetRef = useRef<() => void>(() => {});
  const [rho, setRho] = useState(28);
  const [separation, setSeparation] = useState(EPSILON);
  const sliderId = useId();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let trails: [Trail, Trail];
    let angle = 0.6;
    let frame = 0;
    let raf = 0;
    let visible = true;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let view = { scale: 1, zc: 27 };

    const seed = () => {
      const start: Vec = [-8 + Math.random() * 0.5, 7, 27];
      trails = [new Trail(start), new Trail([start[0] + EPSILON, start[1], start[2]])];
    };

    const targetView = () => {
      const r = Math.max(rhoRef.current, 6);
      const halfW = Math.max(r * 0.95, 10);
      const halfH = Math.max(r * 0.9, 10);
      return {
        scale: Math.min(width / (2 * halfW), height / (2 * halfH)) * 0.92,
        zc: Math.max(rhoRef.current - 1, 2) * 0.96,
      };
    };

    const resize = () => {
      const box = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(box.width, 1);
      height = Math.max(box.height, 1);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      view = targetView();
      if (reduced.matches) drawStatic();
    };

    const advance = (steps: number) => {
      for (let s = 0; s < steps; s += 1) {
        for (const trail of trails) trail.push(rk4(trail.point, rhoRef.current, DT));
      }
    };

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const cx = width / 2;
      const cy = height / 2;
      const project = (buffer: Float32Array, index: number): [number, number] => {
        const x = buffer[index * 3];
        const y = buffer[index * 3 + 1];
        const z = buffer[index * 3 + 2];
        return [cx + (x * cos - y * sin) * view.scale, cy - (z - view.zc) * view.scale];
      };

      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = 1.15;

      trails.forEach((trail, which) => {
        const [r, g, b] = which === 0 ? COLORS.a : COLORS.b;
        const n = trail.length;
        for (let start = 0; start < n - 1; start += CHUNK) {
          const end = Math.min(start + CHUNK, n - 1);
          const age = end / n;
          ctx.strokeStyle = `rgba(${r},${g},${b},${(0.04 + 0.86 * age ** 2).toFixed(3)})`;
          ctx.beginPath();
          const [x0, y0] = project(trail.buffer, trail.at(start));
          ctx.moveTo(x0, y0);
          for (let i = start + 1; i <= end; i += 1) {
            const [x, y] = project(trail.buffer, trail.at(i));
            ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
        if (n > 0) {
          const [hx, hy] = project(trail.buffer, trail.at(n - 1));
          ctx.fillStyle = `rgb(${r},${g},${b})`;
          ctx.shadowColor = `rgba(${r},${g},${b},0.9)`;
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.arc(hx, hy, 2.6, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });
    };

    const drawStatic = () => {
      seed();
      advance(TRAIL);
      view = targetView();
      draw();
    };

    const tick = () => {
      raf = 0;
      if (!visible || document.hidden || reduced.matches) return;
      advance(STEPS_PER_FRAME);
      angle += 0.0016;
      const target = targetView();
      view = { scale: view.scale + (target.scale - view.scale) * 0.04, zc: view.zc + (target.zc - view.zc) * 0.04 };
      draw();
      frame += 1;
      if (frame % 15 === 0) {
        const [p, q] = trails;
        setSeparation(Math.hypot(p.point[0] - q.point[0], p.point[1] - q.point[1], p.point[2] - q.point[2]));
      }
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (!raf && visible && !document.hidden && !reduced.matches) raf = requestAnimationFrame(tick);
    };

    seed();
    resize();
    if (reduced.matches) drawStatic();
    else start();

    resetRef.current = () => {
      seed();
      setSeparation(EPSILON);
      if (reduced.matches) drawStatic();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
    });
    intersection.observe(canvas);
    const onVisibility = () => start();
    document.addEventListener("visibilitychange", onVisibility);
    const onMotionChange = () => (reduced.matches ? drawStatic() : start());
    reduced.addEventListener("change", onMotionChange);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      reduced.removeEventListener("change", onMotionChange);
    };
  }, []);

  const onRho = (value: number) => {
    rhoRef.current = value;
    setRho(value);
  };

  const regime =
    rho < 1
      ? "ρ < 1: every trajectory falls into the origin."
      : rho < 24.06
        ? "ρ < 24.06: trajectories eventually settle onto a fixed point."
        : rho < 24.74
          ? "24.06 < ρ < 24.74: stable fixed points and a strange attractor coexist."
          : "ρ > 24.74: chaos. Watch the two paths disagree.";

  return (
    <figure className="lorenz">
      <div className="lorenz-stage">
        <canvas ref={canvasRef} className="lorenz-canvas" aria-hidden="true" />
        <div className="lorenz-equations">{children}</div>
        <p className="lorenz-readout" aria-live="off">
          <span className="swatch swatch--a" aria-hidden="true" />
          <span className="swatch swatch--b" aria-hidden="true" />
          <span>
            |Δ| = <output>{separation < 1e-3 ? separation.toExponential(1) : separation.toFixed(2)}</output>
          </span>
        </p>
      </div>
      <figcaption className="lorenz-controls">
        <div className="lorenz-slider">
          <label htmlFor={sliderId}>
            ρ = <output htmlFor={sliderId}>{rho.toFixed(1)}</output>
          </label>
          <input
            id={sliderId}
            type="range"
            min={0.5}
            max={45}
            step={0.5}
            value={rho}
            onChange={(event) => onRho(Number(event.target.value))}
            aria-describedby={`${sliderId}-regime`}
          />
          <button type="button" className="lorenz-reset" onClick={() => resetRef.current()}>
            Restart
          </button>
        </div>
        <p className="lorenz-note" id={`${sliderId}-regime`}>
          Two Lorenz trajectories, started 10<sup>−5</sup> apart. {regime}
        </p>
      </figcaption>
    </figure>
  );
}
