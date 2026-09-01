import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedBorder from "../components/AnimatedBorder/AnimatedBorder";
import roboticsSolutionsHero from "../assets/images/robotics-solutions-hero-new.jpg";
import "./RoboticsSolutions.css";

gsap.registerPlugin(ScrollTrigger);

const SYSTEMS = [
  { title: "Autonomous Mobile Robots", desc: "Self-navigating warehouse AMRs and AGVs with SLAM lidar navigation, payload up to 1500kg.", image: "/images/robot.jpg", color: "#2865EB" },
  { title: "Heavy Payload Arms", desc: "6-Axis arms for heavy assembly, spot welding, and material transfer with mm repeatability.", image: "/images/robot2.jpg", color: "#60a5fa" },
  { title: "Collaborative Robots", desc: "Safe human-robot collaborative cells with force-torque sensors and collision stopping.", image: "/images/robotics-solutions.jpg", color: "#34d399" },
  { title: "Vision-Guided Picking", desc: "3D camera perception allowing grippers to pick randomly oriented parts from deep bins.", image: "/images/vision-systems.jpg", color: "#fbbf24" }
];

const BENEFITS = [
  { title: "24/7 Manufacturing", desc: "Continuous operation without worker fatigue or shift limitations.", image: "/images/robot-programming.jpg", color: "#2865EB" },
  { title: "Sub-mm Precision", desc: "Millimetre repeatability across millions of production cycles.", image: "/images/robotics-card.jpg", color: "#60a5fa" },
  { title: "Workplace Safety", desc: "Removes humans from high-risk welding, cutting, and chemical zones.", image: "/images/robot.jpg", color: "#34d399" },
  { title: "Rapid ROI", desc: "Significant labour cost savings and drastic reduction in scrap materials.", image: "/images/robot2.jpg", color: "#fbbf24" }
];

const STATS = [
  { value: "3.5×", label: "Throughput Gain" },
  { value: "0%", label: "Weld Defect Rate" },
  { value: "24/7", label: "Lights-Out Ops" }
];

