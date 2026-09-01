import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Solutions.css";

gsap.registerPlugin(ScrollTrigger);

const SOLUTIONS = [
  {
    id: "custom",
    accent: "#2865EB", accentLight: "#edf3fe", accentBorder: "rgba(40,101,235,0.14)",
    icon: (
      <svg viewBox="0 0 56 56" fill="none" aria-hidden="true">
        <rect width="56" height="56" rx="16" fill="url(#sol5)" />
        <path d="M28 14 L38 24 L38 42 L18 42 L18 24 Z" fill="rgba(255,255,255,0.15)" stroke="#fff" strokeWidth="1.8"/>
        <path d="M28 14 L28 24 L38 24" fill="rgba(255,255,255,0.2)"/>
        <circle cx="28" cy="32" r="4" fill="#60a5fa"/>
        <defs><linearGradient id="sol5" x1="0" y1="0" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2865EB"/><stop offset="1" stopColor="#1a4cc4"/>
        </linearGradient></defs>
      </svg>
    ),
    label: "Custom Engineering",
    desc: "Bespoke R&D, hardware prototyping, and special machinery development.",
    image: "/images/custom-engineering.jpg",
    link: "/solutions/custom-engineering",
  },
  {
    id: "automation",
    accent: "#2865EB", accentLight: "#edf3fe", accentBorder: "rgba(40,101,235,0.14)",
    icon: (
      <svg viewBox="0 0 56 56" fill="none" aria-hidden="true">
        <rect width="56" height="56" rx="16" fill="url(#sol4)" />
        <rect x="14" y="14" width="28" height="28" rx="4" fill="rgba(255,255,255,0.1)" stroke="#fff" strokeWidth="1.8"/>
        <path d="M20 28 L26 22 L32 28 L38 20" stroke="#60a5fa" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="38" cy="20" r="2" fill="#60a5fa"/>
        <defs><linearGradient id="sol4" x1="0" y1="0" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2865EB"/><stop offset="1" stopColor="#1a4cc4"/>
        </linearGradient></defs>
      </svg>
    ),
    label: "Automation Solutions",
    desc: "Industrial control systems, SCADA telemetry, and high-precision process automation.",
    image: "/images/automation-solutions.jpg",
    link: "/solutions/automation-solutions",
  },
  {
    id: "smartfactory",
    accent: "#2865EB", accentLight: "#edf3fe", accentBorder: "rgba(40,101,235,0.14)",
    icon: (
      <svg viewBox="0 0 56 56" fill="none" aria-hidden="true">
        <rect width="56" height="56" rx="16" fill="url(#sol3)" />
        <path d="M12 32 L16 24 Q20 18 28 18 Q36 18 40 24 L44 32 L44 36 Q44 38 42 38 L14 38 Q12 38 12 36Z" fill="rgba(255,255,255,0.15)" stroke="#fff" strokeWidth="1.8"/>
        <circle cx="18" cy="38" r="3" fill="#60a5fa" stroke="#fff" strokeWidth="1.5"/>
        <circle cx="38" cy="38" r="3" fill="#60a5fa" stroke="#fff" strokeWidth="1.5"/>
        <rect x="22" y="22" width="12" height="8" rx="2" fill="rgba(255,255,255,0.3)"/>
        <defs><linearGradient id="sol3" x1="0" y1="0" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2865EB"/><stop offset="1" stopColor="#1a4cc4"/>
        </linearGradient></defs>
      </svg>
    ),
    label: "Smart Factory Solutions",
    desc: "Industry 4.0 ecosystems, IIoT connectivity, and real-time production intelligence.",
    image: "/images/smart-factory-solutions.jpg",
    link: "/solutions/smart-factory-solutions",
  },
  {
    id: "robotics",
    accent: "#2865EB", accentLight: "#edf3fe", accentBorder: "rgba(40,101,235,0.14)",
    icon: (
      <svg viewBox="0 0 56 56" fill="none" aria-hidden="true">
        <rect width="56" height="56" rx="16" fill="url(#sol2)" />
        <circle cx="28" cy="28" r="16" fill="none" stroke="#fff" strokeWidth="1.8"/>
        <circle cx="28" cy="28" r="8" fill="rgba(255,255,255,0.2)"/>
        <circle cx="28" cy="28" r="4" fill="#60a5fa"/>
        <path d="M28 12 L28 16 M28 40 L28 44 M12 28 L16 28 M40 28 L44 28" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
        <defs><linearGradient id="sol2" x1="0" y1="0" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2865EB"/><stop offset="1" stopColor="#1a4cc4"/>
        </linearGradient></defs>
      </svg>
    ),
    label: "Robotics Solutions",
    desc: "Autonomous production lines, intelligent robotic cells, and AMR fleet management systems.",
    image: "/images/robotics-solutions.jpg",
    link: "/solutions/robotics-solutions",
  },
  {
    id: "datacentre",
    accent: "#2865EB", accentLight: "#edf3fe", accentBorder: "rgba(40,101,235,0.14)",
    icon: (
      <svg viewBox="0 0 56 56" fill="none" aria-hidden="true">
        <rect width="56" height="56" rx="16" fill="url(#sol1)" />
        <rect x="12" y="16" width="32" height="24" rx="4" fill="rgba(255,255,255,0.15)" stroke="#fff" strokeWidth="1.8"/>
        <circle cx="18" cy="24" r="2" fill="#60a5fa"/>
        <circle cx="24" cy="24" r="2" fill="#60a5fa"/>
        <circle cx="30" cy="24" r="2" fill="#60a5fa"/>
        <rect x="16" y="30" width="24" height="2" rx="1" fill="rgba(255,255,255,0.4)"/>
        <rect x="16" y="34" width="18" height="2" rx="1" fill="rgba(255,255,255,0.3)"/>
        <defs><linearGradient id="sol1" x1="0" y1="0" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2865EB"/><stop offset="1" stopColor="#1a4cc4"/>
        </linearGradient></defs>
      </svg>
    ),
    label: "Data Centre Solutions",
    desc: "Enterprise server infrastructure, modular data facilities, and high-availability hosting solutions.",
    image: "/images/data-centre-solutions.jpg",
    link: "/solutions/data-centre-solutions",
  },
];

