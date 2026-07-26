import styles from "./sections.module.css";

export type SpineTone = "hairline" | "copper";

/**
 * The Forward Line spine: a single structural 2px axis rendered per section at
 * the content-column left edge, extended over the section's vertical padding so
 * abutting sections read as one continuous line running the whole page.
 *
 * Purely decorative (aria-hidden) — the copy always states the point, so the
 * spine is never the sole carrier of meaning. It draws top→bottom (scaleY 0→1)
 * via the existing ScrollReveal hook (`data-reveal-spine`); with reduced motion
 * or no JS the server-rendered full-height line is what renders.
 */
export default function ForwardSpine({
  tone = "hairline",
  draw = true,
}: {
  tone?: SpineTone;
  draw?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      data-reveal-spine={draw ? "" : undefined}
      className={`${styles.spine} ${tone === "copper" ? styles.spineCopper : ""}`}
    />
  );
}
