import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "Forward-Deployed Engineering — Raystrat Systems",
  description:
    "Raystrat engineers work directly with your business and technical teams to build and deploy software in your operating environment: requirements, product and engineering decisions, integrations, production and handover.",
  alternates: { canonical: "/forward-deployed-engineering" },
  openGraph: {
    title: "Forward-Deployed Engineering — Raystrat Systems",
    description:
      "Engineers embedded in the work. From requirements to production, with clear responsibility and an agreed handover.",
    type: "website",
    siteName: "Raystrat Systems",
  },
};

const work = [
  {
    id: "product-and-technical-decisions",
    title: "Product and technical decisions",
    body: "Translate business requirements into a workable scope. Resolve assumptions with users and make the architecture and implementation decisions needed to deliver it.",
  },
  {
    id: "data-and-integrations",
    title: "Data and integrations",
    body: "Connect business systems, documents and APIs. Address data quality, identity, permissions and the information the application depends on.",
  },
  {
    id: "ai-evaluation",
    title: "AI evaluation",
    body: "Define what acceptable output means for the use case. Test representative examples, investigate failures and build appropriate review and exception handling.",
  },
  {
    id: "production-reliability",
    title: "Production reliability",
    body: "Address monitoring, error handling, deployment and recovery. Make limitations visible and establish how operational issues will be handled.",
  },
  {
    id: "adoption-and-handover",
    title: "Adoption and handover",
    body: "Work with users during rollout. Document the system, prepare the people responsible for it and agree how maintenance and further development will continue.",
  },
];

const engagement = [
  {
    num: "01",
    title: "Understand the initiative",
    body: "Review the business objective, current software, users, constraints and work already completed.",
  },
  {
    num: "02",
    title: "Agree the scope",
    body: "Define the engineering responsibilities, access requirements, deliverables and criteria for acceptance.",
  },
  {
    num: "03",
    title: "Build with the team",
    body: "Implement and integrate the software while reviewing progress with users and technical stakeholders.",
  },
  {
    num: "04",
    title: "Deploy and hand over",
    body: "Verify the system in its intended environment, support rollout and document the responsibilities for continued operation.",
  },
];

const questions = [
  {
    id: "specification",
    q: "Do we need a complete specification?",
    a: "No. We need a clear business objective and access to the people and information required to investigate it. Defining the engineering scope is part of the initial work.",
  },
  {
    id: "existing-team",
    q: "Can you work with our existing engineering team?",
    a: "Yes. We agree responsibilities, interfaces and decision ownership with your team so the engagement supports the existing delivery process.",
  },
  {
    id: "existing-codebase",
    q: "Can you take over an existing prototype or codebase?",
    a: "We begin by reviewing its condition, dependencies and intended use. That establishes what can be retained, what needs changing and what the delivery scope should cover.",
  },
  {
    id: "on-site",
    q: "Does forward deployment mean working on-site?",
    a: "The working arrangement is agreed around access, collaboration and operational requirements. Forward deployment means direct involvement with the customer’s problem; it does not by itself specify a location.",
  },
  {
    id: "after-deployment",
    q: "What happens after deployment?",
    a: "Handover, maintenance and continued development are agreed as part of the engagement. The system should have clear operating responsibilities, documentation and an escalation path.",
  },
];

