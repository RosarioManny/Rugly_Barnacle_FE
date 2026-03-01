import { useState } from "react";
import { useCart } from "../../../hooks/cart/cartProvider";

interface AddToCartBtnProps {
  productId: number;
  quantity?: number;
  isAvailable: boolean;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export const AddToCartBtn = ({ 
  productId, 
  quantity = 1, 
  onSuccess,
  onError,
  isAvailable = true
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
      disabled={isAdding || !isAvailable}
      className={`
        bg-majorelle
        w-full h-[55px]
        max-w-[75vw]
        duration-300 drop-shadow-sm/50 rounded-lg
        hover:bg-space_cadet hover:scale-102 hover:ring-2 hover:ring-mauve
        focus:bg-space_cadet focus:scale-102 focus:ring-2 focus:ring-mauve
        active:bg-space_cadet active:scale-102 active:ring-2 active:ring-mauve
        ${isAdding ? 'opacity-70 cursor-not-allowed' : ''}
      `}> 
      <p className={`${isAdding ? "animate-pulse" : ""}`}>
        {isAdding ? "Adding..." : "Add to Cart"}
      </p>
    </button>
  );
};