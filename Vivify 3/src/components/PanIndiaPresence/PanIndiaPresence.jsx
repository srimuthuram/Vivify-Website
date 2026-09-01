import React from "react";
import "./PanIndiaPresence.css";

const AIRPORTS = ["Bangalore", "Calicut", "Chennai", "Cochin", "Hyderabad", "Kannur", "Kolkata", "Trivandrum", "Varanasi"];
const PORTS = ["Chennai Port", "Ennur Port", "Kattuppalli Port", "Tuticorin Port", "Vishakapatnam Port", "Paradweep Port", "Kolkata Port", "Kandla Port", "JNPT Port"];

export default function PanIndiaPresence() {
  return (
    <section className="pan-india-presence">
      <div className="pan-india-presence__container">
        
        {/* Section Header */}
        <div className="pan-india-presence__header">
          <span className="pan-india-presence__badge">PAN-INDIA PRESENCE</span>
          <h2 className="pan-india-presence__heading">Airports & Seaports Operating Infrastructure</h2>
          <p className="pan-india-presence__subtitle">
            Our dedicated engineering teams maintain active operations across key transport infrastructure nodes.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="pan-india-presence__grid">
          
          {/* Airports Card */}
          <div className="pan-india-presence__card">
            <div className="pan-india-presence__card-header">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-plane pan-india-presence__card-icon"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.2c.3.4.8.5 1.3.3l.5-.2c.4-.2.6-.6.5-1.1z"/></svg>
              <h3 className="pan-india-presence__card-title">Key Airport Nodes</h3>
            </div>
            <div className="pan-india-presence__locations">
              {AIRPORTS.map((airport) => (
                <div key={airport} className="pan-india-presence__location-tile">
                  <span className="pan-india-presence__location-bullet" aria-hidden="true">•</span>
                  <span className="pan-india-presence__location-text">{airport}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Seaports Card */}
          <div className="pan-india-presence__card">
            <div className="pan-india-presence__card-header">
              <svg className="pan-india-presence__card-icon" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="5" r="3"/>
                <path d="M12 8v4"/>
                <path d="M12 12l-5 5"/>
                <path d="M12 12l5 5"/>
                <path d="M7 17h10"/>
                <path d="M8 21h8"/>
              </svg>
              <h3 className="pan-india-presence__card-title">Major Seaport Installations</h3>
            </div>
            <div className="pan-india-presence__locations">
              {PORTS.map((port) => (
                <div key={port} className="pan-india-presence__location-tile">
                  <span className="pan-india-presence__location-bullet" aria-hidden="true">•</span>
                  <span className="pan-india-presence__location-text">{port}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
