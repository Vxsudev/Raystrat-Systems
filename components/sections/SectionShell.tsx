import type { ReactNode } from "react";
import ScrollReveal from "./ScrollReveal";
import ForwardSpine, { type SpineTone } from "./ForwardSpine";
import styles from "./sections.module.css";

export type Field = "ink0" | "ink1" | "ink2" | "paperField" | "paper";

const FIELD_CLASS: Record<Field, string> = {
  ink0: styles.fieldInk0,
  ink1: styles.fieldInk1,
  ink2: styles.fieldInk2,
  paperField: styles.fieldPaperField,
  paper: styles.fieldPaper,
};

export default function SectionShell({
  id,
  marker,
  title,
  field,
  spine = "hairline",
  roomy = false,
  children,
}: {
  id: string;
  marker: string;
  title: ReactNode;
  field: Field;
  /** Forward Line spine tone for this section, or false to omit it. */
  spine?: SpineTone | false;
  /** Open the field with extra vertical space (S07 earned transition). */
  roomy?: boolean;
  children?: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`${styles.section} ${FIELD_CLASS[field]} ${
        roomy ? styles.sectionRoomy : ""
      }`}
    >
      <ScrollReveal>
        <div className={styles.inner}>
          {spine !== false && <ForwardSpine tone={spine} />}
          <div className={styles.rule} data-reveal-rule aria-hidden="true" />
          <div className={styles.grid} data-reveal>
            <p className={`mono-label ${styles.marker}`}>{marker}</p>
            <div className={styles.content}>
              <h2 id={`${id}-title`} className={styles.title}>
                {title}
              </h2>
              {children}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
