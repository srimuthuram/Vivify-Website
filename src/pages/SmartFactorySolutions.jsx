import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedBorder from "../components/AnimatedBorder/AnimatedBorder";
import smartFactorySolutionsHero from "../assets/images/smart-factory-solutions-hero-new.jpg";
import "./SmartFactorySolutions.css";

gsap.registerPlugin(ScrollTrigger);

const MODULES = [
  {
    id: "oee",
    label: "OEE Analytics",
    title: "Real-Time OEE Analytics",
    desc: "Live equipment dashboards tracking Overall Equipment Effectiveness (Availability, Performance, Quality) with automated downtime logging.",
    stats: [{ val: "87%", lbl: "Avg OEE" }, { val: "-35%", lbl: "Downtime" }],
    color: "#22d3ee",
    image: "/images/smart-factory-solutions.jpg"
  },
  {
    id: "predict",
    label: "Predictive AI",
    title: "AI Predictive Maintenance",
    desc: "Wireless IIoT vibration and temperature sensors feeding ML models to detect bearing wear and motor overheating before failures occur.",
    stats: [{ val: "14 days", lbl: "Early Warning" }, { val: "92%", lbl: "Accuracy" }],
    color: "#a78bfa",
    image: "/images/smart-factory-card.jpg"
  },
  {
    id: "edge",
    label: "Edge & Historian",
    title: "Edge Gateway & Historian",
    desc: "High-throughput industrial edge computing logging millions of tag parameters per second to secure cloud and local time-series databases.",
    stats: [{ val: "1M+", lbl: "Tags/sec" }, { val: "99.9%", lbl: "Data Integrity" }],
    color: "#34d399",
    image: "/images/smart-factory-ecosystem.png"
  },
  {
    id: "mes",
    label: "Digital Twin",
    title: "Digital Twin & MES",
    desc: "Full factory Digital Twin mapping physical shop floors to Manufacturing Execution Systems for batch scheduling and paperless tracking.",
    stats: [{ val: "+22%", lbl: "Plant OEE" }, { val: "100%", lbl: "Traceability" }],
    color: "#fb923c",
    image: "/images/automation-card.jpg"
  }
];

const METRICS = [
  { value: "-35%", label: "Unplanned Downtime" },
  { value: "+22%", label: "Overall OEE" },
  { value: "4.0", label: "Industry Ready" }
];

const BENEFITS = [
  { title: "Complete Visibility", desc: "View live machine states from any browser", image: "/images/smart-factory-solutions.jpg" },
  { title: "Zero Breakdowns", desc: "AI detects anomalies days before failure", image: "/images/smart-factory-card.jpg" },
  { title: "Paperless Tracking", desc: "Automated serial number logging with telemetry", image: "/images/smart-factory-ecosystem.png" },
  { title: "Energy Efficiency", desc: "Track peak loads and auto-shutdown idling machines", image: "/images/automation-card.jpg" }
];

