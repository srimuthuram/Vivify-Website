import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import robotImage from "../assets/images/robot.jpg";
import siemensLogo from "../assets/images/logos/siemens.svg";
import rockwellLogo from "../assets/images/logos/rockwell.svg";
import schneiderLogo from "../assets/images/logos/schneider.svg";
import abbLogo from "../assets/images/logos/abb.svg";
import AnimatedBorder from "../components/AnimatedBorder/AnimatedBorder";
import { smoothScroll } from "../utils/smoothScroll";
import "./IndustrialAutomation.css";

gsap.registerPlugin(ScrollTrigger);

const VENDORS = [
  { 
    name: "Siemens TIA Portal", 
    type: "PLC & HMI Programming", 
    desc: "S7-1200, S7-1500, and WinCC SCADA system designs.", 
    color: "#00ffcc",
    icon: siemensLogo
  },
  { 
    name: "Rockwell Automation", 
    type: "Allen-Bradley Integration", 
    desc: "ControlLogix, CompactLogix, and FactoryTalk View automation.", 
    color: "#ff6600",
    icon: rockwellLogo
  },
  { 
    name: "Schneider Electric", 
    type: "Modicon & EcoStruxure", 
    desc: "PLC programming and advanced industrial networking solutions.", 
    color: "#00e5ff",
    icon: schneiderLogo
  },
  { 
    name: "ABB Solutions", 
    type: "DCS & System 800xA", 
    desc: "Distributed Control Systems integration for process control.", 
    color: "#ff0055",
    icon: abbLogo
  },
];



const SYSTEMS = [
  { name: "PLC Systems", desc: "Programmable logic controllers for automation", image: "/images/industrial-automation.jpg" },
  { name: "SCADA", desc: "Supervisory control and data acquisition", image: "/images/mcb.jpg" },
  { name: "HMI", desc: "Human-machine interface panels", image: "/images/software.jpg" },
  { name: "VFD", desc: "Variable frequency drives", image: "/images/automation-card.jpg" },
  { name: "Safety PLC", desc: "Safety instrumented systems", image: "/images/automation-solutions.jpg" },
  { name: "Industrial IoT", desc: "Connected factory solutions", image: "/images/smart-factory-solutions.jpg" }
];

