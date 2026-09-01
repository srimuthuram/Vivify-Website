import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import "./Careers.css";

const CULTURE_VALUES = [
  {
    title: "Growth Opportunities",
    description: "Continuous learning, mentorship tracks, and sponsorships for industry certifications (Siemens TIA, Cisco, AWS).",
    icon: "📈",
    accent: "#2865EB"
  },
  {
    title: "Competitive Compensation",
    description: "Market-leading salary packages, annual performance bonuses, and project milestone incentives.",
    icon: "💰",
    accent: "#059669"
  },
  {
    title: "Work-Life Balance",
    description: "Flexible hybrid schedules, wellness days, and supportive team culture that respects personal boundaries.",
    icon: "⚖️",
    accent: "#7c3aed"
  },
  {
    title: "Innovation Culture",
    description: "Work on cutting-edge Industry 4.0 projects involving robotics, IIoT, AI-based vision, and smart factory ecosystems.",
    icon: "💡",
    accent: "#d97706"
  }
];

const OPEN_POSITIONS = [
  {
    id: 1,
    title: "Senior Automation Engineer",
    location: "Chennai",
    type: "Full-time",
    department: "Industrial Automation",
    description: "Lead PLC/SCADA automation projects across Siemens TIA Portal and Allen-Bradley platforms for critical manufacturing clients.",
    skills: ["TIA Portal", "Ladder Logic", "SCADA HMI", "Industrial Networks"]
  },
  {
    id: 2,
    title: "IT Infrastructure Specialist",
    location: "Chennai",
    type: "Full-time",
    department: "IT & Networking",
    description: "Design enterprise network topologies, manage firewall configurations, deploy enterprise Wi-Fi, and run 24/7 monitoring dashboards.",
    skills: ["Cisco IOS", "Fortinet", "VLAN Design", "Zabbix/PRTG"]
  },
  {
    id: 3,
    title: "Project Manager — MEP/ELV",
    location: "Dubai, UAE",
    type: "Full-time",
    department: "ELV & Building Systems",
    description: "Oversee multi-site ELV installations including CCTV, fire safety, access control, and BMS system integrations across the Middle East.",
    skills: ["BMS Integration", "EN54 Fire Safety", "Client Stakeholder Mgmt", "MS Project"]
  },
  {
    id: 4,
    title: "Security Systems Engineer",
    location: "Chennai",
    type: "Full-time",
    department: "Security & Surveillance",
    description: "Design IP CCTV camera layouts, program NVR recording schedules, and commission biometric access control panels.",
    skills: ["Milestone VMS", "HikCentral", "IP Camera Design", "Access Control Panels"]
  }
];

export default function Careers() {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(badgeRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.2
      )
      .fromTo(headingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7 },
        0.3
      )
      .fromTo(descriptionRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.4
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="careers-page">
      
      {/* Split Hero Header */}
      <section className="careers-hero">
        <div className="careers-hero__container">
          <div className="careers-hero__text-col">
            <div className="careers-hero__badge" ref={badgeRef}>
              <span className="careers-hero__badge-dot" aria-hidden="true" />
              We're Hiring Engineers
            </div>
            <h1 className="careers-hero__heading" ref={headingRef}>
              Build the <span>Future</span> of<br /><span>Industrial Automation</span>
            </h1>
            <p className="careers-hero__description" ref={descriptionRef}>
              Join a team that engineers data centres, programs robotic welding cells, and deploys 
              enterprise networks across airports and seaports nationwide. We're always looking for 
              exceptional engineering talent.
            </p>
          </div>
        </div>
      </section>

      {/* Culture Values - Feature List */}
      <section className="careers-culture">
        <div className="careers-hero__container">
          <h2 className="careers-culture__heading">Why Build Your Career at Vivify?</h2>
          <div className="careers-culture__list">
            {CULTURE_VALUES.map((val, idx) => (
              <div 
                key={idx} 
                className="careers-culture__item"
                style={{ '--accent': val.accent, '--delay': idx * 0.15 }}
              >
                <div className="careers-culture__item-icon">{val.icon}</div>
                <div className="careers-culture__item-content">
                  <h3 className="careers-culture__item-title">{val.title}</h3>
                  <p className="careers-culture__item-desc">{val.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions - Card Style */}
      <section className="careers-positions">
        <div className="careers-hero__container">
          <div className="careers-positions__header">
            <h2 className="careers-positions__title">Open Engineering Positions</h2>
            <p className="careers-positions__subtitle">Browse our current openings</p>
          </div>

          <div className="careers-positions__grid">
            {OPEN_POSITIONS.map((pos, idx) => (
              <div 
                key={pos.id}
                className="careers-position-card"
                style={{ '--delay': idx * 0.1 }}
              >
                <div className="careers-position-card__header">
                  <h3 className="careers-position-card__title">{pos.title}</h3>
                  <div className="careers-position-card__tags">
                    <span className="careers-position-card__tag">📍 {pos.location}</span>
                    <span className="careers-position-card__tag">� {pos.type}</span>
                  </div>
                </div>
                <p className="careers-position-card__desc">{pos.description}</p>
                <div className="careers-position-card__skills">
                  <span className="careers-position-card__skills-label">Required Skills:</span>
                  <div className="careers-position-card__skill-tags">
                    {pos.skills.map((sk, i) => (
                      <span key={i} className="careers-position-card__skill">{sk}</span>
                    ))}
                  </div>
                </div>
                <div className="careers-position-card__footer">
                  <span className="careers-position-card__dept">🔧 {pos.department}</span>
                  <Link to="/contact" className="careers-position-card__apply-btn">Apply →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Application CTA */}
      <section className="careers-cta">
        <div className="careers-hero__container">
          <div className="careers-cta__box">
            <div className="careers-cta__content">
              <h2 className="careers-cta__heading">Don't see a matching role?</h2>
              <p className="careers-cta__text">
                We're always interested in passionate engineers. Send us your resume and we'll reach out when a fitting opportunity opens.
              </p>
            </div>
            <Link to="/contact" className="careers-cta__btn">
              Submit Open Application →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
