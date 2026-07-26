"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useThree, useFrame, invalidate } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import * as THREE from "three";
import AlignmentField, {
  type FieldProgress,
  type ViewTier,
} from "./AlignmentField";
import { isFinePointer } from "../../lib/webgl";

gsap.registerPlugin(useGSAP);

type Props = {
  reducedMotion: boolean;
  onEstablished: () => void;
  onContextLost: () => void;
};

/**
 * Camera rig: intro dolly (driven by the GSAP proxy) + damped pointer
 * parallax on fine pointers. Runs on a demand frameloop — when the intro is
 * done and the pointer is still, nothing renders and GPU load is ~0.
 */
function Rig({
  progressRef,
  parallax,
}: {
  progressRef: React.MutableRefObject<FieldProgress & { dolly: number }>;
  parallax: boolean;
}) {
  const { camera } = useThree();
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!parallax) return;
    const onMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
      invalidate();
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [parallax]);

  useFrame(() => {
    const { dolly } = progressRef.current;
    // Heavy approach: the camera closes 1.1 units over the intro.
    camera.position.z = 5.6 - dolly * 1.1;

    const c = current.current;
    const t = target.current;
    c.x += (t.x - c.x) * 0.06;
    c.y += (t.y - c.y) * 0.06;
    camera.rotation.y = -c.x * 0.0105; // ≤0.6°
    camera.rotation.x = -c.y * 0.007;

    // Keep damping alive until settled, then stop requesting frames.
    if (Math.abs(t.x - c.x) > 0.002 || Math.abs(t.y - c.y) > 0.002) {
      invalidate();
    }
  });

  return null;
}

function Sequence({
  progressRef,
  reducedMotion,
  onEstablished,
}: {
  progressRef: React.MutableRefObject<FieldProgress & { dolly: number }>;
  reducedMotion: boolean;
  onEstablished: () => void;
}) {
  useGSAP(() => {
    const p = progressRef.current;
    if (reducedMotion) {
      p.align = 1;
      p.line = 1;
      p.dolly = 1;
      invalidate();
      onEstablished();
      return;
    }
    const tl = gsap.timeline({
      delay: 0.45,
      onUpdate: invalidate,
      onComplete: onEstablished,
    });
    // Alignment + dolly share one ease: the field resolves as we enter it.
    tl.to(p, { align: 1, duration: 2.6, ease: "power3.inOut" }, 0)
      .to(p, { dolly: 1, duration: 3.0, ease: "power3.inOut" }, 0)
      .to(p, { line: 1, duration: 1.1, ease: "power2.out" }, "-=0.55");

    // Verification hook: ?seq=<0..1> freezes the sequence at that progress
    // so intermediate states are deterministically inspectable (Playwright).
    const seq = new URLSearchParams(window.location.search).get("seq");
    if (seq !== null) {
      tl.progress(Math.min(1, Math.max(0, parseFloat(seq) || 0))).pause();
      invalidate();
    }
  });

  return null;
}

function ContextGuard({ onLost }: { onLost: () => void }) {
  const { gl } = useThree();
  useEffect(() => {
    const el = gl.domElement;
    const handler = (e: Event) => {
      e.preventDefault();
      onLost();
    };
    el.addEventListener("webglcontextlost", handler);
    return () => el.removeEventListener("webglcontextlost", handler);
  }, [gl, onLost]);
  return null;
}

export default function HeroCanvas({
  reducedMotion,
  onEstablished,
  onContextLost,
}: Props) {
  const progressRef = useRef<FieldProgress & { dolly: number }>({
    align: 0,
    line: 0,
    dolly: 0,
  });
  const [tier, setTier] = useState<ViewTier>("desktop");

  useEffect(() => {
    const compute = () =>
      setTier(
        window.innerWidth <= 900
          ? "mobile"
          : window.innerWidth <= 1280
            ? "tablet"
            : "desktop",
      );
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  const mobile = tier === "mobile";
  const frameCount = mobile ? 14 : 26;
  const parallax = !reducedMotion && !mobile && isFinePointer();

  return (
    <Canvas
      frameloop="demand"
      dpr={[1, mobile ? 1.75 : 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      camera={{ fov: 38, near: 0.1, far: 40, position: [0, 0.2, 5.6] }}
      style={{ position: "absolute", inset: 0 }}
    >
      <fog attach="fog" args={["#0b0c0e", 5, 24]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 5, 3]} intensity={1.4} />
      <directionalLight
        position={[-3, -1, 6]}
        intensity={0.25}
        color="#b4703a"
      />
      <AlignmentField
        progressRef={progressRef}
        frameCount={frameCount}
        tier={tier}
      />
      <Rig progressRef={progressRef} parallax={parallax} />
      <Sequence
        progressRef={progressRef}
        reducedMotion={reducedMotion}
        onEstablished={onEstablished}
      />
      <ContextGuard onLost={onContextLost} />
    </Canvas>
  );
}
