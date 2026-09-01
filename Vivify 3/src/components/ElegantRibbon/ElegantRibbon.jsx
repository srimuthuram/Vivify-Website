import { useEffect, useRef, useState } from 'react';
import './ElegantRibbon.css';

const ElegantRibbon = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const animationRef = useRef(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (isReducedMotion) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width, height;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Ribbon parameters
    const ribbonPoints = 100;
    const ribbonAmplitude = 80;
    const ribbonFrequency = 0.008;
    const ribbonSpeed = 0.001;
    let ribbonOffset = 0;

    // Mouse tracking
    const handleMouseMove = (e) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse movement
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Parallax offset
      const parallaxX = (mouseRef.current.x - width / 2) * 0.01;
      const parallaxY = (mouseRef.current.y - height / 2) * 0.01;

      ribbonOffset += ribbonSpeed;

      // Draw ribbon
      ctx.beginPath();
      
      for (let i = 0; i <= ribbonPoints; i++) {
        const x = (i / ribbonPoints) * width;
        const normalizedX = x / width;
        
        // 3D wave calculation
        const wave1 = Math.sin(x * ribbonFrequency + ribbonOffset) * ribbonAmplitude;
        const wave2 = Math.sin(x * ribbonFrequency * 2 + ribbonOffset * 1.5) * (ribbonAmplitude * 0.3);
        const wave3 = Math.cos(x * ribbonFrequency * 0.5 + ribbonOffset * 0.8) * (ribbonAmplitude * 0.2);
        
        const y = height / 2 + wave1 + wave2 + wave3 + parallaxY;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      // Create gradient for ribbon
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, 'rgba(37, 99, 235, 0)');
      gradient.addColorStop(0.2, 'rgba(37, 99, 235, 0.15)');
      gradient.addColorStop(0.5, 'rgba(37, 99, 235, 0.25)');
      gradient.addColorStop(0.8, 'rgba(37, 99, 235, 0.15)');
      gradient.addColorStop(1, 'rgba(37, 99, 235, 0)');

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();

      // Add soft glow
      ctx.shadowColor = 'rgba(37, 99, 235, 0.3)';
      ctx.shadowBlur = 20;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.stroke();
      
      // Reset shadow
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;

      // Draw secondary faint ribbon for depth
      ctx.beginPath();
      
      for (let i = 0; i <= ribbonPoints; i++) {
        const x = (i / ribbonPoints) * width;
        const normalizedX = x / width;
        
        const wave1 = Math.sin(x * ribbonFrequency + ribbonOffset + Math.PI / 4) * (ribbonAmplitude * 0.6);
        const wave2 = Math.sin(x * ribbonFrequency * 2 + ribbonOffset * 1.5 + Math.PI / 4) * (ribbonAmplitude * 0.2);
        
        const y = height / 2 + wave1 + wave2 + parallaxY * 0.5 + 30;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      const secondaryGradient = ctx.createLinearGradient(0, 0, width, 0);
      secondaryGradient.addColorStop(0, 'rgba(37, 99, 235, 0)');
      secondaryGradient.addColorStop(0.3, 'rgba(37, 99, 235, 0.05)');
      secondaryGradient.addColorStop(0.7, 'rgba(37, 99, 235, 0.05)');
      secondaryGradient.addColorStop(1, 'rgba(37, 99, 235, 0)');

      ctx.strokeStyle = secondaryGradient;
      ctx.lineWidth = 1;
      ctx.stroke();

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isReducedMotion]);

  return (
    <div className="elegant-ribbon">
      <canvas ref={canvasRef} className="elegant-ribbon-canvas" />
      <div className="elegant-ribbon-overlay" />
    </div>
  );
};

export default ElegantRibbon;
