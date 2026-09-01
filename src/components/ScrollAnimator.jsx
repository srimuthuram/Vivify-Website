import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollAnimator — Applies left & right scroll reveal animations across interior pages
 * AND automatically clears inline transform props upon completion so that
 * native CSS :hover animations and transforms function cleanly!
 * Note: Home page ("/") does not use ScrollAnimator and remains completely untouched.
 */
export default function ScrollAnimator({ children }) {
  const containerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (!containerRef.current) return;

    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const path = location.pathname;

        // Configure ScrollTrigger for better performance
        ScrollTrigger.config({
          ignoreMobileResize: true,
          autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
        });

        // ═════════════════════════════════════════════════════════════════
        // 1. SERVICES PAGE (/services)
        // ═════════════════════════════════════════════════════════════════
        if (path === "/services") {
          const sections = gsap.utils.toArray(".service-sec");

          sections.forEach((sec) => {
            // Header
            const header = sec.querySelector(".service-sec__header");
            if (header) {
              gsap.fromTo(header,
                { opacity: 0, y: 50 },
                {
                  opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
                  onComplete: () => gsap.set(header, { clearProps: "transform" }),
                  scrollTrigger: { trigger: header, start: "top 85%", toggleActions: "play none none none" }
                }
              );
            }

            // Overview box (Left side) & Features box (Right side)
            const grid1 = sec.querySelector(".service-sec__grid:not(.service-sec__grid--reverse)");
            if (grid1) {
              const overviewBox = grid1.querySelector(".service-sec__overview-box");
              const featuresBox = grid1.querySelector(".service-sec__features-box");

              if (overviewBox) {
                gsap.fromTo(overviewBox,
                  { opacity: 0, x: -75 },
                  {
                    opacity: 1, x: 0, duration: 0.85, ease: "power3.out",
                    onComplete: () => gsap.set(overviewBox, { clearProps: "transform" }),
                    scrollTrigger: { trigger: grid1, start: "top 82%", toggleActions: "play none none none" }
                  }
                );
              }

              if (featuresBox) {
                gsap.fromTo(featuresBox,
                  { opacity: 0, x: 75 },
                  {
                    opacity: 1, x: 0, duration: 0.85, ease: "power3.out", delay: 0.1,
                    onComplete: () => gsap.set(featuresBox, { clearProps: "transform" }),
                    scrollTrigger: { trigger: grid1, start: "top 82%", toggleActions: "play none none none" }
                  }
                );
              }
            }

            // Process cards (Alternating left & right)
            const processCards = sec.querySelectorAll(".service-sec__process-card");
            if (processCards.length) {
              processCards.forEach((card, idx) => {
                const xOffset = idx % 2 === 0 ? -60 : 60;
                gsap.fromTo(card,
                  { opacity: 0, x: xOffset },
                  {
                    opacity: 1, x: 0, duration: 0.75, ease: "power3.out",
                    onComplete: () => gsap.set(card, { clearProps: "transform" }),
                    scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none none" }
                  }
                );
              });
            }

            // Reverse Grid: Case Study (Left) & Benefits (Right)
            const gridReverse = sec.querySelector(".service-sec__grid--reverse");
            if (gridReverse) {
              const caseStudy = gridReverse.querySelector(".service-sec__case-study");
              const benefits = gridReverse.querySelector(".service-sec__benefits");

              if (caseStudy) {
                gsap.fromTo(caseStudy,
                  { opacity: 0, x: -75 },
                  {
                    opacity: 1, x: 0, duration: 0.85, ease: "power3.out",
                    onComplete: () => gsap.set(caseStudy, { clearProps: "transform" }),
                    scrollTrigger: { trigger: gridReverse, start: "top 82%", toggleActions: "play none none none" }
                  }
                );
              }

              if (benefits) {
                gsap.fromTo(benefits,
                  { opacity: 0, x: 75 },
                  {
                    opacity: 1, x: 0, duration: 0.85, ease: "power3.out", delay: 0.1,
                    onComplete: () => gsap.set(benefits, { clearProps: "transform" }),
                    scrollTrigger: { trigger: gridReverse, start: "top 82%", toggleActions: "play none none none" }
                  }
                );
              }
            }

            // CTA Block (Left text, Right button)
            const ctaBlock = sec.querySelector(".service-sec__cta-block");
            if (ctaBlock) {
              const ctaText = ctaBlock.querySelector(".service-sec__cta-text");
              const ctaBtn = ctaBlock.querySelector(".service-sec__cta-btn");
              if (ctaText) {
                gsap.fromTo(ctaText,
                  { opacity: 0, x: -50 },
                  {
                    opacity: 1, x: 0, duration: 0.7, ease: "power3.out",
                    onComplete: () => gsap.set(ctaText, { clearProps: "transform" }),
                    scrollTrigger: { trigger: ctaBlock, start: "top 88%", toggleActions: "play none none none" }
                  }
                );
              }
              if (ctaBtn) {
                gsap.fromTo(ctaBtn,
                  { opacity: 0, x: 50 },
                  {
                    opacity: 1, x: 0, duration: 0.7, delay: 0.1, ease: "power3.out",
                    onComplete: () => gsap.set(ctaBtn, { clearProps: "transform" }),
                    scrollTrigger: { trigger: ctaBlock, start: "top 88%", toggleActions: "play none none none" }
                  }
                );
              }
            }

            const id = sec.id;
            if (id) {
              ScrollTrigger.create({
                trigger: sec,
                start: "top 30%",
                end: "bottom 30%",
                onEnter: () => updateStickyNav(id),
                onEnterBack: () => updateStickyNav(id)
              });
            }
          });
        }

        // ═════════════════════════════════════════════════════════════════
        // 2. SOLUTIONS PAGE (/solutions)
        // ═════════════════════════════════════════════════════════════════
        else if (path === "/solutions") {
          const solutionSecs = gsap.utils.toArray(".solution-sec");
          solutionSecs.forEach((sec) => {
            // Overview box (Left) & Features box (Right)
            const grid1 = sec.querySelector(".solution-sec__grid:not(.solution-sec__grid--reverse)");
            if (grid1) {
              const overviewBox = grid1.querySelector(".solution-sec__overview-box");
              const featuresBox = grid1.querySelector(".solution-sec__features-box");

              if (overviewBox) {
                gsap.fromTo(overviewBox,
                  { opacity: 0, x: -75 },
                  {
                    opacity: 1, x: 0, duration: 0.85, ease: "power3.out",
                    onComplete: () => gsap.set(overviewBox, { clearProps: "transform" }),
                    scrollTrigger: { trigger: grid1, start: "top 82%", toggleActions: "play none none none" }
                  }
                );
              }

              if (featuresBox) {
                gsap.fromTo(featuresBox,
                  { opacity: 0, x: 75 },
                  {
                    opacity: 1, x: 0, duration: 0.85, ease: "power3.out", delay: 0.1,
                    onComplete: () => gsap.set(featuresBox, { clearProps: "transform" }),
                    scrollTrigger: { trigger: grid1, start: "top 82%", toggleActions: "play none none none" }
                  }
                );
              }
            }

            // Reverse grid: Case Study (Left) & Benefits (Right)
            const gridReverse = sec.querySelector(".solution-sec__grid--reverse");
            if (gridReverse) {
              const caseStudy = gridReverse.querySelector(".solution-sec__case-study");
              const benefits = gridReverse.querySelector(".solution-sec__benefits");

              if (caseStudy) {
                gsap.fromTo(caseStudy,
                  { opacity: 0, x: -75 },
                  {
                    opacity: 1, x: 0, duration: 0.85, ease: "power3.out",
                    onComplete: () => gsap.set(caseStudy, { clearProps: "transform" }),
                    scrollTrigger: { trigger: gridReverse, start: "top 82%", toggleActions: "play none none none" }
                  }
                );
              }

              if (benefits) {
                gsap.fromTo(benefits,
                  { opacity: 0, x: 75 },
                  {
                    opacity: 1, x: 0, duration: 0.85, ease: "power3.out", delay: 0.1,
                    onComplete: () => gsap.set(benefits, { clearProps: "transform" }),
                    scrollTrigger: { trigger: gridReverse, start: "top 82%", toggleActions: "play none none none" }
                  }
                );
              }
            }

            // Pillars & Metrics cards (Alternating left and right)
            const cards = sec.querySelectorAll(".solution-sec__pillar-card, .solution-sec__metric-card, .solution-sec__pillar-item");
            if (cards.length) {
              cards.forEach((card, idx) => {
                const xOffset = idx % 2 === 0 ? -50 : 50;
                gsap.fromTo(card,
                  { opacity: 0, x: xOffset },
                  {
                    opacity: 1, x: 0, duration: 0.7, ease: "power3.out",
                    onComplete: () => gsap.set(card, { clearProps: "transform" }),
                    scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none none" }
                  }
                );
              });
            }

            // CTA Block (Left text, Right button)
            const ctaBlock = sec.querySelector(".solution-sec__cta-block");
            if (ctaBlock) {
              const ctaText = ctaBlock.querySelector(".solution-sec__cta-text");
              const ctaBtn = ctaBlock.querySelector(".solution-sec__cta-btn");
              if (ctaText) {
                gsap.fromTo(ctaText,
                  { opacity: 0, x: -50 },
                  {
                    opacity: 1, x: 0, duration: 0.7, ease: "power3.out",
                    onComplete: () => gsap.set(ctaText, { clearProps: "transform" }),
                    scrollTrigger: { trigger: ctaBlock, start: "top 88%", toggleActions: "play none none none" }
                  }
                );
              }
              if (ctaBtn) {
                gsap.fromTo(ctaBtn,
                  { opacity: 0, x: 50 },
                  {
                    opacity: 1, x: 0, duration: 0.7, delay: 0.1, ease: "power3.out",
                    onComplete: () => gsap.set(ctaBtn, { clearProps: "transform" }),
                    scrollTrigger: { trigger: ctaBlock, start: "top 88%", toggleActions: "play none none none" }
                  }
                );
              }
            }
          });
        }

        // ═════════════════════════════════════════════════════════════════
        // 3. PRODUCTS PAGE (/products)
        // ═════════════════════════════════════════════════════════════════
        else if (path === "/products") {
          const cards = gsap.utils.toArray(".products-showcase__card");
          cards.forEach((card, i) => {
            const xOffset = i % 2 === 0 ? -75 : 75;
            gsap.fromTo(card,
              { opacity: 0, x: xOffset, scale: 0.96 },
              {
                opacity: 1, x: 0, scale: 1, duration: 0.75, ease: "power3.out",
                onComplete: () => gsap.set(card, { clearProps: "transform" }),
                scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none none" }
              }
            );
          });

          // Products CTA (Left heading, Right button)
          const ctaBox = document.querySelector(".products-showcase__cta-box");
          if (ctaBox) {
            const ctaHeading = ctaBox.querySelector(".products-showcase__cta-heading");
            const ctaBtn = ctaBox.querySelector(".products-showcase__cta-btn");
            if (ctaHeading) {
              gsap.fromTo(ctaHeading,
                { opacity: 0, x: -60 },
                {
                  opacity: 1, x: 0, duration: 0.75, ease: "power3.out",
                  onComplete: () => gsap.set(ctaHeading, { clearProps: "transform" }),
                  scrollTrigger: { trigger: ctaBox, start: "top 85%", toggleActions: "play none none none" }
                }
              );
            }
            if (ctaBtn) {
              gsap.fromTo(ctaBtn,
                { opacity: 0, x: 60 },
                {
                  opacity: 1, x: 0, duration: 0.75, delay: 0.1, ease: "power3.out",
                  onComplete: () => gsap.set(ctaBtn, { clearProps: "transform" }),
                  scrollTrigger: { trigger: ctaBox, start: "top 85%", toggleActions: "play none none none" }
                }
              );
            }
          }
        }

        // ═════════════════════════════════════════════════════════════════
        // 4. ABOUT PAGE (/about)
        // ═════════════════════════════════════════════════════════════════
        else if (path === "/about") {
          // Heritage story: left text vs right timeline
          const storyContent = document.querySelector(".about-story__content");
          const timelineBox = document.querySelector(".about-timeline");

          if (storyContent) {
            gsap.fromTo(storyContent,
              { opacity: 0, x: -80 },
              {
                opacity: 1, x: 0, duration: 0.85, ease: "power3.out",
                onComplete: () => gsap.set(storyContent, { clearProps: "transform" }),
                scrollTrigger: { trigger: ".about-story", start: "top 82%", toggleActions: "play none none none" }
              }
            );
          }

          if (timelineBox) {
            gsap.fromTo(timelineBox,
              { opacity: 0, x: 80 },
              {
                opacity: 1, x: 0, duration: 0.85, ease: "power3.out", delay: 0.15,
                onComplete: () => gsap.set(timelineBox, { clearProps: "transform" }),
                scrollTrigger: { trigger: ".about-story", start: "top 82%", toggleActions: "play none none none" }
              }
            );
          }

          // Individual Timeline Items (Alternating left and right nudge)
          const items = gsap.utils.toArray(".about-timeline__item");
          items.forEach((item, idx) => {
            const xOffset = idx % 2 === 0 ? -40 : 40;
            gsap.fromTo(item,
              { opacity: 0, x: xOffset },
              {
                opacity: 1, x: 0, duration: 0.65, ease: "power3.out",
                onComplete: () => gsap.set(item, { clearProps: "transform" }),
                scrollTrigger: { trigger: item, start: "top 85%", toggleActions: "play none none none" }
              }
            );
          });

          // Core Guiding Pillars (Left, Bottom, Right)
          const valCards = gsap.utils.toArray(".about-values__card");
          if (valCards.length >= 3) {
            gsap.fromTo(valCards[0],
              { opacity: 0, x: -80 },
              {
                opacity: 1, x: 0, duration: 0.8, ease: "power3.out",
                onComplete: () => gsap.set(valCards[0], { clearProps: "transform" }),
                scrollTrigger: { trigger: ".about-values__grid", start: "top 82%", toggleActions: "play none none none" }
              }
            );
            gsap.fromTo(valCards[1],
              { opacity: 0, y: 50 },
              {
                opacity: 1, y: 0, duration: 0.8, delay: 0.1, ease: "power3.out",
                onComplete: () => gsap.set(valCards[1], { clearProps: "transform" }),
                scrollTrigger: { trigger: ".about-values__grid", start: "top 82%", toggleActions: "play none none none" }
              }
            );
            gsap.fromTo(valCards[2],
              { opacity: 0, x: 80 },
              {
                opacity: 1, x: 0, duration: 0.8, delay: 0.2, ease: "power3.out",
                onComplete: () => gsap.set(valCards[2], { clearProps: "transform" }),
                scrollTrigger: { trigger: ".about-values__grid", start: "top 82%", toggleActions: "play none none none" }
              }
            );
          }

          // Hubs Section: Airport box (Left) vs Seaport box (Right)
          const hubBoxes = gsap.utils.toArray(".about-hubs__box");
          if (hubBoxes.length >= 2) {
            gsap.fromTo(hubBoxes[0],
              { opacity: 0, x: -80 },
              {
                opacity: 1, x: 0, duration: 0.85, ease: "power3.out",
                onComplete: () => gsap.set(hubBoxes[0], { clearProps: "transform" }),
                scrollTrigger: { trigger: ".about-hubs__grid", start: "top 82%", toggleActions: "play none none none" }
              }
            );
            gsap.fromTo(hubBoxes[1],
              { opacity: 0, x: 80 },
              {
                opacity: 1, x: 0, duration: 0.85, ease: "power3.out", delay: 0.15,
                onComplete: () => gsap.set(hubBoxes[1], { clearProps: "transform" }),
                scrollTrigger: { trigger: ".about-hubs__grid", start: "top 82%", toggleActions: "play none none none" }
              }
            );
          }
        }

        // ═════════════════════════════════════════════════════════════════
        // 5. CASE STUDIES PAGE (/case-studies)
        // ═════════════════════════════════════════════════════════════════
        else if (path === "/case-studies") {
          const cards = gsap.utils.toArray(".case-study-card");
          cards.forEach((card, i) => {
            const xOffset = i % 2 === 0 ? -75 : 75;
            gsap.fromTo(card,
              { opacity: 0, x: xOffset, scale: 0.96 },
              {
                opacity: 1, x: 0, scale: 1, duration: 0.75, ease: "power3.out",
                onComplete: () => gsap.set(card, { clearProps: "transform" }),
                scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none none" }
              }
            );
          });

          // CTA section (Left text, Right button)
          const ctaBox = document.querySelector(".case-studies-cta__box");
          if (ctaBox) {
            const ctaHeading = ctaBox.querySelector(".case-studies-cta__heading");
            const ctaBtn = ctaBox.querySelector(".case-studies-cta__btn");
            if (ctaHeading) {
              gsap.fromTo(ctaHeading,
                { opacity: 0, x: -60 },
                {
                  opacity: 1, x: 0, duration: 0.75, ease: "power3.out",
                  onComplete: () => gsap.set(ctaHeading, { clearProps: "transform" }),
                  scrollTrigger: { trigger: ctaBox, start: "top 85%", toggleActions: "play none none none" }
                }
              );
            }
            if (ctaBtn) {
              gsap.fromTo(ctaBtn,
                { opacity: 0, x: 60 },
                {
                  opacity: 1, x: 0, duration: 0.75, delay: 0.1, ease: "power3.out",
                  onComplete: () => gsap.set(ctaBtn, { clearProps: "transform" }),
                  scrollTrigger: { trigger: ctaBox, start: "top 85%", toggleActions: "play none none none" }
                }
              );
            }
          }
        }

        // ═════════════════════════════════════════════════════════════════
        // 6. CAREERS PAGE (/careers)
        // ═════════════════════════════════════════════════════════════════
        else if (path === "/careers") {
          // Culture cards (Alternating left and right)
          const cultureCards = gsap.utils.toArray(".careers-culture__card");
          if (cultureCards.length) {
            cultureCards.forEach((card, idx) => {
              const xOffset = idx % 2 === 0 ? -65 : 65;
              gsap.fromTo(card,
                { opacity: 0, x: xOffset },
                {
                  opacity: 1, x: 0, duration: 0.7, ease: "power3.out",
                  onComplete: () => gsap.set(card, { clearProps: "transform" }),
                  scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none none" }
                }
              );
            });
          }

          // Open positions (Alternating left and right)
          const jobs = gsap.utils.toArray(".careers-position");
          jobs.forEach((job, idx) => {
            const xOffset = idx % 2 === 0 ? -70 : 70;
            gsap.fromTo(job,
              { opacity: 0, x: xOffset },
              {
                opacity: 1, x: 0, duration: 0.75, ease: "power3.out",
                onComplete: () => gsap.set(job, { clearProps: "transform" }),
                scrollTrigger: { trigger: job, start: "top 88%", toggleActions: "play none none none" }
              }
            );
          });

          // CTA section (Left content, Right button)
          const ctaBox = document.querySelector(".careers-cta__box");
          if (ctaBox) {
            const ctaContent = ctaBox.querySelector(".careers-cta__content");
            const ctaBtn = ctaBox.querySelector(".careers-cta__btn");
            if (ctaContent) {
              gsap.fromTo(ctaContent,
                { opacity: 0, x: -60 },
                {
                  opacity: 1, x: 0, duration: 0.75, ease: "power3.out",
                  onComplete: () => gsap.set(ctaContent, { clearProps: "transform" }),
                  scrollTrigger: { trigger: ctaBox, start: "top 85%", toggleActions: "play none none none" }
                }
              );
            }
            if (ctaBtn) {
              gsap.fromTo(ctaBtn,
                { opacity: 0, x: 60 },
                {
                  opacity: 1, x: 0, duration: 0.75, delay: 0.1, ease: "power3.out",
                  onComplete: () => gsap.set(ctaBtn, { clearProps: "transform" }),
                  scrollTrigger: { trigger: ctaBox, start: "top 85%", toggleActions: "play none none none" }
                }
              );
            }
          }
        }

        // ═════════════════════════════════════════════════════════════════
        // 7. CONTACT PAGE (/contact)
        // ═════════════════════════════════════════════════════════════════
        else if (path === "/contact") {
          const formCard = document.querySelector(".contact-form-card");
          const infoCard = document.querySelector(".contact-info-card");

          if (formCard) {
            gsap.fromTo(formCard,
              { opacity: 0, x: -80 },
              {
                opacity: 1, x: 0, duration: 0.85, ease: "power3.out",
                onComplete: () => gsap.set(formCard, { clearProps: "transform" }),
                scrollTrigger: { trigger: formCard, start: "top 85%", toggleActions: "play none none none" }
              }
            );
          }

          if (infoCard) {
            gsap.fromTo(infoCard,
              { opacity: 0, x: 80 },
              {
                opacity: 1, x: 0, duration: 0.85, delay: 0.15, ease: "power3.out",
                onComplete: () => gsap.set(infoCard, { clearProps: "transform" }),
                scrollTrigger: { trigger: infoCard, start: "top 85%", toggleActions: "play none none none" }
              }
            );
          }
        }

      }, containerRef.current);

      return () => ctx.revert();
    });
  }, [location.pathname, children]);

  function updateStickyNav(activeId) {
    const navBtns = document.querySelectorAll(".services__sticky-btn");
    navBtns.forEach(btn => {
      const href = btn.getAttribute("href");
      if (href === `#${activeId}`) {
        btn.classList.add("services__sticky-btn--active");
      } else {
        btn.classList.remove("services__sticky-btn--active");
      }
    });
  }

  return <div ref={containerRef}>{children}</div>;
}
