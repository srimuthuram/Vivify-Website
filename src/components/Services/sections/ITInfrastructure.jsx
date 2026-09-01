import React from "react";
import { Link } from "react-router-dom";

const INFRA_PILLARS = [
  {
    title: "Network Design & Routing",
    desc: "VLAN segmentation, IP subnet planning, and Layer-2/Layer-3 switching. We utilize dynamic routing protocols (OSPF, BGP) to ensure rapid packet delivery and network efficiency.",
    icon: "🗺️"
  },
  {
    title: "Next-Gen Firewalls",
    desc: "Security borders using Fortinet FortiGate, Palo Alto, or Cisco ASA firewalls. Features include deep packet inspection (DPI), web filtering, and site-to-site VPNs.",
    icon: "🔒"
  },
  {
    title: "Enterprise Mesh Wi-Fi",
    desc: "Deployment of high-capacity wireless access points (Ubiquiti UniFi, Aruba) for seamless office roaming, captive portals, and secure guest access.",
    icon: "📶"
  },
  {
    title: "24/7 Network Monitoring",
    desc: "Proactive alert monitoring via SNMP (Zabbix, PRTG). We detect bandwidth spikes, interface drops, and hardware temperature alerts before they affect your team.",
    icon: "📊"
  },
  {
    title: "System Security & Audits",
    desc: "Active Directory domain controllers, group policies (GPOs), network access control (NAC), and internal network penetration vulnerability testing.",
    icon: "🛡️"
  }
];

export default function ITInfrastructure() {
  return (
    <section id="itinfra" className="service-sec service-sec--itinfra">
      <div className="service-sec__container">
        
        {/* Header Block */}
        <div className="service-sec__header">
          <div className="service-sec__badge service-sec__badge--itinfra">
            <span>IT Infrastructure</span>
          </div>
          <h2 className="service-sec__heading">
            Secure, Resilient & High-Speed Networks
          </h2>
          <p className="service-sec__intro">
            We build and secure the modern digital workplace. 
            From local networks and fiber uplinks to firewall perimeter security, enterprise Wi-Fi systems, 
            and proactive health monitoring, we design infrastructure that keeps your workforce connected safely.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="service-sec__grid">
          
          <div className="service-sec__features-box">
            <div className="service-sec__image-wrapper">
              <img 
                src="/images/services/it-infrastructure.jpg"
                alt="Network Infrastructure Server Room"
                className="service-sec__image"
                loading="lazy"
              />
            </div>
            <h3 className="service-sec__subheading">Core Networking Solutions</h3>
            <div className="service-sec__infra-grid">
              {INFRA_PILLARS.map((p, idx) => (
                <div key={idx} className="service-sec__infra-card">
                  <div className="service-sec__infra-header">
                    <span className="service-sec__infra-icon">{p.icon}</span>
                    <h4 className="service-sec__infra-title">{p.title}</h4>
                  </div>
                  <p className="service-sec__infra-desc">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="service-sec__overview-box">
            <h3 className="service-sec__subheading">Why Secure Infrastructure Matters</h3>
            <p className="service-sec__text">
              A single network failure or security breach can cause irreparable financial and reputational damage. Modern enterprise networks must be designed with redundant routing, strong perimeter encryption, and segmented trust zones.
            </p>
            <p className="service-sec__text">
              Our network engineers conduct detailed site heatmaps and security audits, ensuring complete Wi-Fi signal coverage and locking down vulnerable open ports on your network.
            </p>
            <div className="service-sec__partner-list">
              <span className="service-sec__partner-tag">Cisco Partner</span>
              <span className="service-sec__partner-tag">Fortinet Certified</span>
              <span className="service-sec__partner-tag">Aruba Wireless</span>
              <span className="service-sec__partner-tag">Zabbix Specialist</span>
            </div>
          </div>

        </div>

        {/* CTA Block */}
        <div className="service-sec__cta-block">
          <p className="service-sec__cta-text">Ready to secure your business network or upgrade to high-speed enterprise Wi-Fi?</p>
          <Link to="/contact" className="service-sec__cta-btn btn-infra">
            Request an Network Audit →
          </Link>
        </div>

      </div>
    </section>
  );
}
