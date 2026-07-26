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
          background: "#0b0c0e",
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
            FORWARD-DEPLOYED ENGINEERING
          </span>
          <span
            style={{
              marginTop: 32,
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontWeight: 700,
              fontSize: 68,
              lineHeight: 1.1,
              color: "#edeae3",
            }}
          >
            Raystrat will find the way forward.
          </span>
          <div
            style={{
              marginTop: 40,
              width: 160,
              height: 4,
              background: "#b4703a",
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
