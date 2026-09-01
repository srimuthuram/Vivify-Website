import React from "react";
import { Link } from "react-router-dom";

const ARCHITECTURE_PILLARS = [
  {
    title: "Precision Cooling & HVAC",
    desc: "CRAC/CRAH precision air conditioning, cold-aisle containment, and liquid cooling for high-density GPU/AI server racks."
  },
  {
    title: "Modular Power Infrastructure",
    desc: "Uninterruptible Power Supply (UPS) double-conversion systems, ATS generator sync, and dual-feed Intelligent PDUs."
  },
  {
    title: "Structured Optical Fiber",
    desc: "Cat6A / MTP optical fiber backbones with color-coded high-density patch panels ensuring zero latency cross-connects."
  },
  {
    title: "Centralized DCIM Software",
    desc: "Real-time DCIM monitoring telemetry tracking thermal heatmaps, power usage effectiveness (PUE), and rack capacity."
  }
];

export default function DataCentreSolutions() {
  return (
    <section id="datacentre" className="solution-sec solution-sec--datacentre">
      <div className="solution-sec__container">
        
        {/* Header */}
        <div className="solution-sec__header">
          <div className="solution-sec__badge solution-sec__badge--datacentre">
            <span>Data Centre Solutions</span>
          </div>
          <h2 className="solution-sec__heading">
            Enterprise Server Infrastructure & Modular Data Facilities
          </h2>
          <p className="solution-sec__intro">
            We engineer end-to-end data centre solutions designed for mission-critical reliability, 
            extreme power efficiency, and seamless scalability. From modular containment rooms to Tier-III/IV 
            fault-tolerant data facilities, we power enterprise digital transformations.
          </p>
        </div>

        {/* Overview & Pillars */}
        <div className="solution-sec__grid">
          <div className="solution-sec__overview-box">
            <h3 className="solution-sec__subheading">Turnkey Facility Architecture</h3>
            <p className="solution-sec__text">
              Modern data facilities require strict thermal dynamics, continuous power availability, and ultra-dense rack topologies. Our data centre solutions combine certified civil engineering, precision electrical layouts, and automated monitoring.
            </p>
            <p className="solution-sec__text">
              Whether building a new edge data node or retrofitting an existing server room, we deliver solutions compliant with TIA-942 and Uptime Institute standards.
            </p>
            <div className="solution-sec__specs">
              <span className="solution-sec__spec-tag">Tier-III / IV Compliance</span>
              <span className="solution-sec__spec-tag">Hot & Cold Aisle Containment</span>
              <span className="solution-sec__spec-tag">PUE Rating &lt; 1.25</span>
            </div>
          </div>

          <div className="solution-sec__features-box">
            <h3 className="solution-sec__subheading">Core Infrastructure Pillars</h3>
            <div className="solution-sec__pillars-list">
              {ARCHITECTURE_PILLARS.map((p, idx) => (
                <div key={idx} className="solution-sec__pillar-item">
                  <div>
                    <h4 className="solution-sec__pillar-title">{p.title}</h4>
                    <p className="solution-sec__pillar-desc">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Deliverables & Case Study Grid */}
        <div className="solution-sec__grid solution-sec__grid--reverse">
          <div className="solution-sec__case-study">
            <div className="solution-sec__case-tag">Featured Solution Deployment</div>
            <h4 className="solution-sec__case-title">50-Rack Financial Data Hub</h4>
            <p className="solution-sec__case-desc">
              Engineered a high-density, Tier-III compliant server room for a regional banking group with N+1 UPS redundancy, hot-aisle containment, and 100G fiber cross-connects.
            </p>
            <div className="solution-sec__case-stats">
              <div className="solution-sec__stat">
                <span className="solution-sec__stat-num">99.999%</span>
                <span className="solution-sec__stat-label">Uptime Delivered</span>
              </div>
              <div className="solution-sec__stat">
                <span className="solution-sec__stat-num">-30%</span>
                <span className="solution-sec__stat-label">Energy PUE Overhead</span>
              </div>
            </div>
          </div>

          <div className="solution-sec__benefits">
            <h3 className="solution-sec__subheading">Key Benefits</h3>
            <ul className="solution-sec__benefits-list">
              <li><strong>Zero Operational Downtime:</strong> Dual-path electrical & cooling feeds prevent single point failures.</li>
              <li><strong>Future-Ready Density:</strong> Supports up to 30kW per rack for AI and cloud computing workloads.</li>
              <li><strong>Physical & Cyber Protection:</strong> Biometric mantrap access, CCTV coverage, and clean-agent fire suppression.</li>
              <li><strong>Energy Efficiency:</strong> Smart variable-speed CRAH fans drastically cut power consumption.</li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="solution-sec__cta-block">
          <p className="solution-sec__cta-text">Planning a server room upgrade or new data centre facility?</p>
          <Link to="/contact" className="solution-sec__cta-btn btn-dc">
            Architect Your Data Centre →
          </Link>
        </div>

      </div>
    </section>
  );
}
