import { OG, OgCrest, ogFonts } from "@/lib/og";
import { ImageResponse } from "next/og";

export const alt = "Spartan Mathematics Club at San José State University";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          padding: "70px 80px",
          background: OG.navy,
          color: OG.paper,
        }}
      >
        <OgCrest size={250} />
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ display: "flex", fontFamily: "Mono", fontSize: 20, letterSpacing: 3, color: OG.muted }}>
            SAN JOSÉ STATE UNIVERSITY
          </div>
          <div style={{ display: "flex", marginTop: 28, fontFamily: "CM", fontSize: 72, lineHeight: 1.05 }}>
            Spartan Mathematics Club
          </div>
          <div style={{ display: "flex", marginTop: 30, paddingTop: 24, borderTop: `2px solid ${OG.gold}`, fontFamily: "CM", fontSize: 31, color: OG.muted }}>
            For all problems, there exists an SMC meeting.
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
