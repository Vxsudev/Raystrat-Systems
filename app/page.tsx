import type { Metadata } from "next";
import SiteHeader from "./components/SiteHeader";
import ContactForm from "./components/ContactForm";
import SiteFooter from "./components/SiteFooter";
import { PUBLIC_EMAIL } from "./lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const applications = [
  {
    num: "01",
    title: "Prepare reports for review",
    body: "Bring information from source files and business systems into a draft report. Identify missing information and inconsistencies, with the supporting sources available to the reviewer.",
  },
  {
    num: "02",
    title: "Answer questions using company knowledge",
    body: "Help teams find and use information across internal documents and systems. Return answers with supporting references, within the user’s access permissions.",
  },
  {
    num: "03",
    title: "Turn incoming documents into work",
    body: "Extract relevant information, check it against defined requirements and route it to the next person or system. Flag exceptions for human review.",
  },
];

const steps = [
  {
    num: "01",
    title: "Define the result",
    body: "Choose a specific workflow and agree what success means: output quality, time required, review effort or another relevant measure.",
  },
  {
    num: "02",
    title: "Build with real examples",
    body: "Develop the solution using representative data and test it with the people responsible for the work.",
  },
  {
    num: "03",
    title: "Put it into operation",
    body: "Complete the integrations, access controls, evaluation and user preparation needed for production use.",
  },
  {
    num: "04",
    title: "Review and extend",
    body: "Compare results against the agreed measures. Improve the system and expand where there is a clear business case.",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main id="top">
        {/* Hero */}
        <section className="hero" data-testid="hero-section">
          <div className="container">
            <span className="eyebrow" data-testid="hero-eyebrow">
              AI Solutions · Forward-Deployed Engineering
            </span>
            <h1 data-testid="hero-heading">AI built on what your business knows.</h1>
            <div className="hero-lead">
              <p>
                Your data, documents and operating knowledge contain context that general-purpose
                AI does not have.
              </p>
              <p>
                Raystrat builds AI systems around that context and integrates them into your
                team’s work. Our forward-deployed engineers work with you from the first use case
                through production deployment.
              </p>
            </div>
            <div className="hero-actions">
              <a href="#contact" className="btn btn-primary" data-testid="hero-primary-cta">
                Discuss Your Project
              </a>
              <a href="/ai-solutions" className="btn btn-secondary" data-testid="hero-secondary-cta">
                Explore AI Solutions
              </a>
            </div>
          </div>
        </section>

        {/* The problem */}
        <section className="section section-alt" id="problem" data-testid="problem-section">
          <div className="container split">
            <div className="split-head">
              <span className="eyebrow">The problem</span>
              <h2>Access to AI is not the same as an advantage.</h2>
            </div>
            <div className="prose" data-testid="problem-copy">
              <p className="lead">The models are available to everyone. Your company’s knowledge is not.</p>
              <p>
                It sits across business systems, reports, conversations and the experience of your
                people. An AI tool does not become useful simply because it can access some of
                those documents. It needs the context to interpret them and a place in the workflow
                where its output can be used.
              </p>
              <p>
                Then comes delivery: connecting systems, evaluating results, managing access and
                making the software dependable in daily use.
              </p>
              <p className="strong">Raystrat brings that work together.</p>
            </div>
          </div>
        </section>

        {/* The offer */}
        <section className="section" id="offer" data-testid="offer-section">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">The offer</span>
              <h2>Build an AI system. Or bring engineering into your team.</h2>
            </div>
            <div className="offer">
              <div className="offer-col" id="ai-solutions" data-testid="offer-ai-solutions">
                <h3>AI Solutions</h3>
                <p className="offer-for">
                  For businesses that need a working system built around a specific use case.
                </p>
                <p>
                  We connect the relevant information, develop the application and integrations, and
                  evaluate the output with the people who will use it. The engagement covers the work
                  required to put the system into operation.
                </p>
                <a href="#contact" className="text-link" data-testid="offer-ai-solutions-cta">
                  Discuss Your Project <span aria-hidden="true">→</span>
                </a>
              </div>
              <div className="offer-col" id="forward-deployed" data-testid="offer-forward-deployed">
                <h3>Forward-Deployed Engineering</h3>
                <p className="offer-for">
                  For teams that need engineering ownership inside an existing initiative.
                </p>
                <p>
                  We work alongside your business and technical teams to resolve requirements, make
                  product decisions, build integrations and move the software into production.
                </p>
                <a href="/forward-deployed-engineering" className="text-link" data-testid="offer-forward-deployed-cta">
                  Explore Forward-Deployed Engineering <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Where AI can help */}
        <section className="section section-alt" id="applications" data-testid="applications-section">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Where AI can help</span>
              <h2>Start with work your team already needs to get done.</h2>
            </div>
            <div className="apps">
              {applications.map((item) => (
                <div className="app" key={item.num} data-testid={`application-${item.num}`}>
                  <span className="num">{item.num}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
            <p className="apps-note" data-testid="applications-note">
              The right starting point depends on your workflow, the information available and what
              a useful result must look like.
            </p>
          </div>
        </section>

        {/* The enduring value */}
        <section className="section" id="knowledge" data-testid="knowledge-section">
          <div className="container split">
            <div className="split-head">
              <span className="eyebrow">The enduring value</span>
              <h2>Keep the knowledge behind the work.</h2>
            </div>
            <div className="prose" data-testid="knowledge-copy">
              <p>
                A useful AI system needs more than access to files. It needs the definitions,
                exceptions and decisions that explain how your business operates.
              </p>
              <p>
                We design for that context to be maintained and reused. Feedback and reviewed
                outcomes help identify what needs to change as the system develops.
              </p>
              <p className="strong">
                The objective is a capability your team can keep using and improving—not another
                isolated experiment.
              </p>
            </div>
          </div>
        </section>

        {/* How we work */}
        <section className="section section-alt" id="how-we-work" data-testid="how-we-work-section">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">How we work</span>
              <h2>Prove it in one workflow. Then expand.</h2>
            </div>
            <div className="steps">
              {steps.map((item) => (
                <div className="step" key={item.num} data-testid={`step-${item.num}`}>
                  <span className="num">{item.num}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final action */}
        <section className="section" id="contact" data-testid="contact-section">
          <div className="container contact-wrap">
            <div className="contact-copy">
              <span className="eyebrow">Discuss your project</span>
              <h2>Where could AI make a practical difference in your business?</h2>
              <p>
                Tell us what your team is trying to accomplish, how the work happens today and what
                needs to improve.
              </p>
              <p>You do not need to arrive with a technical specification.</p>
              <p className="form-note" data-testid="form-delivery-note">
                Enquiries go directly to the Raystrat team. You can also email{" "}
                <a href={`mailto:${PUBLIC_EMAIL}`} data-testid="contact-email-link">
                  {PUBLIC_EMAIL}
                </a>
                .
              </p>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
