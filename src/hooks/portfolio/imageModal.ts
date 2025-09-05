import { useState, useEffect } from "react";
import { type imageInfoProps } from "../../pages/Portfolio/portfolioImages";

export const usePortfolioModal = () => {
  const [selectedImage, setSelectedImage] = useState<imageInfoProps | null>(null);
  
  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  // Close modal with Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const handleImageClick = (img: imageInfoProps) => {
    setSelectedImage(img);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  return {
    closeModal,
    selectedImage,
    handleBackdropClick,
    handleImageClick
  }
}