export default function ForwardDeployedEngineering() {
  return (
    <>
      <SiteHeader />

      <main id="top">
        {/* Hero */}
        <section className="hero" data-testid="fde-hero-section">
          <div className="container">
            <span className="eyebrow" data-testid="fde-hero-eyebrow">
              Forward-Deployed Engineering
            </span>
            <h1 data-testid="fde-hero-heading">Engineers embedded in the work.</h1>
            <div className="hero-lead">
              <p>
                Raystrat works directly with your business and technical teams to build and deploy
                software in your operating environment.
              </p>
              <p>
                We help define the requirements, make product and engineering decisions, connect
                existing systems and resolve the work between a functioning prototype and production
                use.
              </p>
            </div>
            <div className="hero-actions">
              <Link href="/#contact" className="btn btn-primary" data-testid="fde-hero-primary-cta">
                Discuss Your Project
              </Link>
              <a href="#engagement" className="btn btn-secondary" data-testid="fde-hero-secondary-cta">
                How We Work
              </a>
            </div>
          </div>
        </section>

        {/* Why forward deployment */}
        <section className="section section-alt" id="why" data-testid="fde-why-section">
          <div className="container split">
            <div className="split-head">
              <h2>Production brings requirements the demo never had.</h2>
            </div>
            <div className="prose" data-testid="fde-why-copy">
              <p className="lead">
                The application needs to work with your data, permissions, existing systems and
                operating procedures. Users encounter exceptions. Security and operational teams need
                answers. Someone needs to own those details through delivery.
              </p>
              <p>
                Our engineers work with the people responsible for the operation and the people using
                the software. Requirements, implementation and feedback stay connected as the system
                develops.
              </p>
            </div>
          </div>
        </section>

        {/* The work we take on */}
        <section className="section" id="work" data-testid="fde-work-section">
          <div className="container">
            <div className="section-head">
              <h2>From requirements to production.</h2>
            </div>
            <dl className="deliverables">
              {work.map((item) => (
                <div className="deliverable" key={item.id} id={item.id} data-testid={`fde-work-${item.id}`}>
                  <dt>{item.title}</dt>
                  <dd>{item.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* How we work with your team */}
        <section className="section section-alt" id="working-together" data-testid="fde-team-section">
          <div className="container split">
            <div className="split-head">
              <h2>Direct access. Clear responsibility.</h2>
            </div>
            <div className="prose" data-testid="fde-team-copy">
              <p className="lead">
                Raystrat works alongside an accountable customer lead, the relevant technical team and
                the people closest to the workflow.
              </p>
              <p>
                We agree the scope, decision responsibilities and acceptance criteria. Working software
                is reviewed regularly so questions are resolved against the actual system.
              </p>
              <p>
                Your team supplies domain knowledge, access and business decisions. Raystrat owns the
                agreed engineering work and makes technical progress, risks and dependencies visible.
              </p>
              <p className="strong">
                We agree how changes to scope, priorities and delivery will be handled rather than
                letting them accumulate informally.
              </p>
            </div>
          </div>
        </section>

        {/* Engagement */}
        <section className="section" id="engagement" data-testid="fde-engagement-section">
          <div className="container">
            <div className="section-head">
              <h2>Start with the delivery requirement.</h2>
            </div>
            <ol className="sequence" aria-label="Engagement sequence" data-testid="fde-engagement-sequence">
              {engagement.map((item) => (
                <li className="sequence-step" key={item.num} data-testid={`fde-engagement-${item.num}`}>
                  <span className="num" aria-hidden="true">{item.num}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Choosing the engagement */}
        <section className="section section-alt" id="choosing" data-testid="fde-choosing-section">
          <div className="container">
            <div className="section-head">
              <h2>AI Solutions or Forward-Deployed Engineering?</h2>
            </div>
            <div className="offer">
              <div className="offer-col" data-testid="fde-choose-ai-solutions">
                <h3>AI Solutions</h3>
                <p className="offer-for">
                  You need a customer-specific AI application built around a business workflow, with
                  the solution scoped and delivered as an engagement.
                </p>
                <Link href="/ai-solutions" className="text-link" data-testid="fde-choose-ai-solutions-link">
                  Explore AI Solutions <span aria-hidden="true">→</span>
                </Link>
              </div>
              <div className="offer-col" data-testid="fde-choose-forward-deployed">
                <h3>Forward-Deployed Engineering</h3>
                <p className="offer-for">
                  You have an initiative that needs engineers working directly with your team to
                  resolve requirements and own delivery.
                </p>
                <Link href="/#contact" className="text-link" data-testid="fde-choose-forward-deployed-link">
                  Discuss Your Project <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
            <p className="apps-note" data-testid="fde-choosing-note">
              The two can overlap. We agree the engagement around the work and responsibilities
              required—not the label.
            </p>
          </div>
        </section>

        {/* Questions */}
        <section className="section" id="questions" data-testid="fde-questions-section">
          <div className="container split">
            <div className="split-head">
              <h2>Before we start.</h2>
            </div>
            <div className="faq">
              {questions.map((item) => (
                <details className="faq-item" key={item.id} data-testid={`fde-question-${item.id}`}>
                  <summary data-testid={`fde-question-toggle-${item.id}`}>
                    <span>{item.q}</span>
                    <span className="faq-icon" aria-hidden="true" />
                  </summary>
                  <p data-testid={`fde-answer-${item.id}`}>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className="section section-alt" id="final" data-testid="fde-final-section">
          <div className="container final-cta">
            <div>
              <span className="eyebrow">Discuss your project</span>
              <h2>Bring us the initiative and what needs to happen next.</h2>
              <p>
                Tell us what you are building, what already exists and where delivery needs support.
              </p>
            </div>
            <Link href="/#contact" className="btn btn-primary" data-testid="fde-final-cta">
              Discuss Your Project
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
