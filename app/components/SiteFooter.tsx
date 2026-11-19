import Link from "next/link";
import { PUBLIC_EMAIL, LINKEDIN_URL } from "../lib/site";

export default function SiteFooter() {
  return (
    <footer className="footer" data-testid="site-footer">
      <div className="container">
        <div className="footer-inner">
          <Link href="/" className="wordmark" data-testid="footer-wordmark">
            Raystrat Systems
          </Link>
          <nav className="footer-nav" aria-label="Footer">
            <Link href="/ai-solutions" data-testid="footer-link-ai-solutions">AI Solutions</Link>
            <Link href="/forward-deployed-engineering" data-testid="footer-link-forward-deployed">
              Forward-Deployed Engineering
            </Link>
            <Link href="/#how" data-testid="footer-link-how-we-work">How we work</Link>
            <Link href="/#contact" data-testid="footer-link-contact">Discuss your system</Link>
          </nav>
        </div>
        <div className="footer-contact" data-testid="footer-contact">
          <a href={`mailto:${PUBLIC_EMAIL}`} data-testid="footer-email-link">
            {PUBLIC_EMAIL}
          </a>
          <span className="footer-sep" aria-hidden="true" />
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="footer-linkedin-link"
          >
            LinkedIn
          </a>
        </div>
        <p className="footer-legal">
          © {new Date().getFullYear()} Raystrat Systems. Design · Build · Connect · Operate.
        </p>
      </div>
    </footer>
  );
}
