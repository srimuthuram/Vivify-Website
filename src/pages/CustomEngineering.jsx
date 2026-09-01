import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedBorder from "../components/AnimatedBorder/AnimatedBorder";
import customEngineeringHero from "../assets/images/custom-engineering-hero.jpg";
import "./CustomEngineering.css";

gsap.registerPlugin(ScrollTrigger);

const PHASES = [
  { step: "01", title: "Feasibility & CAD Modeling", desc: "Kinematic simulations, finite element analysis (FEA), and mechanical load verification", color: "#3b82f6" },
  { step: "02", title: "Custom PCB & Embedded Design", desc: "Design of specialised electronic controller boards, microcontrollers, and sensor interfaces", color: "#8b5cf6" },
  { step: "03", title: "Prototyping & Rig Fabrication", desc: "In-house CNC machining, 3D printing, structural framing, and wiring assembly", color: "#10b981" },
  { step: "04", title: "HIL Testing & Deployment", desc: "Hardware-in-the-loop stress testing, software validation, and site commissioning", color: "#f59e0b" }
];

const BENEFITS = [
  { title: "Zero Compromise", desc: "Designed strictly around your precise physical constraints and cycle times", color: "#3b82f6", image: "/images/custom-engineering.jpg", content: "Tailored solutions that fit your exact specifications without forcing workarounds or compromises on quality or performance." },
  { title: "Proprietary Advantage", desc: "Own custom patents and hardware designs that competitors cannot buy off the shelf", color: "#8b5cf6", image: "/images/custom-engineering-card.jpg", content: "Full intellectual property ownership gives you exclusive market advantage with unique innovations that cannot be replicated." },
  { title: "Seamless Integration", desc: "Connects directly into existing plant ERPs, SCADA, or legacy control panels", color: "#10b981", image: "/images/industrial-automation.jpg", content: "Plug-and-play compatibility with your current infrastructure eliminates costly retrofits and minimizes implementation downtime." },
  { title: "Complete Documentation", desc: "Full engineering schematics, bill of materials (BOM), and operator manuals", color: "#f59e0b", image: "/images/software2.jpg", content: "Comprehensive technical documentation including CAD files, electrical schematics, and maintenance guides ensures long-term sustainability." }
];

const SPECS = ["100% Client IP Ownership", "Full Mechanical & Electrical CAD", "Custom Embedded Controllers"];

