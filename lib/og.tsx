import { CREST_RING_TEXT } from "@/components/brand/crest";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** Shared pieces for build-time images (OG card, app icon), rendered with next/og. */

export const OG = {
  board: "#121311",
  chalk: "#f3f1ea",
  dust: "#9c9e98",
  yellow: "#ffd23f",
} as const;

export async function ogFonts() {
  const dir = join(process.cwd(), "lib/fonts");
  const [board, mono, cm, cmItalic] = await Promise.all([
    readFile(join(dir, "FrederickaTheGreat-Regular.woff")),
    readFile(join(dir, "IBMPlexMono-Medium.woff")),
    readFile(join(dir, "KaTeX_Main-Regular.ttf")),
    readFile(join(dir, "KaTeX_Main-Italic.ttf")),
  ]);
  return [
    { name: "Board", data: board, style: "normal" as const, weight: 400 as const },
    { name: "Mono", data: mono, style: "normal" as const, weight: 500 as const },
    { name: "CM", data: cm, style: "normal" as const, weight: 400 as const },
    { name: "CM", data: cmItalic, style: "italic" as const, weight: 400 as const },
  ];
}

function Star({ size, color }: { size: number; color: string }) {
  const points = Array.from({ length: 12 }, (_, i) => {
    const r = i % 2 === 0 ? size / 2 : size / 5;
    const a = (Math.PI / 6) * i - Math.PI / 2;
    return `${(size / 2 + r * Math.cos(a)).toFixed(2)},${(size / 2 + r * Math.sin(a)).toFixed(2)}`;
  }).join(" ");
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <polygon points={points} fill={color} />
    </svg>
  );
}

/**
 * The full crest for satori, which has no <textPath>: ring letters are placed
 * one by one around the circle, matching the SVG crest's geometry (viewBox 120).
 */
export function OgCrest({ size, ink = OG.chalk, accent = OG.yellow }: { size: number; ink?: string; accent?: string }) {
  const k = size / 120;
  const chars = Array.from(CREST_RING_TEXT);
  const step = 360 / chars.length;
  const fontSize = 7.4 * k;
  const radius = 41 * k + fontSize * 0.36;

  return (
    <div style={{ position: "relative", display: "flex", width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 120 120" style={{ position: "absolute", left: 0, top: 0 }}>
        <circle cx="60" cy="60" r="56" fill="none" stroke={ink} strokeWidth="1.6" />
        <circle cx="60" cy="60" r="51.5" fill="none" stroke={ink} strokeWidth="0.7" />
        <circle cx="60" cy="60" r="31" fill="none" stroke={ink} strokeWidth="0.7" />
        <path d="M48 44 60 72 72 44M53 54h14" fill="none" stroke={accent} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {chars.map((char, index) => {
        if (char === " ") return null;
        const degrees = 180 + (index + 0.5) * step;
        const radians = (degrees * Math.PI) / 180;
        const box = fontSize * 1.4;
        const x = size / 2 + radius * Math.cos(radians) - box / 2;
        const y = size / 2 + radius * Math.sin(radians) - box / 2;
        return (
          <div
            key={index}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: box,
              height: box,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `rotate(${degrees + 90}deg)`,
              fontFamily: "Mono",
              fontSize,
              color: ink,
            }}
          >
            {char === "✶" ? <Star size={fontSize} color={ink} /> : char}
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 77.5 * k,
          width: size,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1.6 * k,
          fontSize: 5.4 * k,
          letterSpacing: 1.6 * k,
          color: ink,
        }}
      >
        <span style={{ fontFamily: "CM" }}>∃</span>
        <span style={{ fontFamily: "Mono" }}>MONDAY</span>
      </div>
    </div>
  );
}
