// components/ui/buttons/ReturnToTop.tsx
import { useState, useEffect } from 'react';

export const ReturnToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-6 right-6 z-50 bg-majorelle text-fleece p-2 rounded-lg shadow-lg 
        hover:bg-bittersweet transition-all duration-300 transform hover:scale-110 
        focus:bg-bittersweet focus:ring-2 focus:ring-robin_egg focus:ring-opacity-50
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
        transition-all duration-500 ease-in-out
      `}
      aria-label="Return to top"
    >
      <span className="text-lg">↑</span>
      <p>Top</p>
    </button>
  );
};