import { useState } from "react";
import { useCart } from "../../../hooks/cart/cartProvider";
import type { Product } from "../../../lib/api/Product/productservices";
import { logColors } from "../../../lib/api/logFileStyles";

const log = (type: 'info' | 'error' | 'success' | 'warn', message: string) => {
  const style = logColors.find(c => c.logType === type);
  const css = `color: ${style?.color}; font-weight: ${style?.fontWeight};`;
  if (type === 'error') console.error(`%c ${message}`, css);
  else if (type === 'warn') console.warn(`%c ${message}`, css);
  else console.info(`%c ${message}`, css);
};

interface AddToCartBtnProps {
  product: Product;
  quantity?: number;
  isAvailable: boolean;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export const AddToCartBtn = ({ 
  product, 
  quantity = 1, 
  onSuccess,
  onError,
  isAvailable = true
}: AddToCartBtnProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const { addItemToCart } = useCart();

  const handleAddToCart = () => {
    try {
      log('info', ` [AddToCartBtn] Clicked — product: "${product.name}" (id: ${product.id}), qty: ${quantity}`);
      setIsAdding(true);
      addItemToCart(product, quantity);
      log('success', ` [AddToCartBtn] Successfully added "${product.name}" to cart`);
      onSuccess?.();
    } catch (err: any) {
      log('error', `[AddToCartBtn] Failed to add "${product.name}" to cart — ${err?.message}`);
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
      `}
    > 
      <p className={`${isAdding ? "animate-pulse" : ""}`}>
        {isAdding ? "Adding..." : "Add to Cart"}
      </p>
    </button>
  );
};