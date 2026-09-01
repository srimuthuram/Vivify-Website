import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedBorder from "../components/AnimatedBorder/AnimatedBorder";
import automationSolutionsHero from "../assets/images/automation-solutions-hero-v2.jpg";
import "./AutomationSolutions.css";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { num: "01", title: "Multi-Vendor PLC Engineering", desc: "Custom ladder logic, structured text, and function block programming for Siemens, Allen-Bradley, Schneider, and Mitsubishi controllers.", color: "#38bdf8", image: "/images/automation-plc-engineering.jpg" },
  { num: "02", title: "SCADA & Telemetry Systems", desc: "Interactive SCADA control panels with historical trending, alarm management, SQL logging, and web-based remote telemetry.", color: "#818cf8", image: "/images/automation-scada-systems.jpg" },
  { num: "03", title: "Precision Control Panels", desc: "UL/CE certified panel builds with surge protection, VFD drive integration, safety relays, and organised wire trunking.", color: "#34d399", image: "/images/automation-control-panels.jpg" },
  { num: "04", title: "Closed-Loop Process Tuning", desc: "PID tuning and flow/pressure sensor calibration ensuring consistent liquid batching, furnace heating, and chemical mixing.", color: "#fb923c", image: "/images/automation-process-tuning.jpg" }
];

const ADVANTAGES = [
  { title: "Repeatable Quality", desc: "Tight closed-loop PID control eliminates batch variation", color: "#38bdf8", image: "/images/automation-solutions.jpg" },
  { title: "Machine Safety", desc: "Dedicated safety PLCs for emergency stops and light curtains", color: "#818cf8", image: "/images/mcb.jpg" },
  { title: "Clear Diagnostics", desc: "Intuitive HMI screens display graphical diagnostics and alarms", color: "#34d399", image: "/images/industrial-automation.jpg" },
  { title: "Energy Savings", desc: "Variable frequency drives optimise pump and motor consumption", color: "#fb923c", image: "/images/automation-card.jpg" }
];

const SPECS = ["IEC 61131-3 Standard Code", "Redundant Industrial Ring Networks", "SIL-3 Safety Certification", "FAT Tested Before Installation"];

