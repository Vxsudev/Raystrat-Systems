// src/components/diagrams/governance-layer-diagram.tsx
//
// Governance Layer Diagram — Phase D1, Track 1.
// Authority: specs/phases/phase-trust-evidence-architecture.md §35 (Operational
// Diagram Categories), §14 (Diagram Philosophy), §22 (Runtime Governance
// Visibility Doctrine). Mounted on agent-advantage.tsx (Governance by Design).
//
// Vertical schematic. Monochrome stroke/fill via theme tokens. Single
// semantic accent on the Governance Layer slab. Static. No decorative motion.

export function GovernanceLayerDiagram() {
  return (
    <figure
      className="mx-auto w-full max-w-2xl"
      aria-labelledby="governance-layer-diagram-title"
      aria-describedby="governance-layer-diagram-desc"
    >
      <svg
        role="img"
        viewBox="0 0 600 600"
        width="100%"
        height="auto"
        preserveAspectRatio="xMidYMid meet"
        className="text-foreground"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title id="governance-layer-diagram-title">
          Governance Layer Schematic
        </title>
        <desc id="governance-layer-diagram-desc">
          Vertical flow showing how inputs pass through a governance layer
          comprising audit trail, SLA, escalation, and continuity properties;
          then through execution; then through human review; to a terminal
          state. Audit-trail capture runs alongside every stage.
        </desc>

        <defs>
          <marker
            id="gov-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-foreground" />
          </marker>
        </defs>

        {/* INPUTS */}
        <g>
          <rect
            x="200"
            y="20"
            width="200"
            height="44"
            rx="4"
            className="fill-card stroke-border"
            strokeWidth="1.5"
          />
          <text
            x="300"
            y="46"
            textAnchor="middle"
            className="fill-foreground"
            fontFamily="inherit"
            fontSize="14"
            fontWeight="600"
          >
            INPUTS
          </text>
        </g>

        {/* Arrow → Governance Layer */}
        <line
          x1="300"
          y1="64"
          x2="300"
          y2="104"
          className="stroke-foreground"
          strokeWidth="1.5"
          markerEnd="url(#gov-arrow)"
        />

        {/* GOVERNANCE LAYER (accented slab) */}
        <g>
          <rect
            x="40"
            y="110"
            width="520"
            height="140"
            rx="4"
            className="fill-primary/5 stroke-primary"
            strokeWidth="1.5"
          />
          <text
            x="60"
            y="134"
            className="fill-primary"
            fontFamily="inherit"
            fontSize="11"
            fontWeight="600"
            letterSpacing="2"
          >
            GOVERNANCE LAYER
          </text>

          {/* Four governance properties as compartments */}
          {[
            { x: 60, label: 'AUDIT TRAIL', sub: 'continuous capture' },
            { x: 190, label: 'SLA', sub: 'threshold + window' },
            { x: 320, label: 'ESCALATION', sub: 'routed exceptions' },
            { x: 450, label: 'CONTINUITY', sub: 'governed change' },
          ].map((cell) => (
            <g key={cell.label}>
              <rect
                x={cell.x}
                y="154"
                width="110"
                height="80"
                rx="3"
                className="fill-card stroke-border"
                strokeWidth="1"
              />
              <text
                x={cell.x + 55}
                y="186"
                textAnchor="middle"
                className="fill-foreground"
                fontFamily="inherit"
                fontSize="12"
                fontWeight="600"
              >
                {cell.label}
              </text>
              <text
                x={cell.x + 55}
                y="208"
                textAnchor="middle"
                className="fill-muted-foreground"
                fontFamily="inherit"
                fontSize="10"
              >
                {cell.sub}
              </text>
            </g>
          ))}
        </g>

        {/* Arrow → Execution */}
        <line
          x1="300"
          y1="250"
          x2="300"
          y2="290"
          className="stroke-foreground"
          strokeWidth="1.5"
          markerEnd="url(#gov-arrow)"
        />

        {/* EXECUTION */}
        <g>
          <rect
            x="200"
            y="296"
            width="200"
            height="44"
            rx="4"
            className="fill-card stroke-border"
            strokeWidth="1.5"
          />
          <text
            x="300"
            y="322"
            textAnchor="middle"
            className="fill-foreground"
            fontFamily="inherit"
            fontSize="14"
            fontWeight="600"
          >
            EXECUTION
          </text>
        </g>

        {/* Arrow → Human Review */}
        <line
          x1="300"
          y1="340"
          x2="300"
          y2="380"
          className="stroke-foreground"
          strokeWidth="1.5"
          markerEnd="url(#gov-arrow)"
        />

        {/* HUMAN REVIEW */}
        <g>
          <rect
            x="200"
            y="386"
            width="200"
            height="44"
            rx="4"
            className="fill-card stroke-border"
            strokeWidth="1.5"
          />
          <text
            x="300"
            y="412"
            textAnchor="middle"
            className="fill-foreground"
            fontFamily="inherit"
            fontSize="14"
            fontWeight="600"
          >
            HUMAN REVIEW
          </text>
          <text
            x="300"
            y="428"
            textAnchor="middle"
            className="fill-muted-foreground"
            fontFamily="inherit"
            fontSize="10"
          >
            on exception or rule-defined route
          </text>
        </g>

        {/* Arrow → Terminal State */}
        <line
          x1="300"
          y1="442"
          x2="300"
          y2="482"
          className="stroke-foreground"
          strokeWidth="1.5"
          markerEnd="url(#gov-arrow)"
        />

        {/* TERMINAL STATE */}
        <g>
          <rect
            x="200"
            y="488"
            width="200"
            height="44"
            rx="4"
            className="fill-card stroke-foreground"
            strokeWidth="1.5"
          />
          <text
            x="300"
            y="514"
            textAnchor="middle"
            className="fill-foreground"
            fontFamily="inherit"
            fontSize="14"
            fontWeight="600"
          >
            TERMINAL STATE
          </text>
        </g>

        {/* Audit-trail continuous capture annotation (right gutter) */}
        <line
          x1="568"
          y1="40"
          x2="568"
          y2="512"
          className="stroke-muted-foreground"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        <text
          x="586"
          y="280"
          className="fill-muted-foreground"
          fontFamily="inherit"
          fontSize="10"
          fontWeight="600"
          letterSpacing="2"
          transform="rotate(90 586 280)"
          textAnchor="middle"
        >
          AUDIT TRAIL — CONTINUOUS
        </text>
      </svg>
      <figcaption className="mt-3 text-center text-xs font-medium tracking-widest uppercase text-muted-foreground">
        Schematic representation — governance is a structural runtime layer
      </figcaption>
    </figure>
  );
}
