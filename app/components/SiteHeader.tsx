"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { label: "AI Solutions", href: "/ai-solutions", key: "ai-solutions" },
  { label: "Forward-Deployed Engineering", href: "/forward-deployed-engineering", key: "forward-deployed" },
  { label: "How We Work", href: "/#how-we-work", key: "how-we-work" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="header" data-testid="site-header">
      <div className="container header-inner">
        <Link
          href="/"
          className="wordmark"
          data-testid="wordmark-home-link"
          aria-label="Raystrat Systems, home"
          onClick={() => setOpen(false)}
        >
          <span className="mark" aria-hidden="true" />
          <span>Raystrat<span className="sub">&nbsp;Systems</span></span>
        </Link>

        <nav className="nav" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="nav-link"
              aria-current={pathname === item.href ? "page" : undefined}
              data-testid={`nav-link-${item.key}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          <Link href="/#contact" className="btn btn-primary" data-testid="nav-discuss-project-button">
            Discuss Your Project
          </Link>
        </div>

        <button
          type="button"
          className="menu-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          data-testid="mobile-menu-toggle"
        >
          <span aria-hidden="true" />
        </button>
      </div>

      <div id="mobile-nav" className={`mobile-nav${open ? " open" : ""}`} data-testid="mobile-nav">
        {NAV.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            onClick={() => setOpen(false)}
            aria-current={pathname === item.href ? "page" : undefined}
            data-testid={`mobile-nav-link-${item.key}`}
          >
            {item.label}
          </Link>
        ))}
        <div className="mobile-cta">
          <Link
            href="/#contact"
            className="btn btn-primary"
            onClick={() => setOpen(false)}
            data-testid="mobile-nav-discuss-project-button"
          >
            Discuss Your Project
          </Link>
        </div>
      </div>
    </header>
  );
}
