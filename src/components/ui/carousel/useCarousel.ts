import { useState, useCallback, } from "react";

interface CarouselProps {
  items: any[];
  itemsToShow?: number;
}

export const useCarousel = ({ items = [], itemsToShow = 1 }: CarouselProps) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const cardsToShow = window.innerWidth >= 768 ? 3 : 1
  const totalItems = items.length;


  const handlePrev = useCallback(() => {
    setCurrentIdx(prev => (prev <= 0 ? totalItems - cardsToShow : prev - 1));
  }, [totalItems]);

  const handleNext = useCallback(() => {
    setCurrentIdx(prev => (prev >= totalItems - cardsToShow ? 0 : prev + 1));
  }, [totalItems]);

  const handleDragEnd = (e: any, info: any) => {
    console.log(e);
    
    // Scroll by just 1 item regardless of cardsToShow
    if (info.offset.x > 50) {
      // Swipe right - go to previous single item
      setCurrentIdx(prev => (prev <= 0 ? totalItems - 1 : prev - 1));
    } else if (info.offset.x < -50) {
      // Swipe left - go to next single item  
      setCurrentIdx(prev => (prev >= totalItems - 1 ? 0 : prev + 1));
    }
  };

  return {
    currentIdx,
    handleNext,
    handlePrev,
    handleDragEnd,
    canGoPrev: currentIdx > 0,
    canGoNext: currentIdx < totalItems - cardsToShow,
    itemsToShow
  };
};