export default function AutomationSolutions() {
  const containerRef = useRef(null);
  const flowRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: flowRef,
    offset: ["start start", "end end"]
  });

  const progress = useTransform(scrollYProgress, [0, 1], [0, 100]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animation
      gsap.fromTo(".as-hero__badge",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );

      gsap.fromTo(".as-hero__title",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power3.out" }
      );

      gsap.fromTo(".as-hero__subtitle",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: "power3.out" }
      );

      gsap.fromTo(".as-hero__tag",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, delay: 0.6, ease: "power3.out" }
      );

      // Process flow line animation - fills from step 1 to 4 as you scroll
      gsap.fromTo(".as-flow-line-fill",
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".as-flow-section",
            start: "top 60%",
            end: "bottom 40%",
            scrub: true
          }
        }
      );

      // Step glow animation - each step glows when it enters viewport
      STEPS.forEach((_, i) => {
        ScrollTrigger.create({
          trigger: `#as-flow-step-${i}`,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () => {
            gsap.to(`#as-flow-step-${i} .as-flow-step__dot`, {
              borderColor: "var(--step-color)",
              boxShadow: "0 0 30px var(--step-color), 0 0 60px var(--step-color)",
              duration: 0.3
            });
          },
          onLeave: () => {
            gsap.to(`#as-flow-step-${i} .as-flow-step__dot`, {
              borderColor: "rgba(255, 255, 255, 0.3)",
              boxShadow: "0 0 20px rgba(56, 189, 248, 0.3)",
              duration: 0.3
            });
          },
          onEnterBack: () => {
            gsap.to(`#as-flow-step-${i} .as-flow-step__dot`, {
              borderColor: "var(--step-color)",
              boxShadow: "0 0 30px var(--step-color), 0 0 60px var(--step-color)",
              duration: 0.3
            });
          },
          onLeaveBack: () => {
            gsap.to(`#as-flow-step-${i} .as-flow-step__dot`, {
              borderColor: "rgba(255, 255, 255, 0.3)",
              boxShadow: "0 0 20px rgba(56, 189, 248, 0.3)",
              duration: 0.3
            });
          }
        });
      });

      // Step cards animation
      gsap.fromTo(".as-flow-step",
        { opacity: 0, x: -50, scale: 0.9 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".as-flow-section",
            start: "top 60%"
          }
        }
      );

      // Advantage cards animation
      gsap.fromTo(".as-advantage-card",
        { opacity: 0, y: 30, rotateX: 15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".as-advantages-section",
            start: "top 80%"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="as-page">
      {/* Hero Section */}
      <section className="as-hero">
        <div className="as-hero__bg" style={{ backgroundImage: `url(${automationSolutionsHero})` }}>
          <div className="as-hero__grid" />
          <div className="as-hero__circuit" />
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="as-hero__flow-dot"
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
                left: `${10 + i * 16}%`,
                top: `${20 + (i % 3) * 25}%`
              }}
            />
          ))}
        </div>

        <div className="as-hero__content">
          <motion.div
            className="as-hero__badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            Automation Solutions
          </motion.div>

          <h1 className="as-hero__title">
            Industrial Control<br/>
            <span className="as-hero__accent">Systems</span>
          </h1>

          <p className="as-hero__subtitle">
            We engineer robust automation solutions that streamline complex industrial processes — from custom PLC logic and SCADA supervisory control to control panel fabrication and VFD drive tuning
          </p>

          <div className="as-hero__tags">
            {SPECS.map((spec, i) => (
              <motion.div
                key={i}
                className="as-hero__tag"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
              >
                {spec}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Flow Section */}
      <section className="as-flow-section" ref={flowRef}>
        <div className="as-flow__container">
          <motion.div
            className="as-flow__header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="as-flow__title">
              Process <span className="as-flow__accent">Flow</span>
            </h2>
            <p className="as-flow__subtitle">
              Four pillars of automation excellence
            </p>
          </motion.div>

          <div className="as-flow__layout">
            <div className="as-flow-line">
              <div className="as-flow-line-fill" />
            </div>

            {STEPS.map((step, i) => (
              <motion.div
                key={i}
                className="as-flow-step"
                id={`as-flow-step-${i}`}
                style={{ '--step-color': step.color }}
                initial={{ opacity: 0, x: -50, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <div className="as-flow-step__dot">
                  <span className="as-flow-step__num">
                    {step.num}
                  </span>
                </div>
                <AnimatedBorder variant={i % 3 === 0 ? "flow-pulse" : i % 3 === 1 ? "flow-dual" : "flow-shimmer"} speed={`${2.5 + i * 0.4}s`} color1={step.color} color2="#f97316" color3="#eab308">
                  <div className="as-flow-step__card" style={{ backgroundImage: `url(${step.image})` }}>
                    <h3 className="as-flow-step__title">{step.title}</h3>
                    <p className="as-flow-step__desc">{step.desc}</p>
                    <div 
                      className="as-flow-step__glow"
                      style={{ background: step.color }}
                    />
                  </div>
                </AnimatedBorder>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="as-advantages-section">
        <div className="as-advantages__container">
          <motion.div
            className="as-advantages__header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="as-advantages__title">
              Key <span className="as-advantages__accent">Advantages</span>
            </h2>
            <p className="as-advantages__subtitle">
              System benefits that drive operational excellence
            </p>
          </motion.div>

          <div className="as-advantages-grid">
            {ADVANTAGES.map((advantage, i) => (
              <motion.div
                key={i}
                className="as-advantage-card"
                style={{ '--advantage-color': advantage.color }}
                initial={{ opacity: 0, y: 30, rotateX: 15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <AnimatedBorder variant="flow" speed={`${3 + i * 0.5}s`} color1={advantage.color} color2={advantage.color} color3={advantage.color}>
                  <div className="as-advantage-card__inner">
                    <img src={advantage.image} alt={advantage.title} className="as-advantage-card__icon" />
                    <h4 className="as-advantage-card__title">{advantage.title}</h4>
                    <p className="as-advantage-card__desc">{advantage.desc}</p>
                    <div 
                      className="as-advantage-card__glow"
                      style={{ background: advantage.color }}
                    />
                  </div>
                </AnimatedBorder>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="as-case-section">
        <div className="as-case__container">
          <motion.div
            className="as-case-card"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="as-case-label">Featured Automation Project</div>
            <h3 className="as-case-title">Water Treatment Plant SCADA</h3>
            <p className="as-case-desc">
              Automated a regional water treatment facility with 12 remote PLC outstations linked via fiber ring network to a central SCADA dashboard
            </p>
            <div className="as-case-stats">
              <div>
                <span className="as-case-num">100%</span>
                <span className="as-case-slabel">Automated Dosing Accuracy</span>
              </div>
              <div>
                <span className="as-case-num">24/7</span>
                <span className="as-case-slabel">Unattended Operation</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="as-cta-section">
        <div className="as-cta__container">
          <motion.div
            className="as-cta__content"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="as-cta__title">
              Optimise Your Factory Control
            </h2>
            <p className="as-cta__subtitle">
              Automate a process line or upgrade existing SCADA control panels
            </p>
            <motion.button
              className="as-cta__button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => smoothScroll("/contact")}
            >
              <span>Optimize Factory Control</span>
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
