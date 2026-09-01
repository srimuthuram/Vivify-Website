import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Products.css";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ["All Products", "Conveyors", "Security & Surveillance", "Public Address & Barriers"];

const PRODUCTS_DATA = [
  {
    id: "cctv",
    category: "Security & Surveillance",
    title: "Professional IP CCTV Surveillance",
    tag: "High-Definition VMS",
    description: "4K ultra-HD IP camera networks with night vision, thermal motion masking, and centralized Milestone/HikCentral server recording.",
    image: "/images/products/cctv-new.jpg",
    specs: {
      resolution: "4K UHD (3840 x 2160)",
      frameRate: "60 FPS",
      protection: "IP67 Weatherproof / IK10 Vandal-Proof",
      storage: "NVR Raid 5 / Cloud Hybrid",
      warranty: "3 Years Comprehensive"
    }
  },
  {
    id: "roller",
    category: "Conveyors",
    title: "Heavy-Duty Roller Conveyor",
    tag: "Industrial Logistics",
    description: "Robust structural steel roller conveyor modules designed for palleted freight transfer and automated sorting lines.",
    image: "/images/products/roller-conveyor-new.jpg",
    specs: {
      loadCapacity: "Up to 2,000 kg / meter",
      rollerDiameter: "76mm / 89mm Heavy Steel",
      speed: "Variable 5 - 45 m/min",
      control: "PLC Integrated Sensor Stop",
      warranty: "2 Years Heavy Industrial"
    }
  },
  {
    id: "gravity",
    category: "Conveyors",
    title: "Gravity Roller Conveyor Lines",
    tag: "Zero-Power Transport",
    description: "Cost-effective unpowered conveyor track sections engineered with precision ball-bearing rollers for smooth unassisted carton flow.",
    image: "/images/products/gravity-conveyor-new.jpg",
    specs: {
      pitchRange: "50mm - 150mm Adjustable",
      frameMaterial: "Galvanized Steel / Stainless Steel 304",
      incline: "1.5° - 3.5° Descent Slope",
      capacity: "150 kg / roller",
      warranty: "2 Years Industrial"
    }
  },
  {
    id: "powered",
    category: "Conveyors",
    title: "Powered Roller Conveyors",
    tag: "Motorized Automation",
    description: "24V DC motorized drive roller (MDR) systems featuring zero-pressure accumulation (ZPA) to prevent product collision during buffer stop.",
    image: "/images/products/powered-conveyor-new.jpg",
    specs: {
      driveType: "24V Brushless DC Motorized Rollers",
      accumulation: "Zero-Pressure Accumulation (ZPA)",
      sensorType: "Photoelectric Zone Sensors",
      throughput: "3,600 cartons / hour",
      warranty: "3 Years Full Systems"
    }
  },
  {
    id: "belt",
    category: "Conveyors",
    title: "Modular Conveyor Belt Systems",
    tag: "High-Speed Assembly",
    description: "Multi-ply PVC/PU belt conveyor structures built for incline box lifting, food-grade processing, and high-speed packaging lines.",
    image: "/images/products/belt-conveyor-new.jpg",
    specs: {
      beltType: "High-Grip PVC / Food-Grade Polyurethane",
      motorPower: "0.75kW - 7.5kW VFD Control",
      inclineAngle: "Up to 30° Cleated Belts",
      safety: "Emergency Pull-Cord Switches",
      warranty: "2 Years Machine Warranty"
    }
  },
  {
    id: "access",
    category: "Security & Surveillance",
    title: "Robust Access Control Services",
    tag: "Biometric & RFID",
    description: "Enterprise access control panels managing biometric fingerprint readers, RFID smart cards, and electromagnetic door interlocks.",
    image: "/images/products/access-control-new.jpg",
    specs: {
      readers: "Biometric Fingerprint + RFID + Facial AI",
      doorCapacity: "Up to 128 Doors / Panel",
      integration: "Payroll & Time Attendance Sync",
      batteryBackup: "12V 24-Hour Battery Standby",
      warranty: "3 Years Hardware"
    }
  },
  {
    id: "pa",
    category: "Public Address & Barriers",
    title: "Enhancing Language with PA Systems",
    tag: "Zoned Audio & Evac",
    description: "EN54-certified commercial public address amplifier systems supporting multi-zone paging, background music, and emergency evacuation messages.",
    image: "/images/products/pa-system-new.jpg",
    specs: {
      powerOutput: "500W - 2400W Multi-Channel",
      zones: "Up to 32 Independent Audio Zones",
      evacStandard: "EN54-16 Certified Voice Evacuation",
      inputs: "Dante IP Audio / XLR / Chime Remote",
      warranty: "2 Years Pro Audio"
    }
  },
  {
    id: "barrier",
    category: "Public Address & Barriers",
    title: "Boom Barrier for Multi-Purpose Use",
    tag: "Automated Vehicle Gates",
    description: "High-speed brushless DC motor boom gates featuring automatic obstacle rebound sensors and ANPR license plate integration.",
    image: "/images/products/boom-barrier-new.jpg",
    specs: {
      openingTime: "1.5s - 4.0s High Speed",
      armLength: "3m - 6m Telescopic Aluminum Boom",
      dutyCycle: "100% Continuous Heavy Traffic",
      safety: "Infrared Photocell & Radar Sensor",
      warranty: "3 Years Mechanical"
    }
  }
];

