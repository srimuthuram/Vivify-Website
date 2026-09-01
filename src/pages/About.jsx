import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import PanIndiaPresence from "../components/PanIndiaPresence/PanIndiaPresence";
import aboutUsImage from "../assets/images/aboutus.png";
import "../components/About/About.css";

gsap.registerPlugin(ScrollTrigger);

const TIMELINE = [
  { year: "2006", title: "Foundation & Security Engineering", desc: "Established in Chennai as electronic security, fire alarm, and technical manpower providers." },
  { year: "2012", title: "Airport & Seaport Infrastructure Expansion", desc: "Deployed specialized technical teams across major airports and seaports across India." },
  { year: "2018", title: "Conveyor Systems & Panel Manufacturing", desc: "Expanded into custom gravity & powered roller conveyor design and electrical panel builds." },
  { year: "2024+", title: "Smart Automation & Global Footprint", desc: "Established Dubai regional hub, integrating Industry 4.0 IoT, robotics, and high-availability data centres." }
];

const PILLARS = [
  {
    id: "mission",
    title: "Our Mission",
    description: "To continuously evolve our services, exceeding customer expectations through timely, consistent, and professional technical manpower support while inventing innovative energy-saving products.",
    image: "/images/mission.jpg",
    alt: "Team collaboration on mission goals",
    color: "#10b981"
  },
  {
    id: "vision",
    title: "Our Vision",
    description: "To be a world-class technical support provider and create an industry benchmark in industrial energy-saving and automation solutions.",
    image: "/images/vision.jpg",
    alt: "Planning and vision documentation",
    color: "#06b6d4"
  },
  {
    id: "values",
    title: "Team Values",
    description: "We place customer satisfaction at the center of quality. Our people are our greatest strength, committed to proactive service excellence with every interaction.",
    image: "/images/values.jpg",
    alt: "Team working together on laptops",
    color: "#2865EB"
  }
];

const AIRPORTS = ["Bangalore", "Calicut", "Chennai", "Cochin", "Hyderabad", "Kannur", "Kolkatta", "Trivandrum", "Varanasi"];
const PORTS = ["Chennai Port", "Ennur Port", "Kattuppalli Port", "Tuticorin Port", "Vishakapatnam Port", "Paradweep Port", "Kolkata Port", "Kandla Port", "JNPT Port"];

