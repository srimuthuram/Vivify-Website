import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/images/logos/viv.png";
import "./Navbar.css";

/* ── Mega-panel data ── */
const SERVICES_ITEMS = [
  {
    label: "Industrial Automation",
    href: "/services/industrial-automation",
    desc: "PLC/SCADA systems & process control",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M7 8h2m2 0h2m2 0h2"/>
      </svg>
    ),
  },
  {
    label: "Software Development",
    href: "/services/software-development",
    desc: "Custom apps, APIs & cloud-native platforms",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
  },
  {
    label: "Robotics Integration",
    href: "/services/robotics-integration",
    desc: "Multi-axis arms, vision & cobot cells",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
        <path d="M12 2a4 4 0 0 1 4 4v2H8V6a4 4 0 0 1 4-4z"/><rect x="8" y="8" width="8" height="10" rx="2"/><path d="M8 14H5a2 2 0 0 1 0-4h3M16 14h3a2 2 0 0 0 0-4h-3"/>
      </svg>
    ),
  },
  {
    label: "Data Centre Services",
    href: "/services/data-centre-services",
    desc: "Racking, virtualisation & DR failover",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
        <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v4c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 9v4c0 1.66 4.03 3 9 3s9-1.34 9-3V9"/>
      </svg>
    ),
  },
  {
    label: "IT Infrastructure",
    href: "/services/it-infrastructure",
    desc: "Networks, firewalls & 24/7 monitoring",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
        <rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>
      </svg>
    ),
  },
  {
    label: "ELV Solutions",
    href: "/services/elv-solutions",
    desc: "CCTV, access control & BMS integration",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
];

const SOLUTIONS_ITEMS = [
  {
    label: "Data Centre Solutions",
    href: "/solutions/data-centre-solutions",
    desc: "Tier-III/IV modular data facilities",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      </svg>
    ),
  },
  {
    label: "Robotics Solutions",
    href: "/solutions/robotics-solutions",
    desc: "AMRs, articulated arms & cobots",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
        <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
      </svg>
    ),
  },
  {
    label: "Smart Factory",
    href: "/solutions/smart-factory-solutions",
    desc: "IIoT, OEE analytics & digital twins",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
        <path d="M3 17l4-8 4 5 3-3 4 6"/><path d="M21 21H3"/>
      </svg>
    ),
  },
  {
    label: "Automation Solutions",
    href: "/solutions/automation-solutions",
    desc: "Multi-vendor PLC & SCADA engineering",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
        <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
    ),
  },
  {
    label: "Custom Engineering",
    href: "/solutions/custom-engineering",
    desc: "Bespoke R&D, PCB & special machinery",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
  },
];

