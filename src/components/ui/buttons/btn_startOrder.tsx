import { Link } from "react-router-dom"

export const StartOrderBtn = () => {
  return (
      <button className="
        btn_general btn_start_order
        duration-100
        hover:bg-robin_egg hover:scale-105
        active:bg-robin_egg active:scale-105 
        focus:bg-robin_egg focus:scale-105"> 
          Start Order
      </button>
  )
}