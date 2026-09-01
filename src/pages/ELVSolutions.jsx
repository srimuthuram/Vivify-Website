import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedBorder from "../components/AnimatedBorder/AnimatedBorder";
import { smoothScroll } from "../utils/smoothScroll";
import elvSolutionsHero from "../assets/images/elv-solutions-hero.jpg";
import "./ELVSolutions.css";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    title: "Enterprise IP CCTV",
    desc: "CCTV networks using high-definition IP cameras, network video recorders (NVRs), and video management software (Milestone, HikCentral) featuring motion masking and remote viewing security.",
    image: "/images/ELV.jpg",
    color: "#3b82f6"
  },
  {
    title: "Access Control & Biometrics",
    desc: "RFID card systems, biometric fingerprint readers, facial recognition entry barriers, and door electromagnetic locks, integrated with payroll and time logs.",
    image: "/images/elv2.jpg",
    color: "#1e40af"
  },
  {
    title: "Public Address (PA) Systems",
    desc: "Audio zoning, amplifiers, speaker networks, and emergency evacuation integration, enabling clear messaging across designated building floors.",
    image: "/images/elv-service.jpg",
    color: "#60a5fa"
  },
  {
    title: "Addressable Fire Safety",
    desc: "Precision heat/smoke detection circuits, manual call points, control panels, and automated integration with sirens, access gates, and fire ventilation systems.",
    image: "/images/mcb.jpg",
    color: "#f0abfc"
  },
  {
    title: "Building Management Systems",
    desc: "Centralized HVAC monitoring, lighting relays, generator fuel trackers, energy meters, and water level controllers linked to a unified control panel.",
    image: "/images/IT.jpg",
    color: "#7dd3fc"
  },
  {
    title: "Intrusion Detection",
    desc: "Perimeter sensors, motion detectors, glass break sensors, and alarm integration with monitoring centers for comprehensive security coverage.",
    image: "/images/it2.jpg",
    color: "#fb7185"
  }
];

const STATS = [
  { value: "24/7", label: "Monitoring" },
  { value: "IP66", label: "Waterproof" },
  { value: "EN54", label: "Fire Cert" },
  { value: "AES-256", label: "Encryption" }
];

export default function ELVSolutions() {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 700 };
  const rotateX = useSpring(useMotionValue(0), springConfig);
  const rotateY = useSpring(useMotionValue(0), springConfig);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Shield animation
      gsap.fromTo(".elv-hero__shield",
        { 
          opacity: 0,
          scale: 0,
          rotate: -180
        },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 1.2,
          ease: "elastic.out(1, 0.5)"
        }
      );

      // Lock animation
      gsap.fromTo(".elv-hero__lock",
        { 
          opacity: 0,
          y: -50
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.5,
          ease: "bounce.out"
        }
      );

      // Service cards reveal
      gsap.fromTo(".elv-service-card",
        { 
          opacity: 0,
          y: 50,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".elv-services-grid",
            start: "top 80%"
          }
        }
      );

      // Stats animation
      gsap.fromTo(".elv-hero__stat",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out"
        }
      );
    }, containerRef);

    // Mouse tracking for 3D effect
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      rotateX.set(y);
      rotateY.set(-x);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [rotateX, rotateY]);

  const handleMouseMove = (e, id) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x - rect.width / 2);
    mouseY.set(y - rect.height / 2);
  };

  return (
    <div ref={containerRef} className="elv-page">
      {/* Hero Section with Security Theme */}
      <motion.section 
        className="elv-hero"
        style={{ rotateX, rotateY }}
      >
        <div className="elv-hero__bg" style={{ backgroundImage: `url(${elvSolutionsHero})` }}>
          <div className="elv-hero__shield" />
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="elv-hero__scan-line"
              animate={{
                y: ['-100%', '100%'],
                opacity: [0, 0.5, 0]
              }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.2
              }}
              style={{
                left: `${10 + i * 12}%`
              }}
            />
          ))}
        </div>

        <div className="elv-hero__content">
          <motion.div
            className="elv-hero__badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            ELV Solutions
          </motion.div>

          <h1 className="elv-hero__title">
            Extra Low Voltage<br/>
            <span className="elv-hero__accent">Security Systems</span>
          </h1>

          <p className="elv-hero__subtitle">
            Design and install ELV networks that make buildings safe, smart, and efficient
          </p>
        </div>
      </motion.section>

      {/* Services Grid Section */}
      <section className="elv-services-section">
        <div className="elv-services__container">
          <motion.div
            className="elv-services__header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="elv-services__title">
              Security <span className="elv-services__accent">Solutions</span>
            </h2>
            <p className="elv-services__subtitle">
              Comprehensive ELV systems for smart building integration
            </p>
          </motion.div>

          <div className="elv-services-grid">
            {SERVICES.map((service, i) => (
              <motion.div
                key={i}
                className="elv-service-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="elv-card__image-wrapper">
                  <img src={service.image} alt={service.title} className="elv-card__image" />
                  <div className="elv-card__overlay" />
                </div>
                <div className="elv-card__content">
                  <h3 className="elv-card__title">{service.title}</h3>
                  <p className="elv-card__desc">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Accordion Section */}
      <section className="elv-accordion-section">
        <div className="elv-accordion__container">
          <motion.div
            className="elv-accordion__header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="elv-accordion__title">
              System <span className="elv-accordion__accent">Details</span>
            </h2>
            <p className="elv-accordion__subtitle">
              Explore our comprehensive ELV portfolio
            </p>
          </motion.div>

          <div className="elv-accordion">
            {SERVICES.map((service, i) => (
              <motion.div
                key={i}
                className="elv-acc-item"
                style={{ "--elv-color": service.color }}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="elv-acc-trigger">
                  <span className="elv-acc-icon">{service.icon}</span>
                  <span className="elv-acc-title">{service.title}</span>
                </div>
                <div className="elv-acc-body">
                  <p className="elv-acc-desc">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="elv-cta-section">
        <div className="elv-cta__bg">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="elv-cta__sensor"
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

        <div className="elv-cta__container">
          <motion.div
            className="elv-cta__content"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="elv-cta__title">
              Design Your Smart Building Today
            </h2>
            <p className="elv-cta__subtitle">
              CCTV footprint, access control, fire safety, or full BMS — we scope and install everything
            </p>
            <motion.button
              className="elv-cta__button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => smoothScroll("/contact")}
            >
              <span>Consult an ELV Engineer</span>
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
