"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Threshold reveal for a section: content rises 28px and fades in ("what
 * entered"); the top hairline scales in from the left ("what aligned").
 * All motion sits behind prefers-reduced-motion — with reduced motion or
 * no JS the server-rendered final state is what renders, untouched.
 *
 * gsap + ScrollTrigger load via dynamic import AFTER hydration so the
 * reveal machinery adds nothing to First Load JS (spec performance budget:
 * page ≤ 140 kB First Load). Reveals are below-fold enhancement — the
 * content itself is server-rendered and final without them.
 */
export default function ScrollReveal({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([gsapMod, scrollTriggerMod]) => {
        if (cancelled || !scope.current) return;
        // Access both through their default exports so the plugin's named
        // identifier never appears as a static reference in the first-load
        // chunk — the plugin's own code stays in its lazy chunk regardless.
        const gsap = gsapMod.default;
        const scrollTrigger = scrollTriggerMod.default;
        gsap.registerPlugin(scrollTrigger);
        ctx = gsap.context(() => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: scope.current,
              start: "top 72%",
              once: true,
            },
          });
          tl.from(
            "[data-reveal-rule]",
            {
              scaleX: 0,
              transformOrigin: "left center",
              duration: 0.9,
              ease: "power2.out",
            },
            0,
          )
            .from(
              "[data-reveal]",
              { y: 28, autoAlpha: 0, duration: 0.7, ease: "power2.out" },
              0,
            )
            // The Forward Line spine draws top→bottom as the section enters.
            .from(
              "[data-reveal-spine]",
              {
                scaleY: 0,
                transformOrigin: "top center",
                duration: 1,
                ease: "power2.out",
              },
              0,
            )
            // Outcomes advance along the axis in sequence.
            .from(
              "[data-reveal-advance]",
              {
                x: -28,
                autoAlpha: 0,
                duration: 0.6,
                ease: "power2.out",
                stagger: 0.1,
              },
              0.1,
            )
            // Vectors (bay rules / the unbroken copper line) draw left→right.
            .from(
              "[data-reveal-vector]",
              {
                scaleX: 0,
                transformOrigin: "left center",
                duration: 0.7,
                ease: "power2.out",
                stagger: 0.09,
              },
              0.2,
            )
            // Station / origin / arrival nodes tick in from the spine.
            .from(
              "[data-reveal-node]",
              {
                scale: 0.3,
                autoAlpha: 0,
                transformOrigin: "left center",
                duration: 0.4,
                ease: "power2.out",
                stagger: 0.07,
              },
              0.35,
            );
        }, scope);
      },
    );

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return <div ref={scope}>{children}</div>;
}
