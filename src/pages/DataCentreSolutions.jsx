import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedBorder from "../components/AnimatedBorder/AnimatedBorder";
import datacentreSolutionsHero from "../assets/images/datacentre-solutions-hero.jpg";
import "./DataCentreSolutions.css";

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
  {
    title: "Power Infrastructure",
    subtitle: "Modular UPS Systems",
    desc: "UPS double-conversion systems, ATS generator sync, and dual-feed Intelligent PDUs.",
    image: "/images/datacenter3.jpg",
    color: "#fbbf24"
  },
  {
    title: "Precision Cooling",
    subtitle: "CRAC/CRAH Systems",
    desc: "Precision air conditioning, cold-aisle containment, and liquid cooling for high-density GPU/AI racks.",
    image: "/images/data-centre-solutions.jpg",
    color: "#38bdf8"
  },
  {
    title: "Fire Suppression",
    subtitle: "Clean Agent Systems",
    desc: "FM-200 and Novec 1230 clean agent fire suppression for equipment protection.",
    image: "/images/datacenter4.jpg",
    color: "#fb7185"
  },
  {
    title: "Optical Fiber Network",
    subtitle: "Structured Cabling",
    desc: "Cat6A / MTP optical fiber backbones with colour-coded high-density patch panels.",
    image: "/images/data-centre-card.jpg",
    color: "#34d399"
  },
  {
    title: "DCIM Software",
    subtitle: "Centralized Monitoring",
    desc: "Real-time monitoring telemetry tracking thermal heatmaps, PUE, and rack capacity.",
    image: "/images/datacenter.jpg",
    color: "#a78bfa"
  }
];

// Duplicate sections for seamless infinite loop
const DUPLICATED_SECTIONS = [...SECTIONS, ...SECTIONS];

const STATS = [
  { value: "99.999%", label: "Uptime" },
  { value: "Tier IV", label: "Compliant" },
  { value: "<1.25", label: "PUE Rating" },
  { value: "30kW", label: "Per Rack" }
];

