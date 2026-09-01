import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Services.css";

const SERVICES = [
  {
    id: "automation",
    route: "/services/industrial-automation",
    accent: "#059669",
    accentLight: "rgba(5,150,105,0.15)",
    accentBorder: "rgba(5,150,105,0.3)",
    label: "Industrial Automation",
    tagline: "Smart Factory Instrumentation",
    desc: "End-to-end PLC programming, SCADA systems, industrial IoT integrations, and optimized process control networks for modern operations.",
    items: ["PLC/SCADA", "Industrial IoT", "HMI Systems", "Process Control"],
    bg: "/images/services/automation.png",
    video: "/videos/automation.mp4",
  },
  {
    id: "elv",
    route: "/services/elv-solutions",
    accent: "#0891b2",
    accentLight: "rgba(8,145,178,0.15)",
    accentBorder: "rgba(8,145,178,0.3)",
    label: "ELV Solutions",
    tagline: "Extra Low Voltage Integration",
    desc: "Enterprise CCTV systems, secure biometrics/access control nodes, addressable fire safety systems, and HVAC building control.",
    items: ["Smart CCTV", "Access Systems", "Fire Alarms", "Building Mgmt"],
    bg: "/images/services/elv-systems.png",
    video: "/videos/elv.mp4",
  },
  {
    id: "robotics",
    route: "/services/robotics-integration",
    accent: "#2865EB",
    accentLight: "rgba(40,101,235,0.15)",
    accentBorder: "rgba(40,101,235,0.3)",
    label: "Robotics Integration",
    tagline: "Autonomous Machine Assembly",
    desc: "Seamless integration of robotic arms, vision guidance systems, sorting lines, and material handling systems for production efficiency.",
    items: ["Cobot Deployment", "Machine Vision", "Motion Planning", "Handling Lines"],
    bg: "/images/services/robotics.png",
    video: "/videos/robotics.mp4",
  },
  {
    id: "datacentre",
    route: "/services/data-centre-services",
    accent: "#1a4cc4",
    accentLight: "rgba(26,76,196,0.15)",
    accentBorder: "rgba(26,76,196,0.3)",
    label: "Data Centre Services",
    tagline: "Enterprise Infrastructure & Hosting",
    desc: "Complete rack architectures, structured cabling, backup systems, cooling design, and 24/7 technical operations maintenance.",
    items: ["Rack Design", "Structured Cabling", "Cooling & Power", "Network Nodes"],
    bg: "/images/services/datacenter.png",
    video: "/videos/datacenter.mp4",
  },
  {
    id: "itinfra",
    route: "/services/it-infrastructure",
    accent: "#2865EB",
    accentLight: "rgba(40,101,235,0.15)",
    accentBorder: "rgba(40,101,235,0.3)",
    label: "IT Infrastructure",
    tagline: "Enterprise Networking & Security",
    desc: "Resilient firewalls, directory configurations, high-throughput software-defined networking, and proactive security auditing.",
    items: ["Secure Networks", "Audit & Systems", "Core Firewalls", "User Directory"],
    bg: "/images/services/it-infra.png",
    video: "/videos/infrastructure.mp4",
  },
  {
    id: "software",
    route: "/services/software-development",
    accent: "#2865EB",
    accentLight: "rgba(40,101,235,0.15)",
    accentBorder: "rgba(40,101,235,0.3)",
    label: "Software Development",
    tagline: "High-Performance Digital Solutions",
    desc: "Custom web applications, enterprise software systems, cloud migrations, and robust mobile applications engineered for security and scale.",
    items: ["Web Apps", "Enterprise Solutions", "Cloud Architectures", "Mobile Apps"],
    bg: "/images/services/software-dev.png",
    video: "/videos/software.mp4",
  },
];

export default function Services() {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <section id="services" className="services" aria-label="Services">

      <div className="services__bg" aria-hidden="true">
        <div className="services__bg-blob services__bg-blob--a" />
        <div className="services__bg-blob services__bg-blob--b" />
      </div>

      <div className="services__container">

        <div className="services__head">
          <div className="services__badge">
            <span className="services__badge-dot" aria-hidden="true" />
            Services
          </div>
          <h2 className="services__heading">
            Engineering Smart Solutions<br className="services__br" /> <span className="services__heading-accent">for Modern Industries</span>
          </h2>
          <p className="services__desc">
            We architect and build premium cyber-physical automation platforms, high-performance web systems,
            and connected enterprise networks that accelerate growth and eliminate friction.
          </p>
        </div>

        <div className="services__bento">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="services__card"
              style={{
                "--card-accent":        service.accent,
                "--card-accent-light":  service.accentLight,
                "--card-accent-border": service.accentBorder,
              }}
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleCardClick(service.route)}
            >
              {/* Background photo */}
              <img
                className="services__card-img"
                src={service.bg}
                alt=""
                aria-hidden="true"
                loading="lazy"
                style={{ opacity: hoveredCard === service.id ? 0 : 1 }}
              />
              {/* Video on hover */}
              <video
                className="services__card-video"
                src={service.video}
                muted
                loop
                playsInline
                style={{ opacity: hoveredCard === service.id ? 1 : 0 }}
                ref={(el) => {
                  if (el && hoveredCard === service.id) {
                    el.play().catch(() => {});
                  } else if (el) {
                    el.pause();
                  }
                }}
              />
              {/* Dark gradient overlay — keeps text legible */}
              <div className="services__card-overlay" aria-hidden="true" />

              <div className="services__card-arrow" aria-hidden="true">
                →
              </div>

              <div className="services__card-content">
                <div className="services__card-label">
                  <span className="services__card-label-dot" />
                  {service.tagline}
                </div>

                <h3 className="services__card-title">{service.label}</h3>

                <p className="services__card-description">{service.desc}</p>

                <div className="services__card-tags">
                  {service.items.map((item, idx) => (
                    <span key={idx} className="services__card-tag">
                      <span className="services__card-tag-dot" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}