export default function RoboticsSolutions() {
  const containerRef = useRef(null);
  const scrollSnapRef = useRef(null);
  const benefitsCarouselRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [centeredBenefitIndex, setCenteredBenefitIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const { scrollYProgress } = useScroll({
    target: scrollSnapRef,
    offset: ["start start", "end end"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    setTilt({ x: rotateY, y: rotateX });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !benefitsCarouselRef.current) return;
    
    const touchX = e.touches[0].clientX;
    const diff = touchStart - touchX;
    const scrollLeft = benefitsCarouselRef.current.scrollLeft;
    
    benefitsCarouselRef.current.scrollLeft = scrollLeft + diff;
    setTouchStart(touchX);
  };

  const handleTouchEnd = (e) => {
    setIsDragging(false);
    if (benefitsCarouselRef.current) {
      const panels = benefitsCarouselRef.current.querySelectorAll('.rbs-benefit-card');
      const containerWidth = benefitsCarouselRef.current.offsetWidth;
      const scrollLeft = benefitsCarouselRef.current.scrollLeft;
      
      let centerIndex = 0;
      let minDistance = Infinity;
      
      panels.forEach((panel, i) => {
        const panelCenter = panel.offsetLeft + panel.offsetWidth / 2;
        const containerCenter = scrollLeft + containerWidth / 2;
        const distance = Math.abs(panelCenter - containerCenter);
        
        if (distance < minDistance) {
          minDistance = distance;
          centerIndex = i;
        }
      });
      
      const targetPanel = panels[centerIndex];
      const scrollPosition = targetPanel.offsetLeft - (containerWidth / 2) + (targetPanel.offsetWidth / 2);
      
      benefitsCarouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      
      setCenteredBenefitIndex(centerIndex);
    }
  };

  const handleMouseDown = (e) => {
    setDragStart(e.clientX);
    setIsDragging(true);
  };

  const handleDragMove = (e) => {
    if (!isDragging || !benefitsCarouselRef.current) return;
    
    const mouseX = e.clientX;
    const diff = dragStart - mouseX;
    const scrollLeft = benefitsCarouselRef.current.scrollLeft;
    
    benefitsCarouselRef.current.scrollLeft = scrollLeft + diff;
    setDragStart(mouseX);
  };

  const handleMouseUp = (e) => {
    setIsDragging(false);
    if (benefitsCarouselRef.current) {
      const panels = benefitsCarouselRef.current.querySelectorAll('.rbs-benefit-card');
      const containerWidth = benefitsCarouselRef.current.offsetWidth;
      const scrollLeft = benefitsCarouselRef.current.scrollLeft;
      
      let centerIndex = 0;
      let minDistance = Infinity;
      
      panels.forEach((panel, i) => {
        const panelCenter = panel.offsetLeft + panel.offsetWidth / 2;
        const containerCenter = scrollLeft + containerWidth / 2;
        const distance = Math.abs(panelCenter - containerCenter);
        
        if (distance < minDistance) {
          minDistance = distance;
          centerIndex = i;
        }
      });
      
      const targetPanel = panels[centerIndex];
      const scrollPosition = targetPanel.offsetLeft - (containerWidth / 2) + (targetPanel.offsetWidth / 2);
      
      benefitsCarouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      
      setCenteredBenefitIndex(centerIndex);
    }
  };

  const handleBenefitClick = (index) => {
    if (benefitsCarouselRef.current) {
      const panels = benefitsCarouselRef.current.querySelectorAll('.rbs-benefit-card');
      const containerWidth = benefitsCarouselRef.current.offsetWidth;
      const targetPanel = panels[index];
      const scrollPosition = targetPanel.offsetLeft - (containerWidth / 2) + (targetPanel.offsetWidth / 2);
      
      benefitsCarouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      
      setCenteredBenefitIndex(index);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animation
      gsap.fromTo(".rbs-hero__badge",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );

      gsap.fromTo(".rbs-hero__title",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power3.out" }
      );

      gsap.fromTo(".rbs-hero__subtitle",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: "power3.out" }
      );

      gsap.fromTo(".rbs-hero__stat",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, delay: 0.6, ease: "power3.out" }
      );

      // Floating animation for system cards
      gsap.to(".rbs-system-card",
        {
          y: -15,
          duration: 3,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          stagger: 0.5
        }
      );

      // Scroll-snap sections animation
      gsap.fromTo(".rbs-snap-section",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: ".rbs-snap-section",
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1
          }
        }
      );

      // Benefit cards animation
      gsap.fromTo(".rbs-benefit-card",
        { opacity: 0, scale: 0.9, rotateX: 15 },
        {
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".rbs-benefits-scroll",
            start: "top 60%"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="rbs-page">
      {/* Hero Section */}
      <section className="rbs-hero">
        <div className="rbs-hero__bg" style={{ backgroundImage: `url(${roboticsSolutionsHero})` }}>
          <div className="rbs-hero__grid" />
          <div className="rbs-hero__circuit" />
        </div>

        <div className="rbs-hero__content">
          <motion.div
            className="rbs-hero__badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            Robotics Solutions
          </motion.div>

          <h1 className="rbs-hero__title">
            Autonomous<br/>
            <span className="rbs-hero__accent">Production Lines</span>
          </h1>

          <p className="rbs-hero__subtitle">
            From autonomous mobile robots to multi-axis articulated arms and AI-guided vision cells — maximize throughput and precision
          </p>
        </div>
      </section>

      {/* Systems Section with Floating Cards */}
      <section className="rbs-systems-section">
        <div className="rbs-systems__container">
          <motion.div
            className="rbs-systems__header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="rbs-systems__title">
              Robotic <span className="rbs-systems__accent">Systems</span>
            </h2>
            <p className="rbs-systems__subtitle">
              Built for the most demanding industrial environments
            </p>
          </motion.div>

          <div className="rbs-systems-grid">
            {SYSTEMS.map((system, i) => (
              <motion.div
                key={i}
                className="rbs-system-card"
                style={{ '--system-color': system.color }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="rbs-system-card__glow" />
                <AnimatedBorder variant="flow-dual" speed="3s" color1={system.color} color2="#38bdf8" color3="#10b981">
                  <div className="rbs-system-card__inner">
                    <div className="rbs-system-card__scan-line" />
                    <div className="rbs-system-card__scan-glow" />
                    <img src={system.image} alt={system.title} className="rbs-system-card__icon" />
                    <h3 className="rbs-system-card__title">{system.title}</h3>
                    <p className="rbs-system-card__desc">{system.desc}</p>
                  </div>
                </AnimatedBorder>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Scroll-Snap Benefits Section */}
      <section className="rbs-snap-section" ref={scrollSnapRef}>
        <div className="rbs-snap__container">
          <motion.div
            className="rbs-snap__header"
            style={{ scale }}
          >
            <h2 className="rbs-snap__title">
              Core <span className="rbs-snap__accent">Benefits</span>
            </h2>
            <p className="rbs-snap__subtitle">
              Transform your production capabilities
            </p>
          </motion.div>

          <div 
            className="rbs-benefits-container"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleDragMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => setIsDragging(false)}
          >
            <div className="rbs-benefits-scroll" ref={benefitsCarouselRef}>
              {BENEFITS.map((benefit, i) => (
                <div key={i} className={`rbs-benefit-card ${i === centeredBenefitIndex ? 'rbs-benefit-card--centered' : ''}`} style={{ '--benefit-color': benefit.color }} onClick={() => handleBenefitClick(i)}>
                  <div className="rbs-benefit-card__inner">
                    <img src={benefit.image} alt={benefit.title} className="rbs-benefit-card__icon" />
                    <h3 className="rbs-benefit-card__title">{benefit.title}</h3>
                    <p className="rbs-benefit-card__desc">{benefit.desc}</p>
                    <div 
                      className="rbs-benefit-card__glow"
                      style={{ background: benefit.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="rbs-benefits-dots">
              {BENEFITS.map((benefit, i) => (
                <button
                  key={i}
                  className={`rbs-benefits-dot ${i === centeredBenefitIndex ? 'rbs-benefits-dot--active' : ''}`}
                  onClick={() => handleBenefitClick(i)}
                  style={{ '--benefit-color': benefit.color }}
                  aria-label={`View benefit ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="rbs-case-section">
        <div className="rbs-case__container">
          <motion.div
            className="rbs-case-card"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="rbs-case-label">Featured Industry Solution</div>
            <h3 className="rbs-case-title">Automotive Chassis Welding Cell</h3>
            <p className="rbs-case-desc">
              Integrated a 4-robot synchronised welding cell with 3D vision weld seam tracking and automated AMR component loading
            </p>
            <div className="rbs-case-stats">
              <div>
                <span className="rbs-case-num">3.5x</span>
                <span className="rbs-case-slabel">Throughput Increase</span>
              </div>
              <div>
                <span className="rbs-case-num">0%</span>
                <span className="rbs-case-slabel">Weld Defect Rate</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="rbs-cta-section">
        <div className="rbs-cta__bg">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="rbs-cta__gear"
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

        <div className="rbs-cta__container">
          <motion.div
            className="rbs-cta__content"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="rbs-cta__title">
              Integrate Robotics Into Your Facility
            </h2>
            <p className="rbs-cta__subtitle">
              Industrial robots or AMRs — we scope, simulate, and commission end-to-end
            </p>
            <motion.button
              className="rbs-cta__button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => smoothScroll("/contact")}
            >
              <span>Automate With Robotics</span>
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
