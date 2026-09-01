import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GlobalSpotlight, ParticleCard, useMobileDetection } from "../MagicBento/MagicBento";
import "../MagicBento/MagicBento.css";
import "./WhyChooseUs.css";

gsap.registerPlugin(ScrollTrigger);

const BENTO_GLOW_COLOR = "40, 101, 235";

const getRGBFromHex = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? 
    `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
    BENTO_GLOW_COLOR;
};

const FEATURES = [
  {
    id: "excellence",
    accent: "#2865EB",
    accentLight: "#edf3fe",
    accentBorder: "rgba(40,101,235,0.14)",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <rect width="48" height="48" rx="12" fill="url(#fe1)" />
        <path d="M24 10l3.6 7.3 8 1.2-5.8 5.6 1.4 8-7.2-3.8-7.2 3.8 1.4-8-5.8-5.6 8-1.2z"
          fill="#fff" stroke="#bdd4fc" strokeWidth="1.2" strokeLinejoin="round"/>
        <defs><linearGradient id="fe1" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2865EB"/><stop offset="1" stopColor="#163a9e"/>
        </linearGradient></defs>
      </svg>
    ),
    title: "Engineering Excellence",
    desc: "Precision-engineered solutions built to the highest standards, combining deep technical expertise with proven methodologies.",
  },
  {
    id: "expertise",
    accent: "#059669",
    accentLight: "#ecfdf5",
    accentBorder: "rgba(5,150,105,0.14)",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <rect width="48" height="48" rx="12" fill="url(#fe2)" />
        <circle cx="24" cy="18" r="7" fill="none" stroke="#fff" strokeWidth="2.2"/>
        <path d="M12 38c0-6.6 5.4-12 12-12s12 5.4 12 12" stroke="#6ee7b7" strokeWidth="2.2" strokeLinecap="round"/>
        <circle cx="24" cy="18" r="3" fill="#fff"/>
        <defs><linearGradient id="fe2" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#10b981"/><stop offset="1" stopColor="#059669"/>
        </linearGradient></defs>
      </svg>
    ),
    title: "Industry Expertise",
    desc: "Years of hands-on experience across manufacturing, automation, data, and software give us an edge in every engagement.",
  },
  {
    id: "team",
    accent: "#2865EB",
    accentLight: "#edf3fe",
    accentBorder: "rgba(40,101,235,0.14)",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <rect width="48" height="48" rx="12" fill="url(#fe3)" />
        <circle cx="17" cy="20" r="5.5" fill="none" stroke="#93b8fa" strokeWidth="2"/>
        <circle cx="31" cy="20" r="5.5" fill="none" stroke="#fff" strokeWidth="2"/>
        <path d="M7 36c0-5 4.5-9 10-9" stroke="#93b8fa" strokeWidth="2" strokeLinecap="round"/>
        <path d="M31 27c5.5 0 10 4 10 9" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round"/>
        <path d="M21 36c0-5 1.3-9 3-9s3 4 3 9" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
        <defs><linearGradient id="fe3" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2865EB"/><stop offset="1" stopColor="#1a4cc4"/>
        </linearGradient></defs>
      </svg>
    ),
    title: "Experienced Team",
    desc: "Our certified engineers, architects, and consultants bring multi-disciplinary knowledge to every project.",
  },
  {
    id: "e2e",
    accent: "#d97706",
    accentLight: "#fffbeb",
    accentBorder: "rgba(217,119,6,0.14)",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <rect width="48" height="48" rx="12" fill="url(#fe4)" />
        <rect x="10" y="14" width="10" height="10" rx="3" fill="#fff" opacity="0.9"/>
        <rect x="28" y="14" width="10" height="10" rx="3" fill="#fde68a" opacity="0.9"/>
        <rect x="19" y="30" width="10" height="10" rx="3" fill="#fff" opacity="0.85"/>
        <line x1="20" y1="24" x2="24" y2="30" stroke="#fef3c7" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="28" y1="24" x2="24" y2="30" stroke="#fef3c7" strokeWidth="1.8" strokeLinecap="round"/>
        <defs><linearGradient id="fe4" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f59e0b"/><stop offset="1" stopColor="#d97706"/>
        </linearGradient></defs>
      </svg>
    ),
    title: "End-to-End Solutions",
    desc: "From requirements and design through deployment and support, we manage the entire lifecycle of every solution.",
  },
  {
    id: "quality",
    accent: "#0891b2",
    accentLight: "#ecfeff",
    accentBorder: "rgba(8,145,178,0.14)",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <rect width="48" height="48" rx="12" fill="url(#fe5)" />
        <path d="M24 11C18 13 13 17 13 24c0 6 5 11 11 12 6-1 11-6 11-12 0-7-5-11-11-13z"
          fill="none" stroke="#fff" strokeWidth="2"/>
        <path d="M18 24l4 4 8-8" stroke="#a5f3fc" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <defs><linearGradient id="fe5" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#06b6d4"/><stop offset="1" stopColor="#0891b2"/>
        </linearGradient></defs>
      </svg>
    ),
    title: "Quality & Reliability",
    desc: "Rigorous testing, industry certifications, and strict QA processes ensure every deliverable meets enterprise-grade standards.",
  },
  {
    id: "support",
    accent: "#dc2626",
    accentLight: "#fef2f2",
    accentBorder: "rgba(220,38,38,0.14)",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <rect width="48" height="48" rx="12" fill="url(#fe6)" />
        <circle cx="24" cy="24" r="11" fill="none" stroke="#fca5a5" strokeWidth="2"/>
        <path d="M20 21c0-2.2 1.8-4 4-4s4 1.8 4 4c0 3-4 3-4 6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"/>
        <circle cx="24" cy="33" r="1.8" fill="#fff"/>
        <defs><linearGradient id="fe6" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ef4444"/><stop offset="1" stopColor="#dc2626"/>
        </linearGradient></defs>
      </svg>
    ),
    title: "24/7 Technical Support",
    desc: "Around-the-clock monitoring and support teams ensure your operations run without interruption, every day of the year.",
  },
];

const STATS = [
  { value: 100, suffix: "+", label: "Projects Completed" },
  { value: 50,  suffix: "+", label: "Satisfied Clients"  },
  { value: 10,  suffix: "+", label: "Industries Served"  },
  { value: 99,  suffix: "%", label: "Client Satisfaction" },
];

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const headRef    = useRef(null);
  const statsRef   = useRef(null);
  const cardsRef   = useRef(null);
  const isMobile   = useMobileDetection();
  const disableBentoAnimations = isMobile;

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── Header ── */
      gsap.fromTo(
        headRef.current.querySelectorAll(".wcu__heading, .wcu__desc"),
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.75, stagger: 0.14, ease: "power3.out",
          onComplete: () => gsap.set(headRef.current.querySelectorAll(".wcu__heading, .wcu__desc"), { clearProps: "transform" }),
          scrollTrigger: { trigger: headRef.current, start: "top 82%", toggleActions: "play none none none" },
        }
      );

      /* ── Stat counters ── */
      const statNums = statsRef.current.querySelectorAll(".wcu__stat-num");

      /* Fade stats in */
      gsap.fromTo(
        statsRef.current.querySelectorAll(".wcu__stat"),
        { opacity: 0, y: 36 },
        {
          opacity: 1, y: 0, duration: 0.65, stagger: 0.12, ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      /* Count-up — separate ScrollTrigger so onEnter fires reliably */
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          statNums.forEach((el) => {
            const target = +el.dataset.target;
            const proxy  = { val: 0 };
            gsap.to(proxy, {
              val: target,
              duration: 2,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = Math.round(proxy.val);
              },
            });
          });
        },
      });

      /* ── Feature cards ── */
      gsap.fromTo(
        cardsRef.current.querySelectorAll(".wcu__card"),
        { opacity: 0, y: 52, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: cardsRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );

      /* ── Icon entrance ── */
      gsap.fromTo(
        cardsRef.current.querySelectorAll(".wcu__card-icon"),
        { scale: 0.7, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.8)",
          scrollTrigger: { trigger: cardsRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="why-us" className="wcu" ref={sectionRef} aria-label="Why Choose Vivify">

      <GlobalSpotlight
        gridRef={cardsRef}
        disableAnimations={disableBentoAnimations}
        enabled
        spotlightRadius={300}
        glowColor={BENTO_GLOW_COLOR}
        blendMode="normal"
        className="wcu__spotlight"
      />

      {/* Background */}
      <div className="wcu__bg" aria-hidden="true">
        <div className="wcu__bg-blob wcu__bg-blob--a" />
        <div className="wcu__bg-blob wcu__bg-blob--b" />
        <div className="wcu__bg-stripe" />
      </div>


      <div className="wcu__container">

        {/* Header */}
        <div className="wcu__head" ref={headRef}>
          <h2 className="wcu__heading">
            Why Businesses Trust<br className="wcu__br" />{" "}
            <span className="wcu__heading-accent">Vivify Technocrats</span>
          </h2>
          <p className="wcu__desc">
            We combine engineering expertise, innovative technology, and customer-focused
            solutions to deliver reliable and scalable results.
          </p>
        </div>

        {/* Stats row */}
        <div className="wcu__stats" ref={statsRef}>
          {STATS.map(({ value, suffix, label }) => (
            <div className="wcu__stat" key={label}>
              <div className="wcu__stat-value">
                <span className="wcu__stat-num" data-target={value}>0</span>
                <span className="wcu__stat-suffix">{suffix}</span>
              </div>
              <p className="wcu__stat-label">{label}</p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="wcu__divider" aria-hidden="true" />

        {/* Feature cards */}
        <div className="wcu__grid-wrap bento-section">
          <div className="wcu__grid" ref={cardsRef}>
            {FEATURES.map(({ id, icon, accent, accentLight, accentBorder, title, desc }) => (
              <div
                key={id}
                className="wcu__card magic-bento-card magic-bento-card--border-glow"
                style={{
                  "--wcu-accent":        accent,
                  "--wcu-accent-light":  accentLight,
                  "--wcu-accent-border": accentBorder,
                  "--glow-color":        getRGBFromHex(accent),
                }}
                ref={el => {
                  if (!el || disableBentoAnimations) return;

                  const handleMouseMove = e => {
                    const rect = el.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;

                    // Tilt effect
                    const rotateX = ((y - centerY) / centerY) * -10;
                    const rotateY = ((x - centerX) / centerX) * 10;
                    gsap.to(el, {
                      rotateX,
                      rotateY,
                      duration: 0.1,
                      ease: "power2.out",
                      transformPerspective: 1000
                    });

                    // Magnetism effect
                    const magnetX = (x - centerX) * 0.05;
                    const magnetY = (y - centerY) * 0.05;
                    gsap.to(el, {
                      x: magnetX,
                      y: magnetY,
                      duration: 0.3,
                      ease: "power2.out"
                    });
                  };

                  const handleMouseLeave = () => {
                    gsap.to(el, {
                      rotateX: 0,
                      rotateY: 0,
                      x: 0,
                      y: 0,
                      duration: 0.3,
                      ease: "power2.out"
                    });
                  };

                  const handleClick = e => {
                    const rect = el.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const maxDistance = Math.max(
                      Math.hypot(x, y),
                      Math.hypot(x - rect.width, y),
                      Math.hypot(x, y - rect.height),
                      Math.hypot(x - rect.width, y - rect.height)
                    );

                    const ripple = document.createElement('div');
                    const glowColor = getRGBFromHex(accent);
                    ripple.style.cssText = `
                      position: absolute;
                      width: ${maxDistance * 2}px;
                      height: ${maxDistance * 2}px;
                      border-radius: 50%;
                      background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
                      left: ${x - maxDistance}px;
                      top: ${y - maxDistance}px;
                      pointer-events: none;
                      z-index: 1000;
                    `;
                    el.appendChild(ripple);

                    gsap.fromTo(
                      ripple,
                      { scale: 0, opacity: 1 },
                      {
                        scale: 1,
                        opacity: 0,
                        duration: 0.8,
                        ease: "power2.out",
                        onComplete: () => ripple.remove()
                      }
                    );
                  };

                  el.addEventListener('mousemove', handleMouseMove);
                  el.addEventListener('mouseleave', handleMouseLeave);
                  el.addEventListener('click', handleClick);
                }}
              >
                <div className="wcu__card-icon">{icon}</div>
                <h3 className="wcu__card-title">{title}</h3>
                <p className="wcu__card-desc">{desc}</p>
                <div className="wcu__card-glow" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
