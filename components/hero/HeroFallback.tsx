import styles from "./fallback.module.css";

/**
 * Static structural corridor for environments without WebGL. Pure CSS —
 * same composition (receding frames, copper forward line), no motion.
 * The canvas layer is enhancement; all meaning lives in the DOM copy.
 */
export default function HeroFallback() {
  const frames = Array.from({ length: 9 });
  return (
    <div className={styles.fallback}>
      <div className={styles.corridor}>
        {frames.map((_, i) => (
          <div
            key={i}
            className={styles.frame}
            style={{
              transform: `translate(-50%, -50%) scale(${1 - i * 0.093})`,
              opacity: 1 - i * 0.095,
            }}
          />
        ))}
        <div className={styles.forwardLine} />
      </div>
    </div>
  );
}
