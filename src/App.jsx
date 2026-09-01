import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";

// Home components
import Hero from "./components/Hero/Hero";
import OurStory from "./components/OurStory/OurStory";
import Services from "./components/Services/Services";
import WhyChooseUs from "./components/WhyChooseUs/WhyChooseUs";
import TechnologyPartners from "./components/TechnologyPartners/TechnologyPartners";
import Solutions from "./components/Solutions/Solutions";

// Direct page imports for instantaneous 0ms page switching without Suspense delays
import About from "./pages/About";
import ServicesPage from "./pages/Services";
import SolutionsPage from "./pages/Solutions";
import Products from "./pages/Products";
import CaseStudies from "./pages/CaseStudies";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";

// Service Pages
import SoftwareDevelopment from "./pages/SoftwareDevelopment";
import IndustrialAutomation from "./pages/IndustrialAutomation";
import RoboticsIntegration from "./pages/RoboticsIntegration";
import DataCentreServices from "./pages/DataCentreServices";
import ITInfrastructure from "./pages/ITInfrastructure";
import ELVSolutions from "./pages/ELVSolutions";

// Solution Pages
import DataCentreSolutions from "./pages/DataCentreSolutions";
import RoboticsSolutions from "./pages/RoboticsSolutions";
import SmartFactorySolutions from "./pages/SmartFactorySolutions";
import AutomationSolutions from "./pages/AutomationSolutions";
import CustomEngineering from "./pages/CustomEngineering";

const HomePage = () => (
  <>
    <Hero />
    <OurStory />
    <Services />
    <WhyChooseUs />
    <TechnologyPartners />
    <Solutions />
  </>
);

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* HOME PAGE */}
          <Route path="/" element={<HomePage />} />

          {/* INTERIOR PAGES */}
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/software-development" element={<SoftwareDevelopment />} />
          <Route path="/services/industrial-automation" element={<IndustrialAutomation />} />
          <Route path="/services/robotics-integration" element={<RoboticsIntegration />} />
          <Route path="/services/data-centre-services" element={<DataCentreServices />} />
          <Route path="/services/it-infrastructure" element={<ITInfrastructure />} />
          <Route path="/services/elv-solutions" element={<ELVSolutions />} />

          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/solutions/data-centre-solutions" element={<DataCentreSolutions />} />
          <Route path="/solutions/robotics-solutions" element={<RoboticsSolutions />} />
          <Route path="/solutions/smart-factory-solutions" element={<SmartFactorySolutions />} />
          <Route path="/solutions/automation-solutions" element={<AutomationSolutions />} />
          <Route path="/solutions/custom-engineering" element={<CustomEngineering />} />

          <Route path="/products" element={<Products />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
