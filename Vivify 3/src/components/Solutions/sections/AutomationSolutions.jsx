import React from "react";
import { Link } from "react-router-dom";

const AUTOMATION_FEATURES = [
  {
    title: "Multi-Vendor PLC Engineering",
    desc: "Custom ladder logic, structured text, and function block programming for Siemens, Allen-Bradley, Schneider, and Mitsubishi controllers."
  },
  {
    title: "SCADA & Telemetry Systems",
    desc: "Interactive SCADA control panels with historical trending, alarm management, SQL logging, and web-based remote telemetry."
  },
  {
    title: "Precision Control Panels",
    desc: "UL/CE certified panel builds with surge protection, VFD drive integration, safety relays, and organized wire trunking."
  },
  {
    title: "Closed-Loop Process Tuning",
    desc: "PID tuning and flow/pressure sensor calibration ensuring consistent liquid batching, furnace heating, and chemical mixing."
  }
];

export default function AutomationSolutions() {
  return (
    <section id="automation" className="solution-sec solution-sec--automation">
      <div className="solution-sec__container">
        
        {/* Header */}
        <div className="solution-sec__header">
          <div className="solution-sec__badge solution-sec__badge--automation">
            <span>Automation Solutions</span>
          </div>
          <h2 className="solution-sec__heading">
            Industrial Control Systems & High-Precision Automation
          </h2>
          <p className="solution-sec__intro">
            We engineer robust automation solutions that streamline complex industrial processes. 
            From custom PLC logic and SCADA supervisory control to control panel fabrication and VFD drive tuning, 
            our solutions maximize plant uptime and process stability.
          </p>
        </div>

        {/* Overview & Features */}
        <div className="solution-sec__grid">
          <div className="solution-sec__overview-box">
            <h3 className="solution-sec__subheading">Turnkey Process Control</h3>
            <p className="solution-sec__text">
              Automation solutions require deep domain knowledge across electrical engineering, sensor instrumentation, and safety regulation. Our engineers design control architectures that eliminate manual operator error and ensure continuous 24/7 output.
            </p>
            <p className="solution-sec__text">
              Every system is thoroughly FAT (Factory Acceptance Test) tested in-house before field installation to guarantee smooth commissioning and minimal plant shutdown time.
            </p>
            <div className="solution-sec__specs">
              <span className="solution-sec__spec-tag">IEC 61131-3 Standard Code</span>
              <span className="solution-sec__spec-tag">Redundant Industrial Ring Networks</span>
              <span className="solution-sec__spec-tag">SIL-3 Safety Certification</span>
            </div>
          </div>

          <div className="solution-sec__features-box">
            <h3 className="solution-sec__subheading">Engineering Capabilities</h3>
            <div className="solution-sec__pillars-list">
              {AUTOMATION_FEATURES.map((f, idx) => (
                <div key={idx} className="solution-sec__pillar-item">
                  <div>
                    <h4 className="solution-sec__pillar-title">{f.title}</h4>
                    <p className="solution-sec__pillar-desc">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Case Study & Benefits */}
        <div className="solution-sec__grid solution-sec__grid--reverse">
          <div className="solution-sec__case-study">
            <div className="solution-sec__case-tag">Featured Automation Project</div>
            <h4 className="solution-sec__case-title">Water Treatment Plant SCADA</h4>
            <p className="solution-sec__case-desc">
              Automated a regional water treatment facility with 12 remote PLC outstations linked via fiber ring network to a central SCADA dashboard.
            </p>
            <div className="solution-sec__case-stats">
              <div className="solution-sec__stat">
                <span className="solution-sec__stat-num">100%</span>
                <span className="solution-sec__stat-label">Automated Dosing Accuracy</span>
              </div>
              <div className="solution-sec__stat">
                <span className="solution-sec__stat-num">24/7</span>
                <span className="solution-sec__stat-label">Unattended Operation</span>
              </div>
            </div>
          </div>

          <div className="solution-sec__benefits">
            <h3 className="solution-sec__subheading">Key System Advantages</h3>
            <ul className="solution-sec__benefits-list">
              <li><strong>Repeatable Product Quality:</strong> Eliminates batch variation with tight closed-loop PID control.</li>
              <li><strong>Enhanced Machinery Safety:</strong> Dedicated safety PLCs for emergency stops and light curtains.</li>
              <li><strong>Clear Operational Insights:</strong> Intuitive HMI screens display clear graphical diagnostics and alarms.</li>
              <li><strong>Reduced Utility Expenses:</strong> Variable frequency drives optimize pump and motor energy consumption.</li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="solution-sec__cta-block">
          <p className="solution-sec__cta-text">Need to automate a process line or upgrade existing SCADA control panels?</p>
          <Link to="/contact" className="solution-sec__cta-btn btn-ia">
            Optimize Factory Control →
          </Link>
        </div>

      </div>
    </section>
  );
}
