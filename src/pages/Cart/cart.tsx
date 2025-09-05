import { EmptyCart } from "./cartComponents/emptyCart";
import { useCart } from "../../hooks/useCart"
import { DangerIcon, RefreshIcon } from "../../components/ui/icons-svgs/SvgIcons";
import { Spinner } from "../../components/ui/loaders/loadingSpinner";




export const Cart = () => {
  const { cart, loading, error, fetchCart } = useCart();
  const cartItemCount = cart?.item_count;
  const ifTrue = false
  console.log(cartItemCount)
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
    <main className="h-[100vh] flex flex-col justify-evenly gap-8 items-center mb-20" aria-label="Cart Page">
      <section className="w-full flex gap-10" aria-label="Cart Information & Subtotal">
        <div className=" w-[90%] md:w-[75%] bg-white rounded-xl md:ml-5">
          <div className="flex md:flex-row flex-col justify-between items-center m-4">
            <h1 className="heading_text ">Your Cart</h1>
            <button className="group hover:scale-105 flex items-center gap-2 text-space_cadet/50" onClick={fetchCart}> 
              <p className="group-hover:text-majorelle  transform-all duration-300 ease-in"> Refresh</p>
              <RefreshIcon className="group-hover:text-majorelle size-7 transform-all duration-300 ease-in "/> 
            </button>
          </div>
          <div className="flex justify-center flex-col items-center ">
            {ifTrue ? 
              (<div> I'm an item</div>) 
              : 
              (<EmptyCart />)
            }
          </div>
        </div>
        <div className="w-[90%] md:w-[25%] flex flex-col bg-white rounded-xl md:mr-5">
          <div className="flex flex-col justify-between items-start m-4">
            <p className="text-xs font-medium text-bittersweet/50">Taxes & shipping applied at checkout</p>
            <h1 className="heading_text ">Subtotal:</h1>
          </div>
        </div>
      </section>
      <section className="mx-5 text-space_cadet/80">
        <p className="text-xs">
          The price and availability of items at RuglyBarnacle.com are subject to change. 
          The Cart is a temporary place to store a list of your items and reflects each item's most recent price.
        </p>
      </section>
    </main>
  )
}
