"use client";

import { useEffect, useState } from "react";

const services = [
  {
    number: "01",
    title: "Digital Presence & Growth",
    description:
      "High-performance websites and a search presence designed to turn attention into qualified demand.",
    tags: ["Websites", "SEO", "Social media", "Google Business"],
    icon: "signal",
  },
  {
    number: "02",
    title: "Operational Automation",
    description:
      "Remove repetitive work with integrations and workflows that move faster than your busiest day.",
    tags: ["Order systems", "Foodpanda", "Custom scripts", "Zapier / Make"],
    icon: "flow",
  },
  {
    number: "03",
    title: "System Integration",
    description:
      "One connected operating layer for the tools, teams, and legacy systems your business relies on.",
    tags: ["ERP", "CRM", "Legacy systems", "Data sync"],
    icon: "system",
  },
  {
    number: "04",
    title: "Data & Lead Generation",
    description:
      "Build a reliable growth engine from structured data, better signals, and intelligent outreach.",
    tags: ["Web scraping", "Outreach", "CRM enrichment", "BI"],
    icon: "data",
  },
];

const audiences = [
  { label: "Restaurant Owners", code: "HOSPITALITY", className: "audience-large" },
  { label: "Dentists", code: "HEALTHCARE", className: "" },
  { label: "Barbershops", code: "LOCAL GROWTH", className: "" },
  { label: "Mid-sized B2B", code: "OPERATIONS", className: "audience-wide" },
  { label: "Fast-Growing Startups", code: "SCALE", className: "audience-accent" },
];

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  );
}

