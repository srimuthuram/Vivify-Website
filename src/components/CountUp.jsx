import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * CountUp Component — Animates a number counting up from 0 to target `end` value
 * when refreshed or scrolled into view.
 *
 * @param {number} end — Target end number (e.g., 20, 18, 500, 100)
 * @param {string} suffix — Optional string to append (e.g., "+", "%")
 * @param {number} duration — Animation duration in seconds (default 2s)
 */
export default function CountUp({ end, suffix = "", duration = 2 }) {
  const [count, setCount] = useState(0);
  const elRef = useRef(null);

  useEffect(() => {
    if (!elRef.current) return;

    const obj = { value: 0 };
    const anim = gsap.to(obj, {
      value: end,
      duration: duration,
      ease: "power2.out",
      scrollTrigger: {
        trigger: elRef.current,
        start: "top 92%",
        toggleActions: "restart none none none"
      },
      onUpdate: () => {
        setCount(Math.floor(obj.value));
      }
    });

    return () => {
      if (anim.scrollTrigger) anim.scrollTrigger.kill();
      anim.kill();
    };
  }, [end, duration]);

  return <span ref={elRef}>{count}{suffix}</span>;
}
