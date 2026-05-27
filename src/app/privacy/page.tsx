import { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Privacy | Raystrat Systems',
  description:
    'How Raystrat Systems handles information submitted through this site and processed by the operational systems we build and run.',
};

const EFFECTIVE_DATE = '28 May 2026';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6 pt-5 border-t border-foreground/[0.06]">
      <h2 className="text-xs font-semibold tracking-widest uppercase text-foreground/50">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-foreground/80">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="py-10 md:py-14">
          <div className="container">
            <div className="max-w-2xl">
              <div className="pb-6 border-b border-foreground/10">
                <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">
                  Privacy
                </p>
                <h1 className="text-3xl font-headline font-bold tracking-tighter md:text-4xl">
                  Privacy Notice
                </h1>
                <p className="mt-3 font-mono text-xs text-foreground/50">
                  Effective {EFFECTIVE_DATE} · Raystrat Systems
                </p>
              </div>
              <p className="mt-5 text-[15px] leading-relaxed text-foreground/80">
                This notice describes what information Raystrat Systems collects through this
                website, how we use it, and the third-party providers we rely on to operate.
                It is written in plain terms. It is not a substitute for the specific data
                terms agreed in a client engagement contract, which govern any operational
                systems we build and run for a client.
              </p>

              <Section title="Who we are">
                <p>
                  Raystrat Systems (&ldquo;Raystrat&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;)
                  is an operational systems and AI implementation practice operating from India.
                  We build automation workflows, integrations, and reporting infrastructure for
                  businesses. Questions about this notice can be sent to{' '}
                  <a
                    href="mailto:team@raystratsystems.com"
                    className="text-foreground underline underline-offset-4 hover:text-primary"
                  >
                    team@raystratsystems.com
                  </a>
                  .
                </p>
              </Section>

              <Section title="Information we collect">
                <p>
                  <span className="font-medium text-foreground">Information you submit.</span>{' '}
                  When you use a contact or audit-request form, we collect the details you enter
                  &mdash; typically your name, work email, company, and the message or operational
                  context you provide.
                </p>
                <p>
                  <span className="font-medium text-foreground">Technical information.</span>{' '}
                  Like most websites, our hosting and infrastructure providers record standard
                  request data (such as IP address, browser type, and pages requested) for
                  delivery, security, and diagnostics.
                </p>
                <p>
                  We do not run advertising or cross-site tracking, and we do not buy or sell
                  contact lists.
                </p>
              </Section>

              <Section title="Contact and audit form data">
                <p>
                  Information submitted through a form is used to respond to your enquiry, scope
                  a possible engagement, and maintain a record of the correspondence. Form
                  submissions are delivered to us by email through our email provider. We do not
                  use this information for unrelated marketing without your consent.
                </p>
              </Section>

              <Section title="Cookies and analytics">
                <p>
                  This site uses only the cookies and local storage needed to make it work &mdash;
                  for example, remembering your light or dark theme preference. These are set by
                  the site itself, not by advertising networks.
                </p>
                <p>
                  We do not currently operate third-party advertising, retargeting, or invasive
                  behavioural-analytics stacks. Because of that, we do not present a cookie
                  consent banner: there is no tracking infrastructure that would require one. If
                  that changes &mdash; for instance, if we introduce analytics or advertising that
                  rely on consent &mdash; we will update this notice and add appropriate consent
                  controls before doing so.
                </p>
              </Section>

              <Section title="Third-party providers we use">
                <p>
                  We rely on established infrastructure providers to operate this site and the
                  systems we build. Depending on the service, information may be processed by:
                </p>
                <ul className="mt-1 list-disc space-y-1.5 pl-5 marker:text-foreground/40">
                  <li>
                    <span className="font-medium text-foreground">Firebase / Google Cloud</span>{' '}
                    &mdash; hosting, application backend, authentication, and database services.
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Google (Genkit / Generative AI)</span>{' '}
                    &mdash; server-side AI processing used by certain features and workflows.
                  </li>
                  <li>
                    <span className="font-medium text-foreground">SendGrid</span> &mdash;
                    transactional and form-notification email delivery.
                  </li>
                </ul>
                <p>
                  These providers process information on our behalf under their own terms and
                  security practices. The specific providers used in a client engagement are
                  defined in that engagement&rsquo;s contract.
                </p>
              </Section>

              <Section title="AI processing">
                <p>
                  Raystrat may use third-party AI and infrastructure providers to operate systems
                  and workflows. Where a feature or engagement involves AI processing, content you
                  submit may be sent to those providers to generate a response. We do not treat AI
                  output as authoritative on its own &mdash; it is reviewed within the operational
                  controls of the relevant system, and clients remain responsible for reviewing
                  outputs that affect their business.
                </p>
              </Section>

              <Section title="Data retention">
                <p>
                  We keep enquiry and correspondence data for as long as needed to respond, to
                  evaluate or manage an engagement, and to meet ordinary business and record-keeping
                  needs. When information is no longer needed for those purposes, we delete it or
                  retain it only in an aggregated or de-identified form.
                </p>
              </Section>

              <Section title="Security">
                <p>
                  We apply reasonable technical and organisational measures appropriate to the
                  information we handle, including transport encryption (HTTPS) and access controls
                  on our systems. Service credentials are held server-side and are not exposed to
                  the browser. No method of transmission or storage is completely secure, and we do
                  not claim that it is.
                </p>
              </Section>

              <Section title="Your choices">
                <p>
                  You can ask us what information we hold about you, ask us to correct it, or ask us
                  to delete it, by writing to{' '}
                  <a
                    href="mailto:team@raystratsystems.com"
                    className="text-foreground underline underline-offset-4 hover:text-primary"
                  >
                    team@raystratsystems.com
                  </a>
                  . You can also choose not to submit information through our forms. We will respond
                  to reasonable requests within a reasonable period.
                </p>
              </Section>

              <Section title="International processing">
                <p>
                  We operate from India and our providers may process information on servers located
                  in other countries. Where information is handled outside your own jurisdiction, it
                  is processed under the arrangements and protections offered by the relevant
                  provider. By submitting information through this site, you understand that it may
                  be processed in this way.
                </p>
              </Section>

              <Section title="Changes to this notice">
                <p>
                  We may update this notice as our systems and practices change. When we do, we will
                  revise the effective date above. Material changes will be reflected here before
                  they take effect.
                </p>
              </Section>

              <Section title="Contact">
                <p>
                  Raystrat Systems &mdash;{' '}
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
