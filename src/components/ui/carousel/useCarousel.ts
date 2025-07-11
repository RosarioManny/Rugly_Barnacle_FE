import { useState } from "react"

interface CarouselProps {
  items: string[];

}

export const useCarousel = ({ items = [] }: CarouselProps) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const totalItems = items.length;
  console.log(totalItems, currentIdx)

  const handlePrev = () => {
    setCurrentIdx(prev => (
      prev <= 0 ? totalItems - 1 : prev - 1)
    );
  };

  const handleNext = () => {
    setCurrentIdx(prev => (
      prev >= totalItems - 1 ? 0 : prev + 1)
    );
  };

  return { 
    currentIdx,
    handleNext,
    handlePrev,
    canGoPrev: currentIdx > 0,
    canGoNext: currentIdx < totalItems - 1,
  };
};