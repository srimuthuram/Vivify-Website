import React from "react";
import { Link } from "react-router-dom";

const SMART_MODULES = [
  {
    title: "Real-Time OEE Analytics",
    desc: "Live equipment dashboards tracking Overall Equipment Effectiveness (Availability, Performance, Quality) with automated downtime logging."
  },
  {
    title: "AI Predictive Maintenance",
    desc: "Wireless IIoT vibration and temperature sensors feeding ML models to detect bearing wear and motor overheating before failures occur."
  },
  {
    title: "Edge Gateway & Historian",
    desc: "High-throughput industrial edge computing logging millions of tag parameters per second to secure cloud and local time-series databases."
  },
  {
    title: "Digital Twin & MES Integration",
    desc: "Full factory Digital Twin mapping physical shop floors to Manufacturing Execution Systems (MES) for batch scheduling and paperless tracking."
  }
];

export default function SmartFactorySolutions() {
  return (
    <section id="smartfactory" className="solution-sec solution-sec--smartfactory">
      <div className="solution-sec__container">
        
        {/* Header */}
        <div className="solution-sec__header">
          <div className="solution-sec__badge solution-sec__badge--smartfactory">
            <span>Smart Factory Solutions</span>
          </div>
          <h2 className="solution-sec__heading">
            Connected Industry 4.0 Ecosystems & Real-Time Intelligence
          </h2>
          <p className="solution-sec__intro">
            Transform traditional shop floors into intelligent, data-driven smart factories. 
            By connecting machines via IIoT gateways, deploying predictive maintenance AI, and building 
            unified SCADA/MES dashboards, we give leadership total visibility over production efficiency.
          </p>
        </div>

        {/* Overview & Modules */}
        <div className="solution-sec__grid">
          <div className="solution-sec__overview-box">
            <h3 className="solution-sec__subheading">Industry 4.0 Transformation</h3>
            <p className="solution-sec__text">
              Smart Factory solutions bridge legacy equipment and modern cloud analytics. We install non-intrusive sensor arrays on existing CNCs, conveyors, and stamping presses to harvest telemetry without interrupting daily production.
            </p>
            <p className="solution-sec__text">
              Our architecture securely routes data across OT (Operational Technology) network zones to IT dashboards, giving plant managers instantaneous insights into machine utilization and energy consumption.
            </p>
            <div className="solution-sec__specs">
              <span className="solution-sec__spec-tag">IIoT Edge Connectivity</span>
              <span className="solution-sec__spec-tag">OPC UA & MQTT Protocols</span>
              <span className="solution-sec__spec-tag">Cloud & On-Prem Dashboards</span>
            </div>
          </div>

          <div className="solution-sec__features-box">
            <h3 className="solution-sec__subheading">Smart Factory Architecture</h3>
            <div className="solution-sec__pillars-list">
              {SMART_MODULES.map((m, idx) => (
                <div key={idx} className="solution-sec__pillar-item">
                  <div>
                    <h4 className="solution-sec__pillar-title">{m.title}</h4>
                    <p className="solution-sec__pillar-desc">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Case Study & Benefits */}
        <div className="solution-sec__grid solution-sec__grid--reverse">
          <div className="solution-sec__case-study">
            <div className="solution-sec__case-tag">Featured Industry 4.0 Deployment</div>
            <h4 className="solution-sec__case-title">Connected Electronics Plant</h4>
            <p className="solution-sec__case-desc">
              Digitized an 8-line electronics manufacturing facility with 250+ IIoT sensor nodes, automated OEE dashboards, and real-time scrap tracking.
            </p>
            <div className="solution-sec__case-stats">
              <div className="solution-sec__stat">
                <span className="solution-sec__stat-num">-35%</span>
                <span className="solution-sec__stat-label">Unplanned Downtime</span>
              </div>
              <div className="solution-sec__stat">
                <span className="solution-sec__stat-num">+22%</span>
                <span className="solution-sec__stat-label">Plant Overall OEE</span>
              </div>
            </div>
          </div>

          <div className="solution-sec__benefits">
            <h3 className="solution-sec__subheading">Strategic Business Impact</h3>
            <ul className="solution-sec__benefits-list">
              <li><strong>Complete Shop Floor Visibility:</strong> View live machine states and order progression from any browser or tablet.</li>
              <li><strong>Zero Unplanned Machine Breakdowns:</strong> AI predictive maintenance detects anomalies days before catastrophic failure.</li>
              <li><strong>Paperless Quality Traceability:</strong> Automated serial number logging with complete environmental telemetry.</li>
              <li><strong>Lower Energy Costs:</strong> Track peak electrical loads and shut down idling machinery automatically.</li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="solution-sec__cta-block">
          <p className="solution-sec__cta-text">Ready to transform your plant into a connected Smart Factory?</p>
          <Link to="/contact" className="solution-sec__cta-btn btn-sf">
            Build Your Smart Factory →
          </Link>
        </div>

      </div>
    </section>
  );
}
