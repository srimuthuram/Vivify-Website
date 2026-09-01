import React, { useState } from "react";
import { Link } from "react-router-dom";

const TECHS = {
  frontend: ["React.js", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS", "HTML5/CSS3"],
  backend: ["Node.js", "Express", "Python", "Django", "FastAPI", "Go (Golang)"],
  database: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Elasticsearch"],
  devops: ["AWS", "Docker", "Kubernetes", "CI/CD Pipelines", "Terraform", "GitHub Actions"]
};

const PROCESS = [
  { name: "Discovery & Planning", desc: "Understanding scope, wireframing, and specifying requirements." },
  { name: "UI/UX Architecture", desc: "Crafting beautiful high-fidelity prototypes and layouts." },
  { name: "Agile Development", desc: "Writing clean, modular, test-driven codebase." },
  { name: "Rigorous QA", desc: "Unit testing, system integration tests, and security audits." },
  { name: "Deploy & Support", desc: "CI/CD automated deployment and proactive maintenance." }
];

export default function SoftwareDevelopment() {
  const [activeTab, setActiveTab] = useState("frontend");

  return (
    <section id="software" className="service-sec service-sec--software">
      <div className="service-sec__container">
        
        {/* Header Block */}
        <div className="service-sec__header">
          <div className="service-sec__badge service-sec__badge--software">
            <span>Software Development</span>
          </div>
          <h2 className="service-sec__heading">
            High-Performance Digital Engineering
          </h2>
          <p className="service-sec__intro">
            We architect and build tailored, secure, and highly scalable digital solutions. 
            From cloud-native enterprise ecosystems to responsive user-facing web applications, 
            our focus is on code quality, performance, and outstanding user experiences.
          </p>
        </div>

        {/* Overview & Features Grid */}
        <div className="service-sec__grid">
          <div className="service-sec__overview-box">
            <div className="service-sec__image-wrapper">
              <img 
                src="/images/services/software-development.jpg"
                alt="Software Development Team Working"
                className="service-sec__image"
                loading="lazy"
              />
            </div>
            <h3 className="service-sec__subheading">Overview</h3>
            <p className="service-sec__text">
              Our software engineering teams bring deep technical expertise to translate complex business needs 
              into high-performing products. We build software that eliminates operational friction, automates manual workflows, 
              and grows seamlessly along with your business demands.
            </p>
            <div className="service-sec__key-points">
              <div className="service-sec__point">
                <span className="service-sec__point-icon">✓</span>
                <span>Custom-tailored business logic</span>
              </div>
              <div className="service-sec__point">
                <span className="service-sec__point-icon">✓</span>
                <span>Security-first coding standards</span>
              </div>
              <div className="service-sec__point">
                <span className="service-sec__point-icon">✓</span>
                <span>Scale-ready, modular architecture</span>
              </div>
            </div>
          </div>

          <div className="service-sec__features-box">
            <h3 className="service-sec__subheading">Key Features</h3>
            <div className="service-sec__features-grid">
              <div className="service-sec__feat-card">
                <h4 className="service-sec__feat-title">Custom Dashboards</h4>
                <p className="service-sec__feat-desc">Interactive, real-time analytics portals tailored to your KPIs.</p>
              </div>
              <div className="service-sec__feat-card">
                <h4 className="service-sec__feat-title">Secure Databases</h4>
                <p className="service-sec__feat-desc">Fault-tolerant database schemas with optimized query performance.</p>
              </div>
              <div className="service-sec__feat-card">
                <h4 className="service-sec__feat-title">Enterprise APIs</h4>
                <p className="service-sec__feat-desc">High-throughput RESTful & GraphQL interfaces for seamless integration.</p>
              </div>
              <div className="service-sec__feat-card">
                <h4 className="service-sec__feat-title">Cloud Native</h4>
                <p className="service-sec__feat-desc">Serverless and containerized microservices ready for cloud scale.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Technologies Tab Layout */}
        <div className="service-sec__techs">
          <h3 className="service-sec__subheading text-center">Technologies Used</h3>
          <div className="service-sec__tab-headers">
            {Object.keys(TECHS).map((tab) => (
              <button
                key={tab}
                className={`service-sec__tab-btn ${activeTab === tab ? "service-sec__tab-btn--active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="service-sec__tab-content">
            {TECHS[activeTab].map((tech) => (
              <span key={tech} className="service-sec__tech-tag">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Development Process */}
        <div className="service-sec__process-sec">
          <h3 className="service-sec__subheading text-center">Development Process</h3>
          <div className="service-sec__process-timeline">
            {PROCESS.map((p, idx) => (
              <div key={idx} className="service-sec__process-card">
                <h4 className="service-sec__process-title">{p.name}</h4>
                <p className="service-sec__process-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits & Case Study Grid */}
        <div className="service-sec__grid service-sec__grid--reverse">
          <div className="service-sec__case-study">
            <div className="service-sec__case-tag">Featured Case Study</div>
            <h4 className="service-sec__case-title">Smart Logistics & ERP Platform</h4>
            <p className="service-sec__case-desc">
              Developed a unified fleet dispatch and inventory ERP platform for a leading national logistics firm, integrating IoT tracking nodes and automated billing modules.
            </p>
            <div className="service-sec__case-stats">
              <div className="service-sec__stat">
                <span className="service-sec__stat-num">+40%</span>
                <span className="service-sec__stat-label">Operational Speed</span>
              </div>
              <div className="service-sec__stat">
                <span className="service-sec__stat-num">-25%</span>
                <span className="service-sec__stat-label">Fuel Dispatch Idle Time</span>
              </div>
            </div>
          </div>

          <div className="service-sec__benefits">
            <h3 className="service-sec__subheading">Business Benefits</h3>
            <ul className="service-sec__benefits-list">
              <li>
                <strong>Complete IP Ownership:</strong> Fully custom-built applications with 100% intellectual property rights.
              </li>
              <li>
                <strong>Zero Licensing Bloat:</strong> Eliminate vendor lock-in and high recurring licensing fees of off-the-shelf software.
              </li>
              <li>
                <strong>Proactive Cybersecurity:</strong> Penetration tested code architecture defending against key web vulnerabilities.
              </li>
              <li>
                <strong>Future-Proof Coding:</strong> Easy-to-maintain code matching React & industry best-practices.
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Block */}
        <div className="service-sec__cta-block">
          <p className="service-sec__cta-text">Have a software project in mind? Let's collaborate.</p>
          <Link to="/contact" className="service-sec__cta-btn btn-sw">
            Start Your Software Project →
          </Link>
        </div>

      </div>
    </section>
  );
}
