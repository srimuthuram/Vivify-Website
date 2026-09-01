import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * useScrollReveal — attaches scroll-triggered animations to elements
 * within a container ref. Call once per page/component.
 *
 * @param {React.RefObject} containerRef — the root ref to scope animations
 * @param {Object} options — optional overrides
 */
export function useScrollReveal(containerRef, options = {}) {
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {

      // ── Fade-up reveals ──
      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              end: "top 40%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // ── Stagger children reveals ──
      gsap.utils.toArray("[data-reveal-stagger]").forEach((parent) => {
        const children = parent.children;
        if (!children.length) return;
        gsap.fromTo(children,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: parent,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // ── Scale-in reveals ──
      gsap.utils.toArray("[data-reveal-scale]").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, scale: 0.92 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // ── Slide-in from left ──
      gsap.utils.toArray("[data-reveal-left]").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, x: -80 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // ── Slide-in from right ──
      gsap.utils.toArray("[data-reveal-right]").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, x: 80 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // ── Parallax sections ──
      gsap.utils.toArray("[data-parallax]").forEach((el) => {
        const speed = parseFloat(el.dataset.parallax) || 0.15;
        gsap.to(el, {
          yPercent: speed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      // ── Counter number animation ──
      gsap.utils.toArray("[data-count-up]").forEach((el) => {
        const target = parseInt(el.dataset.countUp) || 0;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            el.textContent = Math.round(obj.val) + (el.dataset.countSuffix || "");
          },
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, [containerRef, options]);
}
