import { useCart } from "../../../hooks/CartProvider";
import { useState } from "react";

interface AddToCartBtnProps {
  product_id: number;
  quantity?: number;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export const AddToCartBtn = ({ 
    product_id, 
    quantity = 1, 
    onSuccess,
    onError
  }: AddToCartBtnProps) => {
    const [isAdding, setIsAdding] = useState(false);
    const { addItemToCart } = useCart(); 
    
  const handleAddToCart = async () => {
    try {
      setIsAdding(true);
      await addItemToCart(product_id, quantity);
      onSuccess?.();
      console.log(`Handler added x${quantity} item(s) - ID: ${product_id}, to cart`);
    } 
    catch (err: any) {
      const errorMessage = err.response?.data?.error || "Error: Failed to add to cart";
      onError?.(errorMessage);
      console.error("Add to cart error:", errorMessage);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <button 
      onClick={handleAddToCart}
      disabled={isAdding} // Disable button while adding
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