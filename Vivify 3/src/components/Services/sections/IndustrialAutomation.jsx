import React from "react";
import { Link } from "react-router-dom";

const VENDORS = [
  { name: "Siemens TIA Portal", type: "PLC & HMI Programming", desc: "S7-1200, S7-1500, and WinCC SCADA system designs." },
  { name: "Rockwell Automation", type: "Allen-Bradley Integration", desc: "ControlLogix, CompactLogix, and FactoryTalk View automation." },
  { name: "Schneider Electric", type: "Modicon & EcoStruxure", desc: "PLC programming and advanced industrial networking solutions." },
  { name: "ABB Solutions", type: "DCS & System 800xA", desc: "Distributed Control Systems integration for process control." }
];

const INDUSTRIES = [
  { name: "Automotive Assembly", icon: "🚗", desc: "Conveyor systems control, torque tool integrations, and safety networks." },
  { name: "Food & Beverage", icon: "🍲", desc: "Batch recipe management, pasteurization logging, and washdown panels." },
  { name: "Pharmaceuticals", icon: "💊", desc: "FDA 21 CFR Part 11 validation, audit trails, and precision packaging." },
  { name: "Water Treatment", icon: "💧", desc: "Pump station SCADA monitoring, flow rate calculations, and remote telemetry." }
];

const GALLERY = [
  { label: "Main Control HMI Dashboard", desc: "SCADA interface showing real-time sensor metrics and motor status." },
  { label: "Double Door PLC Panel Build", desc: "Clean Siemens S7-1500 wiring with organized terminal blocks." },
  { label: "VFD Drive Cabinet", desc: "High-power variable frequency drive layout with cooling integration." }
];

export default function IndustrialAutomation() {
  return (
    <section id="automation" className="service-sec service-sec--automation">
      <div className="service-sec__container">
        
        {/* Header Block */}
        <div className="service-sec__header">
          <div className="service-sec__badge service-sec__badge--automation">
            <span>Industrial Automation</span>
          </div>
          <h2 className="service-sec__heading">
            Smarter Instrumentation & Factory Control
          </h2>
          <p className="service-sec__intro">
            We deliver state-of-the-art factory instrumentation, control systems, and machinery integration. 
            By designing and programming resilient PLC/SCADA configurations, we empower facilities with automated data control 
            and improved process efficiency.
          </p>
        </div>

        {/* What it is & PLC/SCADA Grid */}
        <div className="service-sec__grid">
          <div className="service-sec__overview-box">
            <div className="service-sec__image-wrapper">
              <img 
                src="/images/services/industrial-automation.jpg"
                alt="Industrial Automation Control Panel"
                className="service-sec__image"
                loading="lazy"
              />
            </div>
            <h3 className="service-sec__subheading">What It Is</h3>
            <p className="service-sec__text">
              Industrial Automation is the engineering bridge between physical machinery and software brains. We design, build, and program the electrical panels and systems that run assembly lines, control chemical mixtures, monitor critical utilities, and keep personnel safe under heavy industrial operations.
            </p>
            <p className="service-sec__text">
              Our panels and architectures comply with local electrical codes and international safety standards, utilizing industrial-grade firewalls, redundant power, and optimized heat dissipation structures.
            </p>
          </div>

          <div className="service-sec__features-box">
            <h3 className="service-sec__subheading">PLC & SCADA Integrations</h3>
            <div className="service-sec__vendors-list">
              {VENDORS.map((vendor, idx) => (
                <div key={idx} className="service-sec__vendor-card">
                  <div className="service-sec__vendor-meta">
                    <span className="service-sec__vendor-name">{vendor.name}</span>
                    <span className="service-sec__vendor-type">{vendor.type}</span>
                  </div>
                  <p className="service-sec__vendor-desc">{vendor.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Industries Served */}
        <div className="service-sec__industries-block">
          <h3 className="service-sec__subheading text-center">Industries We Serve</h3>
          <div className="service-sec__ind-grid">
            {INDUSTRIES.map((ind, idx) => (
              <div key={idx} className="service-sec__ind-card">
                <div className="service-sec__ind-icon">{ind.icon}</div>
                <h4 className="service-sec__ind-title">{ind.name}</h4>
                <p className="service-sec__ind-desc">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="service-sec__grid service-sec__grid--reverse">
          <div className="service-sec__benefits">
            <h3 className="service-sec__subheading">Core Process Benefits</h3>
            <ul className="service-sec__benefits-list">
              <li>
                <strong>Minimize Costly Downtime:</strong> Redundant server and ring topologies ensure networks keep running even if a cable breaks.
              </li>
              <li>
                <strong>Enhanced Machine Safety:</strong> ISO-13849 safety PLC designs (safety doors, emergency stops, light curtains).
              </li>
              <li>
                <strong>Actionable Insights:</strong> Historic and real-time SCADA dashboards tracking OEE (Overall Equipment Effectiveness).
              </li>
              <li>
                <strong>Optimal Batch Quality:</strong> Closed-loop PID calibrations keeping temperature, pressure, and flow rates within tight tolerances.
              </li>
            </ul>
          </div>

          <div className="service-sec__gallery-box">
            <h3 className="service-sec__subheading">System Architecture & Builds</h3>
            <div className="service-sec__gallery-grid">
              {GALLERY.map((g, idx) => (
                <div key={idx} className="service-sec__gallery-item">
                  <div className="service-sec__gallery-badge">System View {idx + 1}</div>
                  <h4 className="service-sec__gallery-title">{g.label}</h4>
                  <p className="service-sec__gallery-desc">{g.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Block */}
        <div className="service-sec__cta-block">
          <p className="service-sec__cta-text">Need to automate a process or optimize factory floor metrics?</p>
          <Link to="/contact" className="service-sec__cta-btn btn-ia">
            Consult an Automation Expert →
          </Link>
        </div>

      </div>
    </section>
  );
}
