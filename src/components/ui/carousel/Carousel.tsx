import { useCarousel } from "./useCarousel";

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
      <button onClick={handlePrev}>Previous</button>
      <button onClick={handleNext}>Next</button>

      <div className="flex overflow-hidden">
        {items.map((item, index) => (
          <div 
            key={`${item.name}-${index}`}
            className={`
              w-full flex-shrink-0
              ${index === currentIdx ? "block" : "hidden"}
              md:block md:w-1/3
            `}
          >
            <img 
              src={item.path} 
              alt={item.name}
              className="w-full h-auto"
            />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};