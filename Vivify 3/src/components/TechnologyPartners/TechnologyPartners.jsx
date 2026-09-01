import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LogoLoop from "../LogoLoop/LogoLoop";

import siemensLogo   from "../../assets/images/logos/siemens.svg";
import abbLogo       from "../../assets/images/logos/abb.svg";
import kukaLogo      from "../../assets/images/logos/kuka.svg";
import schneiderLogo from "../../assets/images/logos/schneider.svg";
import ciscoLogo     from "../../assets/images/logos/cisco.svg";
import azureLogo     from "../../assets/images/logos/azure.svg";
import awsLogo       from "../../assets/images/logos/aws.svg";
import rockwellLogo  from "../../assets/images/logos/rockwell.svg";

import "./TechnologyPartners.css";

gsap.registerPlugin(ScrollTrigger);

/* ── Logo items for LogoLoop ── */
const LOGO_ITEMS = [
  { src: siemensLogo,   alt: "Siemens",                style: { filter: "none" } },
  { src: abbLogo,       alt: "ABB",                    style: { filter: "invert(14%) sepia(95%) saturate(5000%) hue-rotate(349deg) brightness(95%) contrast(110%)" } },
  { src: kukaLogo,      alt: "KUKA",                   style: { filter: "none" } },
  { src: rockwellLogo,  alt: "Rockwell Automation",    style: { filter: "invert(11%) sepia(90%) saturate(6000%) hue-rotate(355deg) brightness(90%) contrast(120%)" } },
  { src: schneiderLogo, alt: "Schneider Electric",     style: { filter: "invert(58%) sepia(60%) saturate(800%) hue-rotate(90deg) brightness(95%) contrast(110%)" } },
  { src: ciscoLogo,     alt: "Cisco Systems",          style: { filter: "invert(44%) sepia(90%) saturate(500%) hue-rotate(175deg) brightness(95%) contrast(100%)" } },
  { src: azureLogo,     alt: "Microsoft Azure",        style: { filter: "invert(28%) sepia(90%) saturate(1200%) hue-rotate(196deg) brightness(95%) contrast(105%)" } },
  { src: awsLogo,       alt: "Amazon Web Services",    style: { filter: "brightness(0) invert(1)" } },
];

export default function TechnologyPartners() {
  const sectionRef = useRef(null);
  const headRef    = useRef(null);
  const loopRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animations
      const techEls = headRef.current.querySelectorAll(".technology-partners__eyebrow, .technology-partners__heading, .technology-partners__desc");
      gsap.fromTo(
        techEls,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.75, stagger: 0.13, ease: "power3.out",
          onComplete: () => gsap.set(techEls, { clearProps: "transform" }),
          scrollTrigger: {
            trigger: headRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );

      // Logo loop section animations
      gsap.fromTo(
        loopRef.current.querySelectorAll(".technology-partners__loop-label, .technology-partners__loop-wrapper"),
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out",
          scrollTrigger: {
            trigger: loopRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="technology-partners" className="technology-partners" ref={sectionRef} aria-label="Technology Partners">

      <div className="technology-partners__grid-bg"  aria-hidden="true" />
      <div className="technology-partners__glow technology-partners__glow--a" aria-hidden="true" />
      <div className="technology-partners__glow technology-partners__glow--b" aria-hidden="true" />

      <div className="technology-partners__container">

        {/* ── Header ── */}
        <div className="technology-partners__head" ref={headRef}>
          <p className="technology-partners__eyebrow">
            <span className="technology-partners__eyebrow-dot" aria-hidden="true" />
            Building Solutions with
          </p>
          <h2 className="technology-partners__heading">
            Building Solutions with<br className="technology-partners__br" /> <span className="technology-partners__heading-accent">Modern Technologies</span>
          </h2>
          <p className="technology-partners__desc">
            We leverage globally recognized technologies and enterprise-grade platforms to deliver intelligent automation, software, cloud, networking, and industrial engineering solutions that are secure, scalable, and built for the future.
          </p>
        </div>

        {/* ── Logo loop strip ── */}
        <div className="technology-partners__loop-section" ref={loopRef}>
          <div className="technology-partners__loop-wrapper">
            <LogoLoop
              logos={LOGO_ITEMS}
              speed={70}
              direction="left"
              logoHeight={52}
              gap={80}
              hoverSpeed={0}
              scaleOnHover
              ariaLabel="Technology partner logos"
              renderItem={(item, key) => (
                <img
                  key={key}
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  style={{
                    height: "52px",
                    width: "auto",
                    maxWidth: "165px",
                    objectFit: "contain",
                    display: "block",
                    pointerEvents: "none",
                    userSelect: "none",
                    ...item.style,
                  }}
                  draggable={false}
                />
              )}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