export default function CustomEngineering() {
  const containerRef = useRef(null);
  const blueprintRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: blueprintRef,
    offset: ["start start", "end end"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animation
      gsap.fromTo(".ce-hero__badge",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );

      gsap.fromTo(".ce-hero__title",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power3.out" }
      );

      gsap.fromTo(".ce-hero__subtitle",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: "power3.out" }
      );

      gsap.fromTo(".ce-hero__stat",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, delay: 0.6, ease: "power3.out" }
      );

      // Blueprint grid animation
      gsap.fromTo(".ce-blueprint-line",
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".ce-blueprint-section",
            start: "top 80%"
          }
        }
      );

      // Phase cards animation
      gsap.fromTo(".ce-phase-card",
        { opacity: 0, y: 30, rotateX: 15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".ce-phases-section",
            start: "top 80%"
          }
        }
      );

      // Benefit cards animation
      gsap.fromTo(".ce-benefit-card",
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".ce-benefits-section",
            start: "top 80%"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="ce-page">
      {/* Hero Section */}
      <section className="ce-hero">
        <div className="ce-hero__bg" style={{ backgroundImage: `url(${customEngineeringHero})` }}>
          <div className="ce-hero__blueprint" />
          <div className="ce-hero__grid" />
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="ce-hero__measurement"
              animate={{
                scale: [1, 1.2, 1],
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

        <div className="ce-hero__content">
          <motion.div
            className="ce-hero__badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            Custom Engineering
          </motion.div>

          <h1 className="ce-hero__title">
            Bespoke <span className="ce-hero__accent">R&D</span><br/>
            Hardware Prototyping
          </h1>

          <p className="ce-hero__subtitle">
            When off-the-shelf equipment fails unique industrial challenges, our team steps in — designing, prototyping, and building specialised machinery, custom PCB embedded electronics, and proprietary testing rigs
          </p>
        </div>
      </section>

      {/* Blueprint Section */}
      <section className="ce-blueprint-section" ref={blueprintRef}>
        <div className="ce-blueprint__container">
          <motion.div
            className="ce-blueprint__header"
            style={{ scale }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="ce-blueprint__title">
              Engineering <span className="ce-blueprint__accent">Lifecycle</span>
            </h2>
            <p className="ce-blueprint__subtitle">
              From concept to commission
            </p>
          </motion.div>

          <div className="ce-blueprint__grid">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="ce-blueprint-line" />
            ))}
          </div>

          <div className="ce-phases-grid">
            {PHASES.map((phase, i) => (
              <motion.div
                key={i}
                className="ce-phase-card"
                style={{ '--phase-color': phase.color }}
                initial={{ opacity: 0, y: 30, rotateX: 15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <AnimatedBorder variant={i % 3 === 0 ? "flow-rainbow" : i % 3 === 1 ? "flow-corner" : "flow-dual"} speed={`${3 + i * 0.4}s`} color1={phase.color} color2="#ec4899" color3="#8b5cf6">
                  <div className="ce-phase-card__inner">
                    <motion.div
                      className="ce-phase-card__step"
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "linear" }}
                      style={{ borderColor: phase.color }}
                    >
                      {phase.step}
                    </motion.div>
                    <h3 className="ce-phase-card__title">{phase.title}</h3>
                    <p className="ce-phase-card__desc">{phase.desc}</p>
                    <div 
                      className="ce-phase-card__glow"
                      style={{ background: phase.color }}
                    />
                  </div>
                </AnimatedBorder>
              </motion.div>
            ))}
          </div>

          <div className="ce-specs-row">
            {SPECS.map((spec, i) => (
              <motion.div
                key={i}
                className="ce-spec"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {spec}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="ce-benefits-section">
        <div className="ce-benefits__container">
          <motion.div
            className="ce-benefits__header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="ce-benefits__title">
              Key <span className="ce-benefits__accent">Benefits</span>
            </h2>
            <p className="ce-benefits__subtitle">
              Why choose custom engineering
            </p>
          </motion.div>

          <div className="ce-benefits-grid">
            {BENEFITS.map((benefit, i) => (
              <motion.div
                key={i}
                className="ce-benefit-card"
                style={{ '--benefit-color': benefit.color }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <AnimatedBorder variant="flow" speed={`${3 + i * 0.5}s`} color1={benefit.color} color2={benefit.color} color3={benefit.color}>
                  <div className="ce-benefit-card__inner">
                    <img src={benefit.image} alt={benefit.title} className="ce-benefit-card__icon" />
                    <h4 className="ce-benefit-card__title">{benefit.title}</h4>
                    <div className="ce-benefit-card__expanded">
                      <p className="ce-benefit-card__desc">{benefit.desc}</p>
                      <p className="ce-benefit-card__content">{benefit.content}</p>
                    </div>
                    <div 
                      className="ce-benefit-card__glow"
                      style={{ background: benefit.color }}
                    />
                  </div>
                </AnimatedBorder>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="ce-case-section">
        <div className="ce-case__container">
          <motion.div
            className="ce-case-card"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="ce-case-label">Featured R&D Build</div>
            <h3 className="ce-case-title">High-Speed Micro-Part Sorter</h3>
            <p className="ce-case-desc">
              Engineered a custom high-speed optical sorting machine for miniature medical pins using custom pneumatic ejectors and ultra-fast line-scan vision
            </p>
            <div className="ce-case-stats">
              <div>
                <span className="ce-case-num">1,200</span>
                <span className="ce-case-slabel">Parts / Minute Sorted</span>
              </div>
              <div>
                <span className="ce-case-num">±5 µm</span>
                <span className="ce-case-slabel">Dimensional Tolerance</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="ce-cta-section">
        <div className="ce-cta__bg">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="ce-cta__gear"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.5
              }}
              style={{
                left: `${10 + i * 16}%`,
                top: `${Math.random() * 100}%`
              }}
            >
              ⚙️
            </motion.div>
          ))}
        </div>

        <div className="ce-cta__container">
          <motion.div
            className="ce-cta__content"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="ce-cta__title">
              Have a Unique Engineering Challenge?
            </h2>
            <p className="ce-cta__subtitle">
              Custom machine prototype or proprietary R&D — we handle the full lifecycle
            </p>
            <motion.button
              className="ce-cta__button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => smoothScroll("/contact")}
            >
              Discuss Custom Engineering
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
