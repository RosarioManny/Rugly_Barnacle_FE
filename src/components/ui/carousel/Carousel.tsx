import { useCarousel } from "./useCarousel";
import { CarouselItem } from "./CarouselItem";

interface CarouselProps {
  items: Array<{
    name: string;
    path: string;
  }>;
}

export const Carousel = ({ items }: CarouselProps) => {
  const { currentIdx, handleNext, handlePrev } = useCarousel({ items });

  return (
    <div className="relative">
      
        <button className="text-black" onClick={handlePrev}>Previous</button>
        <button className="text-black" onClick={handleNext}>Next</button>
      <div className={`flex overflow-hidden`}>
        {items.map((item, idx) => (
          <CarouselItem 
            link={item.name}
            img={item.path}
            title={item.name}
            key={`${item.name}-${idx}`}
          /> 
        ))}
      </div>
    </div>
  );
};