export default function Solutions() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const headRef    = useRef(null);
  const coverflowRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(4);

  const handleCardClick = (link) => {
    navigate(link);
  };

  const handlePrevious = () => {
    setActiveIndex((prev) => Math.min(SOLUTIONS.length - 1, prev + 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => Math.max(0, prev - 1));
  };

  useEffect(() => {
    if (!headRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation with clearProps to avoid transform overlap
      const badge = headRef.current.querySelector(".sol__badge");
      const textEls = headRef.current.querySelectorAll(".sol__heading, .sol__desc");

      if (badge) {
        gsap.fromTo(badge,
          { opacity: 0, y: -15 },
          {
            opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
            onComplete: () => gsap.set(badge, { clearProps: "transform" }),
            scrollTrigger: {
              trigger: headRef.current,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (textEls.length) {
        gsap.fromTo(textEls,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.75, stagger: 0.14, ease: "power3.out",
            onComplete: () => gsap.set(textEls, { clearProps: "transform" }),
            scrollTrigger: {
              trigger: headRef.current,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="solutions" className="sol" ref={sectionRef} aria-label="Solutions">

      <div className="sol__bg" aria-hidden="true">
        <div className="sol__bg-blob sol__bg-blob--a" />
        <div className="sol__bg-blob sol__bg-blob--b" />
      </div>

      <div className="sol__container">
        <div className="sol__head" ref={headRef}>
          <div className="sol__badge">
            <span className="sol__badge-dot" aria-hidden="true" />
            Solutions
          </div>
          <h2 className="sol__heading">
            Technology Solutions Across<br className="sol__br" /> <span className="sol__heading-accent">Multiple Industries</span>
          </h2>
          <p className="sol__desc">
            Vivify Technocrats engineers purpose-built solutions for diverse sectors,
            helping each industry unlock productivity, security, and intelligent automation.
          </p>
        </div>

        <div className="sol__coverflow" ref={coverflowRef}>
          <button 
            className={`sol__nav-btn sol__nav-btn--prev ${activeIndex === SOLUTIONS.length - 1 ? 'sol__nav-btn--hidden' : ''}`} 
            onClick={handlePrevious} 
            aria-label="Previous"
            disabled={activeIndex === SOLUTIONS.length - 1}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          {SOLUTIONS.map((solution, index) => {
            const distance = index - activeIndex;
            const isCenter = distance === 0;
            const isNext = distance === -1;
            const isPrevious = distance === 1;
            const isOuter = Math.abs(distance) >= 2;

            let transform = '';
            let opacity = 0;
            let zIndex = 10 - Math.abs(distance);
            let filter = 'none';
            let isActive = isCenter;
            let overlayOpacity = isCenter ? 0 : 0.3;

            if (isCenter) {
              transform = 'translateX(0) translateZ(0) scale(1)';
              opacity = 1;
              filter = 'brightness(100%)';
            } else if (isNext) {
              transform = 'translateX(150%) translateZ(-100px) scale(0.85)';
              opacity = 0;
            } else if (isPrevious) {
              transform = 'translateX(-150%) translateZ(-100px) scale(0.85)';
              opacity = 0;
            } else {
              opacity = 0;
            }

            return (
              <article
                key={solution.id}
                className={`sol__card ${isActive ? 'sol__card--active' : ''}`}
                style={{
                  transform,
                  opacity,
                  zIndex,
                  filter,
                  '--sol-accent': solution.accent,
                  '--sol-accent-light': solution.accentLight,
                  '--sol-accent-border': solution.accentBorder,
                  '--sol-overlay-opacity': overlayOpacity,
                }}
                onClick={() => handleCardClick(solution.link)}
              >
                <img
                  className="sol__card-bg"
                  src={solution.image}
                  alt={solution.label}
                  loading="lazy"
                />
                <div className="sol__card-content">
                  <h3 className="sol__card-title">{solution.label}</h3>
                  <p className="sol__card-description">{solution.desc}</p>
                  <span className="sol__card-button">Learn More</span>
                </div>
                <div className="sol__card-overlay" />
              </article>
            );
          })}
          
          <button 
            className={`sol__nav-btn sol__nav-btn--next ${activeIndex === 0 ? 'sol__nav-btn--hidden' : ''}`} 
            onClick={handleNext} 
            aria-label="Next"
            disabled={activeIndex === 0}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
