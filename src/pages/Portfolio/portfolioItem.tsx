import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface PortfolioImage {
  path: string;
  alt: string;
}

interface PortfolioItemProps {
  path: string;
  alt: string;
  index: number; // Add index prop for staggering
  onClick: (image: PortfolioImage) => void;
  priority?: boolean
}

export const PortfolioItem = ({ path, alt, index, onClick, priority }: PortfolioItemProps) => {
  const ref = useRef<HTMLLIElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  // Stagger the loading based on index
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setShouldLoad(true);
      }, index * 200); 
      
      return () => clearTimeout(timer);
    }
  }, [isInView, index]);

  const handleClick = () => {
    onClick({ path, alt });
  };

  return (
    <motion.li
      ref={ref}
      className="
        w-full h-90 
        cursor-pointer overflow-hidden group 
        transition-all duration-300 ease-in-out
        hover:ring-solid hover:ring-3 hover:ring-robin_egg"
      onClick={handleClick}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }} // Stagger animations too
    >
      <div 
        className={`
          relative w-full h-full 
          transition-all duration-300 ease-in-out
          group-hover:scale-105 group-hover:opacity-90 
          ${isLoaded ? '' : 'bg-space_cadet/30 animate-pulse'}`}
      >
        {shouldLoad && (
          <img 
            className="object-cover w-full h-full transition-all duration-300 group-hover:opacity-50 group-hover:scale-105"
            src={path}
            alt={alt}
            loading="lazy"
            decoding='async'
            fetchPriority={priority ? 'high' : 'auto'}
            onLoad={() => setIsLoaded(true)}
            style={{ 
              opacity: isLoaded ? 1 : 0, 
              transition: 'opacity 0.5s ease-in-out' 
            }}
          />
        )}
      </div>
    </motion.li>
  );
};