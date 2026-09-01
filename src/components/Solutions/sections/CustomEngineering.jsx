import React from "react";
import { Link } from "react-router-dom";

const RND_PHASES = [
  { step: "01", title: "Feasibility & CAD Modeling", desc: "Kinematic simulations, finite element analysis (FEA), and mechanical load verification." },
  { step: "02", title: "Custom PCB & Embedded Design", desc: "Design of specialized electronic controller boards, microcontrollers, and sensor interfaces." },
  { step: "03", title: "Prototyping & Rig Fabrication", desc: "In-house CNC machining, 3D printing, structural framing, and wiring assembly." },
  { step: "04", title: "HIL Testing & Deployment", desc: "Hardware-in-the-loop stress testing, software validation, and site commissioning." }
];

export default function CustomEngineering() {
  return (
    <section id="custom" className="solution-sec solution-sec--custom">
      <div className="solution-sec__container">
        
        {/* Header */}
        <div className="solution-sec__header">
          <div className="solution-sec__badge solution-sec__badge--custom">
            <span>Custom Engineering</span>
          </div>
          <h2 className="solution-sec__heading">
            Bespoke R&D, Hardware Prototyping & Special Machinery
          </h2>
          <p className="solution-sec__intro">
            When off-the-shelf equipment fails to meet unique industrial challenges, our custom engineering team steps in. 
            We design, prototype, and build specialized machinery, custom PCB embedded electronics, 
            and proprietary testing rigs tailored specifically to your operational demands.
          </p>
        </div>

        {/* Overview & Phases */}
        <div className="solution-sec__grid">
          <div className="solution-sec__overview-box">
            <h3 className="solution-sec__subheading">Tailored Innovation & IP Development</h3>
            <p className="solution-sec__text">
              Every breakthrough production process begins with custom engineering. We work closely with client R&D teams to translate non-standard physical requirements into high-performance working machinery.
            </p>
            <p className="solution-sec__text">
              Clients retain 100% intellectual property ownership over custom builds, giving them a distinct technical advantage and proprietary edge over competitors.
            </p>
            <div className="solution-sec__specs">
              <span className="solution-sec__spec-tag">100% Client IP Ownership</span>
              <span className="solution-sec__spec-tag">Full Mechanical & Electrical CAD</span>
              <span className="solution-sec__spec-tag">Custom Embedded Controllers</span>
            </div>
          </div>

          <div className="solution-sec__features-box">
            <h3 className="solution-sec__subheading">Custom Engineering Lifecycle</h3>
            <div className="solution-sec__pillars-list">
              {RND_PHASES.map((p) => (
                <div key={p.step} className="solution-sec__pillar-item">
                  <div className="solution-sec__pillar-icon">{p.step}</div>
                  <div>
                    <h4 className="solution-sec__pillar-title">{p.title}</h4>
                    <p className="solution-sec__pillar-desc">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Case Study & Benefits */}
        <div className="solution-sec__grid solution-sec__grid--reverse">
          <div className="solution-sec__case-study">
            <div className="solution-sec__case-tag">Featured R&D Build</div>
            <h4 className="solution-sec__case-title">High-Speed Micro-Part Sorter</h4>
            <p className="solution-sec__case-desc">
              Engineered a custom high-speed optical sorting machine for miniature medical pins using custom pneumatic ejectors and ultra-fast line-scan vision.
            </p>
            <div className="solution-sec__case-stats">
              <div className="solution-sec__stat">
                <span className="solution-sec__stat-num">1,200</span>
                <span className="solution-sec__stat-label">Parts / Minute Sorted</span>
              </div>
              <div className="solution-sec__stat">
                <span className="solution-sec__stat-num">±5 µm</span>
                <span className="solution-sec__stat-label">Dimensional Tolerance</span>
              </div>
            </div>
          </div>

          <div className="solution-sec__benefits">
            <h3 className="solution-sec__subheading">Why Choose Custom Engineering</h3>
            <ul className="solution-sec__benefits-list">
              <li><strong>Zero Compromise:</strong> Designed strictly around your precise physical constraints and cycle times.</li>
              <li><strong>Proprietary Advantage:</strong> Own custom patents and hardware designs that competitors cannot buy off the shelf.</li>
              <li><strong>Seamless System Integration:</strong> Connects directly into existing plant ERPs, SCADA, or legacy control panels.</li>
              <li><strong>Complete Documentation:</strong> Full engineering schematics, bill of materials (BOM), and operator manuals.</li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="solution-sec__cta-block">
          <p className="solution-sec__cta-text">Have a unique engineering challenge or need a custom machine prototype?</p>
          <Link to="/contact" className="solution-sec__cta-btn btn-custom">
            Discuss Custom Engineering Needs →
          </Link>
        </div>

      </div>
    </section>
  );
}
