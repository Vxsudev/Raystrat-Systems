"use client";

import { useMemo, useRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export type FieldProgress = { align: number; line: number };
export type ViewTier = "desktop" | "tablet" | "mobile";

type Props = {
  progressRef: MutableRefObject<FieldProgress>;
  frameCount: number;
  tier: ViewTier;
};

/** Deterministic PRNG — scatter must be identical across renders. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Corridor dimensions — one structural frame repeated in depth.
const FRAME_W = 3.6;
const FRAME_H = 2.3;
const BAR = 0.05; // bar cross-section
const SPACING = 0.85;

type BarTransform = {
  aligned: { pos: THREE.Vector3; rot: THREE.Euler; scale: THREE.Vector3 };
  scattered: { pos: THREE.Vector3; rot: THREE.Euler };
};

function buildTransforms(frameCount: number): BarTransform[] {
  const rand = mulberry32(1907);
  const bars: BarTransform[] = [];

  for (let i = 0; i < frameCount; i++) {
    const z = -i * SPACING;
    // Scatter grows with depth — the far field reads as unresolved.
    const depth = i / (frameCount - 1);
    const posAmp = 0.12 + depth * 0.55;
    const rotAmp = 0.05 + depth * 0.3;

    // Frame-level scatter (all 4 bars share it so each frame stays rigid —
    // members are displaced, not broken).
    const dx = (rand() - 0.5) * 2 * posAmp;
    const dy = (rand() - 0.5) * 2 * posAmp;
    const dz = (rand() - 0.5) * 2 * posAmp * 0.6;
    const rx = (rand() - 0.5) * 2 * rotAmp;
    const ry = (rand() - 0.5) * 2 * rotAmp;
    const rz = (rand() - 0.5) * 2 * rotAmp;

    const members: Array<{
      pos: [number, number, number];
      scale: [number, number, number];
    }> = [
      { pos: [0, FRAME_H / 2, z], scale: [FRAME_W, BAR, BAR] }, // top
      { pos: [0, -FRAME_H / 2, z], scale: [FRAME_W, BAR, BAR] }, // bottom
      { pos: [-FRAME_W / 2, 0, z], scale: [BAR, FRAME_H, BAR] }, // left
      { pos: [FRAME_W / 2, 0, z], scale: [BAR, FRAME_H, BAR] }, // right
    ];

    for (const m of members) {
      bars.push({
        aligned: {
          pos: new THREE.Vector3(...m.pos),
          rot: new THREE.Euler(0, 0, 0),
          scale: new THREE.Vector3(...m.scale),
        },
        scattered: {
          pos: new THREE.Vector3(m.pos[0] + dx, m.pos[1] + dy, m.pos[2] + dz),
          rot: new THREE.Euler(rx, ry, rz),
        },
      });
    }
  }
  return bars;
}

const TIER_TRANSFORM: Record<
  ViewTier,
  { position: [number, number, number]; rotation: [number, number, number]; scale: number }
> = {
  // Desktop + mobile: the approved exploration composition, unchanged.
  // Tablet: same view axis scaled down — the retained overlap fix.
  desktop: { position: [1.9, 0.32, 0], rotation: [0, -0.16, 0], scale: 1 },
  tablet: { position: [1.7, 0.32, 0], rotation: [0, -0.16, 0], scale: 0.85 },
  mobile: { position: [0, 0.35, 0], rotation: [0.08, 0, 0], scale: 0.85 },
};

export default function AlignmentField({
  progressRef,
  frameCount,
  tier,
}: Props) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const lineRef = useRef<THREE.Mesh>(null);

  const bars = useMemo(() => buildTransforms(frameCount), [frameCount]);

  const { geometry, material, copperMaterial } = useMemo(() => {
    return {
      geometry: new THREE.BoxGeometry(1, 1, 1),
      material: new THREE.MeshStandardMaterial({
        color: "#2b2f36",
        roughness: 0.5,
        metalness: 0.4,
      }),
      // Flat copper — precise, unlit, no bloom.
      copperMaterial: new THREE.MeshBasicMaterial({ color: "#b4703a" }),
    };
  }, []);

  const scratch = useMemo(
    () => ({
      mat: new THREE.Matrix4(),
      pos: new THREE.Vector3(),
      quat: new THREE.Quaternion(),
      alignedQuat: new THREE.Quaternion(),
      scatteredQuat: new THREE.Quaternion(),
    }),
    [],
  );

  const corridorLength = (frameCount - 1) * SPACING;

  useFrame(() => {
    const { align, line } = progressRef.current;
    const mesh = meshRef.current;
    if (mesh) {
      for (let i = 0; i < bars.length; i++) {
        const b = bars[i];
        scratch.pos.lerpVectors(b.scattered.pos, b.aligned.pos, align);
        scratch.scatteredQuat.setFromEuler(b.scattered.rot);
        scratch.alignedQuat.setFromEuler(b.aligned.rot);
        scratch.quat
          .copy(scratch.scatteredQuat)
          .slerp(scratch.alignedQuat, align);
        scratch.mat.compose(scratch.pos, scratch.quat, b.aligned.scale);
        mesh.setMatrixAt(i, scratch.mat);
      }
      mesh.instanceMatrix.needsUpdate = true;
    }

    const lm = lineRef.current;
    if (lm) {
      // The Forward Line draws from just inside the threshold into depth —
      // it belongs to the corridor, it does not reach out of it.
      const start = -0.5;
      const len = Math.max(0.0001, (corridorLength + start) * line);
      lm.scale.z = len;
      lm.position.z = start - len / 2;
      lm.visible = line > 0.001;
    }
  });

  const t = TIER_TRANSFORM[tier];

  return (
    <group position={t.position} rotation={t.rotation} scale={t.scale}>
      <instancedMesh
        ref={meshRef}
        args={[geometry, material, bars.length]}
        frustumCulled={false}
      />
      {/* Forward Line */}
      <mesh
        ref={lineRef}
        position={[0, -FRAME_H / 2 + BAR, 0]}
        material={copperMaterial}
      >
        <boxGeometry args={[0.024, 0.024, 1]} />
      </mesh>
    </group>
  );
}
