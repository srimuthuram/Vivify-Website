import React from "react";
import { Link } from "react-router-dom";

const ELV_ITEMS = [
  {
    title: "Enterprise IP CCTV",
    desc: "CCTV networks using high-definition IP cameras, network video recorders (NVRs), and video management software (Milestone, HikCentral) featuring motion masking and remote viewing security."
  },
  {
    title: "Access Control & Biometrics",
    desc: "RFID card systems, biometric fingerprint readers, facial recognition entry barriers, and door electromagnetic locks, integrated with payroll and time logs."
  },
  {
    title: "Public Address (PA) Systems",
    desc: "Audio zoning, amplifiers, speaker networks, and emergency evacuation integration, enabling clear messaging across designated building floors."
  },
  {
    title: "Addressable Fire Safety Systems",
    desc: "Precision heat/smoke detection circuits, manual call points, control panels, and automated integration with sirens, access gates, and fire ventilation systems."
  },
  {
    title: "Building Management Systems (BMS)",
    desc: "Centralized HVAC monitoring, lighting relays, generator fuel trackers, energy meters, and water level controllers linked to a unified control panel."
  }
];

export default function ELVSolutions() {
  return (
    <section id="elv" className="service-sec service-sec--elv">
      <div className="service-sec__container">
        
        {/* Header Block */}
        <div className="service-sec__header">
          <div className="service-sec__badge service-sec__badge--elv">
            <span>ELV Solutions</span>
          </div>
          <h2 className="service-sec__heading">
            Extra Low Voltage & Smart Building Integrations
          </h2>
          <p className="service-sec__intro">
            We design and install Extra Low Voltage (ELV) networks that make buildings safe, smart, and efficient. 
            By integrating surveillance systems, access barriers, public address systems, and fire alarms under automated 
            Building Management Systems, we secure physical assets and simplify site operations.
          </p>
        </div>

        {/* Overview & Grid */}
        <div className="service-sec__grid">
          
          <div className="service-sec__overview-box">
            <div className="service-sec__image-wrapper">
              <img 
                src="/images/services/elv-solutions.jpg"
                alt="Smart Building Control System"
                className="service-sec__image"
                loading="lazy"
              />
            </div>
            <h3 className="service-sec__subheading">Smart Building Architecture</h3>
            <p className="service-sec__text">
              Extra Low Voltage systems are the circulatory system of modern buildings. They run low-voltage signals (usually under 50V AC or 120V DC) that allow security systems to talk to fire alarms, and HVAC systems to adjust according to occupancy.
            </p>
            <p className="service-sec__text">
              At Vivify, we engineer centralized control panels and network bridges that integrate these disparate protocols (BACnet, Modbus, IP) into a singular control dashboard, allowing facility managers to view operations in real-time.
            </p>
            <div className="service-sec__elv-standards">
              <span className="service-sec__std-tag">IP66 Waterproof Cameras</span>
              <span className="service-sec__std-tag">EN54 Fire Safety Certs</span>
              <span className="service-sec__std-tag">BACnet & Modbus BMS</span>
            </div>
          </div>

          <div className="service-sec__features-box">
            <h3 className="service-sec__subheading">ELV Systems Portfolio</h3>
            <div className="service-sec__elv-list">
              {ELV_ITEMS.map((item, idx) => (
                <div key={idx} className="service-sec__elv-card">
                  <div className="service-sec__elv-content">
                    <h4 className="service-sec__elv-title">{item.title}</h4>
                    <p className="service-sec__elv-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* CTA Block */}
        <div className="service-sec__cta-block">
          <p className="service-sec__cta-text">Looking to design a secure CCTV footprint, access control gates, or a smart BMS layout?</p>
          <Link to="/contact" className="service-sec__cta-btn btn-elv">
            Consult an ELV Engineer →
          </Link>
        </div>

      </div>
    </section>
  );
}
