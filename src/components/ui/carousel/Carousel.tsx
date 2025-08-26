import { motion } from "framer-motion";
import { useCarousel } from "./useCarousel";
import { CarouselItem } from "./CarouselItem";

interface CarouselProps {
  items: Array<{
    name: string;
    path: string;
  }>;
}

export const Carousel = ({ items }: CarouselProps) => {
  const { 
    currentIdx, 
    handleNext, 
    handlePrev, 
    handleDragEnd,
    itemsToShow,
  } = useCarousel({ 
    items,
    itemsToShow: typeof window !== 'undefined' && window.innerWidth >= 768 ? 3 : 1
  });

  const itemWidth = 100 / itemsToShow;

  return (
    <div className="relative w-full overflow-hidden">
      {/* Navigation Arrows */}
      <button 
        onClick={handlePrev}
        className="active:bg-robin_egg hover:bg-robin_egg focus:bg-robin_egg 
        absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-md text-fleece bg-majorelle p-3 shadow-md backdrop-blur-sm"
      >
        &lt;
      </button>
      
      <button 
        onClick={handleNext}
        className="active:bg-robin_egg hover:bg-robin_egg focus:bg-robin_egg
        absolute right-4 top-1/2 z-10 -translate-y-1/2 text-fleece rounded-md bg-majorelle p-3 shadow-md backdrop-blur-sm"
      >
        &gt;
      </button>

      {/* Carousel Track */}
      <motion.div
        drag="x"
        onDragEnd={handleDragEnd}
        dragConstraints={{ left: 0, right: 0 }}
        animate={{
          x: `-${currentIdx * itemWidth}%`,
          transition: { type: "spring", stiffness: 300, damping: 30 }
        }}
        className="md:grid-row-1 flex py-4 cursor-grab active:cursor-grabbing"
      >
        {items.map((item, idx) => (
          <motion.div
            key={`${item.name}-${idx}`}
            className={`flex-shrink-0 p-2`}
            style={{ width: `${itemWidth}%` }}
          >
            <CarouselItem 
              // link={item.name}
              img={item.path}
              title={item.name}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};