export default function IndustrialAutomation() {
  const heroRef = useRef(null);
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax layers
      gsap.to(".ia-hero__layer-1", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: ".ia-hero",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      gsap.to(".ia-hero__layer-2", {
        yPercent: 50,
        ease: "none",
        scrollTrigger: {
          trigger: ".ia-hero",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });



      // Counter animation
      gsap.utils.toArray(".ia-counter").forEach(counter => {
        const target = parseFloat(counter.getAttribute("data-target"));
        gsap.to(counter, {
          innerHTML: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: counter,
            start: "top 80%"
          },
          snap: { innerHTML: 0.1 }
        });
      });


    }, containerRef);

    // Mouse tracking for 3D effect
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      mouseX.set(x);
      mouseY.set(y);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="ia-page">
      {/* Hero section */}
      <section 
        className="ia-hero"
        ref={heroRef}
      >
        <div className="ia-hero__layer-1">
          <div className="ia-hero__grid" />
        </div>
        <div className="ia-hero__layer-2">
          <motion.img
            src={robotImage}
            alt="Industrial Automation"
            className="ia-hero__image"
            style={{ x: mouseX, y: mouseY }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          />
        </div>

        <div className="ia-hero__content">
          <motion.div
            className="ia-hero__badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="ia-hero__badge-icon">⚙️</span>
            Industrial Automation
          </motion.div>
          
          <h1 className="ia-hero__title">
            Smarter<br/>
            <span className="ia-hero__accent">Instrumentation</span><br/>
            & Factory Control
          </h1>
          
          <p className="ia-hero__subtitle">
            State-of-the-art factory instrumentation, control systems, and machinery integration
          </p>


        </div>

        <motion.div
          className="ia-hero__scroll"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span>Scroll to explore</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M19 12l-7 7-7-7"/>
          </svg>
        </motion.div>
      </section>

      {/* Tech Ticker */}
      <div className="ia-ticker-section">
        <div className="ia-ticker-track">
          {[...VENDORS, ...VENDORS].map((vendor, i) => (
            <motion.div
              key={i}
              className="ia-ticker-item"
              style={{ borderColor: vendor.color }}
              animate={{ x: [0, -20] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <span className="ia-ticker-dot" style={{ background: vendor.color }} />
              <span className="ia-ticker-name">{vendor.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Vendor Cards with 3D Effect */}
      <section className="ia-vendors-section">
        <div className="ia-vendors__container">
          <motion.div
            className="ia-vendors__header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="ia-vendors__title">
              PLC & <span className="ia-vendors__accent">SCADA</span> Integrations
            </h2>
            <p className="ia-vendors__subtitle">
              Industry-standard platforms for reliable automation
            </p>
          </motion.div>

          <div className="ia-vendors-list">
            {VENDORS.map((vendor, i) => (
              <motion.div
                key={i}
                className="ia-vendor-row"
                style={{ 
                  '--vendor-color': vendor.color
                }}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="ia-vendor-row__icon">
                  <img src={vendor.icon} alt={vendor.name} className="ia-vendor-row__logo" />
                </div>
                <div className="ia-vendor-row__content">
                  <div className="ia-vendor-row__header">
                    <h3 className="ia-vendor-row__name">{vendor.name}</h3>
                    <span className="ia-vendor-row__type">{vendor.type}</span>
                  </div>
                  <p className="ia-vendor-row__desc">{vendor.desc}</p>
                </div>
                {i < VENDORS.length - 1 && <div className="ia-vendor-row__divider" />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Overview with Parallax Image */}
      <section className="ia-overview-section">
        <div className="ia-overview__container">
          <div className="ia-overview__grid">
            <motion.div
              className="ia-overview__content"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="ia-overview__tag">What It Is</span>
              <h2 className="ia-overview__title">
                The Engineering Bridge
              </h2>
              <p className="ia-overview__text">
                Industrial Automation is the engineering bridge between physical machinery and software brains.
                We design, build, and program the electrical panels and systems that run assembly lines, 
                control chemical mixtures, monitor critical utilities, and keep personnel safe.
              </p>
              <p className="ia-overview__text">
                Our panels comply with local electrical codes and international safety standards, 
                utilizing industrial-grade firewalls, redundant power, and optimized heat dissipation.
              </p>
            </motion.div>

            <motion.div
              className="ia-overview__visual"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <AnimatedBorder variant="flow-corner" speed="4s" color1="#f97316" color2="#ea580c">
                <div className="ia-overview__card">
                  <img 
                    src="/images/industrial-automation.jpg" 
                    alt="Automation Control Panel" 
                    className="ia-overview__image"
                  />
                  <div className="ia-overview__overlay">
                    <div className="ia-overview__stats">
                      <div>
                        <span className="ia-overview__stat-value">500+</span>
                        <span className="ia-overview__stat-label">Panels Built</span>
                      </div>
                      <div>
                        <span className="ia-overview__stat-value">15+</span>
                        <span className="ia-overview__stat-label">Years Experience</span>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedBorder>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA with Magnetic Effect */}
      <section className="ia-cta-section">
        <div className="ia-cta__bg">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="ia-cta__particle"
              animate={{
                y: [0, -100, 0],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>

        <div className="ia-cta__container">
          <motion.div
            className="ia-cta__content"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="ia-cta__title">
              Automate Your Process Line
            </h2>
            <p className="ia-cta__subtitle">
              Need to upgrade existing SCADA control panels or build from scratch?
            </p>
            <motion.button
              className="ia-cta__button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => smoothScroll("/contact")}
            >
              <span>Consult an Expert</span>
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