export default function About() {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const timelineRef = useRef(null);
  const statsRef = useRef(null);
  const valuesHeaderRef = useRef(null);
  const pillarRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations DISABLED for performance
      // const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      // tl.fromTo(badgeRef.current,
      //   { opacity: 0, y: 20 },
      //   { opacity: 1, y: 0, duration: 0.6 },
      //   0.2
      // );
      // tl.fromTo(headingRef.current,
      //   { opacity: 0, y: 30 },
      //   { opacity: 1, y: 0, duration: 0.7 },
      //   0.35
      // );

      // Timeline scroll animation - DISABLED for performance
      // if (timelineRef.current) {
      //   const timelineItems = timelineRef.current.querySelectorAll('.about-timeline__item');
      //   
      //   timelineItems.forEach((item, index) => {
      //     gsap.fromTo(item,
      //       {
      //         opacity: 0,
      //         x: index % 2 === 0 ? -50 : 50,
      //         y: 30
      //       },
      //       {
      //         opacity: 1,
      //         x: 0,
      //         y: 0,
      //         duration: 0.4,
      //         ease: "power2.out",
      //         scrollTrigger: {
      //           trigger: item,
      //           start: "top 85%",
      //           toggleActions: "play none none none",
      //           markers: false
      //         }
      //       }
      //     );
      //   });
      // }

      // Stats number animation
      setTimeout(() => {
        if (statsRef.current) {
          const statNumbers = statsRef.current.querySelectorAll('.about-hero__stat-num[data-target]');
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
                    : Math.round(this.targets()[0].innerHTML) + (target === 100 ? '%' : '+');
                }
              });
            });
          }
        }
      }, 100);

      // Values section scroll animation
      if (valuesHeaderRef.current) {
        gsap.fromTo(valuesHeaderRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: valuesHeaderRef.current,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      }

      // Pillar scroll animations with alternating directions
      pillarRefs.current.forEach((pillar, index) => {
        if (pillar) {
          const isEven = index % 2 === 0;
          gsap.fromTo(pillar.querySelector('.about-pillar__image'),
            { 
              opacity: 0, 
              x: isEven ? -100 : 100 
            },
            {
              opacity: 1,
              x: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: pillar,
                start: "top 80%",
                toggleActions: "play none none none"
              }
            }
          );

          gsap.fromTo(pillar.querySelector('.about-pillar__content'),
            { 
              opacity: 0, 
              y: 50 
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              delay: 0.2,
              scrollTrigger: {
                trigger: pillar,
                start: "top 80%",
                toggleActions: "play none none none"
              }
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="about-editorial" ref={sectionRef}>
      
      {/* Editorial Hero Header */}
      <section className="about-hero">
        <img 
          src={aboutUsImage} 
          alt="About Us Background" 
          className="about-hero__bg-image"
          loading="eager"
          fetchPriority="high"
        />
        <div className="about-hero__container">
          <div className="about-hero__badge" ref={badgeRef}>
            <span className="about-hero__badge-dot" aria-hidden="true" />
            Corporate Profile & History
          </div>
          <h1 className="about-hero__heading" ref={headingRef}>
            Transforming <span>Trash into Towers</span> — <br />
            <span>"Obsolete to Absolute"</span>
          </h1>
          <p className="about-hero__lead">
            With nearly two decades of hands-on technical expertise, Vivify Technocrats engineers 
            resilient electronic security systems, industrial conveyor automation, electrical control panels, 
            and enterprise IT infrastructure for critical transportation hubs and manufacturing plants worldwide.
          </p>

          {/* Key Impact Stats Bar */}
          <div className="about-hero__stats" ref={statsRef}>
            <div className="about-hero__stat-card">
              <span className="about-hero__stat-num" data-target="20">0</span>
              <span className="about-hero__stat-lbl">Years Experience</span>
            </div>
            <div className="about-hero__stat-card">
              <span className="about-hero__stat-num" data-target="18">0</span>
              <span className="about-hero__stat-lbl">Airports & Seaports</span>
            </div>
            <div className="about-hero__stat-card">
              <span className="about-hero__stat-num" data-target="500">0</span>
              <span className="about-hero__stat-lbl">Systems Integrated</span>
            </div>
            <div className="about-hero__stat-card">
              <span className="about-hero__stat-num" data-target="100">0</span>
              <span className="about-hero__stat-lbl">Service Excellence</span>
            </div>
          </div>
        </div>
      </section>

      {/* History & Slogan Origin Section */}
      <section className="about-story">
        <div className="about-hero__container">
          <div className="about-story__grid">
            <div className="about-story__content">
              <span className="about-story__tag">Our Heritage</span>
              <h2 className="about-story__title">The Vivify Story</h2>
              <p className="about-story__text">
                Our name <strong>"Vivify"</strong> is derived from Latin, meaning <em>rebirth or resurrection</em>. Our founding motto — <strong>"Obsolete to Absolute"</strong> — reflects our core mission of restoring life and maximum utility to complex industrial infrastructure, turning legacy systems into modern high-capacity assets.
              </p>
              <p className="about-story__text">
                From specialized teams managing mission-critical airport security equipment and port logistics to custom conveyor panel design, our strength lies in technical precision and responsive service delivery.
              </p>
            </div>

            {/* Interactive Timeline */}
            <div className="about-timeline" ref={timelineRef}>
              <h3 className="about-timeline__heading">Milestone Timeline</h3>
              <div className="about-timeline__items">
                {TIMELINE.map((item) => (
                  <div key={item.year} className="about-timeline__item" data-year={item.year}>
                    <div className="about-timeline__body">
                      <h4 className="about-timeline__title">{item.title}</h4>
                      <p className="about-timeline__desc">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values - Carousel Layout */}
      <section className="about-pillars">
        <div className="about-pillars__container">
          <div className="about-pillars__header" ref={valuesHeaderRef}>
            <span className="about-pillars__badge">Core Guiding Pillars</span>
            <h2 className="about-pillars__heading">Our Principles</h2>
            <p className="about-pillars__subtitle">The principles that shape every solution, partnership, and innovation we deliver.</p>
          </div>

          <div className="about-pillars__carousel">
            {PILLARS.map((pillar, i) => (
              <div 
                key={i} 
                className="about-pillar__card"
                ref={(el) => (pillarRefs.current[i] = el)}
              >
                <div className="about-pillar__card-image-wrapper">
                  <img src={pillar.image} alt={pillar.alt} className="about-pillar__card-image" />
                </div>
                <h3 className="about-pillar__card-title">{pillar.title}</h3>
                <p className="about-pillar__card-description">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hubs & Infrastructure Presence */}
      <PanIndiaPresence />

    </div>
  );
}
