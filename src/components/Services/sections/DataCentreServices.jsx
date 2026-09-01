import React from "react";
import { Link } from "react-router-dom";

const SERVICES_DC = [
  {
    title: "Server Setup & Racking",
    desc: "Physical racking, structured high-density fiber cabling, cable tray labeling, core switch installation, and server cabinet power load planning.",
    icon: "🔌"
  },
  {
    title: "Hyperconverged Virtualization",
    desc: "VMware vSphere/ESXi and Microsoft Hyper-V installations. Build high-availability clusters with shared storage (SAN/NAS) and live migration capabilities.",
    icon: "💾"
  },
  {
    title: "Hybrid Cloud Integration",
    desc: "Secure bridging between local data centre metal nodes and AWS/Azure clouds, facilitating unified network routing and fluid workload scaling.",
    icon: "☁️"
  },
  {
    title: "Secure Backups",
    desc: "Automatic backup routines (3-2-1 rule: three copies, two media, one offsite) using Veeam or Commvault. Immutable backups protect against ransomware.",
    icon: "🛡️"
  },
  {
    title: "Disaster Recovery (DR)",
    desc: "Active-Active failover architectures, database replication, and continuous replication agents ensuring minimal RTO (Recovery Time Objective) and RPO.",
    icon: "🔄"
  }
];

export default function DataCentreServices() {
  return (
    <section id="datacentre" className="service-sec service-sec--datacentre">
      <div className="service-sec__container">
        
        {/* Header Block */}
        <div className="service-sec__header">
          <div className="service-sec__badge service-sec__badge--datacentre">
            <span>Data Centre Services</span>
          </div>
          <h2 className="service-sec__heading">
            Enterprise Infrastructure & High-Availability Hosting
          </h2>
          <p className="service-sec__intro">
            We architect and manage bulletproof physical and virtual data centre operations. 
            From initial hardware racking and SAN storage configurations to hypervisor clusters and disaster recovery failovers, 
            we keep your critical applications online 24/7/365.
          </p>
        </div>

        {/* 2-Column Focus Layout */}
        <div className="service-sec__grid">
          <div className="service-sec__overview-box">
            <div className="service-sec__image-wrapper">
              <img 
                src="/images/services/data-centre.jpg"
                alt="Data Centre Server Room"
                className="service-sec__image"
                loading="lazy"
              />
            </div>
            <h3 className="service-sec__subheading">High-Availability Infrastructure</h3>
            <p className="service-sec__text">
              A modern enterprise requires computing infrastructure that is both bulletproof and incredibly fast. Our Data Centre Services focus on designing hardware environments that prevent single points of failure.
            </p>
            <p className="service-sec__text">
              By utilizing redundant power distribution units (PDUs), multiple network uplinks (LACP), high-density fiber patching, and storage area networks (SAN), we build server footprints that can sustain hardware failures without interrupting operations.
            </p>
            <div className="service-sec__spec-badges">
              <span className="service-sec__spec-badge">Active-Active Clusters</span>
              <span className="service-sec__spec-badge">Tier-III Topology</span>
              <span className="service-sec__spec-badge">SAN / NVMe Fabric</span>
            </div>
          </div>

          <div className="service-sec__features-box">
            <h3 className="service-sec__subheading">Enterprise Operations</h3>
            <div className="service-sec__dc-list">
              {SERVICES_DC.map((item, idx) => (
                <div key={idx} className="service-sec__dc-card">
                  <div className="service-sec__dc-icon-wrap">
                    <span className="service-sec__dc-icon">{item.icon}</span>
                  </div>
                  <div className="service-sec__dc-content">
                    <h4 className="service-sec__dc-title">{item.title}</h4>
                    <p className="service-sec__dc-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Block */}
        <div className="service-sec__cta-block">
          <p className="service-sec__cta-text">Need to scale your server infrastructure or set up disaster recovery solutions?</p>
          <Link to="/contact" className="service-sec__cta-btn btn-dc">
            Consult Data Centre Experts →
          </Link>
        </div>

      </div>
    </section>
  );
}
