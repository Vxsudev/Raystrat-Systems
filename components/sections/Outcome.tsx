import type { CSSProperties } from "react";
import SectionShell from "./SectionShell";
import styles from "./sections.module.css";

const OUTCOMES = [
  "An important initiative regains direction.",
  "An unclear operating problem becomes a buildable system.",
  "A prototype crosses into dependable use.",
  "A fragmented process becomes software the business can operate through.",
  "An AI capability becomes part of a working business system.",
  "Engineering effort begins producing operational and commercial movement.",
];

export default function Outcome() {
  return (
    <SectionShell
      id="outcome"
      marker="OUTCOME / 05"
      field="ink2"
      title="The outcome is forward movement."
    >
      {/* Each statement advances further along the axis — the last is the most
          advanced and open: the arrival of movement. */}
      <div className={styles.advance}>
        {OUTCOMES.map((line, i) => (
          <p
            key={line}
            className={styles.advanceStep}
            data-reveal-advance
            style={{ "--step": i } as CSSProperties}
          >
            {line}
          </p>
        ))}
      </div>
    </SectionShell>
  );
}
