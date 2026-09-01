import React, { useRef, useEffect } from 'react';
import './AnimatedBorder.css';

const AnimatedBorder = ({ 
  children, 
  variant = 'flow', 
  speed = '3s',
  color1 = '#60a5fa',
  color2 = '#2563eb',
  color3 = '#38bdf8',
  glow = true
}) => {
  const borderRef = useRef(null);

  useEffect(() => {
    if (borderRef.current) {
      borderRef.current.style.setProperty('--border-speed', speed);
      borderRef.current.style.setProperty('--color-1', color1);
      borderRef.current.style.setProperty('--color-2', color2);
      borderRef.current.style.setProperty('--color-3', color3);
    }
  }, [variant, speed, color1, color2, color3, glow]);

  const variants = {
    gradient: 'animated-border--gradient',
    pulse: 'animated-border--pulse',
    shimmer: 'animated-border--shimmer',
    neon: 'animated-border--neon',
    flow: 'animated-border--flow',
    'flow-dual': 'animated-border--flow-dual',
    'flow-rainbow': 'animated-border--flow-rainbow',
    'flow-pulse': 'animated-border--flow-pulse',
    'flow-shimmer': 'animated-border--flow-shimmer',
    'flow-corner': 'animated-border--flow-corner'
  };

  return (
    <div 
      ref={borderRef}
      className={`animated-border ${variants[variant] || variants.flow}`}
    >
      {children}
    </div>
  );
};

export default AnimatedBorder;