function ServiceIcon({ type }: { type: string }) {
  return (
    <span className={`service-icon service-icon-${type}`} aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <nav className="nav-shell" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Etkahn home">
          <BrandMark />
          <span>ETKAHN</span>
        </a>

        <div className={`nav-links ${menuOpen ? "nav-links-open" : ""}`}>
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#approach" onClick={closeMenu}>Approach</a>
          <a href="#work" onClick={closeMenu}>Work</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
          <a className="nav-mobile-cta" href="mailto:hello@etkahn.com?subject=Book%20a%20Tech%20Audit" onClick={closeMenu}>
            Book a Tech Audit
          </a>
        </div>

        <a className="button button-small nav-cta" href="mailto:hello@etkahn.com?subject=Book%20a%20Tech%20Audit">
          Book a Tech Audit <span aria-hidden="true">↗</span>
        </a>

        <button
          className={`menu-toggle ${menuOpen ? "menu-toggle-open" : ""}`}
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span />
          <span />
        </button>
      </nav>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-glow hero-glow-cyan" aria-hidden="true" />
        <div className="hero-glow hero-glow-purple" aria-hidden="true" />

        <div className="hero-art" aria-hidden="true">
          <div className="orb orb-main">
            <div className="orb-core" />
            <div className="orb-ring orb-ring-one" />
            <div className="orb-ring orb-ring-two" />
            <span className="orb-satellite satellite-one" />
            <span className="orb-satellite satellite-two" />
          </div>
          <div className="wire-cube">
            <span className="cube-face cube-front" />
            <span className="cube-face cube-back" />
            <span className="cube-edge cube-edge-one" />
            <span className="cube-edge cube-edge-two" />
            <span className="cube-edge cube-edge-three" />
            <span className="cube-edge cube-edge-four" />
          </div>
          <div className="chrome-pearl" />
        </div>

        <div className="hero-content">
          <div className="eyebrow reveal">
            <span className="status-dot" />
            Technology &amp; automation studio
          </div>
          <h1 className="reveal reveal-delay-1">
            Technology that <span className="text-cyan">drives revenue.</span>
            <br />
            Automation that buys back your time.
          </h1>
          <div className="hero-bottom reveal reveal-delay-2">
            <p>
              We engineer your entire digital ecosystem—from websites to ERPs—so you can focus on what matters most.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="mailto:hello@etkahn.com?subject=Book%20a%20Tech%20Audit">
                Book a Tech Audit <span aria-hidden="true">↗</span>
              </a>
              <a className="button button-ghost" href="#services">
                Explore Services <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
        </div>

        <div className="hero-meta" aria-hidden="true">
          <span>PK / UAE / UK / DE</span>
          <span>Scroll to explore</span>
          <span>EST. 2024</span>
        </div>
      </section>

      <section className="trust-section" id="work" aria-label="Client experience">
        <div className="trust-heading">
          <span>Selected experience</span>
          <p>Trusted by global founders and local businesses</p>
        </div>
        <div className="marquee">
          <div className="marquee-track">
            {[0, 1].map((group) => (
              <div className="logo-group" key={group} aria-hidden={group === 1}>
                <span className="client-logo"><b>BUILT</b><i>CONSTRUCTION CO.</i></span>
                <span className="client-logo client-logo-tech"><b>TEKLA</b><i>AUTHORIZED RESELLER</i></span>
                <span className="client-logo client-logo-author"><b>INK/UK</b><i>INDEPENDENT AUTHOR</i></span>
                <span className="client-logo client-logo-crypto"><b>KRYPTO</b><i>GERMAN COMMUNITY</i></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section services-section" id="services">
        <div className="section-heading reveal">
          <span className="section-kicker">01 — Capabilities</span>
          <h2>We solve your<br /><span className="text-cyan">tech chaos.</span></h2>
          <p>Strategy, systems, and execution under one roof—built around the commercial problems that matter.</p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <article className={`service-card reveal reveal-delay-${(index % 2) + 1}`} key={service.title}>
              <div className="card-topline">
                <span>{service.number}</span>
                <ServiceIcon type={service.icon} />
              </div>
              <div className="card-copy">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
              <div className="tag-list">
                {service.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              <span className="card-corner" aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      <section className="section ai-section" id="approach">
        <div className="network-visual reveal" aria-hidden="true">
          <div className="network-grid" />
          <div className="network-halo" />
          <span className="network-line line-one" />
          <span className="network-line line-two" />
          <span className="network-line line-three" />
          <span className="network-line line-four" />
          <span className="network-node node-core"><i /></span>
          <span className="network-node node-one" />
          <span className="network-node node-two" />
          <span className="network-node node-three" />
          <span className="network-node node-four" />
          <span className="network-label label-input">DATA IN</span>
          <span className="network-label label-loop">FEEDBACK LOOP</span>
          <span className="network-label label-output">VALUE OUT</span>
          <div className="network-meter"><span /></div>
        </div>

        <div className="ai-copy reveal reveal-delay-1">
          <span className="section-kicker">02 — Pragmatic AI</span>
          <h2>AI where it actually <span className="text-gradient">makes sense.</span></h2>
          <p>
            We don’t just slap “AI” on a proposal to sound cool. We look at your data, build custom harnesses, and engineer feedback loops.
          </p>
          <p>
            We make your business AI-ready only where it logically increases revenue, efficiency, and peace of mind.
          </p>
          <div className="ai-principles">
            <span><i>01</i> Commercially grounded</span>
            <span><i>02</i> Human in the loop</span>
            <span><i>03</i> Measurable outcomes</span>
          </div>
        </div>
      </section>

      <section className="section audience-section">
        <div className="section-heading audience-heading reveal">
          <span className="section-kicker">03 — Who we serve</span>
          <h2>Built for ambitious businesses.</h2>
          <p>
            From the Pakistani and Middle Eastern diaspora to Tier-1 global markets—we bring world-class tech execution to your business, wherever you are.
          </p>
        </div>

        <div className="audience-grid">
          {audiences.map((audience, index) => (
            <article className={`audience-card ${audience.className} reveal reveal-delay-${(index % 2) + 1}`} key={audience.label}>
              <div className="audience-code"><span />{audience.code}</div>
              <h3>{audience.label}</h3>
              <span className="audience-arrow" aria-hidden="true">↗</span>
              <div className="audience-pattern" aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      <section className="final-cta" id="contact">
        <div className="cta-orbit" aria-hidden="true"><span /><span /><span /></div>
        <div className="cta-content reveal">
          <span className="section-kicker">Your next move</span>
          <h2>Take the pressure off<br />your <span className="text-cyan">pain points.</span></h2>
          <p>Let’s make your life easier, your systems efficient, and your revenue grow.</p>
          <a className="button button-primary button-large" href="mailto:hello@etkahn.com?subject=Book%20a%20Tech%20Audit">
            Book a Tech Audit <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <footer>
        <div className="footer-top">
          <a className="brand brand-footer" href="#top" aria-label="Etkahn home">
            <BrandMark />
            <span>ETKAHN</span>
          </a>
          <p>Technology with a commercial pulse.</p>
          <a className="footer-email" href="mailto:hello@etkahn.com">hello@etkahn.com <span>↗</span></a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Etkahn. All rights reserved.</span>
          <div>
            <a href="#services">Services</a>
            <a href="#contact">Privacy Policy</a>
          </div>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </main>
  );
}
