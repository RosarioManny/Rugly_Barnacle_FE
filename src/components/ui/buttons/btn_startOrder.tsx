import { Link } from "react-router-dom"

export const StartOrderBtn = () => (
  <Link to="/custom-order">
    <button className="
      bg-majorelle
      w-auto h-[56px]
      drop-shadow-sm rounded-lg
      hover:bg-space_cadet hover:scale-105 hover:ring-mauve hover:ring-2
      active:bg-space_cadet active:scale-105 
      focus:bg-space_cadet focus:scale-105
      "> 
        Custom Order
    </button>
  </Link>
)