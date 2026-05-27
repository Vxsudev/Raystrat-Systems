import { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Terms | Raystrat Systems',
  description:
    'The terms governing use of the Raystrat Systems website and the scope of the operational systems and implementation services we provide.',
};

const EFFECTIVE_DATE = '28 May 2026';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-lg font-headline font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-foreground/80">
        {children}
      </div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="py-16 md:py-24 lg:py-28">
          <div className="container">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">
                Terms
              </p>
              <h1 className="text-3xl font-headline font-bold tracking-tighter md:text-4xl">
                Terms of Use
              </h1>
              <p className="mt-4 font-mono text-xs text-foreground/60">
                Effective {EFFECTIVE_DATE}
              </p>
              <p className="mt-6 text-base leading-relaxed text-foreground/80">
                These terms govern your use of this website and describe the basis on which
                Raystrat Systems provides its services. They do not replace a signed engagement
                contract. Where a contract exists between you and Raystrat, that contract governs
                the engagement and prevails over these terms to the extent of any conflict.
              </p>

              <Section title="What we provide">
                <p>
                  Raystrat Systems provides operational systems, automation workflows, reporting
                  infrastructure, integrations, and implementation services. We design, build, and
                  help operate systems that support functions such as sales, support, operations,
                  and reporting.
                </p>
                <p>
                  This website describes our practice and is provided for general information. The
                  precise scope, deliverables, and responsibilities of any engagement are defined in
                  a separate written agreement.
                </p>
              </Section>

              <Section title="Your responsibilities">
                <p>
                  You agree to use this site lawfully and not to attempt to disrupt, probe, or gain
                  unauthorised access to it. Information you submit must be accurate and yours to
                  share.
                </p>
                <p>
                  Clients remain responsible for reviewing operational outputs and maintaining their
                  own internal controls. The systems we build support decisions and operations; they
                  do not remove the client&rsquo;s responsibility for oversight, review, and
                  compliance within their own business.
                </p>
              </Section>

              <Section title="Third-party dependencies">
                <p>
                  Our work relies on third-party platforms and infrastructure &mdash; including
                  cloud hosting, AI providers, email delivery, and similar services. We do not
                  control those providers, and their availability, pricing, terms, and behaviour can
                  change. We are not responsible for outages, changes, or failures originating with
                  third-party services outside our control.
                </p>
              </Section>

              <Section title="AI-generated output">
                <p>
                  Some features and systems use artificial intelligence. AI output can be incomplete
                  or incorrect and should be treated as assistive, not authoritative. AI does not
                  hold sole decision authority in the systems we build. You are responsible for
                  reviewing AI-assisted output before relying on it for any decision that carries
                  business, legal, or financial consequences.
                </p>
              </Section>

              <Section title="No guaranteed outcomes">
                <p>
                  We bring competence and care to our work, but we do not guarantee specific business
                  results. In particular, we make no guarantee of revenue, growth, cost savings, or
                  other business outcomes; uninterrupted or error-free operation, or any specific level
                  of uptime; or legal, regulatory, or compliance certification of any kind. Nothing on
                  this site is a certification, accreditation, or warranty of any of these.
                </p>
              </Section>

              <Section title="Intellectual property">
                <p>
                  The content, branding, and materials on this site belong to Raystrat Systems unless
                  stated otherwise, and may not be copied or reused without permission. Ownership of
                  work produced in an engagement &mdash; including code, configurations, and
                  deliverables &mdash; is governed by the engagement contract, not by these terms.
                </p>
              </Section>

              <Section title="Changes and availability">
                <p>
                  We may modify, suspend, or discontinue this website or any part of it, and we may
                  update these terms, at any time. Material changes to these terms will be reflected by
                  a revised effective date above. We are not obliged to keep the site continuously
                  available.
                </p>
              </Section>

              <Section title="Limitation of liability">
                <p>
                  To the maximum extent permitted by applicable law, Raystrat Systems is not liable for
                  indirect, incidental, consequential, or special damages, or for loss of profits,
                  revenue, data, or goodwill, arising from your use of this site. This section does not
                  limit any liability that cannot be excluded under applicable law. Liability arising
                  from a client engagement is governed by that engagement&rsquo;s contract.
                </p>
              </Section>

              <Section title="Governing law">
                <p>
                  These terms are governed by the laws of India, and the courts of India have
                  jurisdiction over any dispute arising from them, except where a separate engagement
                  contract specifies otherwise.
                </p>
              </Section>

              <Section title="Contact">
                <p>
                  Questions about these terms can be sent to{' '}
                  <a
                    href="mailto:team@raystratsystems.com"
                    className="text-foreground underline underline-offset-4 hover:text-primary"
                  >
                    team@raystratsystems.com
                  </a>
                  .
                </p>
              </Section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
