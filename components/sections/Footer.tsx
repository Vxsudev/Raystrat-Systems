import styles from "./sections.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <p className={styles.footerWordmark}>
          Raystrat <span>Systems</span>
        </p>
        <div className={styles.footerMeta}>
          <p className="mono-label">Forward-Deployed Engineering</p>
          <p className="mono-label">© 2026 Raystrat Systems</p>
        </div>
      </div>
    </footer>
  );
}
