import { Link } from "react-router-dom"

export const StartOrderBtn = () => (
  <button className="
    btn_general whitespace-none
    duration-100 drop-shadow-sm/50
    hover:bg-robin_egg hover:scale-105
    active:bg-robin_egg active:scale-105 
    focus:bg-robin_egg focus:scale-105
    w-40 /* Add this to make button fill container */
    "> 
    <Link to="">
      Start Order
    </Link>
  </button>
)