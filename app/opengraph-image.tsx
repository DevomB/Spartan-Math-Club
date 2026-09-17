import { OG, OgCrest, ogFonts } from "@/lib/og";
import { ImageResponse } from "next/og";

export const alt = "Spartan Math Club crest. For all problems, there exists a Monday.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const GHOSTS = [
  { text: "V − E + F = 2", left: 560, top: 40 },
  { text: "a ≡ 1 (mod 4)", left: 820, top: 530 },
  { text: "∀x ∃y : y > x", left: 60, top: 560 },
  { text: "√2", left: 1060, top: 90 },
];

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 64,
          padding: "0 80px",
          background: OG.board,
          color: OG.chalk,
          position: "relative",
        }}
      >
        {GHOSTS.map((ghost) => (
          <div
            key={ghost.text}
            style={{ position: "absolute", left: ghost.left, top: ghost.top, fontFamily: "CM", fontSize: 44, color: "rgba(243,241,234,0.07)" }}
          >
            {ghost.text}
          </div>
        ))}
        <OgCrest size={380} />
        <div style={{ display: "flex", flexDirection: "column", gap: 26, flex: 1 }}>
          <div style={{ display: "flex", fontFamily: "Mono", fontSize: 22, letterSpacing: 4, color: OG.dust }}>
            SPARTAN MATH CLUB · SAN JOSÉ STATE
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontFamily: "Board", fontSize: 68, lineHeight: 1.08 }}>
            <span>For all problems,</span>
            <span style={{ color: OG.yellow }}>there exists a Monday.</span>
          </div>
          <div style={{ display: "flex", fontFamily: "CM", fontSize: 30, color: OG.dust }}>
            ∀p ∈ Problems, ∃m ∈ Mondays : m ⊢ p
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
