import { ShopBtn, StartOrderBtn } from "../../../components/ui/buttons"

export const EmptyCart = () => {
  
  return ( 
    <div className="flex flex-col gap-4 justify-center items-center my-4">
      <p className="text-lg font-semibold">Your cart is empty</p>
      <p className="text-sm font-medium text-space_cadet/80">Let's get you started!</p>
      <div className="flex gap-3 items-center mt-2">
        <StartOrderBtn />
        <ShopBtn />
      </div>
    </div>
  )
}