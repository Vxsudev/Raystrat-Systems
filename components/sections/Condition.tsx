import SectionShell from "./SectionShell";
import styles from "./sections.module.css";

export default function Condition() {
  return (
    <SectionShell
      id="condition"
      marker="CONDITION / 02"
      field="ink0"
      title="The business has reached a point its current systems cannot carry."
    >
      <div className={styles.body}>
        <p>The company is moving.</p>
        <p>
          The work is becoming more complex. More people are involved. More
          decisions depend on each other. More of the business depends on
          software working correctly.
        </p>
        <p>But the systems underneath the operation have not kept pace.</p>
        <p>
          What once worked through direct communication, individual judgement,
          and improvised tools now creates friction between what the business
          needs to do and what its systems allow.
        </p>
        <p>The problem is no longer one missing feature.</p>
        <p className={styles.lede}>
          It is the growing distance between the business and the software
          carrying it.
        </p>
        <p className={`${styles.lede} ${styles.signalRule}`}>
          That distance is where Raystrat is deployed.
        </p>
      </div>
    </SectionShell>
  );
}
