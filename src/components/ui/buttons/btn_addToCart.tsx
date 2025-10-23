import { useState } from "react";
import { useCart } from "../../../hooks/cart/cartProvider";

interface AddToCartBtnProps {
  productId: number;
  quantity?: number;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const AddToCartBtn = ({ 
  productId, 
  quantity = 1, 
  onSuccess,
  onError 
}: AddToCartBtnProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const { addItemToCart } = useCart();

  const handleAddToCart = async () => {
    try {
      setIsAdding(true);
      await addItemToCart(productId, quantity);
      onSuccess?.();
    } catch (err: any) {
      console.error("Failed to add item to cart:", err);
      onError?.(err);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <button 
      onClick={handleAddToCart}
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