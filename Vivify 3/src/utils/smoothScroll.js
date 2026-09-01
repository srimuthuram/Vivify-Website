export const smoothScroll = (target, duration = 1000) => {
  const targetElement = typeof target === 'string' 
    ? document.querySelector(target)
    : target;

  if (!targetElement) return;

  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    
    // Easing function (easeInOutCubic)
    const ease = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    window.scrollTo(0, startPosition + distance * ease);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};

export const scrollToTop = (duration = 800) => {
  smoothScroll(0, duration);
};

export const scrollToElement = (selector, duration = 1000, offset = 80) => {
  const element = document.querySelector(selector);
  if (!element) return;

  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
  smoothScroll({ getBoundingClientRect: () => ({ top: targetPosition }) }, duration);
};
