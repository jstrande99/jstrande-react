"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ShaderHero.module.css";

/* Vertex shader — standard full-screen quad. */
const VERT = `#version 300 es
in vec2 a_position;
out vec2 v_uv;
void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

/* Fragment shader — flowing multi-octave simplex-like noise, mapped through
 * the site's palette. Uniforms:
 *   u_time        monotonically rising seconds
 *   u_resolution  canvas pixel size
 *   u_scroll      0 at hero top → 1 at hero bottom, drives "depth" fade
 *   u_mouse       0..1 normalized cursor position
 *
 * Noise is a cheap 3-octave FBM of a classic 2D value-noise variant —
 * keeps the shader dependency-free and cheap on integrated GPUs. */
const FRAG = `#version 300 es
precision highp float;

in  vec2 v_uv;
out vec4 fragColor;

uniform float u_time;
uniform vec2  u_resolution;
uniform float u_scroll;
uniform vec2  u_mouse;

/* Hash + value noise — small, fast, good-enough for background flow */
float hash(vec2 p) {
  p = fract(p * vec2(123.34, 345.45));
  p += dot(p, p + 34.345);
  return fract(p.x * p.y);
}
float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * vnoise(p);
    p = p * 2.0 + 11.3;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = v_uv;
  float ratio = u_resolution.x / max(u_resolution.y, 1.0);
  vec2 p = (uv - 0.5) * vec2(ratio, 1.0);

  /* Slow flow field — two rotated sampling positions that weave together. */
  float t = u_time * 0.04;
  vec2 q = p * 1.6;
  q += 0.35 * vec2(sin(q.y * 1.3 + t),  cos(q.x * 1.1 - t * 0.8));
  q += 0.15 * (u_mouse - 0.5);

  float n1 = fbm(q + vec2(t * 1.2, 0.0));
  float n2 = fbm(q * 1.8 + vec2(0.0, t * 0.9));
  float n  = n1 * 0.65 + n2 * 0.35;

  /* Scroll dampens the field as you leave the hero. */
  n *= smoothstep(1.0, 0.1, u_scroll);

  /* Radial vignette keeps attention centered. */
  float r = length(p);
  float vig = smoothstep(1.2, 0.2, r);

  /* Palette mix — site tokens translated to linear RGB.
   *   bg       = #0a0806
   *   goldDeep = #6b4e1e
   *   gold     = #c9a14a
   *   goldHigh = #f5e6b8
   */
  vec3 bg       = vec3(0.039, 0.031, 0.024);
  vec3 goldDeep = vec3(0.420, 0.306, 0.118);
  vec3 gold     = vec3(0.788, 0.631, 0.290);
  vec3 goldHigh = vec3(0.902, 0.812, 0.631);

  vec3 col = bg;
  float m = smoothstep(0.05, 0.75, n);
  col = mix(col, goldDeep, m * 0.95);
  col = mix(col, gold, smoothstep(0.35, 0.8, n) * vig * 0.55);
  col = mix(col, goldHigh, smoothstep(0.65, 0.95, n) * vig * 0.28);

  /* Faint noise-grain to kill banding. */
  float grain = hash(uv * u_resolution + t * 200.0) - 0.5;
  col += grain * 0.015;

  /* Apply a subtle gamma for OS-agnostic richness. */
  col = pow(col, vec3(1.0 / 1.1));

  fragColor = vec4(col, 1.0);
}`;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    /* Swallow errors silently — caller falls back to CSS orbs. */
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

/* ShaderHero
 *   Renders an absolute-positioned canvas behind the hero content.
 *   Mounts lazily (after first paint). Pauses render when tab hidden or
 *   when hero is out of viewport. Exposes u_scroll, driven by page scroll. */
export default function ShaderHero({
  targetRef,
}: {
  targetRef: React.RefObject<HTMLElement | null>;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const c = canvas.current;
    if (!c) return;

    /* Respect reduced-motion — stay with CSS orbs. */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const gl = c.getContext("webgl2", {
      antialias: false,
      alpha: false,
      premultipliedAlpha: false,
      powerPreference: "high-performance",
    });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    /* Full-screen quad (two triangles). */
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    const posLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, "u_time");
    const uRes = gl.getUniformLocation(program, "u_resolution");
    const uScroll = gl.getUniformLocation(program, "u_scroll");
    const uMouse = gl.getUniformLocation(program, "u_mouse");

    /* Sizing — cap DPR at 1.4 for GPU safety on retina displays. */
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.4);
      const rect = c.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width * dpr));
      const h = Math.max(1, Math.floor(rect.height * dpr));
      if (c.width !== w || c.height !== h) {
        c.width = w;
        c.height = h;
        gl.viewport(0, 0, w, h);
      }
    };
    resize();

    let mouseX = 0.5;
    let mouseY = 0.5;
    const onMove = (e: PointerEvent) => {
      const rect = c.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width;
      mouseY = 1 - (e.clientY - rect.top) / rect.height;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("resize", resize);

    let scroll = 0;
    let scrollRaf = 0;
    const readScroll = () => {
      scrollRaf = 0;
      const el = targetRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height;
      scroll = Math.min(1, Math.max(0, -rect.top / total));
    };
    const onScroll = () => {
      if (!scrollRaf) scrollRaf = requestAnimationFrame(readScroll);
    };
    readScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    let raf = 0;
    let visible = true;
    let running = true;
    let paintedOnce = false;

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      },
      { rootMargin: "50px" }
    );
    io.observe(c);

    const onVis = () => {
      running = !document.hidden;
      if (running) tick();
    };
    document.addEventListener("visibilitychange", onVis);

    const start = performance.now();
    const tick = () => {
      if (!running) return;
      raf = requestAnimationFrame(tick);
      if (!visible && paintedOnce) return;
      resize();
      const t = (performance.now() - start) / 1000;
      gl.uniform1f(uTime, t);
      gl.uniform2f(uRes, c.width, c.height);
      gl.uniform1f(uScroll, scroll);
      gl.uniform2f(uMouse, mouseX, mouseY);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      if (!paintedOnce) {
        paintedOnce = true;
        setReady(true);
      }
    };
    tick();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
      io.disconnect();
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(vbo);
    };
  }, [targetRef]);

  return (
    <canvas
      ref={canvas}
      className={`${styles.canvas} ${ready ? styles.canvasReady : ""}`}
      aria-hidden="true"
    />
  );
}
