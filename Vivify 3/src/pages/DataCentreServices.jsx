import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import AnimatedBorder from "../components/AnimatedBorder/AnimatedBorder";
import AccordionGallery from "../components/AccordionGallery/AccordionGallery";
import { smoothScroll } from "../utils/smoothScroll";
import datacentreServicesHero from "../assets/images/datacentre-services-hero.jpg";
import "./DataCentreServices.css";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    title: "Server Setup & Racking",
    desc: "Physical racking, structured high-density fiber cabling, cable tray labeling, core switch installation, and server cabinet power load planning.",
    image: "/images/data-centre-solutions.jpg",
    color: "#38bdf8",
    tag: "Physical & Fiber",
    status: "Active Rack"
  },
  {
    title: "Hyperconverged Virtualization",
    desc: "VMware vSphere/ESXi and Microsoft Hyper-V installations. High-availability clusters with shared storage (SAN/NAS) and live migration.",
    image: "/images/data-centre-card.jpg",
    color: "#818cf8",
    tag: "vSphere / Hyper-V",
    status: "HA Cluster"
  },
  {
    title: "Hybrid Cloud Integration",
    desc: "Secure bridging between local data centre nodes and AWS/Azure clouds, facilitating unified network routing and fluid workload scaling.",
    image: "/images/datacenter.jpg",
    color: "#22d3ee",
    tag: "AWS & Azure Bridge",
    status: "Cloud Link"
  },
  {
    title: "Secure Backups",
    desc: "Automatic 3-2-1 backup routines using Veeam or Commvault. Immutable backups protect against ransomware and accidental deletion.",
    image: "/images/datacenter2.jpg",
    color: "#34d399",
    tag: "Immutable 3-2-1",
    status: "Protected"
  },
  {
    title: "Disaster Recovery (DR)",
    desc: "Active-Active failover architectures, database replication, and continuous replication agents ensuring minimal RTO and RPO.",
    image: "/images/datacenter3.jpg",
    color: "#f472b6",
    tag: "Active-Active",
    status: "Zero Loss"
  },
  {
    title: "Network Security",
    desc: "Firewall deployment, intrusion detection systems, VPN tunnels, and zero-trust network architecture for secure data centre operations.",
    image: "/images/datacenter4.jpg",
    color: "#fb923c",
    tag: "Zero-Trust Mesh",
    status: "Encrypted"
  }
];

const SPECS = [
  { label: "Active-Active Clusters" },
  { label: "Tier-III Topology" },
  { label: "SAN / NVMe Fabric" },
  { label: "99.999% Uptime SLA" },
  { label: "24/7 Monitoring" },
  { label: "Redundant Power" }
];

const STATS = [
  { value: "99.999%", label: "Uptime SLA" },
  { value: "Tier III", label: "Compliant" },
  { value: "24/7", label: "Monitoring" },
  { value: "0", label: "Downtime" }
];

export default function DataCentreServices() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Grid reveal animation
      gsap.fromTo(".dc-service-card",
        { 
          opacity: 0,
          y: 40
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".dc-services-grid",
            start: "top 80%"
          }
        }
      );

      // Spec items reveal
      gsap.fromTo(".dc-spec-item",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".dc-specs-grid",
            start: "top 80%"
          }
        }
      );

      // Counter animation for stats
      gsap.fromTo(".dc-hero__stat",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out"
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="dc-page" ref={containerRef}>
      {/* Hero Section */}
      <section className="dc-hero">
        <div className="dc-hero__bg" style={{ backgroundImage: `url(${datacentreServicesHero})` }}>
          <div className="dc-hero__grid" />
          <div className="dc-hero__glow" />
        </div>

        <div className="dc-hero__content">
          <motion.span
            className="dc-hero__badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Tier-III Data Centre Solutions
          </motion.span>

          <h1 className="dc-hero__title">
            Enterprise<br/>
            <span className="dc-hero__accent">Infrastructure</span>
          </h1>

          <p className="dc-hero__subtitle">
            Architect and manage bulletproof physical and virtual data centre operations
          </p>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="dc-services-section">
        <div className="dc-services__container">
          <div className="dc-services__layout">
            <motion.div
              className="dc-services__header"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="dc-services__title">
                What We <span className="dc-services__accent">Deliver</span>
              </h2>
              <p className="dc-services__subtitle">
                Six pillars of mission-critical data centre engineering
              </p>
              <div className="dc-services__description">
                <p>We deliver comprehensive data centre solutions that ensure your infrastructure operates at peak performance. From physical server racking and fiber cabling to advanced virtualization and hybrid cloud integration, our services cover every aspect of modern data centre operations.</p>
                <p>Our disaster recovery and backup solutions provide peace of mind with immutable 3-2-1 backup routines and active-active failover architectures. Network security implementations with zero-trust mesh architecture protect your critical assets.</p>
              </div>
            </motion.div>

            <div className="dc-services__gallery">
              <AccordionGallery
                items={SERVICES.map(service => ({
                  image: service.image,
                  label: service.title,
                  alt: service.title,
                  desc: service.desc,
                  tag: service.tag,
                  status: service.status,
                  color: service.color
                }))}
                defaultIndex={2}
                expandRatio={0.5}
                trigger="hover"
                height={500}
                gap={12}
                accentColor="#38bdf8"
                overlayColor="#0a0a0a"
                textColor="#ffffff"
                grayscale={true}
                showLabels={true}
                showContent={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Specs Section */}
      <section className="dc-specs-section">
        <div className="dc-specs__container">
          <motion.div
            className="dc-specs__header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="dc-specs__title">
              Infrastructure <span className="dc-specs__accent">Specifications</span>
            </h2>
            <p className="dc-specs__subtitle">
              Enterprise-grade standards for mission-critical operations
            </p>
          </motion.div>

          <div className="dc-specs-grid">
            {SPECS.map((spec, i) => (
              <motion.div
                key={i}
                className="dc-spec-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.03, x: 5 }}
              >
                <span className="dc-spec-icon">✓</span>
                <span className="dc-spec-item__label">{spec.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="dc-cta-section">
        <div className="dc-cta__bg">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="dc-cta__node"
              animate={{
                scale: [1, 1.2, 1],
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

        <div className="dc-cta__container">
          <motion.div
            className="dc-cta__content"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="dc-cta__title">
              Scale Your Server Infrastructure
            </h2>
            <p className="dc-cta__subtitle">
              Disaster recovery, virtualisation, or a full data centre build — we cover it all
            </p>
            <motion.button
              className="dc-cta__button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => smoothScroll("/contact")}
            >
              <span>Consult Data Centre Experts</span>
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
