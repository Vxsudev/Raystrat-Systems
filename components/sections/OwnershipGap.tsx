import SectionShell from "./SectionShell";
import styles from "./sections.module.css";

const DIVIDED_MODEL = [
  "One group defines the problem.",
  "Another translates it into requirements.",
  "Another builds from those requirements.",
  "Another deploys what was built.",
];

export default function OwnershipGap() {
  return (
    <SectionShell
      id="ownership"
      marker="OWNERSHIP / 04"
      field="ink1"
      title="Most software delivery divides the outcome between teams."
    >
      {/* The broken model made physical: four graphite segments with real gaps
          and a vertical stagger — continuity is visibly broken. */}
      <div className={styles.dividedTrack}>
        {DIVIDED_MODEL.map((line) => (
          <div key={line} className={styles.trackSeg}>
            <div className={styles.trackBar} aria-hidden="true" />
            <p className={styles.trackText}>{line}</p>
          </div>
        ))}
      </div>
      <p className={styles.trackOwning}>
        The business is left owning the distance between them.
      </p>
      {/* The contrast: one unbroken copper line, drawn left→right. */}
      <div className={styles.unbrokenLine} data-reveal-vector aria-hidden="true" />
      <div className={`${styles.body} ${styles.bodyFlush}`}>
        <p className={styles.lede}>Raystrat removes that distance.</p>
        <p>
          Understanding, product judgement, engineering, deployment, and
          real-world iteration remain connected under one line of
          responsibility.
        </p>
        <p>The work does not end when code exists.</p>
        <p className={styles.firm}>
          It ends when the system works inside the business.
        </p>
      </div>
    </SectionShell>
  );
}