const NAV_LINKS = [
  { label: "Home",       href: "/" },
  { label: "About",      href: "/about" },
  { label: "Services",   href: "/services",   mega: true, items: SERVICES_ITEMS,  viewAll: "/services" },
  { label: "Solutions",  href: "/solutions",  mega: true, items: SOLUTIONS_ITEMS, viewAll: "/solutions" },
  { label: "Products",   href: "/products" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Careers",    href: "/careers" },
];

/* ── Mega-panel component ── */
function MegaPanel({ items, viewAll, label, onNavigate }) {
  return (
    <motion.div
      className="navbar__mega"
      initial={{ opacity: 0, y: -12, x: "-50%", scale: 0.98 }}
      animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
      exit={{ opacity: 0, y: -8, x: "-50%", scale: 0.98 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      role="menu"
    >
      <div className="navbar__mega-grid">
        {items.map((item) => (
          <button
            key={item.href}
            className="navbar__mega-item"
            role="menuitem"
            data-href={item.href}
            onClick={() => onNavigate(item.href)}
          >
            <span className="navbar__mega-icon">{item.icon}</span>
            <span className="navbar__mega-text">
              <span className="navbar__mega-label">{item.label}</span>
              <span className="navbar__mega-desc">{item.desc}</span>
            </span>
            <svg className="navbar__mega-arrow" viewBox="0 0 16 16" fill="none" width="14" height="14">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        ))}
      </div>
      <div className="navbar__mega-footer">
        <button
          className="navbar__mega-viewall"
          data-href={viewAll}
          onClick={() => onNavigate(viewAll)}
        >
          View all {label} →
        </button>
      </div>
    </motion.div>
  );
}

export default function Navbar() {
  const location  = useLocation();
  const navigate  = useNavigate();
  const [scrolled, setScrolled]         = useState(false);
  const [menuOpen, setMenuOpen]         = useState(false);
  const [activeLink, setActiveLink]     = useState("/");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const menuRef      = useRef(null);
  const dropdownRefs = useRef({});

  useEffect(() => { setActiveLink(location.pathname); }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    if (menuOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  useEffect(() => {
    const handler = (e) => {
      if (openDropdown && dropdownRefs.current[openDropdown] && !dropdownRefs.current[openDropdown].contains(e.target))
        setOpenDropdown(null);
    };
    if (openDropdown) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [openDropdown]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close dropdowns when location changes (handles browser back/forward, direct navigation)
  useEffect(() => {
    setOpenDropdown(null);
    setMobileDropdown(null);
    setMenuOpen(false);
  }, [location.pathname]);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    setOpenDropdown(null);
    
    // Force scroll reset before navigation
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    if (href.startsWith('/')) {
      const [path, hash] = href.split('#');
      if (location.pathname === path) {
        if (hash) { 
          setTimeout(() => {
            document.querySelector(`#${hash}`)?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
        else       { 
          window.scrollTo({ top: 0, behavior: 'smooth' }); 
        }
      } else { 
        navigate(href); 
      }
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const topLine = { closed: { rotate: 0, y: 0 },       open: { rotate: 45,  y: 7  } };
  const midLine = { closed: { opacity: 1, scaleX: 1 },  open: { opacity: 0,  scaleX: 0 } };
  const botLine = { closed: { rotate: 0, y: 0 },        open: { rotate: -45, y: -7 } };

  const drawerVariants = {
    hidden:  { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
    exit:    { x: "100%", opacity: 0, transition: { duration: 0.25, ease: "easeInOut" } },
  };
  const staggerItem = {
    hidden:  { x: 30, opacity: 0 },
    visible: (i) => ({ x: 0, opacity: 1, transition: { delay: i * 0.06, ease: "easeOut", duration: 0.35 } }),
  };

  return (
    <>
      <header className={`navbar${scrolled ? " navbar--scrolled" : ""}`}>
        <div className="navbar__inner">

          {/* Logo */}
          <Link to="/" className="navbar__logo" onClick={() => handleNavClick("/")} aria-label="Vivify Technocrats – Home">
            <img src={logo} alt="Vivify Technocrats logo" loading="eager" />
          </Link>

          {/* Desktop nav */}
          <nav className="navbar__links" aria-label="Primary navigation">
            {NAV_LINKS.map(({ label, href, mega, items, viewAll }) => (
              <div
                key={href}
                className={`navbar__link-wrapper${mega ? " navbar__link-wrapper--mega" : ""}`}
                ref={(el) => { if (mega) dropdownRefs.current[label] = el; }}
                onMouseEnter={() => mega && setOpenDropdown(label)}
                onMouseLeave={() => mega && setOpenDropdown(null)}
              >
                <Link
                  to={href}
                  className={`navbar__link${activeLink === href || (mega && activeLink.startsWith(href) && href !== '/') ? " navbar__link--active" : ""}${mega ? " navbar__link--has-dropdown" : ""}`}
                  onClick={() => handleNavClick(href)}
                >
                  {label}
                  {mega && (
                    <svg className={`navbar__dropdown-arrow${openDropdown === label ? " navbar__dropdown-arrow--open" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  )}
                  <span className="navbar__link-underline" aria-hidden="true" />
                </Link>

                {mega && (
                  <AnimatePresence>
                    {openDropdown === label && (
                      <MegaPanel
                        items={items}
                        viewAll={viewAll}
                        label={label}
                        onNavigate={handleNavClick}
                      />
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* CTA */}
          <Link to="/contact" className="navbar__cta" onClick={() => handleNavClick("/contact")}>
            Contact Us
            <span className="navbar__cta-shine" aria-hidden="true" />
          </Link>

          {/* Hamburger */}
          <button className="navbar__hamburger" onClick={() => setMenuOpen((v) => !v)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
            {[topLine, midLine, botLine].map((variant, i) => (
              <motion.span key={i} className="navbar__hamburger-line" variants={variant} animate={menuOpen ? "open" : "closed"} transition={{ duration: 0.3, ease: "easeInOut" }} />
            ))}
          </button>
        </div>
      </header>

      {/* Mobile backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div className="navbar__backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} onClick={() => setMenuOpen(false)} />
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav ref={menuRef} className="navbar__drawer" variants={drawerVariants} initial="hidden" animate="visible" exit="exit" aria-label="Mobile navigation">
            <div className="navbar__drawer-header">
              <img src={logo} alt="Vivify Technocrats" className="navbar__drawer-logo" loading="lazy" />
            </div>
            <ul className="navbar__drawer-links">
              {NAV_LINKS.map(({ label, href, mega, items }, i) => (
                <motion.li key={href} custom={i} variants={staggerItem} initial="hidden" animate="visible">
                  <div className="navbar__drawer-item-wrapper">
                    {mega ? (
                      <>
                        <button
                          className={`navbar__drawer-link navbar__drawer-link--dropdown${mobileDropdown === label ? " navbar__drawer-link--expanded" : ""}`}
                          onClick={() => setMobileDropdown(mobileDropdown === label ? null : label)}
                        >
                          <span className="navbar__drawer-link-num">0{i + 1}</span>
                          {label}
                          <svg className="navbar__drawer-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <polyline points="6 9 12 15 18 9"/>
                          </svg>
                        </button>
                        <AnimatePresence>
                          {mobileDropdown === label && (
                            <motion.div className="navbar__drawer-dropdown" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
                              {items.map((item) => (
                                <Link key={item.href} to={item.href} className="navbar__drawer-dropdown-item" onClick={() => handleNavClick(item.href)}>
                                  <span className="navbar__drawer-mega-icon">{item.icon}</span>
                                  {item.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link to={href} className={`navbar__drawer-link${activeLink === href ? " navbar__drawer-link--active" : ""}`} onClick={() => handleNavClick(href)}>
                        <span className="navbar__drawer-link-num">0{i + 1}</span>
                        {label}
                      </Link>
                    )}
                  </div>
                </motion.li>
              ))}
            </ul>
            <Link to="/contact" className="navbar__drawer-cta" onClick={() => handleNavClick("/contact")}>
              Contact Us
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
