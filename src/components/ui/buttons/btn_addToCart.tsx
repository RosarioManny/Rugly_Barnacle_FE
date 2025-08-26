import { Link } from "react-router-dom"

export const AddToCartBtn = () => (
      <button className="
        btn_addToCart 
        w-full
        duration-100 drop-shadow-sm/50
        hover:bg-robin_egg hover:scale-105
        active:bg-robin_egg active:scale-105 
        focus:bg-robin_egg focus:scale-105"> 
        <Link to="">
          Add to Cart
        </Link>
      </button>
  )
