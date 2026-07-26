import SectionShell from "./SectionShell";
import styles from "./sections.module.css";

const CATEGORIES = [
  {
    title: "Build what does not yet exist",
    body: "Turn an important opportunity or operational need into a working product.",
  },
  {
    title: "Replace what the operation has outgrown",
    body: "Build internal systems around how the business must actually work.",
  },
  {
    title: "Move what has stalled",
    body: "Take ownership of software initiatives trapped between prototype, production, and adoption.",
  },
  {
    title: "Put AI into real use",
    body: "Build the product, workflow, integrations, controls, and human decisions required to make intelligence operational.",
  },
  {
    title: "Own the product and engineering path",
    body: "Operate as the embedded function responsible for moving a consequential initiative into deployed software.",
  },
];

export default function DeploymentSurface() {
  return (
    <SectionShell
      id="deployments"
      marker="DEPLOYMENTS / 06"
      field="ink2"
      title="Deploy Raystrat where the problem crosses business and software."
    >
      <p className={styles.deployIntro}>
        Raystrat is built for work where the correct system cannot simply be
        purchased, completely specified in advance, or safely divided between
        multiple vendors.
      </p>
      <div className={styles.bays}>
        {/* Shared copper origin on the spine — the five bays are directions
            from one system, not equal tiles. */}
        <span className={styles.baysOrigin} data-reveal-node aria-hidden="true" />
        {CATEGORIES.map((category, i) => (
          <div key={category.title} className={styles.bay}>
            <div className={styles.bayVector} data-reveal-vector aria-hidden="true" />
            <div className={styles.bayLayout}>
              <div>
                <p className={styles.bayIndex}>
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className={styles.bayTitle}>{category.title}</h3>
              </div>
              <p className={styles.bayBody}>{category.body}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.actions}>
        <a href="#deployments" className="cmd cmd-secondary">
          Explore Deployments
        </a>
      </div>
    </SectionShell>
  );
}
