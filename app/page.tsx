import type { Metadata } from "next";
import SiteHeader from "./components/SiteHeader";
import ContactForm from "./components/ContactForm";
import SiteFooter from "./components/SiteFooter";
import { PUBLIC_EMAIL } from "./lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const activities = [
  {
    num: "01",
    title: "Design",
    commission: "A plan for a new system, or for significant changes to one you already run.",
    responsibility:
      "Turning your business requirements into a defined scope, an architecture suited to that system, and a sequence of work.",
  },
  {
    num: "02",
    title: "Build",
    commission: "New software, or improvements and extensions to software you already use.",
    responsibility:
      "Delivering it in agreed phases, each one checked against acceptance criteria we set with you.",
  },
  {
    num: "03",
    title: "Connect",
    commission:
      "Integration between your systems, third-party services and the tools your teams already work in.",
    responsibility:
      "Making those systems exchange information as agreed, including how errors are detected and handled.",
  },
  {
    num: "04",
    title: "Operate",
    commission: "Ongoing care for systems we’ve built or taken on.",
    responsibility: "Maintenance, monitoring and incident response, within an agreed scope.",
  },
];

const principles = [
  {
    title: "Clear requirements",
    body: "Before each build phase, we agree what it must deliver and how it will be accepted.",
  },
  {
    title: "Deliberate technical decisions",
    body: "We choose the architecture to suit the system’s requirements and constraints, and document the main decisions.",
  },
  {
    title: "Verification",
    body: "Each phase is checked against its acceptance criteria before you sign it off.",
  },
  {
    title: "Controlled change",
    body: "Requirements change. Each change is assessed for its effect on scope, time and cost, and agreed before it enters the work.",
  },
  {
    title: "Maintainability",
    body: "Code, decisions and handover material are kept so that others can understand the system and work on it.",
  },
];

type WorkItem = { title: string; detail?: string };

const selectedWork: {
  id: string;
  title: string;
  need: string;
  responsibility: string;
  items: WorkItem[];
}[] = [
  {
    id: "analytical-device",
    title: "Software systems for an analytical-device manufacturer",
    need: "An X-ray fluorescence analyzer company needed the software that forms a central part of its product, while its requirements changed through several product pivots.",
    responsibility:
      "Designing and building that software across three distinct systems, within one ongoing engagement.",
    items: [
      {
        title: "Inspection and reporting platform",
        detail: "Multi-tenant, with instrument data ingestion and device synchronization.",
      },
      { title: "Laboratory work-order and test-allocation system" },
      { title: "Manufacturing workflow" },
    ],
  },
  {
    id: "health-data",
    title: "Health-data company",
    need: "Bring in health data and make it available to partners under controlled access.",
    responsibility: "Building the core platform.",
    items: [
      { title: "Ingestion and standardization pipeline" },
      { title: "Partner APIs", detail: "Scoped keys, rate limits and audit logging." },
      {
        title: "Operator console",
        detail: "For managing keys, services and data synchronization.",
      },
    ],
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main id="top" className="home">
        {/* Hero */}
        <section className="home-hero" data-testid="hero-section">
          <div className="container">
            <p className="home-kicker" data-testid="hero-eyebrow">
              Design · Build · Connect · Operate
            </p>
            <h1 data-testid="hero-heading">Software systems businesses run on.</h1>
            <p className="home-hero-lead">
              Raystrat designs, builds, connects and operates the software systems businesses run
              on. We take responsibility for the software your business depends on, from the first
              requirements through to day-to-day operation.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="btn btn-primary" data-testid="hero-primary-cta">
                Discuss your system
              </a>
              <a href="#what" className="home-text-link" data-testid="hero-secondary-cta">
                See what you can commission
              </a>
            </div>
          </div>
        </section>

        {/* What you can hire Raystrat to do */}
        <section className="home-band" id="what" data-testid="activities-section">
          <div className="container">
            <h2>What you can hire Raystrat to do</h2>
            <p className="home-sub">You can engage us for one activity or all four.</p>
            <div className="activities">
              {activities.map((a) => (
                <article
                  className="activity"
                  key={a.num}
                  data-testid={`activity-${a.title.toLowerCase()}`}
                >
                  <div className="activity-head">
                    <span className="activity-num" aria-hidden="true">
                      {a.num}
                    </span>
                    <h3>{a.title}</h3>
                  </div>
                  <div className="activity-part">
                    <p className="home-label">You commission</p>
                    <p>{a.commission}</p>
                  </div>
                  <div className="activity-part activity-part-rule">
                    <p className="home-label">We’re responsible for</p>
                    <p>{a.responsibility}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How we work */}
        <section className="home-section" id="how" data-testid="how-we-work-section">
          <div className="container home-split">
            <h2 className="home-split-head">How we work</h2>
            <ul className="principles">
              {principles.map((p) => (
                <li key={p.title}>
                  <p className="principle-title">{p.title}</p>
                  <p>{p.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Who we work with */}
        <section className="home-dark" aria-labelledby="who-heading" data-testid="who-section">
          <div className="container home-split">
            <h2 id="who-heading" className="home-split-head">
              Who we work with
            </h2>
            <div className="home-split-body">
              <p className="home-dark-lead">
                Businesses commissioning software they will depend on, whether it serves customers,
                runs internal workflows or supports operations. We work across industries.
              </p>
              <p className="home-dark-note">
                We don’t take on marketing work, campaign systems or content systems.
              </p>
            </div>
          </div>
        </section>

        {/* Selected work */}
        <section className="home-section" id="work" data-testid="selected-work-section">
          <div className="container">
            <h2>Selected work</h2>
            <div className="work-list">
              {selectedWork.map((w) => (
                <article className="work" key={w.id} data-testid={`work-${w.id}`}>
                  <div className="work-intro">
                    <h3>{w.title}</h3>
                    <div>
                      <p className="home-label">Business need</p>
                      <p>{w.need}</p>
                    </div>
                    <div>
                      <p className="home-label">Raystrat’s responsibility</p>
                      <p>{w.responsibility}</p>
                    </div>
                  </div>
                  <div className="work-items">
                    <p className="home-label">Work</p>
                    <ul>
                      {w.items.map((item) => (
                        <li key={item.title}>
                          <p className="work-item-title">{item.title}</p>
                          {item.detail && <p className="work-item-detail">{item.detail}</p>}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="home-band home-contact" id="contact" data-testid="contact-section">
          <div className="container contact-wrap">
            <div className="contact-copy">
              <h2>Tell us about the system you need.</h2>
              <p>
                Whether it needs to be designed, built, connected or operated, the first
                conversation is about understanding it and whether Raystrat is the right team for
                the work.
              </p>
              <p className="form-note" data-testid="form-delivery-note">
                Or write to{" "}
                <a href={`mailto:${PUBLIC_EMAIL}`} data-testid="contact-email-link">
                  {PUBLIC_EMAIL}
                </a>
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
