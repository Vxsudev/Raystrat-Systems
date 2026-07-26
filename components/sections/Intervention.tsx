import SectionShell from "./SectionShell";
import styles from "./sections.module.css";

const SEQUENCE = [
  "We enter the environment and work directly with the people responsible for the outcome and the people living with the problem.",
  "We examine the operation as it exists—not as it was described in a specification.",
  "We establish what is true.",
  "We identify what is preventing movement.",
  "We determine the system direction.",
];

export default function Intervention() {
  return (
    <SectionShell
      id="intervention"
      marker="INTERVENTION / 03"
      field="ink1"
      spine="copper"
      title="Put Raystrat on the problem."
    >
      <div className={styles.stations}>
        {SEQUENCE.map((statement) => (
          <div key={statement} className={styles.station}>
            <span
              className={styles.stationMark}
              data-reveal-node
              aria-hidden="true"
            >
              <span className={styles.stationNode} />
              <span className={styles.stationTick} />
            </span>
            <p className={styles.stationText}>{statement}</p>
          </div>
        ))}
        {/* Resolving terminus — the sequence ends in a filled copper node. */}
        <div className={`${styles.station} ${styles.stationTerminus}`}>
          <span
            className={styles.stationMark}
            data-reveal-node
            aria-hidden="true"
          >
            <span className={styles.stationNode} />
            <span className={styles.stationTick} />
          </span>
          <p className={styles.stationTerminusText}>
            Then we build and deploy the software required to move.
          </p>
        </div>
      </div>
      <p className={styles.editorial}>
        The people closest to understanding the problem remain responsible for
        engineering the solution.
      </p>
    </SectionShell>
  );
}
