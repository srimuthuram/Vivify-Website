import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.JPG";
import { GridScan } from "../GridScan/GridScan";
import "./Footer.css";

gsap.registerPlugin(ScrollTrigger);

/* ── Data ── */
const QUICK_LINKS = [
  { label: "Home",         href: "/" },
  { label: "About Us",     href: "/about" },
  { label: "Services",     href: "/services" },
  { label: "Solutions",    href: "/solutions" },
  { label: "Products",     href: "/products" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Careers",      href: "/careers" },
  { label: "Contact Us",   href: "/contact" },
];

const SOLUTIONS = [
  { label: "Data Centre Solutions", href: "/solutions/data-centre-solutions" },
  { label: "Robotics Solutions", href: "/solutions/robotics-solutions" },
  { label: "Smart Factory Solutions", href: "/solutions/smart-factory-solutions" },
  { label: "Automation Solutions", href: "/solutions/automation-solutions" },
  { label: "Custom Engineering", href: "/solutions/custom-engineering" },
];

const SERVICES = [
  { label: "Software Development", href: "/services/software-development" },
  { label: "Industrial Automation", href: "/services/industrial-automation" },
  { label: "Robotics Integration", href: "/services/robotics-integration" },
  { label: "Data Centre Services", href: "/services/data-centre-services" },
  { label: "IT Infrastructure", href: "/services/it-infrastructure" },
  { label: "ELV Solutions", href: "/services/elv-solutions" },
];

const SOCIALS = [
  {
    label: "LinkedIn", href: "#",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  },
  {
    label: "Facebook", href: "#",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
  },
  {
    label: "Instagram", href: "#",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
  },
  {
    label: "X", href: "#",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.736l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  },
];

/* ── Accordion for mobile ── */
function AccordionCol({ heading, children }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (open) {
      gsap.fromTo(el, { height: 0, opacity: 0 }, { height: "auto", opacity: 1, duration: 0.35, ease: "power2.out" });
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.28, ease: "power2.in" });
    }
  }, [open]);

  return (
    <div className={`ftr__accord${open ? " ftr__accord--open" : ""}`}>
      <button className="ftr__accord-btn" onClick={() => setOpen(v => !v)} aria-expanded={open}>
        <span>{heading}</span>
        <span className="ftr__accord-icon" aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14">
            <path d="M8 10.5L2 4.5h12z"/>
          </svg>
        </span>
      </button>
      <div className="ftr__accord-body" ref={bodyRef}>
        <div className="ftr__accord-inner">{children}</div>
      </div>
    </div>
  );
}

