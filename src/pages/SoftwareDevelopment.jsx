import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform } from "framer-motion";
import softwareImage from "../assets/images/software.jpg";
import AnimatedBorder from "../components/AnimatedBorder/AnimatedBorder";
import RollingList from "../components/RollingList/RollingList";
import { smoothScroll } from "../utils/smoothScroll";
import "./SoftwareDevelopment.css";

gsap.registerPlugin(ScrollTrigger);

const TECH_STACK = [
  { name: "React", color: "#61DAFB", image: "/images/software.jpg" },
  { name: "Node.js", color: "#339933", image: "/images/software2.jpg" },
  { name: "Python", color: "#3776AB", image: "/images/IT.jpg" },
  { name: "AWS", color: "#FF9900", image: "/images/data-centre-solutions.jpg" },
  { name: "Docker", color: "#2496ED", image: "/images/datacenter.jpg" },
  { name: "PostgreSQL", color: "#336791", image: "/images/it2.jpg" }
];

const PROCESS_STEPS = [
  { 
    step: "01", 
    title: "Discovery & Planning", 
    desc: "Understanding scope, wireframing, and specifying requirements."
  },
  { 
    step: "02", 
    title: "UI/UX Architecture", 
    desc: "Crafting beautiful high-fidelity prototypes and layouts."
  },
  { 
    step: "03", 
    title: "Agile Development", 
    desc: "Writing clean, modular, test-driven codebase."
  },
  { 
    step: "04", 
    title: "Rigorous QA", 
    desc: "Unit testing, system integration tests, and security audits."
  },
  { 
    step: "05", 
    title: "Deploy & Support", 
    desc: "CI/CD automated deployment and proactive maintenance."
  }
];

const FEATURES = [
  { title: "Cloud-Native", desc: "Built for scalability on AWS, Azure, and GCP", image: "/images/sd-cloud.jpg" },
  { title: "API-First", desc: "RESTful and GraphQL APIs for seamless integration", image: "/images/sd-api.jpg" },
  { title: "Real-Time", desc: "WebSocket and WebRTC for live data streaming", image: "/images/sd-realtime.jpg" },
  { title: "Secure", desc: "Enterprise-grade security with SOC 2 compliance", image: "/images/sd-security.jpg" }
];

