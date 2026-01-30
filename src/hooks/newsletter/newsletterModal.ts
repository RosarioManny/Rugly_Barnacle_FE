import { useState, useEffect } from "react";

const NEWSLETTER_MODAL_KEY = 'newsletterModalShown';

export const useNewsletterModal = () => {
  // State of the modal visibility
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Check if modal has been shown before. If not, show it after 3 seconds.
  useEffect(() => {
    const hasBeenShown = localStorage.getItem(NEWSLETTER_MODAL_KEY);

    if(!hasBeenShown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        requestAnimationFrame(()=> {
          setIsVisible(true);
        })
        localStorage.setItem(NEWSLETTER_MODAL_KEY, 'true');
      }, 3000);

      return () => clearTimeout(timer)
    }
  }, []);

  // Close Modal
  const closeNewsletterModal = () => {
    setIsVisible(false);
    setTimeout(()=> {
      setIsOpen(false)
    }, 300) // Match transition duration
  };

  // Close Modal via backdrop click
  const handleNewsletterBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeNewsletterModal();
    }
  };
  
// Close Modal via Esc Key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeNewsletterModal();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return {
    closeNewsletterModal,
    handleNewsletterBackdropClick,
    isOpen,
    isVisible
  }
  
}