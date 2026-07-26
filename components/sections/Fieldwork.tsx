import SectionShell from "./SectionShell";
import styles from "./sections.module.css";

const RECORD_FIELDS = [
  "Starting condition",
  "Deployment",
  "System engineered",
  "Conditions survived",
  "Outcome created",
];

export default function Fieldwork() {
  return (
    <SectionShell
      id="fieldwork"
      marker="FIELDWORK / 08"
      field="paperField"
      title="Fieldwork"
    >
      <div className={styles.body}>
        <p>The environments we enter.</p>
        <p>The problems we take ownership of.</p>
        <p>The systems deployed as a result.</p>
        <p className={styles.firm}>Fieldwork records are being prepared.</p>
      </div>
      {/* A future evidence system on the spine — fields defined, entries
          awaiting deployment. Honest placeholder; no fabricated records. */}
      <div className={styles.records}>
        <p className="mono-label">RECORDS / IN PREPARATION</p>
        <ul className={styles.recordsList}>
          {RECORD_FIELDS.map((field, i) => (
            <li key={field} className={styles.recordRow}>
              <span className="mono-label">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={styles.recordField}>{field}</span>
              <span className={styles.recordAwait} aria-hidden="true">
                —
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.actions}>
        <a href="#fieldwork" className={`cmd ${styles.cmdSecondaryPaper}`}>
          View Fieldwork
        </a>
      </div>
    </SectionShell>
  );
}
