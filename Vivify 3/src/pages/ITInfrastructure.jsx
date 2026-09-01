import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import itImage from "../assets/images/IT.jpg";
import AnimatedBorder from "../components/AnimatedBorder/AnimatedBorder";
import DriftWall from "../components/DriftWall/DriftWall";
import { smoothScroll } from "../utils/smoothScroll";
import "./ITInfrastructure.css";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    title: "Network Design & Routing",
    desc: "VLAN segmentation, IP subnet planning, and Layer-2/Layer-3 switching. We utilize dynamic routing protocols (OSPF, BGP) to ensure rapid packet delivery and network efficiency.",
    image: "/images/IT.jpg",
    color: "#06b6d4"
  },
  {
    title: "Next-Gen Firewalls",
    desc: "Security borders using Fortinet FortiGate, Palo Alto, or Cisco ASA firewalls. Features include deep packet inspection (DPI), web filtering, and site-to-site VPNs.",
    image: "/images/it2.jpg",
    color: "#8b5cf6"
  },
  {
    title: "Enterprise Mesh Wi-Fi",
    desc: "Deployment of high-capacity wireless access points (Ubiquiti UniFi, Aruba) for seamless office roaming, captive portals, and secure guest access.",
    image: "/images/datacenter.jpg",
    color: "#22d3ee"
  },
  {
    title: "24/7 Network Monitoring",
    desc: "Proactive alert monitoring via SNMP (Zabbix, PRTG). We detect bandwidth spikes, interface drops, and hardware temperature alerts before they affect your team.",
    image: "/images/software.jpg",
    color: "#34d399"
  },
  {
    title: "System Security & Audits",
    desc: "Active Directory domain controllers, group policies (GPOs), network access control (NAC), and internal network penetration vulnerability testing.",
    image: "/images/datacenter2.jpg",
    color: "#f472b6"
  },
  {
    title: "Cloud Connectivity",
    desc: "SD-WAN solutions for multi-cloud connectivity, direct cloud interconnects, and optimized routing for SaaS applications.",
    image: "/images/data-centre-solutions.jpg",
    color: "#fb7185"
  }
];

const STATS = [
  { value: "99.9%", label: "Uptime" },
  { value: "<10ms", label: "Latency" },
  { value: "24/7", label: "Monitoring" },
  { value: "AES-256", label: "Encryption" }
];

const TOPOLOGY_NODES = [
  {
    icon: "🛡️",
    title: "Perimeter Security & Firewall",
    desc: "Next-gen threat inspection, intrusion prevention (IPS), and DDoS mitigation.",
    badge: "Layer 7 Security",
    color: "#38bdf8"
  },
  {
    icon: "☁️",
    title: "Hybrid Cloud Interconnect",
    desc: "Direct AWS ExpressRoute & Azure links with seamless failover and SD-WAN routing.",
    badge: "Multi-Cloud",
    color: "#818cf8"
  },
  {
    icon: "📶",
    title: "High-Speed Fiber Backbone",
    desc: "100GbE ultra-low latency core switching with LACP redundant uplinks.",
    badge: "100 Gbps Core",
    color: "#34d399"
  },
  {
    icon: "📊",
    title: "NetFlow Telemetry",
    desc: "Real-time bandwidth analytics, packet loss detection, and live Zabbix/PRTG alerts.",
    badge: "Telemetry & SNMP",
    color: "#fb7185"
  },
  {
    icon: "💾",
    title: "SAN Storage Fabric",
    desc: "High-IOPS NVMe over Fabrics storage arrays with continuous off-site replication.",
    badge: "NVMe Fabric",
    color: "#c084fc"
  },
  {
    icon: "🔒",
    title: "Zero-Trust Identity (IAM)",
    desc: "Multi-factor authentication (MFA), SAML 2.0 SSO, and role-based access control.",
    badge: "SSO / MFA",
    color: "#f59e0b"
  }
];

