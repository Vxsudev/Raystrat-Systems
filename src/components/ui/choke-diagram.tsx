'use client';

import { useState, useRef } from 'react';
import { chokePoints } from '@/data/content';

type Props = {
  activeId?: string | null;
  onSelect?: (id: string | null) => void;
};

export function ChokeDiagram({ activeId: externalActiveId, onSelect }: Props) {
  const [internalActiveId, setInternalActiveId] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Use external state if provided, otherwise manage internally
  const activeId = onSelect !== undefined ? externalActiveId ?? null : internalActiveId;

  const handleSelect = (id: string) => {
    const next = id === activeId ? null : id;
    if (onSelect) {
      onSelect(next);
    } else {
      setInternalActiveId(next);
    }
  };

  const W = 600;
  const H = 200;

  const nodes = chokePoints.map((cp) => ({
    ...cp,
    cx: (cp.x / 100) * (W - 120) + 60,
    cy: (cp.y / 100) * (H - 80) + 40,
  }));

  const active = nodes.find((n) => n.id === activeId);

  return (
    <div className="space-y-4">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full border border-border rounded-md bg-card"
        style={{ height: '180px' }}
      >
        {/* polyline through nodes in order */}
        <polyline
          points={nodes.map((n) => `${n.cx},${n.cy}`).join(' ')}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="1"
          strokeDasharray="4 3"
        />
        {/* nodes */}
        {nodes.map((n) => {
          const isActive = n.id === activeId;
          return (
            <g
              key={n.id}
              style={{ cursor: 'pointer' }}
              onClick={() => handleSelect(n.id)}
            >
              <circle
                cx={n.cx}
                cy={n.cy}
                r={18}
                fill={isActive ? 'hsl(214 98% 40%)' : 'hsl(220 24% 18%)'}
                stroke={isActive ? 'hsl(214 98% 60%)' : 'hsl(var(--border))'}
                strokeWidth="1"
              />
              <text
                x={n.cx}
                y={n.cy + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={isActive ? '#fff' : 'hsl(var(--muted-foreground))'}
                fontSize="10"
                fontFamily="var(--font-mono, monospace)"
                fontWeight={600}
              >
                {n.ix}
              </text>
              <text
                x={n.cx}
                y={n.cy + 28}
                textAnchor="middle"
                fill="hsl(var(--muted-foreground))"
                fontSize="8"
                fontFamily="inherit"
              >
                {n.name.split(' ')[0]}
              </text>
            </g>
          );
        })}
      </svg>
      {active && (
        <div className="border border-primary/30 rounded-md p-4 bg-card text-sm">
          <p className="font-mono text-[10px] text-primary uppercase tracking-widest mb-1">
            {active.ix} — {active.name}
          </p>
          <p className="text-foreground/80">{active.detail}</p>
        </div>
      )}
    </div>
  );
}
