import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedBorder from "../components/AnimatedBorder/AnimatedBorder";
import { smoothScroll } from "../utils/smoothScroll";
import solutionImage from "../assets/images/solution.png";
import "./Solutions.css";

gsap.registerPlugin(ScrollTrigger);

const SOLUTION_CARDS = [
  {
    id: "datacentre",
    title: "Data Centre Solutions",
    description: "Enterprise server infrastructure, modular data facilities, and high-availability hosting solutions.",
    image: "/images/data-centre-solutions.jpg",
    link: "/solutions/data-centre-solutions",
    color: "#2865EB",
    pattern: "grid"
  },
  {
    id: "robotics",
    title: "Robotics Solutions",
    description: "Autonomous production lines, intelligent robotic cells, and AMR fleet management systems.",
    image: "/images/robotics-solutions.jpg",
    link: "/solutions/robotics-solutions",
    color: "#2865EB",
    pattern: "dots"
  },
  {
    id: "smartfactory",
    title: "Smart Factory Solutions",
    description: "Industry 4.0 ecosystems, IIoT connectivity, and real-time production intelligence.",
    image: "/images/smart-factory-solutions.jpg",
    link: "/solutions/smart-factory-solutions",
    color: "#2865EB",
    pattern: "lines"
  },
  {
    id: "automation",
    title: "Automation Solutions",
    description: "Industrial control systems, SCADA telemetry, and high-precision process automation.",
    image: "/images/automation-solutions.jpg",
    link: "/solutions/automation-solutions",
    color: "#2865EB",
    pattern: "wave"
  },
  {
    id: "custom",
    title: "Custom Engineering",
    description: "Bespoke R&D, hardware prototyping, and special machinery development.",
    image: "/images/custom-engineering.jpg",
    link: "/solutions/custom-engineering",
    color: "#2865EB",
    pattern: "hexagon"
  }
];

