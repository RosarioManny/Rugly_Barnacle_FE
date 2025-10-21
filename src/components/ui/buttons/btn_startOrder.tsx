import { Link } from "react-router-dom"

export const StartOrderBtn = () => (
  <Link to="/custom-order">
    <button className="
      bg-majorelle
      w-auto h-[55px]
      drop-shadow-sm
      hover:bg-robin_egg hover:scale-105
      active:bg-robin_egg active:scale-105 
      focus:bg-robin_egg focus:scale-105
      "> 
        Custom Order
    </button>
  </Link>
)