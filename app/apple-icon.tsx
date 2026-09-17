import { OG, OgCrest, ogFonts } from "@/lib/og";
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** 180px is above the 96px threshold, so the app icon carries the full crest. */
export default async function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: OG.board }}>
        <OgCrest size={160} />
      </div>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