export default function DataCentreSolutions() {
  const containerRef = useRef(null);
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [centeredIndex, setCenteredIndex] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 352;
      const currentScroll = carouselRef.current.scrollLeft;
      const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.offsetWidth;
      
      let newScrollLeft;
      
      if (direction === 'right') {
        newScrollLeft = currentScroll + scrollAmount;
        // When we reach the end of the first set, seamlessly jump to start
        if (newScrollLeft >= maxScroll / 2) {
          newScrollLeft = 0;
        }
      } else {
        newScrollLeft = currentScroll - scrollAmount;
        // When we go before start, jump to middle (start of second set)
        if (newScrollLeft < 0) {
          newScrollLeft = maxScroll / 2 - scrollAmount;
        }
      }
      
      carouselRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
      
      // Update centered index based on scroll position
      const newIndex = Math.round(newScrollLeft / scrollAmount);
      const clampedIndex = newIndex % SECTIONS.length;
      setCenteredIndex(clampedIndex);
    }
  };

  // Auto-cycle border animation through cards
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCardIndex((prev) => (prev + 1) % SECTIONS.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animation
      gsap.fromTo(".dcs-hero__badge",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );

      gsap.fromTo(".dcs-hero__title",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power3.out" }
      );

      gsap.fromTo(".dcs-hero__subtitle",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: "power3.out" }
      );

      gsap.fromTo(".dcs-hero__stat",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, delay: 0.6, ease: "power3.out" }
      );

      // Horizontal scroll sections animation
      gsap.fromTo(".dcs-horizontal-section",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: ".dcs-horizontal-section",
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1
          }
        }
      );

      // Section cards animation
      gsap.fromTo(".dcs-section-card",
        { opacity: 0, scale: 0.9, rotateY: 15 },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".dcs-horizontal-section",
            start: "top 60%"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="dcs-page">
      {/* Hero Section */}
      <section className="dcs-hero">
        <div className="dcs-hero__bg" style={{ backgroundImage: `url(${datacentreSolutionsHero})` }}>
          <div className="dcs-hero__grid" />
          <div className="dcs-hero__circuit" />
        </div>

        <div className="dcs-hero__content">
          <motion.div
            className="dcs-hero__badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            Data Centre Solutions
          </motion.div>

          <h1 className="dcs-hero__title">
            Enterprise Server<br/>
            <span className="dcs-hero__accent">Infrastructure</span>
          </h1>

          <p className="dcs-hero__subtitle">
            End-to-end data centre solutions designed for mission-critical reliability, extreme power efficiency, and seamless scalability
          </p>
        </div>
      </section>

      {/* Horizontal Scroll Section */}
      <section className="dcs-horizontal-section">
        <div className="dcs-horizontal__container">
          <motion.div 
            className="dcs-horizontal__header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="dcs-horizontal__title">
              Infrastructure <span className="dcs-horizontal__accent">Solutions</span>
            </h2>
            <p className="dcs-horizontal__subtitle">
              Core data centre infrastructure components
            </p>
          </motion.div>

          <div className="dcs-carousel-wrapper">
            <motion.div 
              className="dcs-horizontal__wrapper"
              ref={carouselRef}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {DUPLICATED_SECTIONS.map((section, i) => (
                <div key={i} className="dcs-horizontal__panel">
                  <div className="dcs-section-card" style={{ '--section-color': section.color }}>
                    {i % SECTIONS.length === activeCardIndex ? (
                      <AnimatedBorder variant="flow" speed={`${4 + i * 0.5}s`} color1={section.color} color2="#06b6d4" color3="#3b82f6">
                        <div className="dcs-section-card__inner">
                          <img src={section.image} alt={section.title} className="dcs-section-card__icon" />
                          <h3 className="dcs-section-card__title">{section.title}</h3>
                          <p className="dcs-section-card__subtitle">{section.subtitle}</p>
                          <p className="dcs-section-card__desc">{section.desc}</p>
                          <div 
                            className="dcs-section-card__glow"
                            style={{ background: section.color }}
                          />
                        </div>
                      </AnimatedBorder>
                    ) : (
                      <div className="dcs-section-card__inner">
                        <img src={section.image} alt={section.title} className="dcs-section-card__icon" />
                        <h3 className="dcs-section-card__title">{section.title}</h3>
                        <p className="dcs-section-card__subtitle">{section.subtitle}</p>
                        <p className="dcs-section-card__desc">{section.desc}</p>
                        <div 
                          className="dcs-section-card__glow"
                          style={{ background: section.color }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>

            <div className="dcs-carousel__nav-buttons">
              <button 
                className="dcs-carousel__nav dcs-carousel__nav--left"
                onClick={() => scrollCarousel('left')}
              >
                ←
              </button>
              <button 
                className="dcs-carousel__nav dcs-carousel__nav--right"
                onClick={() => scrollCarousel('right')}
              >
                →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="dcs-features-section">
        <div className="dcs-features__container">
          <motion.div
            className="dcs-features__header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="dcs-features__title">
              Mission-Critical <span className="dcs-features__accent">Features</span>
            </h2>
            <p className="dcs-features__subtitle">
              Built for reliability, efficiency, and scalability
            </p>
          </motion.div>

          <div className="dcs-features-grid">
            {[
              { icon: "⚡", title: "Zero Downtime", desc: "Dual-path electrical & cooling feeds" },
              { icon: "🔋", title: "High Density", desc: "Up to 30kW per rack for AI workloads" },
              { icon: "🔒", title: "Security", desc: "Biometric access, CCTV, clean-agent fire" },
              { icon: "🌱", title: "Efficiency", desc: "Smart variable-speed CRAH fans" }
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="dcs-feature-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <span className="dcs-feature-card__icon">{feature.icon}</span>
                <h4 className="dcs-feature-card__title">{feature.title}</h4>
                <p className="dcs-feature-card__desc">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="dcs-cta-section">
        <div className="dcs-cta__bg">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="dcs-cta__particle"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 3 + i * 0.4,
                repeat: Infinity,
                delay: i * 0.2
              }}
              style={{
                left: `${10 + i * 16}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>

        <div className="dcs-cta__container">
          <motion.div
            className="dcs-cta__content"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="dcs-cta__title">
              Architect Your Data Centre
            </h2>
            <p className="dcs-cta__subtitle">
              Server room upgrade or a full Tier-III facility — we design and deliver it all
            </p>
            <motion.button
              className="dcs-cta__button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => smoothScroll("/contact")}
            >
              <span>Architect Your Data Centre</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
