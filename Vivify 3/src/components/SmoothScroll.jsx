import React, { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  useEffect(() => {
    // Disable browser scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.2,
      lerp: 0.1,
    });

    window.lenis = lenis;

    // Connect Lenis scroll to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      window.lenis = null;
      gsap.ticker.remove(lenis.raf);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return <>{children}</>;
}
