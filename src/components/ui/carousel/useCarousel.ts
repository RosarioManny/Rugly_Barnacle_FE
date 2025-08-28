import { useState, useCallback, useEffect} from "react";

interface CarouselProps {
  items: any[];
  itemsToShow?: number;
}

export const useCarousel = ({ items = [], itemsToShow = 1 }: CarouselProps) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(1)
  const totalItems = items.length;
  // console.log(currentIdx)

  useEffect(() => {
    const handleResize = () => {
      setCardsToShow(window.innerWidth >= 768 ? 3 : 1)
    };

    handleResize();
    window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
  }, [])
  const handlePrev = useCallback(() => {
    setCurrentIdx(prev => (prev <= 0 ? totalItems - cardsToShow : prev - 1));
  }, [totalItems]);

  const handleNext = useCallback(() => {
    setCurrentIdx(prev => (prev >= totalItems - cardsToShow ? 0 : prev + 1));
  }, [totalItems]);

  const handleDragEnd = (e: any, info: any) => {
    console.log(e)
    if (info.offset.x > 50) {
      handlePrev();
    } else if (info.offset.x < -50) {
      handleNext();
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