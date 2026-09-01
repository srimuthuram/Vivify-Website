import { useEffect } from "react";

const preloadedRoutes = new Set();

/**
 * Preloads resources or route path if specified.
 */
export function preloadRoute(path) {
  if (!path || typeof path !== "string") return;
  const cleanPath = path.split("?")[0].split("#")[0];
  if (preloadedRoutes.has(cleanPath)) return;

  preloadedRoutes.add(cleanPath);
}

/**
 * React Hook that listens globally to hover events (>100ms) on internal links
 * and automatically triggers route preloading.
 */
export function useHoverPreloader() {
  useEffect(() => {
    let hoverTimer = null;

    const handleMouseOver = (e) => {
      const target = e.target.closest("a[href], button[data-href], [data-preload]");
      if (!target) return;

      const href = target.getAttribute("href") || target.getAttribute("to") || target.getAttribute("data-href");
      if (!href || !href.startsWith("/") || href.startsWith("//")) return;

      if (hoverTimer) clearTimeout(hoverTimer);
      hoverTimer = setTimeout(() => {
        preloadRoute(href);
      }, 100);
    };

    const handleMouseOut = (e) => {
      if (hoverTimer) {
        clearTimeout(hoverTimer);
        hoverTimer = null;
      }
    };

    const handleTouchStart = (e) => {
      const target = e.target.closest("a[href], button[data-href], [data-preload]");
      if (!target) return;
      const href = target.getAttribute("href") || target.getAttribute("to") || target.getAttribute("data-href");
      if (href && href.startsWith("/") && !href.startsWith("//")) {
        preloadRoute(href);
      }
    };

    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });
    document.addEventListener("touchstart", handleTouchStart, { passive: true });

    return () => {
      if (hoverTimer) clearTimeout(hoverTimer);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);
}
