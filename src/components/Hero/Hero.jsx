import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import ElegantRibbon from "../ElegantRibbon/ElegantRibbon";
import "./Hero.css";

export default function Hero() {
  const sectionRef  = useRef(null);
  const badgeRef    = useRef(null);
  const line1Ref    = useRef(null);
  const line2Ref    = useRef(null);
  const line3Ref    = useRef(null);
  const descRef     = useRef(null);
  const btnsRef     = useRef(null);

  /* ════════════════════════════════════
     ENTRANCE TIMELINE
  ════════════════════════════════════ */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      /* Fade section in */
      tl.fromTo(sectionRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 }
      );

      /* Badge */
      tl.fromTo(badgeRef.current,
        { opacity: 0, y: 20, scale: 0.92 },
        { opacity: 1, y: 0,  scale: 1,   duration: 0.6 },
        0.2
      );

      /* Heading lines — mask-clip reveal */
      tl.fromTo(
        [line1Ref.current, line2Ref.current, line3Ref.current],
        { opacity: 0, y: 52, clipPath: "inset(0 0 100% 0)" },
        { opacity: 1, y: 0,  clipPath: "inset(0 0 0% 0)", duration: 0.9, stagger: 0.14 },
        0.35
      );

      /* Description */
      tl.fromTo(descRef.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0,  duration: 0.7 },
        0.75
      );

      /* Buttons */
      tl.fromTo(btnsRef.current,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0,  duration: 0.6 },
        0.9
      );

      // Add will-change for animated elements
      const animatedElements = [
        badgeRef.current,
        line1Ref.current,
        line2Ref.current,
        line3Ref.current,
        descRef.current,
        btnsRef.current,
      ];
      
      animatedElements.forEach(el => {
        if (el) el.style.willChange = 'transform, opacity';
      });
      
      // Clean up will-change after animation
      setTimeout(() => {
        animatedElements.forEach(el => {
          if (el) el.style.willChange = '';
        });
      }, 2000);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" className="hero" ref={sectionRef} aria-label="Hero">

      {/* ── Two-column layout ── */}
      <div className="hero__container">

        {/* ════ CONTENT ════ */}
        <div className="hero__left">

          {/* Badge */}
          <div className="hero__badge" ref={badgeRef}>
            <span className="hero__badge-dot" aria-hidden="true" />
            Engineering Tomorrow's Technology
          </div>

          {/* Heading */}
          <h1 className="hero__heading">
            <span className="hero__line" ref={line1Ref}>Engineering</span>
            <span className="hero__line hero__line--accent" ref={line2Ref}>the Future with</span>
            <span className="hero__line" ref={line3Ref}>Smart Technology</span>
          </h1>

          {/* Description */}
          <p className="hero__desc" ref={descRef}>
            Vivify Technocrats delivers innovative Industrial Automation, Robotics Integration,
            Data Centre Services, IT Infrastructure, ELV Solutions, and Software Development
            — helping industries automate operations and accelerate digital transformation.
          </p>

          {/* Buttons */}
          <div className="hero__btns" ref={btnsRef}>
            <Link to="/services" className="hero__btn hero__btn--primary">
              Explore Services
              <span className="hero__btn-arrow" aria-hidden="true">→</span>
              <span className="hero__btn-shine" aria-hidden="true" />
            </Link>
            <Link to="/solutions" className="hero__btn hero__btn--primary">
              Explore Solutions
              <span className="hero__btn-arrow" aria-hidden="true">→</span>
              <span className="hero__btn-shine" aria-hidden="true" />
            </Link>
            <Link to="/contact" className="hero__btn hero__btn--secondary">
              Contact Us
            </Link>
          </div>

        </div>

      </div>

      {/* ── Scroll hint ── */}
      <div className="hero__scroll-hint" aria-hidden="true">
        <span className="hero__scroll-line" />
        <span className="hero__scroll-label">Scroll</span>
      </div>

    </section>
  );
}
