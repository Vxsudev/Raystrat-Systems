import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "AI Solutions — Raystrat Systems",
  description:
    "Raystrat develops AI applications around your operations: reporting and review, company knowledge and document workflows. We connect existing systems, evaluate output with your users and deploy into production.",
  alternates: { canonical: "/ai-solutions" },
  openGraph: {
    title: "AI Solutions — Raystrat Systems",
    description:
      "AI systems built around your operations. Applications, business context, deliverables and how an engagement starts and expands.",
    type: "website",
    siteName: "Raystrat Systems",
  },
};

const applications = [
  {
    num: "01",
    id: "reporting-and-review",
    title: "Reporting and review",
    lead: "Bring information from files and business systems into reports that people can check and use.",
    body: "The system can assemble a draft, identify missing information and inconsistencies, and make supporting sources available during review.",
    flow: ["Source files", "Checks", "Draft report", "Human review"],
    define: "source formats, report requirements, validation rules and who approves the output.",
  },
  {
    num: "02",
    id: "company-knowledge",
    title: "Company knowledge",
    lead: "Help teams answer questions using relevant internal information.",
    body: "Connect documents and systems, retrieve supporting material and present answers with references. Respect existing access permissions and flag when the available information does not support an answer.",
    flow: ["Question", "Authorised sources", "Answer with references"],
    define: "authoritative sources, user permissions, update frequency and evaluation criteria.",
  },
  {
    num: "03",
    id: "document-workflows",
    title: "Document workflows",
    lead: "Turn incoming documents into information the business can act on.",
    body: "Extract relevant fields, check required information and pass the result into the next workflow or system. Route ambiguous or incomplete cases for review.",
    flow: ["Incoming document", "Extract and validate", "Route or flag exception"],
    define: "document types, required fields, exception rules and downstream actions.",
  },
];

const deliverables = [
  {
    id: "application-and-integrations",
    title: "Application and integrations",
    body: "The interface, workflow and connections required for the agreed use case.",
  },
  {
    id: "evaluation",
    title: "Evaluation",
    body: "Representative examples and agreed checks for output quality, including incorrect answers, missing information and exceptions.",
  },
  {
    id: "production-readiness",
    title: "Production readiness",
    body: "Access controls, monitoring, failure handling and review requirements appropriate to the deployment.",
  },
  {
    id: "documentation-and-handover",
    title: "Documentation and handover",
    body: "Operating instructions, known limitations and clear responsibilities for maintaining the system.",
  },
];

const engagement = [
  {
    num: "01",
    title: "Scope",
    body: "Identify the users, available information, existing systems and outcome the business needs. Agree what is included and how the result will be evaluated.",
  },
  {
    num: "02",
    title: "Build and validate",
    body: "Develop the application using representative inputs. Review working outputs with the people who understand the task.",
  },
  {
    num: "03",
    title: "Deploy",
    body: "Integrate the application into the agreed environment. Resolve access, reliability and user-readiness requirements.",
  },
  {
    num: "04",
    title: "Improve and expand",
    body: "Review performance against the agreed measures. Address limitations and extend into additional workflows where the results justify it.",
  },
];

const questions = [
  {
    id: "replace-systems",
    q: "Do we need to replace our existing systems?",
    a: "Not necessarily. We first assess the tools and interfaces already available. The solution may integrate with existing software rather than replace it.",
  },
  {
    id: "data-organised",
    q: "Does our data need to be perfectly organised?",
    a: "No. We assess the relevant sources and identify the preparation required. Missing, inconsistent or inaccessible information may affect the scope and sequence of delivery.",
  },
  {
    id: "incorrect-output",
    q: "How do you handle incorrect AI output?",
    a: "We define evaluation criteria, test representative cases and design review and exception paths around the consequences of an error. AI output should not be treated as inherently reliable.",
  },
  {
    id: "ownership",
    q: "Who owns and maintains the system?",
    a: "Ownership, access, third-party dependencies and maintenance responsibilities are agreed in the engagement terms. The operating model should be clear before deployment.",
  },
  {
    id: "to-begin",
    q: "What do you need to begin?",
    a: "A specific workflow, access to the people who understand it and representative examples that can be shared through an agreed secure process. Please do not send confidential files through the public enquiry form.",
  },
];

