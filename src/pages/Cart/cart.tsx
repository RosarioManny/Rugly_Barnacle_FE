import { ShopBtn } from "../../components/ui/buttons/btn_shop";
import { useCart } from "../../hooks/useCart"
import { DangerIcon, RefreshIcon } from "../../components/ui/icons-svgs/SvgIcons";
import { Spinner } from "../../components/ui/loaders/loadingSpinner";
import { StartOrderBtn } from "../../components/ui/buttons/btn_startOrder";



export const Cart = () => {
  const { cart, loading, error, fetchCart } = useCart();
  const cartItemCount = cart?.item_count;
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
    <main className="h-[100vh] flex items-center" aria-label="Cart Page">
      <section className="w-[70%] bg-gray-300 rounded-xl mx-10">
        <div className="flex justify-between items-center m-4">
          <h1 className="heading_text ">Your Cart</h1>
          <button className="group hover:scale-105 flex items-center gap-2 text-space_cadet" onClick={fetchCart}> 
            <p className="group-hover:text-majorelle  transform-all duration-300 ease-in"> Refresh</p>
            <RefreshIcon className="group-hover:text-majorelle size-7 transform-all duration-300 ease-in "/> 
          </button>
        </div>
        {cartItemCount && (
          <div className="text-center flex gap-5 justify-center items-center">
            <div className="flex flex-col gap-5 items-center">
              <p className="">
                Your Cart is Empty. <br/> Go checkout some rugs!
              </p>
              <ShopBtn/>
            </div>
            <div className="flex flex-col gap-5 items-center">
              <p>Would you like a custom rug?</p>
              <StartOrderBtn />
            </div>
          </div>
        )}
      </section>
      <section className="w-[1fr]">
        <div>
          Hello
        </div>
      </section>
    </main>
  )
}
