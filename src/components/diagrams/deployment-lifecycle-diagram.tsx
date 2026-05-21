// src/components/diagrams/deployment-lifecycle-diagram.tsx
//
// Deployment Lifecycle Diagram — Phase D2, Track 2; simplified D2.5.
// Authority: specs/phases/phase-trust-evidence-architecture.md §6.2 (Deployment
// Lifecycle Artifact), §14 (Diagram Philosophy), §6.3 (Deployment Register Language).
// Mounted on results.tsx (Audit CTA — engagement surface).
//
// Vertical schematic. Six deployment stages: Operational Audit through Continuity
// Review. Monochrome for engagement phases; single primary accent on DEPLOYMENT
// and GOVERNANCE RUN (governed operational arc — audit trail active).
// Static. No decorative motion. Mobile: scales via viewBox.

export function DeploymentLifecycleDiagram() {
  return (
    <figure
      className="mx-auto w-full max-w-3xl"
      aria-labelledby="deployment-lifecycle-diagram-title"
      aria-describedby="deployment-lifecycle-diagram-desc"
    >
      <svg
        role="img"
        viewBox="0 0 720 610"
        width="100%"
        height="auto"
        preserveAspectRatio="xMidYMid meet"
        className="text-foreground"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title id="deployment-lifecycle-diagram-title">
          Operational Engagement Lifecycle
        </title>
        <desc id="deployment-lifecycle-diagram-desc">
          Schematic of the six-stage operational engagement lifecycle:
          Operational Audit, Architecture Review, Build, Deployment, Governance
          Run, and Continuity Review. Deployment and Governance Run are the
          governed operational phases where audit trail capture and SLA
          enforcement are active.
        </desc>

        <defs>
          <marker
            id="dl-arrow"
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

        {/* OPERATIONAL AUDIT */}
        <g>
          <rect
            x="80" y="30" width="560" height="64" rx="4"
            className="fill-card stroke-border" strokeWidth="1.5"
          />
          <text x="360" y="68" textAnchor="middle" className="fill-foreground" fontFamily="inherit" fontSize="13" fontWeight="600">
            OPERATIONAL AUDIT
          </text>
          <text x="360" y="85" textAnchor="middle" className="fill-muted-foreground" fontFamily="inherit" fontSize="10">
            gap map · failure mode registry · architecture proposal
          </text>
        </g>

        <line x1="360" y1="94" x2="360" y2="116" className="stroke-foreground" strokeWidth="1.5" markerEnd="url(#dl-arrow)" />

        {/* ARCHITECTURE REVIEW */}
        <g>
          <rect
            x="80" y="118" width="560" height="64" rx="4"
            className="fill-card stroke-border" strokeWidth="1.5"
          />
          <text x="360" y="156" textAnchor="middle" className="fill-foreground" fontFamily="inherit" fontSize="13" fontWeight="600">
            ARCHITECTURE REVIEW
          </text>
          <text x="360" y="173" textAnchor="middle" className="fill-muted-foreground" fontFamily="inherit" fontSize="10">
            client-side ratification of proposed system architecture
          </text>
        </g>

        <line x1="360" y1="182" x2="360" y2="204" className="stroke-foreground" strokeWidth="1.5" markerEnd="url(#dl-arrow)" />

        {/* BUILD */}
        <g>
          <rect
            x="80" y="206" width="560" height="64" rx="4"
            className="fill-card stroke-border" strokeWidth="1.5"
          />
          <text x="360" y="244" textAnchor="middle" className="fill-foreground" fontFamily="inherit" fontSize="13" fontWeight="600">
            BUILD
          </text>
          <text x="360" y="261" textAnchor="middle" className="fill-muted-foreground" fontFamily="inherit" fontSize="10">
            system construction under governed specification
          </text>
        </g>

        <line x1="360" y1="270" x2="360" y2="292" className="stroke-foreground" strokeWidth="1.5" markerEnd="url(#dl-arrow)" />

        {/* DEPLOYMENT — governed arc begins, audit trail active */}
        <g>
          <rect
            x="80" y="294" width="560" height="64" rx="4"
            className="fill-primary/5 stroke-primary" strokeWidth="1.5"
          />
          <text x="360" y="332" textAnchor="middle" className="fill-primary" fontFamily="inherit" fontSize="13" fontWeight="600">
            DEPLOYMENT
          </text>
          <text x="360" y="349" textAnchor="middle" className="fill-muted-foreground" fontFamily="inherit" fontSize="10">
            governed runtime commences · audit trail begins · SLA clock starts
          </text>
        </g>

        <line x1="360" y1="358" x2="360" y2="380" className="stroke-foreground" strokeWidth="1.5" markerEnd="url(#dl-arrow)" />

        {/* GOVERNANCE RUN — primary product state */}
        <g>
          <rect
            x="80" y="382" width="560" height="64" rx="4"
            className="fill-primary/5 stroke-primary" strokeWidth="1.5"
          />
          <text x="360" y="420" textAnchor="middle" className="fill-primary" fontFamily="inherit" fontSize="13" fontWeight="600">
            GOVERNANCE RUN
          </text>
          <text x="360" y="437" textAnchor="middle" className="fill-muted-foreground" fontFamily="inherit" fontSize="10">
            continuous operation under SLA · escalation routing · audit capture
          </text>
        </g>

        <line x1="360" y1="446" x2="360" y2="468" className="stroke-foreground" strokeWidth="1.5" markerEnd="url(#dl-arrow)" />

        {/* CONTINUITY REVIEW */}
        <g>
          <rect
            x="80" y="470" width="560" height="64" rx="4"
            className="fill-card stroke-border" strokeWidth="1.5"
          />
          <text x="360" y="508" textAnchor="middle" className="fill-foreground" fontFamily="inherit" fontSize="13" fontWeight="600">
            CONTINUITY REVIEW
          </text>
          <text x="360" y="525" textAnchor="middle" className="fill-muted-foreground" fontFamily="inherit" fontSize="10">
            periodic operational state review · governed change cycle
          </text>
        </g>

        {/* Legend */}
        <g transform="translate(0, 558)">
          <text
            x="80" y="0"
            className="fill-muted-foreground"
            fontFamily="inherit"
            fontSize="10"
            fontWeight="600"
            letterSpacing="2"
          >
            LEGEND
          </text>

          <rect x="80" y="12" width="14" height="14" rx="2" className="fill-card stroke-border" strokeWidth="1" />
          <text x="102" y="24" className="fill-foreground/80" fontFamily="inherit" fontSize="11">
            Standard engagement phase
          </text>

          <rect x="80" y="34" width="14" height="14" rx="2" className="fill-primary/5 stroke-primary" strokeWidth="1" />
          <text x="102" y="46" className="fill-foreground/80" fontFamily="inherit" fontSize="11">
            Governed operational phase (audit trail active)
          </text>
        </g>
      </svg>
      <figcaption className="mt-3 text-center text-xs font-medium tracking-widest uppercase text-muted-foreground">
        Schematic representation — operational engagement lifecycle
      </figcaption>
    </figure>
  );
}
