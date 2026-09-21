import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const OG = {
  navy: "#102c45",
  paper: "#f3f0e7",
  muted: "#c8d0d6",
  gold: "#c59a39",
} as const;

export async function ogFonts() {
  const dir = join(process.cwd(), "lib/fonts");
  const [mono, cm] = await Promise.all([
    readFile(join(dir, "IBMPlexMono-Medium.woff")),
    readFile(join(dir, "KaTeX_Main-Regular.ttf")),
  ]);
  return [
    { name: "Mono", data: mono, style: "normal" as const, weight: 500 as const },
    { name: "CM", data: cm, style: "normal" as const, weight: 400 as const },
  ];
}

export function OgCrest({ size, ink = OG.paper, accent = OG.gold }: { size: number; ink?: string; accent?: string }) {
  return (
    <div
      style={{
        display: "flex",
        width: size,
        height: size,
        alignItems: "center",
        justifyContent: "center",
        border: `${Math.max(2, size * 0.02)}px solid ${ink}`,
        color: ink,
        position: "relative",
      }}
    >
      <span style={{ fontFamily: "CM", fontSize: size * 0.34, letterSpacing: -size * 0.025 }}>SMC</span>
      <span
        style={{
          position: "absolute",
          left: size * 0.18,
          right: size * 0.18,
          bottom: size * 0.2,
          height: Math.max(2, size * 0.018),
          background: accent,
        }}
      />
    </div>
  );
}
