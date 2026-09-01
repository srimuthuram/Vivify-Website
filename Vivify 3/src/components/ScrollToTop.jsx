import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Force immediate scroll reset on route change
    const resetScroll = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    resetScroll();

    // Handle hash-based navigation
    if (hash) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          if (window.lenis) {
            window.lenis.scrollTo(element, { offset: -90, duration: 1.2 });
          } else {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 100);
    }
  }, [pathname, hash]);

  return null;
}
