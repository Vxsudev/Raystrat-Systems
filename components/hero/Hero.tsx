"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { probeWebGL, prefersReducedMotion } from "../../lib/webgl";
import HeroFallback from "./HeroFallback";
import styles from "./hero.module.css";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

const NAV_ITEMS = [
  "Forward-Deployed Engineering",
  "Deployments",
  "Fieldwork",
  "Company",
];

export default function Hero() {
  // 'unknown' until the client probe runs; the semantic page never waits on it.
  const [gl, setGl] = useState<"unknown" | "ok" | "none">("unknown");
  const [established, setEstablished] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const rm = prefersReducedMotion();
    setReduced(rm);
    const ok = probeWebGL();
    setGl(ok ? "ok" : "none");
    // Without WebGL or motion there is no alignment sequence to complete —
    // the structure is presented already established.
    if (!ok || rm) setEstablished(true);
  }, []);

  return (
    <div className={styles.hero}>
      <header className={styles.nav}>
        <a href="#" className={styles.wordmark}>
          Raystrat <span>Systems</span>
        </a>
        <nav className={styles.navLinks} aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <a key={item} href="#" className={styles.navLink}>
              {item}
            </a>
          ))}
          <a href="#" className={styles.navCmd}>
            Deploy Raystrat
          </a>
        </nav>
      </header>

      <div className={styles.stage}>
        <div className={styles.field} aria-hidden="true">
          {gl === "ok" && (
            <HeroCanvas
              reducedMotion={reduced}
              onEstablished={() => setEstablished(true)}
              onContextLost={() => setGl("none")}
            />
          )}
          {gl === "none" && <HeroFallback />}
        </div>

        <p className={`${styles.corner} ${styles.cornerTL} mono-label`}>
          SYS / 01
        </p>
        <p
          className={`${styles.corner} ${styles.cornerTR} mono-label ${styles.marker} ${
            established ? styles.markerEstablished : ""
          }`}
          aria-live="polite"
        >
          {established ? "Established" : "Unresolved"}
        </p>
        <p className={`${styles.corner} ${styles.cornerBR} mono-label`}>
          Raystrat Systems
        </p>

        <div className={styles.content}>
          <p className={`${styles.eyebrow} mono-label`}>
            Forward-Deployed Engineering
          </p>
          <h1 className={styles.title}>
            Raystrat will find the way forward.
          </h1>
          <p className={styles.lede}>
            Forward-deployed engineering for difficult business problems.
          </p>
          <p className={styles.para}>
            Raystrat enters the operation, establishes what is true, determines
            what must change, and builds the software required to move the
            business forward.
          </p>
          <div className={styles.commands}>
            <a href="#" className="cmd cmd-primary">
              Deploy Raystrat
            </a>
            <a href="#" className="cmd cmd-secondary">
              What is forward-deployed engineering?
            </a>
          </div>
        </div>

        <div className={styles.declarations}>
          <p className={styles.declarationsLine}>
            No waiting for perfect requirements.
            <span aria-hidden="true"> · </span>
            No separation between understanding the problem and engineering the
            solution.
            <span aria-hidden="true"> · </span>
            We own the distance from operational reality to working software.
          </p>
        </div>
      </div>
    </div>
  );
}