export default function AiSolutions() {
  return (
    <>
      <SiteHeader />

      <main id="top">
        {/* Hero */}
        <section className="hero" data-testid="ais-hero-section">
          <div className="container">
            <span className="eyebrow" data-testid="ais-hero-eyebrow">
              AI Solutions
            </span>
            <h1 data-testid="ais-hero-heading">AI systems built around your operations.</h1>
            <div className="hero-lead">
              <p>
                Connect your business data and knowledge to the work your team needs to do.
              </p>
              <p>
                Raystrat develops AI applications, connects them to existing systems and works with
                your users to evaluate and deploy them.
              </p>
            </div>
            <div className="hero-actions">
              <Link href="/#contact" className="btn btn-primary" data-testid="ais-hero-primary-cta">
                Discuss Your Project
              </Link>
              <a href="#applications" className="btn btn-secondary" data-testid="ais-hero-secondary-cta">
                Explore Applications
              </a>
            </div>
          </div>
        </section>

        {/* The delivery problem */}
        <section className="section section-alt" id="delivery" data-testid="ais-delivery-section">
          <div className="container split">
            <div className="split-head">
              <span className="eyebrow">The delivery problem</span>
              <h2>The model is only part of the system.</h2>
            </div>
            <div className="prose" data-testid="ais-delivery-copy">
              <p className="lead">
                A useful answer depends on the right information, the context to interpret it and a
                clear definition of what good looks like.
              </p>
              <p>
                A useful business application needs more: access controls, integrations, review
                steps and a dependable way to handle missing information or incorrect output.
              </p>
              <p className="strong">
                We build those parts together, around the workflow the system must support.
              </p>
            </div>
          </div>
        </section>

        {/* Applications */}
        <section className="section" id="applications" data-testid="ais-applications-section">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Applications</span>
              <h2>Where AI can help.</h2>
            </div>

            <div className="appblocks">
              {applications.map((item) => (
                <article className="appblock" key={item.id} id={item.id} data-testid={`ais-application-${item.num}`}>
                  <div className="appblock-head">
                    <span className="num">{item.num}</span>
                    <h3>{item.title}</h3>
                  </div>
                  <div className="appblock-body">
                    <p className="appblock-lead">{item.lead}</p>
                    <p>{item.body}</p>
                    <ol className="flow" aria-label={`${item.title}: inputs, review and outputs`} data-testid={`ais-flow-${item.num}`}>
                      {item.flow.map((stage) => (
                        <li key={stage}><span>{stage}</span></li>
                      ))}
                    </ol>
                    <p className="define">
                      <span className="define-label">Define before building:</span> {item.define}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <p className="apps-note" data-testid="ais-applications-note">
              We scope the application around your operating requirements. These are starting
              points, not a fixed product catalogue.
            </p>
          </div>
        </section>

        {/* Business context */}
        <section className="section section-alt" id="business-context" data-testid="ais-context-section">
          <div className="container split">
            <div className="split-head">
              <span className="eyebrow">Business context</span>
              <h2>Use the knowledge behind the data.</h2>
            </div>
            <div className="prose" data-testid="ais-context-copy">
              <p className="lead">
                A field name does not explain a business rule. A report does not capture every
                assumption behind a decision.
              </p>
              <p>
                We work with your team to identify the definitions, relationships and exceptions the
                application needs to handle. Relevant context becomes part of the system through
                maintained reference material, explicit rules and tested workflows.
              </p>
              <p className="strong">
                As requirements change, that context needs an owner and a process for keeping it
                current.
              </p>
            </div>
          </div>
        </section>

        {/* Deliverables */}
        <section className="section" id="deliverables" data-testid="ais-deliverables-section">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Deliverables</span>
              <h2>What the engagement covers.</h2>
            </div>
            <dl className="deliverables">
              {deliverables.map((item) => (
                <div className="deliverable" key={item.id} data-testid={`ais-deliverable-${item.id}`}>
                  <dt>{item.title}</dt>
                  <dd>{item.body}</dd>
                </div>
              ))}
            </dl>
            <p className="apps-note" data-testid="ais-deliverables-note">
              Scope, deliverables, infrastructure, ownership terms and ongoing support are agreed
              before implementation.
            </p>
          </div>
        </section>

        {/* Engagement */}
        <section className="section section-alt" id="engagement" data-testid="ais-engagement-section">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Engagement</span>
              <h2>Start with one workflow and a clear measure of success.</h2>
            </div>
            <div className="steps">
              {engagement.map((item) => (
                <div className="step" key={item.num} data-testid={`ais-engagement-${item.num}`}>
                  <span className="num">{item.num}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Buyer questions */}
        <section className="section" id="questions" data-testid="ais-questions-section">
          <div className="container split">
            <div className="split-head">
              <span className="eyebrow">Buyer questions</span>
              <h2>Questions we are usually asked first.</h2>
            </div>
            <div className="faq">
              {questions.map((item) => (
                <details className="faq-item" key={item.id} data-testid={`ais-question-${item.id}`}>
                  <summary data-testid={`ais-question-toggle-${item.id}`}>
                    <span>{item.q}</span>
                    <span className="faq-icon" aria-hidden="true" />
                  </summary>
                  <p data-testid={`ais-answer-${item.id}`}>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final action */}
        <section className="section section-alt" id="final" data-testid="ais-final-section">
          <div className="container final-cta">
            <div>
              <span className="eyebrow">Discuss your project</span>
              <h2>What work should your AI system take on?</h2>
              <p>
                Tell us how the work happens today, where time or quality is being lost and what a
                useful outcome would look like.
              </p>
            </div>
            <Link href="/#contact" className="btn btn-primary" data-testid="ais-final-cta">
              Discuss Your Project
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
