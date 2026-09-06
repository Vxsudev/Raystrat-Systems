import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0f0f0e",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontWeight: 500,
              fontSize: 20,
              letterSpacing: 4,
              color: "#9aa2ab",
              textTransform: "uppercase",
            }}
          >
            AI SOLUTIONS · FORWARD-DEPLOYED ENGINEERING
          </span>
          <span
            style={{
              marginTop: 32,
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontWeight: 700,
              fontSize: 64,
              lineHeight: 1.1,
              color: "#edeae3",
            }}
          >
            AI built on what your business knows.
          </span>
          <div
            style={{
              marginTop: 40,
              width: 160,
              height: 4,
              background: "#2743d4",
            }}
          />
        </div>
        <span
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: 500,
            fontSize: 18,
            letterSpacing: 3,
            color: "#9aa2ab",
            textTransform: "uppercase",
          }}
        >
          RAYSTRAT SYSTEMS
        </span>
      </div>
    ),
    { ...size }
  );
}
