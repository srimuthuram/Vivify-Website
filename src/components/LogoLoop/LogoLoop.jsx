import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./LogoLoop.css";

export default function LogoLoop({ 
  logos = [], 
  speed = 60, 
  direction = "left", 
  logoHeight = 52, 
  gap = 80, 
  hoverSpeed = 0,
  scaleOnHover = false,
  ariaLabel = "Partner logos",
  renderItem = (item, key) => <img key={key} src={item.src} alt={item.alt} style={{ height: `${logoHeight}px`, width: "auto" }} />
}) {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!wrapperRef.current || logos.length === 0) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const items = track.querySelectorAll(".logoloop__item");
      
      // Clone items to create seamless loop
      const itemWidth = items[0].offsetWidth + gap;
      const totalWidth = itemWidth * logos.length;
      
      // Duplicate the logos for seamless looping
      track.innerHTML = track.innerHTML + track.innerHTML;
      const allItems = track.querySelectorAll(".logoloop__item");
      
      // Continuous horizontal scrolling animation - faster speed
      const xPos = direction === "left" ? -totalWidth : totalWidth;
      
      animationRef.current = gsap.to(track, {
        x: xPos,
        duration: totalWidth / speed, // Faster speed calculation
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
        }
      });

      // Stop animation on hover, resume on leave
      wrapperRef.current.addEventListener('mouseenter', () => {
        if (animationRef.current) {
          animationRef.current.pause();
        }
      });

      wrapperRef.current.addEventListener('mouseleave', () => {
        if (animationRef.current) {
          animationRef.current.resume();
        }
      });

      // Add hover effects if enabled
      if (scaleOnHover) {
        allItems.forEach(item => {
          item.addEventListener('mouseenter', () => {
            gsap.to(item, { scale: 1.1, duration: 0.3 });
          });
          item.addEventListener('mouseleave', () => {
            gsap.to(item, { scale: 1, duration: 0.3 });
          });
        });
      }
    }, wrapperRef);

    return () => {
      ctx.revert();
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [logos, speed, direction, gap, scaleOnHover]);

  return (
    <div 
      ref={wrapperRef} 
      className="logoloop"
      aria-label={ariaLabel}
      role="marquee"
    >
      <div 
        ref={trackRef} 
        className="logoloop__track" 
        style={{ gap: `${gap}px` }}
      >
        {logos.map((item, index) => (
          <div
            key={index}
            className="logoloop__item"
            style={item.style}
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
}