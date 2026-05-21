// src/components/diagrams/frontline-support-architecture-diagram.tsx
//
// Frontline Support System Architecture Diagram — Phase D1, Track 3.
// Authority: specs/phases/phase-trust-evidence-architecture.md §25 (Systems
// Blueprint Doctrine), §35 (Operational Diagram Categories — System
// Architecture Diagram), §14 (Diagram Philosophy).
// Mounted on /systems/frontline-support via service-page-client.tsx.
//
// Vertical schematic. Main flow: INTAKE → CLASSIFICATION → GOVERNANCE GATE →
// EXECUTION → TERMINAL STATE. Exception branch from GOVERNANCE GATE and from
// EXECUTION routes to ESCALATION / HUMAN REVIEW, which rejoins TERMINAL STATE.
// AUDIT TRAIL annotation runs alongside the main flow.
//
// Single semantic accent (primary) on the governed in-policy path and on the
// terminal state border. Monochrome for all other elements.

export function FrontlineSupportArchitectureDiagram() {
  return (
    <figure
      className="mx-auto w-full max-w-3xl"
      aria-labelledby="frontline-support-architecture-title"
      aria-describedby="frontline-support-architecture-desc"
    >
      <svg
        role="img"
        viewBox="0 0 720 760"
        width="100%"
        height="auto"
        preserveAspectRatio="xMidYMid meet"
        className="text-foreground"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title id="frontline-support-architecture-title">
          Frontline Support — System Architecture
        </title>
        <desc id="frontline-support-architecture-desc">
          Schematic architecture of the Frontline Support system. Incoming
          contact passes through classification and a governance gate.
          In-policy cases execute first-contact resolution and reach a
          terminal state. Out-of-policy or persistent exceptions branch to
          escalation and human review, which also rejoin a terminal state.
          Audit trail capture is continuous across every stage.
        </desc>

        <defs>
          <marker
            id="fls-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-foreground" />
          </marker>
          <marker
            id="fls-arrow-muted"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-muted-foreground" />
          </marker>
        </defs>

        {/* INTAKE */}
        <g>
          <rect
            x="220"
            y="20"
            width="200"
            height="48"
            rx="4"
            className="fill-card stroke-border"
            strokeWidth="1.5"
          />
          <text
            x="320"
            y="44"
            textAnchor="middle"
            className="fill-foreground"
            fontFamily="inherit"
            fontSize="14"
            fontWeight="600"
          >
            INTAKE
          </text>
          <text
            x="320"
            y="60"
            textAnchor="middle"
            className="fill-muted-foreground"
            fontFamily="inherit"
            fontSize="10"
          >
            incoming contact, any channel
          </text>
        </g>

        <line
          x1="320"
          y1="68"
          x2="320"
          y2="100"
          className="stroke-foreground"
          strokeWidth="1.5"
          markerEnd="url(#fls-arrow)"
        />

        {/* CLASSIFICATION */}
        <g>
          <rect
            x="220"
            y="106"
            width="200"
            height="48"
            rx="4"
            className="fill-card stroke-border"
            strokeWidth="1.5"
          />
          <text
            x="320"
            y="130"
            textAnchor="middle"
            className="fill-foreground"
            fontFamily="inherit"
            fontSize="14"
            fontWeight="600"
          >
            CLASSIFICATION
          </text>
          <text
            x="320"
            y="146"
            textAnchor="middle"
            className="fill-muted-foreground"
            fontFamily="inherit"
            fontSize="10"
          >
            case-type identification
          </text>
        </g>

        <line
          x1="320"
          y1="154"
          x2="320"
          y2="186"
          className="stroke-foreground"
          strokeWidth="1.5"
          markerEnd="url(#fls-arrow)"
        />

        {/* GOVERNANCE GATE (accent) */}
        <g>
          <rect
            x="200"
            y="192"
            width="240"
            height="60"
            rx="4"
            className="fill-primary/5 stroke-primary"
            strokeWidth="1.5"
          />
          <text
            x="320"
            y="218"
            textAnchor="middle"
            className="fill-primary"
            fontFamily="inherit"
            fontSize="14"
            fontWeight="600"
          >
            GOVERNANCE GATE
          </text>
          <text
            x="320"
            y="238"
            textAnchor="middle"
            className="fill-muted-foreground"
            fontFamily="inherit"
            fontSize="10"
          >
            policy match · SLA window · eligibility
          </text>
        </g>

        {/* Branch labels */}
        <text
          x="320"
          y="278"
          textAnchor="middle"
          className="fill-muted-foreground"
          fontFamily="inherit"
          fontSize="10"
          fontWeight="600"
          letterSpacing="1.5"
        >
          IN-POLICY
        </text>
        <text
          x="558"
          y="278"
          textAnchor="middle"
          className="fill-muted-foreground"
          fontFamily="inherit"
          fontSize="10"
          fontWeight="600"
          letterSpacing="1.5"
        >
          EXCEPTION
        </text>

        {/* In-policy path arrow */}
        <line
          x1="320"
          y1="252"
          x2="320"
          y2="296"
          className="stroke-primary"
          strokeWidth="1.5"
          markerEnd="url(#fls-arrow)"
        />

        {/* Exception branch from gate to escalation */}
        <path
          d="M 440 222 L 558 222 L 558 290"
          className="stroke-muted-foreground fill-none"
          strokeWidth="1.5"
          markerEnd="url(#fls-arrow-muted)"
          strokeDasharray="5 4"
        />

        {/* EXECUTION (in-policy) */}
        <g>
          <rect
            x="220"
            y="302"
            width="200"
            height="60"
            rx="4"
            className="fill-card stroke-border"
            strokeWidth="1.5"
          />
          <text
            x="320"
            y="326"
            textAnchor="middle"
            className="fill-foreground"
            fontFamily="inherit"
            fontSize="14"
            fontWeight="600"
          >
            EXECUTION
          </text>
          <text
            x="320"
            y="346"
            textAnchor="middle"
            className="fill-muted-foreground"
            fontFamily="inherit"
            fontSize="10"
          >
            first-contact resolution
          </text>
        </g>

        {/* Persistent-exception branch from execution to escalation */}
        <path
          d="M 420 332 L 478 332 L 478 348"
          className="stroke-muted-foreground fill-none"
          strokeWidth="1.5"
          markerEnd="url(#fls-arrow-muted)"
          strokeDasharray="5 4"
        />
        <text
          x="486"
          y="328"
          className="fill-muted-foreground"
          fontFamily="inherit"
          fontSize="9"
        >
          persistent
        </text>
        <text
          x="486"
          y="340"
          className="fill-muted-foreground"
          fontFamily="inherit"
          fontSize="9"
        >
          exception
        </text>

        {/* ESCALATION / HUMAN REVIEW (right column) */}
        <g>
          <rect
            x="458"
            y="296"
            width="200"
            height="70"
            rx="4"
            className="fill-card stroke-border"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          <text
            x="558"
            y="324"
            textAnchor="middle"
            className="fill-foreground"
            fontFamily="inherit"
            fontSize="13"
            fontWeight="600"
          >
            ESCALATION
          </text>
          <text
            x="558"
            y="342"
            textAnchor="middle"
            className="fill-foreground"
            fontFamily="inherit"
            fontSize="13"
            fontWeight="600"
          >
            HUMAN REVIEW
          </text>
          <text
            x="558"
            y="358"
            textAnchor="middle"
            className="fill-muted-foreground"
            fontFamily="inherit"
            fontSize="10"
          >
            full context preserved
          </text>
        </g>

        {/* In-policy path → Terminal */}
        <line
          x1="320"
          y1="362"
          x2="320"
          y2="436"
          className="stroke-foreground"
          strokeWidth="1.5"
          markerEnd="url(#fls-arrow)"
        />

        {/* Escalation rejoins Terminal */}
        <path
          d="M 558 366 L 558 418 L 420 418 L 420 444"
          className="stroke-foreground fill-none"
          strokeWidth="1.5"
          markerEnd="url(#fls-arrow)"
        />

        {/* TERMINAL STATE (accent border) */}
        <g>
          <rect
            x="220"
            y="442"
            width="200"
            height="68"
            rx="4"
            className="fill-card stroke-primary"
            strokeWidth="1.5"
          />
          <text
            x="320"
            y="468"
            textAnchor="middle"
            className="fill-foreground"
            fontFamily="inherit"
            fontSize="14"
            fontWeight="600"
          >
            TERMINAL STATE
          </text>
          <text
            x="320"
            y="486"
            textAnchor="middle"
            className="fill-muted-foreground"
            fontFamily="inherit"
            fontSize="10"
          >
            resolved · disqualified · escalated-closed
          </text>
        </g>

        {/* AUDIT TRAIL annotation (left gutter) */}
        <line
          x1="56"
          y1="40"
          x2="56"
          y2="490"
          className="stroke-muted-foreground"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        <text
          x="40"
          y="264"
          className="fill-muted-foreground"
          fontFamily="inherit"
          fontSize="10"
          fontWeight="600"
          letterSpacing="2"
          transform="rotate(-90 40 264)"
          textAnchor="middle"
        >
          AUDIT TRAIL — CONTINUOUS
        </text>

        {/* Audit-trail capture lines to each stage */}
        {[44, 130, 222, 332, 476].map((y, idx) => (
          <line
            key={idx}
            x1="56"
            y1={y}
            x2="218"
            y2={y}
            className="stroke-muted-foreground"
            strokeWidth="0.75"
            strokeDasharray="2 3"
            opacity="0.7"
          />
        ))}

        {/* Legend below the diagram */}
        <g transform="translate(0, 560)">
          <text
            x="60"
            y="0"
            className="fill-muted-foreground"
            fontFamily="inherit"
            fontSize="10"
            fontWeight="600"
            letterSpacing="2"
          >
            LEGEND
          </text>
          {/* Governed path */}
          <line
            x1="60"
            y1="22"
            x2="100"
            y2="22"
            className="stroke-primary"
            strokeWidth="1.5"
          />
          <text
            x="110"
            y="26"
            className="fill-foreground/80"
            fontFamily="inherit"
            fontSize="11"
          >
            governed in-policy path
          </text>

          {/* Exception path */}
          <line
            x1="60"
            y1="48"
            x2="100"
            y2="48"
            className="stroke-muted-foreground"
            strokeWidth="1.5"
            strokeDasharray="5 4"
          />
          <text
            x="110"
            y="52"
            className="fill-foreground/80"
            fontFamily="inherit"
            fontSize="11"
          >
            exception / escalation branch
          </text>

          {/* Audit trail */}
          <line
            x1="60"
            y1="74"
            x2="100"
            y2="74"
            className="stroke-muted-foreground"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <text
            x="110"
            y="78"
            className="fill-foreground/80"
            fontFamily="inherit"
            fontSize="11"
          >
            audit-trail capture (continuous)
          </text>

          {/* Standard flow */}
          <line
            x1="60"
            y1="100"
            x2="100"
            y2="100"
            className="stroke-foreground"
            strokeWidth="1.5"
          />
          <text
            x="110"
            y="104"
            className="fill-foreground/80"
            fontFamily="inherit"
            fontSize="11"
          >
            standard transition
          </text>
        </g>
      </svg>
      <figcaption className="mt-3 text-center text-xs font-medium tracking-widest uppercase text-muted-foreground">
        Schematic representation — Frontline Support system architecture
      </figcaption>
    </figure>
  );
}
