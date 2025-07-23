import { useState } from "react"
import { ShopBtn } from "../../components/ui/buttons/btn_shop";
export const Cart = () => {
  const [cart, setCart] = useState(true);

  const handleChange = () => {
    setCart(!cart)
  }
  
  // TODO: updateItemQuantity
  // TODO: deleteItemFromCart
  // TODO: fetchSubtotal
  // TODO: fetchCartDetails

  return (
    <main aria-label="Cart Page">
      <h1 className="heading_text text-center mb-4 mt-16" onClick={handleChange}>Your Cart</h1>
      {!cart && (
        <div className="text-center flex flex-col justify-center items-center">
          <p className="my-10">
            Your Cart is Empty
          </p>
          <ShopBtn/>
        </div>
      )}
      {cart && ( 
        <>
          <p>Cart has things</p>
        </>
      )}
    </main>
  )
}