export default function Products() {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const statsRef = useRef(null);

  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [activeModalProduct, setActiveModalProduct] = useState(null);

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

      // Stats number animation
      setTimeout(() => {
        if (statsRef.current) {
          const statNumbers = statsRef.current.querySelectorAll('.products-showcase__stat-number[data-target]');
          if (statNumbers.length > 0) {
            statNumbers.forEach((stat) => {
              const target = parseFloat(stat.getAttribute('data-target'));
              const isDecimal = target % 1 !== 0;
              gsap.to(stat, {
                innerHTML: target,
                duration: 2,
                ease: "power2.out",
                snap: isDecimal ? { innerHTML: 0.1 } : { innerHTML: 1 },
                onUpdate: function() {
                  stat.innerHTML = isDecimal 
                    ? this.targets()[0].innerHTML.toFixed(1) + '%' 
                    : Math.round(this.targets()[0].innerHTML) + (target === 3 ? ' Years' : '+');
                }
              });
            });
          }
        }
      }, 100);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const filteredProducts = selectedCategory === "All Products" 
    ? PRODUCTS_DATA 
    : PRODUCTS_DATA.filter(p => p.category === selectedCategory);

  return (
    <div ref={sectionRef} className="products-showcase">
      {/* Hero Showcase Header */}
      <section className="products-showcase__hero">
        <img 
          src="/images/products.jpg" 
          alt="Products Background" 
          className="products-showcase__hero-bg-image"
          loading="eager"
          fetchPriority="high"
        />
        <div className="products-showcase__container">
          <div className="products-showcase__badge" ref={badgeRef}>
            <span className="products-showcase__badge-dot" aria-hidden="true" />
            Hardware & Equipment Catalog
          </div>
          <h1 className="products-showcase__heading" ref={headingRef}>
            <span>Industrial Grade</span> Products & Equipment
          </h1>
          <p className="products-showcase__description" ref={descriptionRef}>
            Precision-engineered conveyor systems, high-definition surveillance networks, access barriers, and commercial PA infrastructure built for continuous industrial performance.
          </p>

          {/* Category Filter Tabs */}
          <div className="products-showcase__filter-tabs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`products-showcase__filter-tab ${selectedCategory === cat ? "products-showcase__filter-tab--active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Key Stats */}
          <div className="products-showcase__stats" ref={statsRef}>
            <div className="products-showcase__stat-item">
              <span className="products-showcase__stat-number" data-target="8">0</span>
              <span className="products-showcase__stat-label">Product Categories</span>
            </div>
            <div className="products-showcase__stat-item">
              <span className="products-showcase__stat-number" data-target="500">0</span>
              <span className="products-showcase__stat-label">Installations</span>
            </div>
            <div className="products-showcase__stat-item">
              <span className="products-showcase__stat-number" data-target="3">0</span>
              <span className="products-showcase__stat-label">Warranty</span>
            </div>
          </div>
        </div>
      </section>

      {/* Product Cards Grid */}
      <section className="products-showcase__grid-sec">
        <div className="products-showcase__container">
          <div className="products-showcase__grid">
            {filteredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className={`products-showcase__card ${index % 2 === 1 ? 'products-showcase__card--reverse' : ''}`}
                onClick={() => setActiveModalProduct(product)}
              >
                <div className="products-showcase__card-image-wrapper">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="products-showcase__card-image"
                    loading="lazy"
                  />
                </div>
                <div className="products-showcase__card-content">
                  <div className="products-showcase__card-header">
                    <span className="products-showcase__card-tag">{product.tag}</span>
                  </div>

                  <h3 className="products-showcase__card-title">{product.title}</h3>
                  <p className="products-showcase__card-desc">{product.description}</p>

                  {/* Quick Specs Chips */}
                  <div className="products-showcase__card-preview-specs">
                    {Object.entries(product.specs).slice(0, 2).map(([key, val]) => (
                      <span key={key} className="products-showcase__preview-chip">
                        {val}
                      </span>
                    ))}
                  </div>

                  <div className="products-showcase__card-footer">
                    <span className="products-showcase__view-specs">
                      View Technical Specs <span className="products-showcase__arrow">→</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Specs Modal */}
      {activeModalProduct && (
        <div className="products-modal__overlay" onClick={() => setActiveModalProduct(null)}>
          <div className="products-modal__content" onClick={(e) => e.stopPropagation()}>
            <button className="products-modal__close" onClick={() => setActiveModalProduct(null)}>✕</button>
            <div className="products-modal__header">
              <div>
                <span className="products-modal__tag">{activeModalProduct.tag}</span>
                <h2 className="products-modal__title">{activeModalProduct.title}</h2>
              </div>
            </div>
            <p className="products-modal__desc">{activeModalProduct.description}</p>

            <div className="products-modal__specs-table">
              <h3 className="products-modal__specs-heading">Technical Specifications</h3>
              <div className="products-modal__specs-grid">
                {Object.entries(activeModalProduct.specs).map(([key, val]) => (
                  <div key={key} className="products-modal__spec-row">
                    <span className="products-modal__spec-key">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</span>
                    <span className="products-modal__spec-val">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="products-modal__actions">
              <Link to="/contact" className="products-modal__btn-primary">Request Quote For Product</Link>
              <button className="products-modal__btn-secondary" onClick={() => setActiveModalProduct(null)}>Close Specs</button>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="products-showcase__cta">
        <div className="products-showcase__container">
          <div className="products-showcase__cta-box">
            <h2 className="products-showcase__cta-heading">
              Need custom equipment dimensions or specialized product engineering?
            </h2>
            <Link to="/contact" className="products-showcase__cta-btn">
              Consult Our Product Engineers →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