export default function SmartFactorySolutions() {
  const containerRef = useRef(null);
  const [active, setActive] = useState("oee");
  const activeModule = MODULES.find(m => m.id === active);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animation
      gsap.fromTo(".sf-hero__badge",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );

      gsap.fromTo(".sf-hero__title",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power3.out" }
      );

      gsap.fromTo(".sf-hero__subtitle",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: "power3.out" }
      );

      gsap.fromTo(".sf-hero__metric",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, delay: 0.6, ease: "power3.out" }
      );

      // Dashboard cards animation
      gsap.fromTo(".sf-dashboard-card",
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".sf-dashboard-grid",
            start: "top 80%"
          }
        }
      );

      // Data flow animation
      gsap.fromTo(".sf-data-flow",
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: ".sf-data-flow",
            start: "top 80%"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="sf-page">
      {/* Hero Section with Dashboard Theme */}
      <section className="sf-hero">
        <div className="sf-hero__bg" style={{ backgroundImage: `url(${smartFactorySolutionsHero})` }}>
          <div className="sf-hero__grid" />
          <div className="sf-hero__circuit" />
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="sf-hero__data-point"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.2
              }}
              style={{
                left: `${10 + i * 11}%`,
                top: `${15 + (i % 4) * 20}%`
              }}
            />
          ))}
        </div>

        <div className="sf-hero__content">
          <motion.div
            className="sf-hero__badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            Smart Factory Solutions
          </motion.div>

          <h1 className="sf-hero__title">
            Connected <span className="sf-hero__accent">Industry 4.0</span><br/>
            Ecosystems
          </h1>

          <p className="sf-hero__subtitle">
            Transform traditional shop floors into intelligent, data-driven smart factories with IIoT gateways, predictive maintenance AI, and unified SCADA/MES dashboards
          </p>
        </div>
      </section>

      {/* Dashboard Section */}
      <section className="sf-dashboard-section">
        <div className="sf-dashboard__container">
          <motion.div
            className="sf-dashboard__header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="sf-dashboard__title">
              Technology <span className="sf-dashboard__accent">Modules</span>
            </h2>
            <p className="sf-dashboard__subtitle">
              Four core IIoT technology modules for smart factory transformation
            </p>
          </motion.div>

          <div className="sf-dashboard-grid">
            {MODULES.map((module, i) => (
              <motion.div
                key={module.id}
                className={`sf-dashboard-card ${active === module.id ? "sf-dashboard-card--active" : ""}`}
                style={{ '--module-color': module.color }}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                onClick={() => setActive(module.id)}
              >
                <AnimatedBorder variant="flow-dual" speed="3s" color1={module.color} color2="#2563eb" color3="#38bdf8">
                  <div className="sf-dashboard-card__inner">
                    <div className="sf-dashboard-card__scan-line" />
                    <div className="sf-dashboard-card__scan-glow" />
                    <div className="sf-dashboard-card__particles">
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className="sf-dashboard-card__particle" style={{ '--delay': `${i * 0.2}s` }} />
                      ))}
                    </div>
                    <div className="sf-dashboard-card__hologram" />
                    <img src={module.image} alt={module.label} className="sf-dashboard-card__icon" />
                    <h3 className="sf-dashboard-card__title">{module.label}</h3>
                    <p className="sf-dashboard-card__desc">{module.title}</p>
                    <div className="sf-dashboard-card__stats">
                      {module.stats.map((stat, j) => (
                        <div key={j} className="sf-dashboard-card__stat">
                          <span className="sf-dashboard-card__stat-value">{stat.val}</span>
                          <span className="sf-dashboard-card__stat-label">{stat.lbl}</span>
                        </div>
                      ))}
                    </div>
                    <div 
                      className="sf-dashboard-card__glow"
                      style={{ background: module.color }}
                    />
                  </div>
                </AnimatedBorder>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Active Module Detail Section */}
      <section className="sf-detail-section">
        <div className="sf-detail__container">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="sf-detail-panel"
              style={{ '--module-color': activeModule.color }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <div className="sf-detail__split">
                <div className="sf-detail__image-wrapper">
                  <img src={activeModule.image} alt={activeModule.title} className="sf-detail__image" />
                </div>
                <div className="sf-detail__content">
                  <h3 className="sf-detail__title">{activeModule.title}</h3>
                  <p className="sf-detail__desc">{activeModule.desc}</p>
                  <div className="sf-detail__stats">
                    {activeModule.stats.map((stat, i) => (
                      <div key={i} className="sf-detail__stat">
                        <span className="sf-detail__stat-value">{stat.val}</span>
                        <span className="sf-detail__stat-label">{stat.lbl}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="sf-detail__status">
                  <span className="sf-detail__status-dot" />
                  <span className="sf-detail__status-text">LIVE · CONNECTED</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="sf-benefits-section">
        <div className="sf-benefits__container">
          <div className="sf-benefits__split">
            <motion.div
              className="sf-benefits__content"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="sf-benefits__title">
                Strategic <span className="sf-benefits__accent">Impact</span>
              </h2>
              <p className="sf-benefits__subtitle">
                Transform your plant into a smart factory
              </p>
              <div className="sf-benefits__description">
                <p>Our smart factory solutions deliver measurable business outcomes through data-driven decision making and real-time operational visibility.</p>
                <p>By implementing IIoT technologies across your production lines, you can achieve significant improvements in efficiency, quality, and sustainability.</p>
                <p>From predictive maintenance to digital twin simulations, our comprehensive platform enables continuous improvement and competitive advantage.</p>
              </div>
            </motion.div>

            <div className="sf-benefits__cards">
              {BENEFITS.map((benefit, i) => (
                <motion.div
                  key={i}
                  className="sf-benefit-card"
                  style={{ '--benefit-color': i % 2 === 0 ? '#22d3ee' : '#a78bfa' }}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                >
                  <div className="sf-benefit-card__image-wrapper">
                    <img src={benefit.image} alt={benefit.title} className="sf-benefit-card__image" />
                  </div>
                  <div className="sf-benefit-card__content">
                    <h4 className="sf-benefit-card__title">{benefit.title}</h4>
                    <div className="sf-benefit-card__expanded">
                      <p className="sf-benefit-card__desc">{benefit.desc}</p>
                      <div className="sf-benefit-card__metrics">
                        <div className="sf-benefit-card__metric">
                          <span className="sf-benefit-card__metric-value">+{25 + i * 10}%</span>
                          <span className="sf-benefit-card__metric-label">Efficiency</span>
                        </div>
                        <div className="sf-benefit-card__metric">
                          <span className="sf-benefit-card__metric-value">{15 - i * 2}hrs</span>
                          <span className="sf-benefit-card__metric-label">Saved/Day</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="sf-cta-section">
        <div className="sf-cta__bg">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="sf-cta__pulse"
              animate={{
                scale: [1, 1.5, 1],
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

        <div className="sf-cta__container">
          <motion.div
            className="sf-cta__content"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="sf-cta__title">
              Transform Your Plant Into a Smart Factory
            </h2>
            <p className="sf-cta__subtitle">
              IIoT connectivity, predictive maintenance, and digital twins — from concept to live deployment
            </p>
            <motion.button
              className="sf-cta__button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => smoothScroll("/contact")}
            >
              <span>Build Your Smart Factory</span>
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
