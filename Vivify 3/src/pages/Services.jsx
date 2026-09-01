import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AnimatedBorder from "../components/AnimatedBorder/AnimatedBorder";
import DepthCarousel from "../components/DepthCarousel/DepthCarousel";
import { smoothScroll } from "../utils/smoothScroll";
import "./Services.css";

gsap.registerPlugin(ScrollTrigger);

const SERVICE_CARDS = [
  {
    id: "software",
    title: "Software Development",
    description: "High-performance digital engineering with custom dashboards, secure databases, and cloud-native applications.",
    image: "/images/software.jpg",
    link: "/services/software-development",
    gradient: "from-blue-500 to-blue-600"
  },
  {
    id: "automation",
    title: "Industrial Automation",
    description: "PLC/SCADA systems, control panels, and factory instrumentation for automated data control.",
    image: "/images/mcb.jpg",
    link: "/services/industrial-automation",
    gradient: "from-blue-500 to-blue-600"
  },
  {
    id: "robotics",
    title: "Robotics Integration",
    description: "Precision robotic engineering with vision systems, AI integration, and smart automation.",
    image: "/images/robot.jpg",
    link: "/services/robotics-integration",
    gradient: "from-blue-500 to-blue-600"
  },
  {
    id: "datacentre",
    title: "Data Centre Services",
    description: "Enterprise infrastructure, high-availability hosting, and disaster recovery solutions.",
    image: "/images/datacenter2.jpg",
    link: "/services/data-centre-services",
    gradient: "from-blue-500 to-blue-600"
  },
  {
    id: "itinfra",
    title: "IT Infrastructure",
    description: "Secure networks, next-gen firewalls, enterprise Wi-Fi, and 24/7 monitoring systems.",
    image: "/images/it2.jpg",
    link: "/services/it-infrastructure",
    gradient: "from-blue-500 to-blue-600"
  },
  {
    id: "elv",
    title: "ELV Solutions",
    description: "Extra Low Voltage systems including CCTV, access control, PA systems, and smart building integration.",
    image: "/images/elv-service.jpg",
    link: "/services/elv-solutions",
    gradient: "from-blue-500 to-blue-600"
  }
];

export default function Services() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const [activeCard, setActiveCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    // Unique hero animation with staggered text reveal
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.fromTo(".services-hero__title-letter",
        { opacity: 0, y: 100, rotateX: -90 },
        { 
          opacity: 1, 
          y: 0, 
          rotateX: 0, 
          duration: 1.2, 
          stagger: 0.05,
          transformOrigin: "50% 50%"
        },
        0.3
      )
      .fromTo(".services-hero__subtitle",
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8 },
        0.8
      );

      // Parallax effect on scroll
      gsap.to(".services-hero__bg", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: ".services-hero",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Card entrance animations
      gsap.fromTo(".services-card",
        { 
          opacity: 0, 
          y: 100,
          rotationX: 15
        },
        { 
          opacity: 1, 
          y: 0,
          rotationX: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".services-cards-grid",
            start: "top 80%"
          }
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div ref={heroRef} className="services-page">
      {/* Hero Section with 3D Text Effect */}
      <section className="services-hero">
        <div className="services-hero__bg" />
        <div className="services-hero__particles">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="services-hero__particle"
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: 0
              }}
              animate={{
                y: [null, -100 - Math.random() * 200],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        <div className="services-hero__content">
          <motion.div 
            className="services-hero__badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="services-hero__badge-dot" />
            Our Services
          </motion.div>
          
          <h1 className="services-hero__title" ref={titleRef}>
            <div className="services-hero__title-line">
              {"Engineering".split("").map((letter, i) => (
                <span key={i} className="services-hero__title-letter">
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
            </div>
            <div className="services-hero__title-line">
              {"Excellence".split("").map((letter, i) => (
                <span key={i} className="services-hero__title-letter">
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
            </div>
          </h1>
          
          <p className="services-hero__subtitle" ref={subtitleRef}>
            Transforming industries through innovative technology solutions
          </p>


        </div>
      </section>

      {/* Services Section with Split Layout */}
      <section className="services-cards-section">
        <div className="services-cards__container services-cards__container--split">
          <motion.div 
            className="services-cards__header services-cards__header--left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="services-cards__title">
              <span className="services-cards__title-accent">Comprehensive</span> Service Portfolio
            </h2>
            <p className="services-cards__subtitle">
              End-to-end solutions tailored to your unique business needs. From industrial automation to software engineering, we deliver excellence across every vertical.
            </p>
            <div className="services-cards__features">
              <div className="services-cards__feature">
                <div className="services-cards__feature-icon">✓</div>
                <span>Enterprise-grade solutions</span>
              </div>
              <div className="services-cards__feature">
                <div className="services-cards__feature-icon">✓</div>
                <span>24/7 support & maintenance</span>
              </div>
              <div className="services-cards__feature">
                <div className="services-cards__feature-icon">✓</div>
                <span>Scalable architecture</span>
              </div>
              <div className="services-cards__feature">
                <div className="services-cards__feature-icon">✓</div>
                <span>Industry compliance</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="services-cards__carousel-wrapper"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div style={{ height: '550px', position: 'relative' }}>
              <DepthCarousel
                items={SERVICE_CARDS.map(card => ({
                  image: card.image,
                  alt: card.title,
                  title: card.title,
                  link: card.link
                }))}
                depth={220}
                spread={90}
                tilt={22}
                tiltDirection="right"
                perspective={1400}
                visibleCards={4}
                falloff={0.2}
                blur={6}
                autoplay
                loop
                cardWidth={320}
                cardHeight={400}
                tint="#0a0f1a"
                onChange={(index, item) => {
                  // Handle card change if needed
                }}
                onCardClick={(index, item) => {
                  navigate(item.link);
                }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section with Counter Animation */}
      <section className="services-stats-section">
        <div className="services-stats__container">
          <div className="services-stats-grid">
            {[
              { value: "500+", label: "Projects Delivered" },
              { value: "98%", label: "Client Satisfaction" },
              { value: "15+", label: "Industry Verticals" },
              { value: "24/7", label: "Support Available" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="services-stat-card"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <AnimatedBorder variant="flow" speed="2.5s" color1="#60a5fa" color2="#2563eb" color3="#38bdf8">
                  <div className="services-stat__inner">
                    <motion.h3 
                      className="services-stat__value"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        type: "spring",
                        stiffness: 200,
                        damping: 10,
                        delay: i * 0.1
                      }}
                    >
                      {stat.value}
                    </motion.h3>
                    <p className="services-stat__label">{stat.label}</p>
                  </div>
                </AnimatedBorder>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Animated Background */}
      <section className="services-cta-section">
        <div className="services-cta__bg">
          <motion.div
            className="services-cta__orb services-cta__orb--1"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="services-cta__orb services-cta__orb--2"
            animate={{
              x: [0, -100, 0],
              y: [0, 100, 0],
              scale: [1, 0.8, 1]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>
        
        <div className="services-cta__container">
          <motion.div
            className="services-cta__content"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="services-cta__title">
              Ready to Transform Your Business?
            </h2>
            <p className="services-cta__subtitle">
              Let's discuss how our services can drive your success
            </p>
            <motion.button
              className="services-cta__button"
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
