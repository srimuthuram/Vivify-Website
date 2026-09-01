import React from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import ScrollManager from "../ScrollManager";
import PageTransition from "../PageTransition";
import { useHoverPreloader } from "../../utils/routePreloader";

export default function Layout({ children }) {
  const location = useLocation();

  // Automatically activate global hover preloader for all links (>100ms)
  useHoverPreloader();

  return (
    <div className="app-root-layout" style={{ backgroundColor: "#080b11", minHeight: "100vh" }}>
      {/* Scroll restoration & position manager */}
      <ScrollManager />

      {/* Persistent Navigation Header */}
      <Navbar />

      {/* Dynamic Main Content with 200-300ms page transitions */}
      <main className="app-main-content" style={{ backgroundColor: "#080b11", minHeight: "80vh" }}>
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname} pageKey={location.pathname}>
            {children}
          </PageTransition>
        </AnimatePresence>
      </main>

      {/* Persistent Footer */}
      <Footer />
    </div>
  );
}
