import { Link } from "react-router-dom"

export const StartOrderBtn = () => (
  <button className="
    btn_general whitespace-none
    drop-shadow-sm/50
    hover:bg-robin_egg hover:scale-105
    active:bg-robin_egg active:scale-105 
    focus:bg-robin_egg focus:scale-105
    w-40 
    "> 
    <Link to="https://www.etsy.com/listing/1525283934/custom-rug-personalized-rug-custom-anime">
      Start Order
    </Link>
  </button>
)