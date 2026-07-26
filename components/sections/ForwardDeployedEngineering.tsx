import SectionShell from "./SectionShell";
import styles from "./sections.module.css";

export default function ForwardDeployedEngineering() {
  return (
    <SectionShell
      id="forward-deployed-engineering"
      marker="MODEL / 07"
      field="paperField"
      roomy
      title="Engineering deployed into the problem."
    >
      <div className={styles.body}>
        <p>The hardest software problems cannot be solved from a distance.</p>
        <p>
          The truth is distributed across operators, leadership, users,
          existing systems, exceptions, constraints, and commercial priorities.
        </p>
        <p>
          Forward-deployed engineering places engineering judgement in direct
          contact with that truth.
        </p>
        <p>The result is not merely custom software.</p>
        <p className={styles.lede}>
          It is a direct path from an important business problem to a system
          operating in the real environment.
        </p>
      </div>
      <div className={styles.actions}>
        <a
          href="#intervention"
          className={`cmd ${styles.cmdSecondaryPaper}`}
        >
          Understand the Model
        </a>
      </div>
    </SectionShell>
  );
}
