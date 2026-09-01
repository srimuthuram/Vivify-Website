import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./About.css";

export default function About() {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const overviewRef = useRef(null);
  const missionRef = useRef(null);
  const visionRef = useRef(null);
  const valuesRef = useRef(null);
  const teamsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(badgeRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.2
      );

      tl.fromTo(headingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7 },
        0.35
      );

      tl.fromTo(overviewRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.5
      );

      tl.fromTo([missionRef.current, visionRef.current, valuesRef.current],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.15 },
        0.65
      );

      tl.fromTo(teamsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        1.0
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="about__container">
        
        {/* Badge */}
        <div className="about__badge" ref={badgeRef}>
          <span className="about__badge-dot" aria-hidden="true" />
          About Us
        </div>

        {/* Heading */}
        <h2 className="about__heading" ref={headingRef}>
          Who We Are
        </h2>

        {/* Company Overview */}
        <div className="about__overview" ref={overviewRef}>
          <h3 className="about__section-title">Company Overview</h3>
          <p className="about__text">
            We, Vivify Technocrats, are electronic solution providers and Technical Manpower Providers with about two decades of hands-on experience on diversified electronic Equipment related to all sort of Electronics security Equipment, Fire Alarm Systems, Access control Systems, CCTV, Voltage Regulators, and more.
          </p>
          <p className="about__text">
            Our Teams are specialized in Installation, Testing, Commissioning, Maintaining and Servicing of Electronics, Electrical Equipment. We have separate team for IT networking, Cabling, System integration works and Software installation & upgradation works.
          </p>
          <p className="about__text">
            Our name "Vivify" is derived from Latin meaning rebirth or resurrection. And our slogan "Obsolete to absolute" conveys the message that we transform 'Trash into Tower'.
          </p>
          <p className="about__text">
            Our team design and supply all sort of Gravity & Powered roller Conveyors / Belt Conveyors and its control Panels used in various applications. Our team design and manufacture all sort of Electrical & Electronics Control panel for various customized requirement. As a System Integrator we study all Safety, Security and other utility equipment & design integration module.
          </p>
        </div>

        {/* Mission, Vision, Values */}
        <div className="about__grid">
          <div className="about__card" ref={missionRef}>
            <div className="about__card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <h3 className="about__card-title">Our Mission</h3>
            <p className="about__card-text">
              Our mission is to develop our service continuously to meet and exceed customer expectations and contribute to the success of the customers business through the provision of timely, consistently high quality and professional manpower support. We will invest in our people so as to invent and achieve new level in energy savings innovative products.
            </p>
          </div>

          <div className="about__card" ref={visionRef}>
            <div className="about__card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <h3 className="about__card-title">Our Vision</h3>
            <p className="about__card-text">
              To be one of the world class technical support provider & to make a bench mark in Energy Saving solutions.
            </p>
          </div>

          <div className="about__card" ref={valuesRef}>
            <div className="about__card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3 className="about__card-title">Team Values</h3>
            <p className="about__card-text">
              We believe that customer satisfaction is central to quality and performance. We are committed to service excellence and work to deliver a professional, proactive service with every customer contact. Our people are our greatest asset and strength and success depends on all of us delivering together.
            </p>
          </div>
        </div>

        {/* Our Teams */}
        <div className="about__teams" ref={teamsRef}>
          <h3 className="about__section-title">Our Teams</h3>
          <p className="about__text">
            Our Teams have presence in various Airports and Seaports across India.
          </p>
          
          <div className="about__locations">
            <div className="about__location">
              <h4 className="about__location-title">Airports</h4>
              <p className="about__location-text">
                Bangalore, Calicut, Chennai, Cochin, Hyderabad, Kannur, Kolkatta, Trivandrum & Varanasi
              </p>
            </div>
            
            <div className="about__location">
              <h4 className="about__location-title">Ports</h4>
              <p className="about__location-text">
                Chennai Port, Ennur Port, Kattuppalli Port, Tuticorin Port, Vishakapatnam Port, Paradweep Port, Kolkata Port, Kandla Port, JNPT Port
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