export default function ITInfrastructure() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Service cards reveal
      gsap.fromTo(".it-service-card",
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
            trigger: ".it-services-grid",
            start: "top 80%"
          }
        }
      );

      // Stats counter animation
      gsap.fromTo(".it-hero__stat",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out"
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="it-page">
      {/* Hero Section */}
      <section className="it-hero">
        <div className="it-hero__bg">
          <div className="it-hero__grid" />
          <div className="it-hero__gradient" />
        </div>

        <div className="it-hero__content">
          <motion.div
            className="it-hero__badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            IT Infrastructure
          </motion.div>

          <h1 className="it-hero__title">
            Enterprise Network<br/>
            <span className="it-hero__accent">& Security Systems</span>
          </h1>

          <p className="it-hero__subtitle">
            We engineer high-availability network backbones, enterprise Wi-Fi meshes, next-generation firewall security, and server architectures
          </p>
        </div>

        <motion.img
          src={itImage}
          alt="IT Infrastructure"
          className="it-hero__image"
          initial={{ opacity: 0.3, scale: 1 }}
          animate={{ opacity: 0.3, scale: 1 }}
        />
      </section>

      {/* Services Grid */}
      <section className="it-services-section">
        <div className="it-services__container">
          <motion.div
            className="it-services__header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="it-services__title">
              Infrastructure <span className="it-services__accent">Capabilities</span>
            </h2>
            <p className="it-services__subtitle">
              Comprehensive network engineering and IT management solutions
            </p>
          </motion.div>

          <div className="it-services-driftwall" style={{ height: 500 }}>
            <DriftWall
              items={SERVICES.map(service => ({
                image: service.image,
                title: service.title,
                desc: service.desc
              }))}
              columns={3}
              tileWidth={340}
              tileHeight={200}
              gap={20}
              tilt={5}
              turn={-8}
              perspective={1600}
              depth={180}
              speed={35}
              direction="up"
              variance={0.4}
              parallax={0.6}
              lift={70}
              fade={0.5}
              dim={1}
              overlayColor="#020617"
              radius={16}
              pauseOnHover
            />
          </div>
        </div>
      </section>

      {/* Network Topology Section */}
      <section className="it-network-section">
        <div className="it-network__container">
          <motion.div
            className="it-network__header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="it-network__title">
              Network <span className="it-network__accent">Topology</span>
            </h2>
            <p className="it-network__subtitle">
              Interactive architecture breakdown of our zero-trust high-availability network
            </p>
          </motion.div>

          {/* Topology Detail Cards Grid */}
          <div className="it-topology-cards-grid">
            {TOPOLOGY_NODES.map((node, i) => (
              <motion.div
                key={i}
                className="it-topology-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
              >
                <AnimatedBorder variant="flow" speed={`${3 + i * 0.4}s`} color1={node.color} color2="#06b6d4" color3="#3b82f6">
                  <div className="it-topology-card__inner">
                    <div className="it-topology-card__header">
                      <span className="it-topology-card__icon">{node.icon}</span>
                      <span className="it-topology-card__badge" style={{ background: `${node.color}22`, color: node.color, borderColor: `${node.color}44` }}>
                        {node.badge}
                      </span>
                    </div>
                    <h3 className="it-topology-card__title">{node.title}</h3>
                    <p className="it-topology-card__desc">{node.desc}</p>
                  </div>
                </AnimatedBorder>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="it-cta-section">
        <div className="it-cta__bg">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="it-cta__packet"
              animate={{
                y: [0, -100, 0],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3
              }}
              style={{
                left: `${10 + i * 16}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>

        <div className="it-cta__container">
          <motion.div
            className="it-cta__content"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="it-cta__title">
              Secure Your Business Network
            </h2>
            <p className="it-cta__subtitle">
              Request a comprehensive network audit and infrastructure assessment
            </p>
            <motion.button
              className="it-cta__button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => smoothScroll("/contact")}
            >
              <span>Request Network Audit</span>
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
