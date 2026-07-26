import SectionShell from "./SectionShell";
import styles from "./sections.module.css";

export default function FinalAction() {
  return (
    <SectionShell
      id="deploy"
      marker="ACTION / 09"
      field="paper"
      title="Put Raystrat on the problem."
    >
      <div className={styles.body}>
        <p>You do not need a finished specification.</p>
        <p>You do not need to know the correct technical solution.</p>
        <p>
          Bring us the situation as it exists, what must become possible, and
          why it matters now.
        </p>
        <p className={styles.lede}>
          Raystrat will establish what is true, determine the way forward, and
          build what the business needs next.
        </p>
      </div>
      <div className={`${styles.actions} ${styles.arrival}`}>
        {/* The Forward Line resolves here — a copper terminal node arrives at
            the primary command. The journey ends at action. */}
        <span className={styles.arrivalMark} data-reveal-node aria-hidden="true">
          <span className={styles.arrivalSegment} />
          <span className={styles.arrivalNode} />
        </span>
        {/* The Deploy node (Node 7) is future — command is a placeholder. */}
        <a href="#deploy" className="cmd cmd-primary">
          Deploy Raystrat
        </a>
      </div>
    </SectionShell>
  );
}
