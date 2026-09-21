import { OG, OgCrest, ogFonts } from "@/lib/og";
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Square app icon using the same restrained mark as the site header. */
export default async function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: OG.navy }}>
        <OgCrest size={132} />
      </div>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
