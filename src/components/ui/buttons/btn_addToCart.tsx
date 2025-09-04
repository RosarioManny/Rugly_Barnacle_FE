import { addToCart } from "../../../lib/api/Cart/cartServices"

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

  const handleAddToCart = async () => {
    try {
      await addToCart(product_id, quantity);
      onSuccess?.()
      console.log(`Handler added x${quantity} item(s) - ID: ${product_id}, to cart` )
    } 
    catch (err: any) {
      const errorMessage = err.response?.data?.error || "Error: Failed to add to cart";
      onError?.(errorMessage);
      console.error("Add to cart error:", errorMessage);
    }
  }

  return (
    <button 
      onClick={handleAddToCart}
      className="
        btn_addToCart 
        w-full
        duration-100 drop-shadow-sm/50
        hover:bg-robin_egg hover:scale-105
        active:bg-robin_egg active:scale-105 
        focus:bg-robin_egg focus:scale-105"> 
          Add to Cart
    </button>
  )
}
