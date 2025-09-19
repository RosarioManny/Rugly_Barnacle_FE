import { Link } from "react-router-dom"

export const StartOrderBtn = () => (
  <button className="
    btn_general 
    max-w-[130px] h-[55px]
    drop-shadow-sm/50
    hover:bg-robin_egg hover:scale-105
    active:bg-robin_egg active:scale-105 
    focus:bg-robin_egg focus:scale-105
    "> 
    <Link to="/custom-order">
      Start Order
    </Link>
  </button>
)