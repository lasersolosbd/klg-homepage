import { ImageResponse } from "next/og";
import { AUDIENCE, BRAND_NAME } from "@/lib/config";

export const alt = `${BRAND_NAME}: AI consulting for ${AUDIENCE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated at build time. Uses system fonts on purpose: fetching Google Fonts at build time is
// one more thing to break, and the card reads fine in a serif fallback. The arc is the same
// compass sweep the site uses.
export default function OpenGraphImage() {
  const cx = 1240;
  const cy = 700;
  const arcs = [560, 420, 300].map((r) => {
    const x0 = cx - r;
    const y1 = cy - r;
    return `M ${x0} ${cy} A ${r} ${r} 0 0 1 ${cx} ${y1}`;
  });
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
          background: "#0f2038",
          color: "#ffffff",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        <svg
          width="1200"
          height="630"
          viewBox="0 0 1200 630"
          style={{ position: "absolute", top: 0, left: 0 }}
          fill="none"
          stroke="#d49a3d"
          strokeOpacity="0.35"
          strokeWidth="1.5"
        >
          {arcs.map((d) => (
            <path key={d} d={d} />
          ))}
          <circle cx={cx} cy={cy} r="80" />
          <path d={`M ${cx - 640} ${cy} H ${cx}`} strokeOpacity="0.2" />
        </svg>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d49a3d" strokeWidth="1.6">
            <circle cx="12" cy="12" r="6.5" />
            <path d="M12 1.5v4M12 18.5v4M1.5 12h4M18.5 12h4" />
          </svg>
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 6, textTransform: "uppercase", color: "#d49a3d" }}>
            {BRAND_NAME}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", fontSize: 64, lineHeight: 1.04, fontWeight: 600, maxWidth: 900 }}>
            Somebody just asked an AI which nonprofit to support. Did it say your name?
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "rgba(255,255,255,0.72)", fontFamily: "Helvetica, Arial, sans-serif", maxWidth: 820 }}>
            {`AI visibility, AI policy, and AI assistants for ${AUDIENCE}.`}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
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
