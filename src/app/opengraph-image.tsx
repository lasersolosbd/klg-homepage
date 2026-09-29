import { ImageResponse } from "next/og";
import { AUDIENCE, BRAND_NAME } from "@/lib/config";

export const alt = `${BRAND_NAME}: AI consulting for ${AUDIENCE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated at build time. Uses system fonts on purpose: fetching Google Fonts at build time is
// one more thing to break, and the card reads fine in a serif fallback.
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #0f2038 0%, #182c4a 100%)",
          color: "#ffffff",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 9,
              background: "#d49a3d",
            }}
          />
          <div style={{ display: "flex", fontSize: 28, letterSpacing: 6, textTransform: "uppercase", color: "#d49a3d" }}>
            {BRAND_NAME}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 66, lineHeight: 1.1, fontWeight: 600, maxWidth: 1000 }}>
            Somebody just asked an AI which nonprofit to support. Did it say your name?
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "rgba(255,255,255,0.78)", fontFamily: "Helvetica, Arial, sans-serif" }}>
            {`AI visibility, AI policy, and AI assistants for ${AUDIENCE}.`}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            color: "rgba(255,255,255,0.6)",
            fontFamily: "Helvetica, Arial, sans-serif",
          }}
        >
          <div style={{ display: "flex" }}>Longmont, Colorado</div>
          <div style={{ display: "flex" }}>Free AI visibility report</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
