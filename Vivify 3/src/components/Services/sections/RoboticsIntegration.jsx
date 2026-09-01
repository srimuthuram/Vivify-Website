import React from "react";
import { Link } from "react-router-dom";

const APPS = [
  { title: "Pick & Place / Sorting", desc: "High-speed delta robots sorting items from conveyor belts with camera indexing." },
  { title: "Palletizing & Packaging", desc: "Heavy-payload robot systems stacking boxes, bags, or drums onto pallets efficiently." },
  { title: "Robotic Welding", desc: "Precision MIG/TIG welding cells with coordinated positioners for robust joints." },
  { title: "Machine Tending", desc: "Automated loading and unloading of CNC mills, lathes, and injection mold machines." }
];

export default function RoboticsIntegration() {
  return (
    <section id="robotics" className="service-sec service-sec--robotics">
      <div className="service-sec__container">
        
        {/* Header Block */}
        <div className="service-sec__header">
          <div className="service-sec__badge service-sec__badge--robotics">
            <span>Robotics Integration</span>
          </div>
          <h2 className="service-sec__heading">
            Precision Robotic Engineering & Vision Automation
          </h2>
          <p className="service-sec__intro">
            We integrate advanced robotic systems to automate dangerous, repetitive, or highly precise tasks. 
            By combining multi-axis robotic arms, smart vision inspection systems, and intelligent motion algorithms, 
            we accelerate throughput and eliminate human error.
          </p>
        </div>

        {/* Tech pillars: Robot Programming, Vision Systems, AI Integration */}
        <div className="service-sec__pillars">
          <div className="service-sec__pillar-card">
            <div className="service-sec__pillar-image-wrapper">
              <img 
                src="/images/services/robot-programming.jpg"
                alt="Industrial Robot Arm"
                className="service-sec__pillar-image"
                loading="lazy"
              />
            </div>
            <div className="service-sec__pillar-num">01</div>
            <h3 className="service-sec__pillar-title">Robot Programming</h3>
            <p className="service-sec__pillar-text">
              Expert configuration and optimization for industrial robot brands including <strong>Fanuc</strong> (Karel/TP), 
              <strong>ABB</strong> (RAPID), <strong>KUKA</strong> (KRL), and <strong>Universal Robots</strong> (URScript). 
              We calculate precise kinematics, prevent collisions, and optimize cycles to save precious fractions of seconds.
            </p>
          </div>

          <div className="service-sec__pillar-card">
            <div className="service-sec__pillar-image-wrapper">
              <img 
                src="/images/services/vision-systems.jpg"
                alt="Vision System Technology"
                className="service-sec__pillar-image"
                loading="lazy"
              />
            </div>
            <div className="service-sec__pillar-num">02</div>
            <h3 className="service-sec__pillar-title">Vision Systems</h3>
            <p className="service-sec__pillar-text">
              We integrate high-definition 2D & 3D industrial smart cameras (Cognex, Keyence) for robotic guidance. 
              This allows robots to identify dynamic object coordinates, inspect physical dimensions, verify assembly completeness, 
              and sort components on fast-moving conveyors.
            </p>
          </div>

          <div className="service-sec__pillar-card">
            <div className="service-sec__pillar-image-wrapper">
              <img 
                src="/images/services/ai-integration.jpg"
                alt="AI Integration in Robotics"
                className="service-sec__pillar-image"
                loading="lazy"
              />
            </div>
            <div className="service-sec__pillar-num">03</div>
            <h3 className="service-sec__pillar-title">AI Integration</h3>
            <p className="service-sec__pillar-text">
              We elevate standard robotic routines using artificial intelligence. Our AI modules enable smart path planning 
              for non-uniform items, predictive maintenance of robot joints based on torque analytics, and self-learning 
              adaptations to changes in physical warehouse layouts.
            </p>
          </div>
        </div>

        {/* Applications Grid */}
        <div className="service-sec__apps-block">
          <h3 className="service-sec__subheading text-center">Core Robotic Applications</h3>
          <div className="service-sec__apps-grid">
            {APPS.map((app, idx) => (
              <div key={idx} className="service-sec__app-card">
                <h4 className="service-sec__app-title">{app.title}</h4>
                <p className="service-sec__app-desc">{app.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Block */}
        <div className="service-sec__cta-block">
          <p className="service-sec__cta-text">Looking to integrate robotic arms or smart vision in your process line?</p>
          <Link to="/contact" className="service-sec__cta-btn btn-rb">
            Discuss Robotics Options →
          </Link>
        </div>

      </div>
    </section>
  );
}
