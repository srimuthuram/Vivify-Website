import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./Contact.css";

const OFFICES = [
  {
    id: "india",
    city: "Chennai, India",
    flag: "🇮🇳",
    address: "#3 & 4, Mogappair road, No. 2B, 1st Floor, Padi, Chennai - 600050",
    mapUrl: "https://maps.google.com/?q=Padi+Chennai+600050"
  },
  {
    id: "uae",
    city: "Dubai, UAE",
    flag: "🇦🇪",
    address: "Hor Al Anz, Deira, 80080, Dubai, United Arab Emirates",
    mapUrl: "https://maps.google.com/?q=Hor+Al+Anz+Deira+Dubai"
  }
];

export default function Contact() {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", service: "", message: ""
  });
  const [activeOffice, setActiveOffice] = useState("india");

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailto = `mailto:info@vivifytec.in?subject=Inquiry from ${formData.name}&body=Name: ${formData.name}%0AEmail: ${formData.email}%0APhone: ${formData.phone}%0AService: ${formData.service}%0A%0A${formData.message}`;
    window.location.href = mailto;
  };

  const currentOffice = OFFICES.find(o => o.id === activeOffice);

  return (
    <div ref={sectionRef} className="contact-page">
      
      {/* Hero */}
      <section className="contact-hero">
        <div className="contact-hero__container">
          <div className="contact-hero__badge" ref={badgeRef}>
            <span className="contact-hero__badge-dot" aria-hidden="true" />
            Get In Touch
          </div>
          <h1 className="contact-hero__heading" ref={headingRef}>
            Let's <span>Engineer</span> Something<br />
            <span>Extraordinary Together</span>
          </h1>
          <p className="contact-hero__description" ref={descriptionRef}>
            Whether you need a data centre architect, a PLC automation expert, or a quote for 
            enterprise CCTV systems — our engineering team is ready to assist.
          </p>
        </div>
      </section>

      {/* Contact Form + Info Split */}
      <section className="contact-split">
        <div className="contact-hero__container">
          <div className="contact-split__grid">

            {/* Left: Contact Form */}
            <div className="contact-form-card">
              <h2 className="contact-form-card__heading">Send Us a Message</h2>
              <p className="contact-form-card__subtext">Fill in the details and our team will respond within 24 business hours.</p>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-form__row">
                  <div className="contact-form__field">
                    <label className="contact-form__label" htmlFor="name">Full Name</label>
                    <input className="contact-form__input" id="name" name="name" type="text" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="contact-form__field">
                    <label className="contact-form__label" htmlFor="email">Email Address</label>
                    <input className="contact-form__input" id="email" name="email" type="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
                  </div>
                </div>

                <div className="contact-form__row">
                  <div className="contact-form__field">
                    <label className="contact-form__label" htmlFor="phone">Phone Number</label>
                    <input className="contact-form__input" id="phone" name="phone" type="tel" placeholder="Enter your number" value={formData.phone} onChange={handleChange} />
                  </div>
                  <div className="contact-form__field">
                    <label className="contact-form__label" htmlFor="service">Service of Interest</label>
                    <select className="contact-form__input contact-form__select" id="service" name="service" value={formData.service} onChange={handleChange}>
                      <option value="">Select a service...</option>
                      <option value="Industrial Automation">Industrial Automation</option>
                      <option value="Robotics Integration">Robotics Integration</option>
                      <option value="Data Centre Services">Data Centre Services</option>
                      <option value="IT Infrastructure">IT Infrastructure</option>
                      <option value="ELV Solutions">ELV Solutions</option>
                      <option value="Software Development">Software Development</option>
                      <option value="Custom Engineering">Custom Engineering</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="contact-form__field">
                  <label className="contact-form__label" htmlFor="message">Project Details</label>
                  <textarea className="contact-form__input contact-form__textarea" id="message" name="message" rows="5" placeholder="Enter your message" value={formData.message} onChange={handleChange} required />
                </div>

                <button type="submit" className="contact-form__submit">
                  Send Inquiry →
                </button>
              </form>
            </div>

            {/* Right: Contact Info Card */}
            <div className="contact-info-card">
              <div className="contact-info-card__section">
                <h3 className="contact-info-card__title">Our Offices</h3>
                <div className="contact-info-card__office-tabs">
                  {OFFICES.map(o => (
                    <button
                      key={o.id}
                      className={`contact-info-card__tab ${activeOffice === o.id ? "contact-info-card__tab--active" : ""}`}
                      onClick={() => setActiveOffice(o.id)}
                    >
                      {o.flag} {o.city}
                    </button>
                  ))}
                </div>
                <div className="contact-info-card__office-detail">
                  <p className="contact-info-card__address">{currentOffice.address}</p>
                  <a href={currentOffice.mapUrl} target="_blank" rel="noopener noreferrer" className="contact-info-card__map-link">
                    View on Google Maps →
                  </a>
                </div>
              </div>

              <div className="contact-info-card__divider" />

              <div className="contact-info-card__section">
                <h3 className="contact-info-card__title">Direct Contact</h3>
                <div className="contact-info-card__items">
                  <div className="contact-info-card__item">
                    <span className="contact-info-card__icon">📞</span>
                    <div>
                      <p className="contact-info-card__label">Phone</p>
                      <p className="contact-info-card__value">+91 9840 337359</p>
                      <p className="contact-info-card__value">+91 9022 388812</p>
                    </div>
                  </div>
                  <div className="contact-info-card__item">
                    <span className="contact-info-card__icon">✉️</span>
                    <div>
                      <p className="contact-info-card__label">Email</p>
                      <p className="contact-info-card__value">info@vivifytec.in</p>
                    </div>
                  </div>
                  <div className="contact-info-card__item">
                    <span className="contact-info-card__icon">🕐</span>
                    <div>
                      <p className="contact-info-card__label">Business Hours</p>
                      <p className="contact-info-card__value">Mon — Sat: 09:00 AM to 06:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