export default function Footer() {
  const footerRef = useRef(null);
  const ctaRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* CTA banner */
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ctaRef.current, start: "top 85%", toggleActions: "play none none none" } }
      );
      /* Footer columns */
      gsap.fromTo(
        footerRef.current.querySelectorAll(".ftr__col-anim"),
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: footerRef.current, start: "top 88%", toggleActions: "play none none none" } }
      );
      /* Bottom bar */
      gsap.fromTo(
        footerRef.current.querySelector(".ftr__bottom"),
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: footerRef.current.querySelector(".ftr__bottom"), start: "top 98%", toggleActions: "play none none none" } }
      );
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={footerRef}>

      {/* ══════════════════════════════════
          CTA BANNER
      ══════════════════════════════════ */}
      <section className="ftr__cta-band" ref={ctaRef} aria-label="Call to action">
        {/* Circuit SVG bg */}
        <div className="ftr__cta-bg" aria-hidden="true">
          <svg className="ftr__cta-circuit" viewBox="0 0 900 120" preserveAspectRatio="none">
            <g stroke="rgba(255,255,255,0.06)" fill="none" strokeWidth="1">
              <line x1="0" y1="60" x2="200" y2="60"/><circle cx="200" cy="60" r="4" fill="rgba(255,255,255,0.12)"/>
              <line x1="200" y1="60" x2="200" y2="20"/><line x1="200" y1="20" x2="340" y2="20"/>
              <circle cx="340" cy="20" r="4" fill="rgba(255,255,255,0.12)"/>
              <line x1="340" y1="20" x2="340" y2="60"/><line x1="340" y1="60" x2="560" y2="60"/>
              <circle cx="560" cy="60" r="4" fill="rgba(255,255,255,0.12)"/>
              <line x1="560" y1="60" x2="560" y2="100"/><line x1="560" y1="100" x2="700" y2="100"/>
              <circle cx="700" cy="100" r="4" fill="rgba(255,255,255,0.12)"/>
              <line x1="700" y1="100" x2="700" y2="60"/><line x1="700" y1="60" x2="900" y2="60"/>
              <line x1="100" y1="0" x2="100" y2="40"/><circle cx="100" cy="40" r="3" fill="rgba(255,255,255,0.08)"/>
              <line x1="800" y1="120" x2="800" y2="80"/><circle cx="800" cy="80" r="3" fill="rgba(255,255,255,0.08)"/>
            </g>
          </svg>
        </div>
        <div className="ftr__cta-inner">
          <div className="ftr__cta-text">
            <p className="ftr__cta-eyebrow">Ready to transform your business?</p>
            <h2 className="ftr__cta-heading">
              Building Smarter Industries Through<br className="ftr__cta-br" />
              Automation &amp; Innovation
            </h2>
          </div>
          <Link to="/contact" className="ftr__cta-btn">
            Talk To Our Experts
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════
          MAIN FOOTER
      ══════════════════════════════════ */}
      <footer id="contact" className="ftr" aria-label="Site footer">

        {/* Background elements */}
        <div className="ftr__bg" aria-hidden="true">
          <svg className="ftr__bg-grid" viewBox="0 0 1200 600" preserveAspectRatio="none">
            <defs>
              <pattern id="ftr-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="1200" height="600" fill="url(#ftr-grid)"/>
          </svg>
          <div className="ftr__bg-glow ftr__bg-glow--a" />
          <div className="ftr__bg-glow ftr__bg-glow--b" />
          {/* Data flow lines */}
          <svg className="ftr__bg-flow" viewBox="0 0 1200 600" preserveAspectRatio="none">
            <g stroke="rgba(40,101,235,0.07)" fill="none" strokeWidth="1" strokeDasharray="6 8">
              <path d="M0 150 Q300 100 600 150 Q900 200 1200 150"/>
              <path d="M0 350 Q300 300 600 350 Q900 400 1200 350"/>
              <path d="M0 500 Q400 450 800 500 Q1000 530 1200 490"/>
            </g>
          </svg>
          {/* Floating particles */}
          <div className="ftr__particles" aria-hidden="true">
            <div className="ftr__particle" />
            <div className="ftr__particle" />
            <div className="ftr__particle" />
            <div className="ftr__particle" />
            <div className="ftr__particle" />
            <div className="ftr__particle" />
            <div className="ftr__particle" />
          </div>
          {/* GridScan animation */}
          <div className="ftr__gridscan" aria-hidden="true">
            <GridScan
              sensitivity={0.55}
              lineThickness={1}
              linesColor="#2865EB"
              gridScale={0.1}
              scanColor="#2865EB"
              scanOpacity={0.3}
              enablePost={true}
              bloomIntensity={0.4}
              chromaticAberration={0.0015}
              noiseIntensity={0.008}
            />
          </div>
        </div>

        {/* ── Body ── */}
        <div className="ftr__body">
          <div className="ftr__container">

            {/* COL 1 — Brand */}
            <div className="ftr__brand ftr__col-anim">
              <Link to="/" className="ftr__logo" aria-label="Vivify Technocrats">
                <img src={logo} alt="Vivify Technocrats logo" loading="lazy" />
              </Link>
              <p className="ftr__brand-tagline">
                Engineering Intelligent Solutions Through Automation, Infrastructure &amp; Digital Innovation.
              </p>
              <p className="ftr__brand-desc">
                Vivify Technocrats delivers advanced technology solutions across industrial automation,
                robotics, data centre infrastructure, IT systems, ELV solutions, and custom software
                development. We help businesses transform operations through reliable engineering and
                intelligent digital solutions.
              </p>
              <div className="ftr__socials" aria-label="Social media links">
                {SOCIALS.map(({ label, href, icon }) => (
                  <a key={label} href={href} className="ftr__social-btn" aria-label={label}
                    target="_blank" rel="noopener noreferrer">
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* COL 2 — Quick Links */}
            <div className="ftr__col ftr__col-anim">
              {/* Desktop */}
              <div className="ftr__col-desktop">
                <h3 className="ftr__col-heading">Quick Links</h3>
                <ul className="ftr__col-list">
                  {QUICK_LINKS.map(({ label, href }) => (
                    <li key={label}>
                      <Link to={href} className="ftr__col-link">
                        <span className="ftr__col-link-dot" aria-hidden="true"/>
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Mobile accordion */}
              <div className="ftr__col-mobile">
                <AccordionCol heading="Quick Links">
                  <ul className="ftr__col-list">
                    {QUICK_LINKS.map(({ label, href }) => (
                      <li key={label}><Link to={href} className="ftr__col-link">{label}</Link></li>
                    ))}
                  </ul>
                </AccordionCol>
              </div>
            </div>

            {/* COL 3 — Solutions */}
            <div className="ftr__col ftr__col-anim">
              <div className="ftr__col-desktop">
                <h3 className="ftr__col-heading">Our Solutions</h3>
                <ul className="ftr__col-list">
                  {SOLUTIONS.map(({ label, href }) => (
                    <li key={label}>
                      <Link to={href} className="ftr__col-link">
                        <span className="ftr__col-link-dot" aria-hidden="true"/>
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="ftr__col-mobile">
                <AccordionCol heading="Our Solutions">
                  <ul className="ftr__col-list">
                    {SOLUTIONS.map(({ label, href }) => (
                      <li key={label}><Link to={href} className="ftr__col-link">{label}</Link></li>
                    ))}
                  </ul>
                </AccordionCol>
              </div>
            </div>

            {/* COL 4 — Services */}
            <div className="ftr__col ftr__col-anim">
              <div className="ftr__col-desktop">
                <h3 className="ftr__col-heading">Our Services</h3>
                <ul className="ftr__col-list">
                  {SERVICES.map(({ label, href }) => (
                    <li key={label}>
                      <Link to={href} className="ftr__col-link">
                        <span className="ftr__col-link-dot" aria-hidden="true"/>
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="ftr__col-mobile">
                <AccordionCol heading="Our Services">
                  <ul className="ftr__col-list">
                    {SERVICES.map(({ label, href }) => (
                      <li key={label}><Link to={href} className="ftr__col-link">{label}</Link></li>
                    ))}
                  </ul>
                </AccordionCol>
              </div>
            </div>

            {/* COL 4 — Contact */}
            <div className="ftr__contact ftr__col-anim">
              <div className="ftr__col-desktop">
                <h3 className="ftr__col-heading">Get In Touch</h3>
                <ul className="ftr__contact-list">
                  <li className="ftr__contact-item ftr__contact-item--company">
                    <span className="ftr__contact-logo-text">Vivify Technocrats</span>
                  </li>
                  <li className="ftr__contact-item">
                    <span className="ftr__contact-icon" aria-label="Address">
                      <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/></svg>
                    </span>
                    <span>No 2B, 1st Floor, Mugappair Road,<br/>Green View Colony, Padi,<br/>Chennai, Tamil Nadu – 600058</span>
                  </li>
                  <li className="ftr__contact-item">
                    <span className="ftr__contact-icon" aria-label="Phone">
                      <svg viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
                    </span>
                    <a href="tel:+917305703528" className="ftr__contact-link">+91 7305 7035 28</a>
                  </li>
                  <li className="ftr__contact-item">
                    <span className="ftr__contact-icon" aria-label="Email">
                      <svg viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>
                    </span>
                    <a href="mailto:reach@vivifysoft.com" className="ftr__contact-link">reach@vivifysoft.com</a>
                  </li>
                  <li className="ftr__contact-item">
                    <span className="ftr__contact-icon" aria-label="Website">
                      <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16A8 8 0 0010 2zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd"/></svg>
                    </span>
                    <a href="https://www.vivifysoft.com" className="ftr__contact-link" target="_blank" rel="noopener noreferrer">www.vivifysoft.com</a>
                  </li>
                </ul>
              </div>
              <div className="ftr__col-mobile">
                <AccordionCol heading="Get In Touch">
                  <ul className="ftr__contact-list">
                    <li className="ftr__contact-item">
                      <span className="ftr__contact-logo-text">Vivify Technocrats</span>
                    </li>
                    <li className="ftr__contact-item">
                      <span className="ftr__contact-icon" aria-hidden="true"><svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/></svg></span>
                      <span>No 2B, 1st Floor, Mugappair Road, Green View Colony, Padi, Chennai – 600058</span>
                    </li>
                    <li className="ftr__contact-item">
                      <span className="ftr__contact-icon" aria-hidden="true"><svg viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg></span>
                      <a href="tel:+917305703528" className="ftr__contact-link">+91 7305 7035 28</a>
                    </li>
                    <li className="ftr__contact-item">
                      <span className="ftr__contact-icon" aria-hidden="true"><svg viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg></span>
                      <a href="mailto:reach@vivifysoft.com" className="ftr__contact-link">reach@vivifysoft.com</a>
                    </li>
                  </ul>
                </AccordionCol>
              </div>
            </div>

          </div>{/* end ftr__container */}
        </div>{/* end ftr__body */}

        {/* ── Bottom bar ── */}
        <div className="ftr__bottom">
          <div className="ftr__bottom-inner">
            <p className="ftr__copyright">© 2026 Vivify Technocrats. All Rights Reserved.</p>
            <div className="ftr__bottom-links">
              <a href="#" className="ftr__bottom-link">Privacy Policy</a>
              <span className="ftr__bottom-sep" aria-hidden="true">·</span>
              <a href="#" className="ftr__bottom-link">Terms &amp; Conditions</a>
              <span className="ftr__bottom-sep" aria-hidden="true">·</span>
              <a href="#" className="ftr__bottom-link">Sitemap</a>
            </div>
          </div>
        </div>

      </footer>
    </div>
  );
}
