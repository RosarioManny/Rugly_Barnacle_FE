import { useState, useEffect, useCallback} from "react"
import { type CartInfo, getCart } from "../lib/api/Cart/cartServices"


export const useCart = () => {
  const [cart, setCart] = useState<CartInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchCart = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const data = await getCart()
      
      setCart(data)
    } catch(err) {
      setError("Failed to fetch / create cart")
    } finally {
      setLoading(false)
    }
  }, [])

  
  // Cart Fetching on mount
  useEffect(() => {
    try {
      fetchCart()
      // console.log(cart)
    } catch(err) {
      setError("Cart unable to be loaded. Try again later.")
    }
  }, [])

  // DEBUG - Console.log vv
  useEffect(() => {
    if (cart) {
      console.log("Cart updated:", cart);
      console.log("Cart Items :: ", cart.items)
      // console.log("Cart ID:", cart.id);
    }
  }, [cart]);

  return {
    cart,
    loading,
    error, 
    fetchCart,
    setCart
  }
}