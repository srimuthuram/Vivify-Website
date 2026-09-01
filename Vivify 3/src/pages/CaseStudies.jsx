import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import SpecularCard from "../components/SpecularCard/SpecularCard";
import "./CaseStudies.css";

const CATEGORIES = ["All", "Infrastructure", "Automation", "Security", "IT Services", "Material Handling", "Building Systems"];

const CASE_STUDIES_DATA = [
  {
    id: 1,
    title: "Enterprise Data Centre Automation & Power Monitoring",
    category: "Infrastructure",
    client: "Regional Banking Financial Data Center",
    metricNum: "-40%",
    metricLabel: "Operational Energy Cost",
    description: "Architected a Tier-III compliant server room with N+1 UPS power redundancy, precision CRAC cooling, and high-density fiber patching.",
    deliverables: ["DCIM Thermal Telemetry", "Hot/Cold Aisle Containment", "99.999% Guaranteed Uptime"]
  },
  {
    id: 2,
    title: "Multi-Axis Robotic Welding & Stacking Assembly Cell",
    category: "Automation",
    client: "Tier-1 Automotive OEM Manufacturer",
    metricNum: "+60%",
    metricLabel: "Assembly Line Speed",
    description: "Deployed 6-axis Fanuc and KUKA industrial robotic arms integrated with 3D vision weld seam tracking and automated AMR component loading.",
    deliverables: ["Sub-millimeter Seam Accuracy", "0% Welding Defect Rate", "Lights-Out 24/7 Production"]
  },
  {
    id: 3,
    title: "500+ Employee Facility Integrated CCTV & Access Control",
    category: "Security",
    client: "High-Security Manufacturing Campus",
    metricNum: "100%",
    metricLabel: "Access Log Verification",
    description: "Installed a high-definition IP camera network with Milestone VMS software, biometric fingerprint entry doors, and automated vehicle boom barriers.",
    deliverables: ["Biometric & RFID Barriers", "ANPR Plate Recognition", "Centralized Guard Ops Dashboard"]
  },
  {
    id: 4,
    title: "Corporate Network Infrastructure Overhaul & Fiber Uplinks",
    category: "IT Services",
    client: "Enterprise Corporate Headquarters",
    metricNum: "10 Gbps",
    metricLabel: "Fiber Backbone Speed",
    description: "Designed a multi-site network topology using Cisco switches, Fortinet next-gen firewalls, and enterprise Ubiquiti mesh Wi-Fi 6 coverage.",
    deliverables: ["VLAN Security Segmentation", "Zero Packet Drop Roaming", "24/7 SNMP Health Monitoring"]
  },
  {
    id: 5,
    title: "High-Speed Powered Roller Conveyor System",
    category: "Material Handling",
    client: "National E-Commerce Fulfillment Hub",
    metricNum: "1,000+",
    metricLabel: "Cartons / Hour Handled",
    description: "Engineered 24V motorized roller conveyor tracks featuring zero-pressure accumulation (ZPA) to prevent box collisions during peak dispatch.",
    deliverables: ["ZPA Buffer Control", "PLC Automated Sorting", "Energy Saving Motor Drives"]
  },
  {
    id: 6,
    title: "Smart Building ELV & Addressable Fire Safety Integration",
    category: "Building Systems",
    client: "Commercial High-Rise Complex",
    metricNum: "EN54",
    metricLabel: "Certified Safety Compliance",
    description: "Integrated Extra Low Voltage (ELV) networks linking addressable fire alarm detectors, multi-zone PA announcement speakers, and BACnet BMS control.",
    deliverables: ["Zone Audio Paging", "Automated Smoke Extraction", "BACnet BMS Synchronization"]
  }
];

export default function CaseStudies() {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);

  const [activeCategory, setActiveCategory] = useState("All");

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

  const filteredStudies = activeCategory === "All"
    ? CASE_STUDIES_DATA
    : CASE_STUDIES_DATA.filter(cs => cs.category === activeCategory);

  return (
    <div ref={sectionRef} className="case-studies-portfolio">
      
      {/* Hero Header */}
      <section className="case-studies-hero">
        <img 
          src="/images/casestudies.png" 
          alt="Case Studies Background" 
          className="case-studies-hero__bg-image"
          loading="eager"
          fetchPriority="high"
        />
        <div className="case-studies-hero__container">
          <div className="case-studies-hero__badge" ref={badgeRef}>
            <span className="case-studies-hero__badge-dot" aria-hidden="true" />
            Client Success & ROI Proven
          </div>
          <h1 className="case-studies-hero__heading" ref={headingRef}>
            <span>Engineering</span> Case Studies & Results
          </h1>
          <p className="case-studies-hero__description" ref={descriptionRef}>
            Explore real-world engineering deployments where Vivify Technocrats delivered quantifiable efficiency gains, 99.999% uptime, and cost reductions across industries.
          </p>

          {/* Additional Content */}
          <div className="case-studies-hero__content">
            <p className="case-studies-hero__subtext">
              From enterprise data centers to automated manufacturing lines, our case studies demonstrate measurable ROI across diverse industries. Each project showcases our commitment to precision engineering, reliability, and operational excellence.
            </p>
            <p className="case-studies-hero__subtext">
              We've helped clients achieve significant cost savings, improve system uptime to 99.999%, and streamline operations through smart automation solutions. Browse our success stories to see how we can transform your infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies Portfolio - Stacked Sticky Layout */}
      <section className="case-studies-grid-sec">
        <div className="case-studies-hero__container">
          <div className="case-studies-stack">
            {filteredStudies.map((study, index) => (
              <SpecularCard
                key={study.id}
                radius={20}
                lineColor="#2865EB"
                baseColor="#0f172a"
                intensity={1}
                shineSize={10}
                shineFade={40}
                thickness={1}
                speed={0.35}
                followMouse
                proximity={250}
                autoAnimate={false}
                className="case-study-card-sticky"
              >
                <div className="case-study-card-sticky__metric">
                  <span className="case-study-card-sticky__metric-num">{study.metricNum}</span>
                  <span className="case-study-card-sticky__metric-lbl">{study.metricLabel}</span>
                </div>
                <div className="case-study-card-sticky__content">
                  <span className="case-study-card-sticky__category">{study.category}</span>
                  <h3 className="case-study-card-sticky__title">{study.title}</h3>
                  <p className="case-study-card-sticky__client">{study.client}</p>
                  <p className="case-study-card-sticky__desc">{study.description}</p>
                  <div className="case-study-card-sticky__deliverables">
                    {study.deliverables.map((item, idx) => (
                      <span key={idx} className="case-study-card-sticky__deliverable">{item}</span>
                    ))}
                  </div>
                  <Link to="/contact" className="case-study-card-sticky__link">Inquire Similar Implementation →</Link>
                </div>
              </SpecularCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="case-studies-cta">
        <div className="case-studies-hero__container">
          <div className="case-studies-cta__box">
            <h2 className="case-studies-cta__heading">
              Have a complex engineering challenge? Let's write your success story.
            </h2>
            <Link to="/contact" className="case-studies-cta__btn">
              Discuss Your Project Requirements →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
