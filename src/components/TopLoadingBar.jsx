import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./TopLoadingBar.css";

export default function TopLoadingBar() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  
  const prevPathRef = useRef(location.pathname);
  const timer150Ref = useRef(null);
  const progressAnimRef = useRef(null);

  useEffect(() => {
    // When location changes (navigation occurred)
    if (prevPathRef.current !== location.pathname) {
      prevPathRef.current = location.pathname;

      // Start 150ms threshold timer
      if (timer150Ref.current) clearTimeout(timer150Ref.current);
      if (progressAnimRef.current) clearInterval(progressAnimRef.current);

      let isDelayed = false;
      timer150Ref.current = setTimeout(() => {
        isDelayed = true;
        setVisible(true);
        setProgress(30);

        progressAnimRef.current = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 85) {
              clearInterval(progressAnimRef.current);
              return 85;
            }
            return prev + Math.random() * 15;
          });
        }, 120);
      }, 150);

      // Finish loading after transition tick
      const finishTimer = setTimeout(() => {
        if (timer150Ref.current) clearTimeout(timer150Ref.current);
        if (progressAnimRef.current) clearInterval(progressAnimRef.current);

        if (isDelayed) {
          setProgress(100);
          setTimeout(() => {
            setVisible(false);
            setProgress(0);
          }, 300);
        }
      }, 200);

      return () => {
        clearTimeout(finishTimer);
      };
    }
  }, [location.pathname]);

  if (!visible) return null;

  return (
    <div className="top-loading-bar__wrapper" aria-hidden="true">
      <div
        className="top-loading-bar__fill"
        style={{
          width: `${progress}%`,
          opacity: progress === 100 ? 0 : 1,
          transition: progress === 100 ? "width 150ms ease-out, opacity 250ms ease-out 100ms" : "width 200ms ease-out",
        }}
      />
    </div>
  );
}
