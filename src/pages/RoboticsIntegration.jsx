import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useMotionValue, useSpring } from "framer-motion";
import robotImage from "../assets/images/robot 2.jpg";
import AnimatedBorder from "../components/AnimatedBorder/AnimatedBorder";
import { smoothScroll } from "../utils/smoothScroll";
import "./RoboticsIntegration.css";

gsap.registerPlugin(ScrollTrigger);

const APPLICATIONS = [
  {
    title: "Pick & Place / Sorting",
    desc: "High-speed delta robots sorting items from conveyor belts with camera indexing.",
    image: "/images/m25p8-robot-pick-and-place.avif",
    color: "#4ade80",
    size: "large"
  },
  {
    title: "Palletizing & Packaging",
    desc: "Heavy-payload robot systems stacking boxes, bags, or drums onto pallets efficiently.",
    image: "/images/ri-palletizing-packaging.jpg",
    color: "#34d399",
    size: "medium"
  },
  {
    title: "Robotic Welding",
    desc: "Precision MIG/TIG welding cells with coordinated positioners for robust joints.",
    image: "/images/ri-robotic-welding.jpg",
    color: "#22d3ee",
    size: "medium"
  },
  {
    title: "Machine Tending",
    desc: "Automated loading and unloading of CNC mills, lathes, and injection mold machines.",
    image: "/images/ri-machine-tending.jpg",
    color: "#a3e635",
    size: "medium"
  },
  {
    title: "Vision Inspection",
    desc: "3D smart cameras for real-time dimensional verification and defect rejection.",
    image: "/images/ri-vision-inspection.jpg",
    color: "#86efac",
    size: "medium"
  },
  {
    title: "Collaborative Cells",
    desc: "Safe human-robot workstations with force-torque collision stopping.",
    image: "/images/ri-collaborative-cells.jpg",
    color: "#6ee7b7",
    size: "medium"
  }
];

const PILLARS = [
  {
    title: "Robot Programming",
    text: "Fanuc (Karel/TP), ABB (RAPID), KUKA (KRL), UR (URScript). Precise kinematics, collision prevention, optimised cycle times.",
    img: "/images/robot-programming.jpg"
  },
  {
    title: "Vision Systems",
    text: "Cognex & Keyence 2D/3D cameras for robotic guidance, dimensional inspection, and high-speed sorting on moving conveyors.",
    img: "/images/vision-systems.jpg"
  },
  {
    title: "AI Integration",
    text: "Smart path planning for non-uniform items, predictive maintenance via torque analytics, self-learning warehouse adaptations.",
    img: "/images/robotics-solutions.jpg"
  }
];

const STATS = [
  { value: "0.05mm", label: "Repeatability" },
  { value: "6-DOF", label: "Axis Control" },
  { value: "3.5×", label: "Throughput" },
  { value: "24/7", label: "Operation" }
];

export default function RoboticsIntegration() {
  const heroRef = useRef(null);
  const containerRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 700 };
  const rotateX = useSpring(useMotionValue(0), springConfig);
  const rotateY = useSpring(useMotionValue(0), springConfig);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.fromTo(".ri-hero__element",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out"
        }
      );
    }, containerRef);

    // Mouse tracking for 3D effect
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
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
    <div ref={containerRef} className="ri-page">
      {/* Hero with 3D Elements */}
      <section 
        className="ri-hero"
        ref={heroRef}
      >
        <div className="ri-hero__bg">
          <div className="ri-hero__grid" />
          <div className="ri-hero__particles">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="ri-hero__particle"
                animate={{
                  y: [0, -100, 0],
                  opacity: [0.2, 0.6, 0.2]
                }}
                transition={{
                  duration: 4 + i * 0.2,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
              />
            ))}
          </div>
        </div>

        <motion.img
          src={robotImage}
          alt="Robotics Integration"
          className="ri-hero__image"
          initial={{ opacity: 0.4, scale: 1 }}
          animate={{ opacity: 0.4, scale: 1 }}
        />

        <div className="ri-hero__content">
          <motion.div
            className="ri-hero__badge ri-hero__element"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="ri-hero__badge-icon">🤖</span>
            Robotics Integration
          </motion.div>

          <h1 className="ri-hero__title ri-hero__element">
            Precision Robotic<br/>
            <span className="ri-hero__accent">Engineering</span>
          </h1>

          <p className="ri-hero__subtitle ri-hero__element">
            We integrate advanced robotic systems to automate dangerous, repetitive, or highly precise tasks
          </p>
        </div>
      </section>

      {/* Pillars Section with 3D Cards */}
      <section className="ri-pillars-section">
        <div className="ri-pillars__container">
          <motion.div
            className="ri-pillars__header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="ri-pillars__title">
              Three Technology <span className="ri-pillars__accent">Pillars</span>
            </h2>
            <p className="ri-pillars__subtitle">
              Core capabilities that drive our robotic solutions
            </p>
          </motion.div>

          <div className="ri-pillars-grid">
            {PILLARS.map((pillar, i) => (
              <motion.div
                key={i}
                className="ri-pillar-column"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                style={{ '--pillar-color': i === 0 ? '#10b981' : i === 1 ? '#06b6d4' : '#3b82f6' }}
              >
                <div className="ri-pillar-column__background">
                  <div className="ri-pillar-column__glow" />
                  <span className="ri-pillar-column__number">{`0${i + 1}`}</span>
                </div>
                <img src={pillar.img} alt={pillar.title} className="ri-pillar-column__icon" />
                <h3 className="ri-pillar-column__title">{pillar.title}</h3>
                <p className="ri-pillar-column__text">{pillar.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications Bento Grid with Magnetic Effect */}
      <section className="ri-applications-section">
        <div className="ri-applications__container">
          <motion.div
            className="ri-applications__header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="ri-applications__title">
              What We <span className="ri-applications__accent">Automate</span>
            </h2>
            <p className="ri-applications__subtitle">
              Six core robotic applications deployed worldwide
            </p>
          </motion.div>

          <div className="ri-applications-grid">
            {APPLICATIONS.map((app, i) => (
              <motion.div
                key={i}
                className={`ri-app-card ${app.size === 'large' ? 'ri-app-card--large' : ''}`}
                style={{ '--app-color': app.color }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <AnimatedBorder 
                  variant={i % 3 === 0 ? "flow-pulse" : i % 3 === 1 ? "flow-dual" : "flow-shimmer"} 
                  speed={`${2.8 + i * 0.4}s`} 
                  color1={app.color} 
                  color2="#06b6d4" 
                  color3="#3b82f6"
                >
                  <div className="ri-app-card__inner">
                    <div className="ri-app-card__img-wrap">
                      <img src={app.image} alt={app.title} className="ri-app-card__image" />
                    </div>
                    <div className="ri-app-card__content">
                      <h3 className="ri-app-card__title">{app.title}</h3>
                      <p className="ri-app-card__desc">{app.desc}</p>
                    </div>
                  </div>
                </AnimatedBorder>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA with Magnetic Button */}
      <section className="ri-cta-section">
        <div className="ri-cta__bg">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="ri-cta__orb"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 3 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.2
              }}
              style={{
                left: `${10 + i * 12}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>

        <div className="ri-cta__container">
          <motion.div
            className="ri-cta__content"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="ri-cta__title">
              Ready to Deploy a Robotic Cell?
            </h2>
            <p className="ri-cta__subtitle">
              Let our engineers scope, simulate, and commission your automation project end-to-end
            </p>
            <motion.button
              className="ri-cta__button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => smoothScroll("/contact")}
            >
              <span>Discuss Robotics Options</span>
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
