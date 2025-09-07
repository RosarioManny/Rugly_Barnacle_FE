import { useState, useEffect, useCallback} from "react"
import { addToCart, type CartInfo, getCart, removeFromCart } from "../lib/api/Cart/cartServices"


export const useCart = () => {
  const [cart, setCart] = useState<CartInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch Cart
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

  // Add cartItem
  const addItemToCart = useCallback(async (productId: number, quantity: number = 1) => {
    try {
      setLoading(true)
      const updatedCart = await addToCart(productId, quantity)
      setCart(updatedCart)
      return updatedCart
    } catch(err) {
      setError("Failed to update cart")
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Remove cartItem
  const removeItemFromCart = useCallback(async (productId: number, quantity: number = 1) => {
    try {
      setLoading(true)
      
      const updatedCart = await removeFromCart(productId, quantity)
      setCart(prevCart => {
        if( !prevCart ) return updatedCart;
        
        return {
          ...updatedCart,
          items: [...updatedCart.items]
        }
      })
      return updatedCart
    } catch( err ) {
      setError("Failed to remove item. :(")
      throw err
    } finally {
      setLoading(false)
    }
  }, [cart])
  
  // Cart Fetching on mount
  useEffect(() => {
    try {
      fetchCart()
    } catch(err) {
      setError("Cart unable to be loaded. Try again later.")
    }
  }, [])

  // DEBUG - Console.log vv
  useEffect(() => {
    if (cart) {
      console.log("Cart updated:", cart);
    }
  }, [cart]);

  return {
    cart,
    loading,
    error, 
    fetchCart,
    setCart,
    addItemToCart,
    removeItemFromCart
  }
}