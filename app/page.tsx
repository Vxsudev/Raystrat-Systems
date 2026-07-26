export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "32px",
        background: "#050505",
        color: "#f5f5f5",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <section style={{ width: "min(860px, 100%)" }}>
        <p style={{ fontSize: "14px", letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.65 }}>
          Raystrat Systems
        </p>
        <h1 style={{ fontSize: "clamp(48px, 9vw, 112px)", lineHeight: 0.92, margin: "24px 0" }}>
          Raystrat will find the way forward.
        </h1>
        <p style={{ fontSize: "clamp(20px, 3vw, 34px)", lineHeight: 1.3, maxWidth: "760px", opacity: 0.82 }}>
          Forward-deployed engineering for real business problems.
        </p>
      </section>
    </main>
  );
}
