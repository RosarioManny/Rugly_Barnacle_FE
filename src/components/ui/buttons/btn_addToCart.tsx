
import { useState } from "react";


export const AddToCartBtn = () => {
    const [isAdding, setIsAdding] = useState(false);

  return (
    <button 
      disabled={isAdding}
      className={`
        bg-majorelle
        w-full h-[55px]
        duration-100 drop-shadow-sm/50
        hover:bg-robin_egg hover:scale-105
        focus:bg-robin_egg focus:scale-105
        ${isAdding ? 'opacity-70 cursor-not-allowed' : ''}
      `}> 
      <p className={`${isAdding ? "animate-pulse" : ""}`}>
        {isAdding ? "Adding..." : "Add to Cart"}
      </p>
    </button>
  );
};