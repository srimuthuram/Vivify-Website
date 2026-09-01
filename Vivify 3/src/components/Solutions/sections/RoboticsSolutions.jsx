import React from "react";
import { Link } from "react-router-dom";

const ROBOTIC_SYSTEMS = [
  {
    title: "Autonomous Mobile Robots (AMRs)",
    desc: "Self-navigating warehouse AMRs and AGVs with SLAM lidar navigation, payload capacities up to 1500kg, and automatic charging docks.",
    icon: "🚜"
  },
  {
    title: "Heavy Payload Articulated Arms",
    desc: "6-Axis industrial robotic arms programmed for heavy assembly, spot welding, and material transfer with millimeter repeatability.",
    icon: "🦾"
  },
  {
    title: "Cobots (Collaborative Robots)",
    desc: "Safe human-robot collaborative work cells featuring force-torque sensors and automatic collision stopping capabilities.",
    icon: "🤝"
  },
  {
    title: "Vision-Guided Bin Picking",
    desc: "3D camera visual perception allowing robotic grippers to pick randomly oriented parts from deep bins with collision avoidance.",
    icon: "👁️"
  }
];

export default function RoboticsSolutions() {
  return (
    <section id="robotics" className="solution-sec solution-sec--robotics">
      <div className="solution-sec__container">
        
        {/* Header */}
        <div className="solution-sec__header">
          <div className="solution-sec__badge solution-sec__badge--robotics">
            <span>Robotics Solutions</span>
          </div>
          <h2 className="solution-sec__heading">
            Autonomous Production Lines & Intelligent Robotic Cells
          </h2>
          <p className="solution-sec__intro">
            We empower manufacturing facilities with intelligent robotics solutions. 
            From autonomous mobile robots handling floor logistics to multi-axis articulated arms 
            and AI-guided vision cells, our robotics solutions maximize throughput and precision.
          </p>
        </div>

        {/* Overview & Systems */}
        <div className="solution-sec__grid">
          <div className="solution-sec__overview-box">
            <h3 className="solution-sec__subheading">End-to-End Robotic Automation</h3>
            <p className="solution-sec__text">
              Robotics solutions bridges the gap between raw hardware capabilities and custom factory environments. We design custom End-of-Arm Tooling (EOAT), simulate robotic reach trajectories using 3D CAD digital twins, and write robust safety control code.
            </p>
            <p className="solution-sec__text">
              Our deployments comply with ISO 10218 and RIA 15.06 industrial safety standards, incorporating perimeter fencing, light curtains, and safety interlocks.
            </p>
            <div className="solution-sec__specs">
              <span className="solution-sec__spec-tag">6-DOF Multi-Axis Arms</span>
              <span className="solution-sec__spec-tag">AMR / AGV Fleet Management</span>
              <span className="solution-sec__spec-tag">3D Vision Guidance</span>
            </div>
          </div>

          <div className="solution-sec__features-box">
            <h3 className="solution-sec__subheading">Robotic System Portfolio</h3>
            <div className="solution-sec__pillars-list">
              {ROBOTIC_SYSTEMS.map((s, idx) => (
                <div key={idx} className="solution-sec__pillar-item">
                  <div className="solution-sec__pillar-icon">{s.icon}</div>
                  <div>
                    <h4 className="solution-sec__pillar-title">{s.title}</h4>
                    <p className="solution-sec__pillar-desc">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Case Study & Benefits */}
        <div className="solution-sec__grid solution-sec__grid--reverse">
          <div className="solution-sec__case-study">
            <div className="solution-sec__case-tag">Featured Industry Solution</div>
            <h4 className="solution-sec__case-title">Automotive Chassis Welding Cell</h4>
            <p className="solution-sec__case-desc">
              Integrated a 4-robot synchronized welding cell with 3D vision weld seam tracking and automated AMR component loading.
            </p>
            <div className="solution-sec__case-stats">
              <div className="solution-sec__stat">
                <span className="solution-sec__stat-num">3.5x</span>
                <span className="solution-sec__stat-label">Throughput Increase</span>
              </div>
              <div className="solution-sec__stat">
                <span className="solution-sec__stat-num">0%</span>
                <span className="solution-sec__stat-label">Weld Defect Rate</span>
              </div>
            </div>
          </div>

          <div className="solution-sec__benefits">
            <h3 className="solution-sec__subheading">Core Operational Impact</h3>
            <ul className="solution-sec__benefits-list">
              <li><strong>Continuous 24/7 Operation:</strong> Lights-out manufacturing capabilities without worker fatigue.</li>
              <li><strong>Extreme Precision:</strong> Sub-millimeter position repeatability across millions of cycles.</li>
              <li><strong>Enhanced Workplace Safety:</strong> Removes human operators from high-risk welding, cutting, and chemical zones.</li>
              <li><strong>Rapid ROI:</strong> Significant labor cost savings and drastic reduction in scrap materials.</li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="solution-sec__cta-block">
          <p className="solution-sec__cta-text">Want to integrate industrial robots or AMRs into your facility?</p>
          <Link to="/contact" className="solution-sec__cta-btn btn-rb">
            Automate With Robotics →
          </Link>
        </div>

      </div>
    </section>
  );
}
