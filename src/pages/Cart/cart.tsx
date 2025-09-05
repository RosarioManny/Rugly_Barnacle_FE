import { EmptyCart } from "../../components/ui/cart/emptyCart";
import { useCart } from "../../hooks/useCart"
import { DangerIcon, RefreshIcon } from "../../components/ui/icons-svgs/SvgIcons";
import { Spinner } from "../../components/ui/loaders/loadingSpinner";
import { OccupiedCart } from "../../components/ui/cart/occupiedCart";
import type { CartItem } from "../../lib/api/Cart/cartServices";
import { useEffect, useState} from "react";
import { CheckoutBtn } from "../../components/ui/buttons";




export const Cart = () => {
  const { cart, loading, error, fetchCart } = useCart();
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  // const cartItemCount = cart?.item_count;
  
  useEffect(() => {
    
    if(cart && cart.items) { // Check if you have a cart and it has items
      
      if (Array.isArray(cart.items)) { // Check if items is an array
        
        const itemsArray: CartItem[] = []; // Variable to hold copy of array
        
        for(let i = 0; i < cart.items.length; i++) { // Iterate throught Array and push items into array copy
          const currentItem = cart.items[i];
          if (currentItem) {
            itemsArray.push(currentItem)
          }
        }

        setCartItems(itemsArray)
      } 
      else {
        console.warn("Cart items isn't an Array", cart.items)
        setCartItems([])
      }

    } 
    else {
      setCartItems([])
    }
    console.log("CART", cart)
    console.log("Cart items State >> ", cartItems)
  }, [cart])
  
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
    <main className="h-[100vh] flex flex-col justify-evenly items-center gap-8 mb-60" aria-label="Cart Page">
      {/* Cart Content */}
      <section className="overflow-hidden w-full min-h-[90%] flex flex-col items-center md:flex-row gap-10 my-10" aria-label="Cart Information & Subtotal">
        <div className=" w-[90%] md:w-[75%] bg-white rounded-xl md:ml-5">
          <div className="flex md:flex-row flex-col justify-between items-center m-4">
            <h1 className="heading_text ">Your Cart</h1>
            <button className="group hover:scale-105 flex items-center gap-2 text-space_cadet/50" onClick={fetchCart}> 
              <p className="group-hover:text-majorelle  transform-all duration-300 ease-in"> Refresh</p>
              <RefreshIcon className="group-hover:text-majorelle size-7 transform-all duration-300 ease-in "/> 
            </button>
          </div>
          <ul className="divide-y-solid divide-y-black divide-y-2 mx-2">
            {cartItems.length > 0  ? 
              (
                cartItems.map(({ product_name, product_price, quantity, added_at, product, dimensions }, idx) => (
                <OccupiedCart
                  key={`Cart item ${idx} - ${product_name} - ${added_at}`} 
                  product_name={product_name}
                  product_price={product_price}
                  quantity={quantity}
                  added_at={added_at}
                  product={product}
                  dimensions={dimensions}
                 />
                ))
                
              ) 
              : 
              (<EmptyCart />)
            }
          </ul>
        </div>
        {/* Checkout */}
        <div className="w-[90%] md:w-[25%] h-fit flex flex-col bg-white rounded-xl md:mr-5">
          <div className="p-2 ">
            <div className="flex flex-col justify-between items-start m-4">
              <h1 className="heading_text ">Checkout:</h1>
              <p className="text-xs font-medium text-bittersweet/50">Taxes & shipping applied at checkout</p>
            </div>
            <div className="flex justify-start">
              <p> Subtotal: ${cart.total}</p>
            </div>
          </div>
          <div className="flex justify-center items-center py-4">
            <CheckoutBtn />
          </div>
        </div>
      </section>
      {/* Advisories */}
      <section className="mx-5 text-space_cadet/80">
        <p className="text-xs">
          The price and availability of items at RuglyBarnacle.com are subject to change. 
          The Cart is a temporary place to store a list of your items and reflects each item's most recent price.
        </p>
      </section>
    </main>
  )
}