export default function SoftwareDevelopment() {
  const heroRef = useRef(null);
  const containerRef = useRef(null);
  const [activeTech, setActiveTech] = useState(null);
  const { scrollYProgress } = useScroll();
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.95]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Typewriter effect for hero
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.fromTo(".sd-hero__code-line",
        { 
          opacity: 0, 
          x: -50,
          width: 0
        },
        { 
          opacity: 1, 
          x: 0,
          width: "100%",
          duration: 0.8,
          stagger: 0.15
        },
        0.3
      )
      .fromTo(".sd-hero__cursor",
        { opacity: 0 },
        { opacity: 1, duration: 0.3 },
        0.3
      );

      // Scroll-linked process steps
      gsap.utils.toArray(".sd-process__step").forEach((step, i) => {
        gsap.fromTo(step,
          { 
            opacity: 0, 
            x: -100,
            rotateY: 45
          },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: step,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Tech stack floating animation
      gsap.utils.toArray(".sd-tech__item").forEach((item, i) => {
        gsap.to(item, {
          y: -15 - Math.random() * 10,
          duration: 2 + Math.random(),
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: i * 0.2
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="sd-page">
      {/* Hero with Code Editor Theme */}
      <motion.section 
        className="sd-hero"
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <div className="sd-hero__bg">
          <div className="sd-hero__grid" />
          <div className="sd-hero__gradient" />
        </div>

        <div className="sd-hero__content">
          <motion.div 
            className="sd-hero__editor"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="sd-hero__editor-header">
              <div className="sd-hero__editor-dots">
                <span className="sd-hero__dot sd-hero__dot--red" />
                <span className="sd-hero__dot sd-hero__dot--yellow" />
                <span className="sd-hero__dot sd-hero__dot--green" />
              </div>
              <span className="sd-hero__filename">SoftwareDevelopment.jsx</span>
            </div>
            
            <div className="sd-hero__editor-body">
              <div className="sd-hero__code-line sd-hero__code-line--1">
                <span className="sd-hero__keyword">const</span>
                <span className="sd-hero__function">buildSolution</span>
                <span className="sd-hero__operator">=</span>
                <span className="sd-hero__punctuation">(</span>
                <span className="sd-hero__param">vision</span>
                <span className="sd-hero__punctuation">)</span>
                <span className="sd-hero__operator">=&gt;</span>
                <span className="sd-hero__punctuation">{"{"}</span>
              </div>
              <div className="sd-hero__code-line sd-hero__code-line--2">
                <span className="sd-hero__keyword">return</span>
                <span className="sd-hero__punctuation">{"{"}</span>
              </div>
              <div className="sd-hero__code-line sd-hero__code-line--3">
                <span className="sd-hero__indent"></span>
                <span className="sd-hero__keyword">new</span>
                <span className="sd-hero__class">EnterpriseSolution</span>
                <span className="sd-hero__punctuation">(</span>
                <span className="sd-hero__param">vision</span>
                <span className="sd-hero__punctuation">);</span>
              </div>
              <div className="sd-hero__code-line sd-hero__code-line--4">
                <span className="sd-hero__punctuation">{"}"};</span>
              </div>
              <div className="sd-hero__cursor" />
            </div>
          </motion.div>

          <motion.div
            className="sd-hero__text"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <h1 className="sd-hero__title">
              High-Performance<br/>
              <span className="sd-hero__accent">Digital Engineering</span>
            </h1>
            <p className="sd-hero__subtitle">
              We architect and build tailored, secure, and highly scalable digital solutions
            </p>

            <div className="sd-hero__tech">
              {TECH_STACK.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  className="sd-tech__item"
                  style={{ '--tech-color': tech.color }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  onMouseEnter={() => setActiveTech(tech.name)}
                  onMouseLeave={() => setActiveTech(null)}
                >
                  <img src={tech.image} alt={tech.name} className="sd-tech__icon" />
                  <span className="sd-tech__name">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.img
          src={softwareImage}
          alt="Software Development"
          className="sd-hero__image"
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 1.5 }}
        />
      </motion.section>

      {/* Features Grid with Animated Borders */}
      <section className="sd-features-section">
        <div className="sd-features__container">
          <motion.div
            className="sd-features__header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="sd-features__title">
              Built for <span className="sd-features__accent">Scale</span>
            </h2>
            <p className="sd-features__subtitle">
              Enterprise-grade features that power modern applications
            </p>
          </motion.div>

          <div className="sd-features-grid">
            {FEATURES.map((feature, i) => {
              const borderVariants = ["flow-dual", "flow", "flow-pulse", "flow-shimmer"];
              const colors = [
                { c1: "#38bdf8", c2: "#818cf8", c3: "#c084fc" },
                { c1: "#34d399", c2: "#059669", c3: "#10b981" },
                { c1: "#f43f5e", c2: "#fb7185", c3: "#e11d48" },
                { c1: "#a855f7", c2: "#ec4899", c3: "#8b5cf6" }
              ];
              return (
                <motion.div
                  key={i}
                  className="sd-feature-card"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <AnimatedBorder 
                    variant={borderVariants[i % borderVariants.length]} 
                    speed="2.5s"
                    color1={colors[i].c1}
                    color2={colors[i].c2}
                    color3={colors[i].c3}
                  >
                    <div className="sd-feature-card__inner">
                      <div className="sd-feature-card__img-wrap">
                        <img src={feature.image} alt={feature.title} className="sd-feature-card__image" />
                      </div>
                      <h3 className="sd-feature-card__title">{feature.title}</h3>
                      <p className="sd-feature-card__desc">{feature.desc}</p>
                    </div>
                  </AnimatedBorder>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Rolling Process List */}
      <section className="sd-process-section">
        <div className="sd-process__container">
          <motion.div
            className="sd-process__header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="sd-process__title">
              Development <span className="sd-process__accent">Process</span>
            </h2>
            <p className="sd-process__subtitle">
              From concept to deployment, we follow industry best practices
            </p>
          </motion.div>

          <RollingList />
        </div>
      </section>

      {/* Case Study with Parallax */}
      <section className="sd-case-section">
        <div className="sd-case__container">
          <div className="sd-case__grid">
            <motion.div
              className="sd-case__content"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="sd-case__tag">Featured Case Study</span>
              <h2 className="sd-case__title">
                Smart Logistics & ERP Platform
              </h2>
              <p className="sd-case__desc">
                Developed a unified fleet dispatch and inventory ERP platform for a leading national logistics firm, integrating IoT tracking nodes and automated billing modules.
              </p>
              
              <div className="sd-case__stats">
                <div className="sd-case__stat">
                  <span className="sd-case__stat-value">+40%</span>
                  <span className="sd-case__stat-label">Operational Speed</span>
                </div>
                <div className="sd-case__stat">
                  <span className="sd-case__stat-value">-25%</span>
                  <span className="sd-case__stat-label">Fuel Idle Time</span>
                </div>
              </div>

              <motion.button
                className="sd-case__cta"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => smoothScroll("/contact")}
              >
                Start Your Project →
              </motion.button>
            </motion.div>

            <motion.div
              className="sd-case__visual"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <AnimatedBorder variant="gradient" speed="6s">
                <div className="sd-case__card">
                  <div className="sd-case__code-preview">
                    <span className="sd-case__code-line">
                      <span className="sd-case__comment">// Real-time fleet tracking</span>
                    </span>
                    <span className="sd-case__code-line">
                      <span className="sd-case__keyword">const</span> fleet = <span className="sd-case__keyword">await</span> track();
                    </span>
                    <span className="sd-case__code-line">
                      fleet.<span className="sd-case__method">optimizeRoute</span>();
                    </span>
                    <span className="sd-case__code-line">
                      <span className="sd-case__keyword">return</span> efficiency;
                    </span>
                  </div>
                </div>
              </AnimatedBorder>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA with Glowing Effect */}
      <section className="sd-cta-section">
        <div className="sd-cta__bg">
          <motion.div
            className="sd-cta__glow"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>

        <div className="sd-cta__container">
          <motion.div
            className="sd-cta__content"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="sd-cta__title">
              Have a Software Project in Mind?
            </h2>
            <p className="sd-cta__subtitle">
              Let's collaborate to build something extraordinary
            </p>
            <motion.button
              className="sd-cta__button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => smoothScroll("/contact")}
            >
              <span>Start Your Project</span>
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
