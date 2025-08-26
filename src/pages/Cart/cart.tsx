import { ShopBtn } from "../../components/ui/buttons/btn_shop";
import { getCart } from "../../lib/api/Cart/cartServices"
import { useState, useEffect } from "react";
import { DangerIcon } from "../../components/ui/icons-svgs/SvgIcons";
import { Spinner } from "../../components/ui/loaders/loadingSpinner";
import { StartOrderBtn } from "../../components/ui/buttons/btn_startOrder";
import type { CartInfo } from "../../lib/api/Cart/cartServices"


export const Cart = () => {
  const [cart, setCart] = useState<CartInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchCart = async() => {
    try {
      setLoading(true)
      setError(null)

      const data = await getCart()
      
      setCart(data)
      console.log(cart)
    } catch(err) {
      setError("Failed to fetch / create cart")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    try {
      fetchCart()
      console.log(cart)
    } catch(err) {
      setError("Cart unable to be loaded. Try again later.")
    }
  },[])
  
  if (loading) return <Spinner />

  if (error || cart === null) {
    return ( 
      <div className=" h-[100vh] justify-center flex flex-col gap-5 items-center">
        <DangerIcon className="text-bittersweet"/>
        <div className="error-message text-bittersweet font-bold">Error: {error ? `${error}` : "Difficulty getting cart. Check back later" }</div>
      </div>)
  }
  // TODO: updateItemQuantity
  // TODO: deleteItemFromCart
  // TODO: fetchSubtotal
  // TODO: fetchCartDetails

  return (
    <main className="h-[100vh]" aria-label="Cart Page">
      <h1 className="heading_text text-center mb-4 mt-16">Your Cart</h1>
      {cart && (
        <div className="text-center flex flex-col justify-center items-center">
          <p className="my-10">
            Your Cart is Empty. <br/> Go checkout some rugs!
          </p>
          <ShopBtn/>
          <div>
            <p>Would like a custom rug?</p>
            <StartOrderBtn />
          </div>
        </div>
      )}
    </main>
  )
}
