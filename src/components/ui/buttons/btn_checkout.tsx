import { Link } from "react-router-dom"

export const CheckoutBtn = () => (
  
    <Link to="/checkout">
      <button className="
        drop-shadow-sm/50 rounded-lg
        bg-majorelle
        hover:bg-robin_egg hover:scale-110
        active:bg-robin_egg active:scale-110 
        focus:bg-robin_egg focus:scale-110"> 
          Checkout
      </button>
    </Link>
  )