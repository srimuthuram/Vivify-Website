import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

// In-memory cache for scroll positions by location key or pathname
const scrollPositions = new Map();

export default function ScrollManager() {
  const location = useLocation();
  const navType = useNavigationType(); // "POP", "PUSH", or "REPLACE"
  const prevKeyRef = useRef(location.key || location.pathname);

  // Disable default browser scroll restoration
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // Continuously record scroll position for current location
  useEffect(() => {
    const handleScroll = () => {
      const currentKey = location.key || location.pathname;
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      scrollPositions.set(currentKey, scrollY);
      // Also index by pathname as fallback
      scrollPositions.set(location.pathname, scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.key, location.pathname]);

  // Handle scroll reset / restoration on location change
  useEffect(() => {
    const currentKey = location.key || location.pathname;

    const performScroll = () => {
      if (navType === "POP") {
        // Going BACK or FORWARD: restore saved scroll position
        const savedY = scrollPositions.get(currentKey) ?? scrollPositions.get(location.pathname) ?? 0;
        window.scrollTo(0, savedY);
        if (window.lenis) {
          window.lenis.scrollTo(savedY, { immediate: true });
        }
      } else {
        // PUSH or REPLACE (New link click): scroll to top or hash anchor
        if (location.hash) {
          const targetEl = document.querySelector(location.hash);
          if (targetEl) {
            if (window.lenis) {
              window.lenis.scrollTo(targetEl, { offset: -90, duration: 0.8 });
            } else {
              targetEl.scrollIntoView({ behavior: "smooth" });
            }
            return;
          }
        }
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        if (window.lenis) {
          window.lenis.scrollTo(0, { immediate: true });
        }
      }
    };

    // Execute scroll adjustment on next animation frame to ensure DOM is ready
    const rId = requestAnimationFrame(() => {
      performScroll();
    });

    prevKeyRef.current = currentKey;

    return () => cancelAnimationFrame(rId);
  }, [location.pathname, location.key, location.hash, navType]);

  return null;
}
