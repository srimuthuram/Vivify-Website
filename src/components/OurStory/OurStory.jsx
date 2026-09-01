import { Link } from "react-router-dom";
import whoWeAreImage from "../../assets/images/heroabout.jpg";
import "./OurStory.css";

export default function OurStory() {
  return (
    <section id="our-story" className="our-story" aria-label="Our Story">
      <div className="our-story__container">
        <div className="our-story__header">
          <div className="our-story__badge">
            <span className="our-story__badge-dot" aria-hidden="true" />
            Our Story
          </div>
          <h2 className="our-story__heading">
            Transforming Industries Since 2006
          </h2>
        </div>
        <div className="our-story__main">
          <div className="our-story__content">
            <p className="our-story__description">
              With nearly two decades of hands-on technical expertise, Vivify Technocrats engineers 
              resilient electronic security systems, industrial conveyor automation, electrical control panels, 
              and enterprise IT infrastructure for critical transportation hubs and manufacturing plants worldwide.
            </p>
            <p className="our-story__description">
              From our foundation in Chennai to our global footprint including Dubai, we've evolved from 
              electronic security providers to smart automation specialists, delivering Industry 4.0 solutions 
              that modernize operations and drive sustainable growth.
            </p>
            <Link to="/about" className="our-story__btn">
              Learn More About Us
              <span className="our-story__btn-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="our-story__image-wrapper">
            <img 
              src={whoWeAreImage} 
              alt="Vivify Technocrats team working on industrial automation projects" 
              className="our-story__image"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