export default function Solutions() {
  const heroRef = useRef(null);
  const containerRef = useRef(null);
  const [activeCard, setActiveCard] = useState(null);
  const { scrollYProgress } = useScroll();
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text reveal animation
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(".solutions-hero__word",
        { 
          opacity: 0, 
          x: -100,
          skewX: -10
        },
        { 
          opacity: 1, 
          x: 0,
          skewX: 0,
          duration: 1,
          stagger: 0.15
        },
        0.3
      )
      .fromTo(".solutions-hero__line",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: "power2.inOut" },
        0.5
      )
      .fromTo(".solutions-hero__description",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.8
      );

      // Horizontal scroll section
      const horizontalSection = document.querySelector('.solutions-horizontal-section');
      const track = document.querySelector('.solutions-horizontal__track');
      if (horizontalSection && track) {
        const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 96);
        
        gsap.to(track, {
          x: getScrollAmount,
          ease: "none",
          scrollTrigger: {
            trigger: horizontalSection,
            start: "top top",
            end: () => `+=${Math.abs(getScrollAmount())}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="solutions-page">
      {/* Hero with Split Layout and Enhanced Animations */}
      <motion.section 
        className="solutions-hero"
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <div className="solutions-hero__bg">
          <img 
            src={solutionImage} 
            alt="Solutions Architecture" 
            className="solutions-hero__bg-image"
          />
          <div className="solutions-hero__overlay" />
          <div className="solutions-hero__gradient-1" />
          <div className="solutions-hero__gradient-2" />
          <div className="solutions-hero__noise" />
          <div className="solutions-hero__particles">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="solutions-hero__particle"
                initial={{ 
                  x: Math.random() * 100 - 50,
                  y: Math.random() * 100 - 50,
                  opacity: 0
                }}
                animate={{
                  x: Math.random() * 100 - 50,
                  y: Math.random() * 100 - 50,
                  opacity: [0, 0.6, 0]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="solutions-hero__container">
          <div className="solutions-hero__content">
            <motion.div 
              className="solutions-hero__badge"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="solutions-hero__badge-dot" />
              Engineering Matrix
            </motion.div>
            
            <h1 className="solutions-hero__title">
              {"Industrial Solutions Architecture".split(" ").map((word, i) => (
                <span key={i} className="solutions-hero__word">{word}</span>
              ))}
            </h1>
            
            <div className="solutions-hero__line" />
            
            <p className="solutions-hero__description">
              Modular, scalable, and resilient industrial systems engineered for modern enterprise environments
            </p>

            <motion.div 
              className="solutions-hero__scroll-indicator"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span>Scroll to explore</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M19 12l-7 7-7-7"/>
              </svg>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Asymmetric Feature Section */}
      <section className="solutions-asymmetric-section">
        <div className="solutions-asymmetric__container">
          <div className="solutions-asymmetric__left">
            <motion.div
              className="solutions-asymmetric__content"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="solutions-asymmetric__tag">Our Approach</span>
              <h2 className="solutions-asymmetric__title">
                End-to-End<br/>
                <span className="solutions-asymmetric__accent">Industrial Ecosystems</span>
              </h2>
              <p className="solutions-asymmetric__text">
                From mission-critical data center infrastructure with N+1 redundancy to intelligent robotic cells performing sub-millimeter precision welding. We engineer Industry 4.0 ecosystems with real-time IIoT telemetry.
              </p>
              
              <div className="solutions-asymmetric__stats">
                {[
                  { value: "50+", label: "Deployments" },
                  { value: "99.9%", label: "Uptime" },
                  { value: "24/7", label: "Support" }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    className="solutions-asymmetric__stat"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <span className="solutions-asymmetric__stat-value">{stat.value}</span>
                    <span className="solutions-asymmetric__stat-label">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="solutions-asymmetric__right">
            <motion.div
              className="solutions-asymmetric__visual"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <AnimatedBorder variant="flow-dual" speed="3.5s" color1="#06b6d4" color2="#8b5cf6" color3="#3b82f6">
                <div className="solutions-asymmetric__card">
                  <div className="solutions-asymmetric__image-wrapper">
                    <img 
                      src="/images/smart-factory-ecosystem.png" 
                      alt="Smart Factory Ecosystem" 
                      className="solutions-asymmetric__image"
                    />
                    <div className="solutions-asymmetric__overlay" />
                  </div>
                  <div className="solutions-asymmetric__card-content">
                    <h3>Smart Factory Ecosystem</h3>
                    <p>IIoT-enabled production lines with real-time AI telemetry & monitoring</p>
                  </div>
                </div>
              </AnimatedBorder>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Horizontal Scroll Cards Section */}
      <section className="solutions-horizontal-section">
        <div className="solutions-horizontal__header">
          <h2 className="solutions-horizontal__title">
            Solution <span className="solutions-horizontal__accent">Portfolio</span>
          </h2>
          <p className="solutions-horizontal__subtitle">
            Scroll horizontally to explore our comprehensive solutions
          </p>
        </div>
        
        <div className="solutions-horizontal__track">
          {SOLUTION_CARDS.map((solution, index) => (
            <motion.div
              key={solution.id}
              className="solutions-horizontal-card"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <AnimatedBorder 
                variant={index % 4 === 0 ? "flow-dual" : index % 4 === 1 ? "flow-rainbow" : index % 4 === 2 ? "flow-pulse" : "flow-corner"} 
                speed={`${3 + index * 0.4}s`}
                color1={solution.color}
                color2="#06b6d4"
                color3="#8b5cf6"
              >
                <Link to={solution.link} className="solutions-horizontal-card__inner">
                  <div 
                    className="solutions-horizontal-card__pattern"
                    style={{ 
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='${encodeURIComponent(solution.color)}' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }}
                  />
                  
                  <div className="solutions-horizontal-card__image-wrapper">
                    <motion.img
                      src={solution.image}
                      alt={solution.title}
                      className="solutions-horizontal-card__image"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/images/solution.jpg";
                      }}
                    />
                    <div 
                      className="solutions-horizontal-card__overlay"
                      style={{ background: `linear-gradient(135deg, ${solution.color}40, transparent)` }}
                    />
                  </div>
                  
                  <div className="solutions-horizontal-card__content">
                    <div 
                      className="solutions-horizontal-card__number"
                      style={{ color: solution.color }}
                    >
                      0{index + 1}
                    </div>
                    <h3 className="solutions-horizontal-card__title">{solution.title}</h3>
                    <p className="solutions-horizontal-card__description">{solution.description}</p>
                    
                    <motion.div 
                      className="solutions-horizontal-card__cta"
                      whileHover={{ x: 5 }}
                      style={{ color: solution.color }}
                    >
                      <span>Explore Solution</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </motion.div>
                  </div>
                </Link>
              </AnimatedBorder>
            </motion.div>
          ))}
        </div>
      </section>



      {/* Magnetic CTA Section */}
      <section className="solutions-magnetic-cta">
        <div className="solutions-magnetic-cta__bg">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="solutions-magnetic-cta__orb"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.5
              }}
              style={{
                left: `${20 + i * 15}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>

        <div className="solutions-magnetic-cta__container">
          <motion.div
            className="solutions-magnetic-cta__content"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="solutions-magnetic-cta__title">
              Ready to Transform Your Operations?
            </h2>
            <p className="solutions-magnetic-cta__subtitle">
              Let's engineer the perfect solution for your business
            </p>
            <motion.button
              className="solutions-magnetic-cta__button"
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
