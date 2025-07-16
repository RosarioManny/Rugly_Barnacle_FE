import { Link } from "react-router-dom"


export const ShopBtn = () => {
  return (
      <button className="
        btn_general btn_start_order 
        flex items-center gap-2 group
        drop-shadow-sm/50
        hover:bg-robin_egg hover:scale-105 
        active:bg-robin_egg active:scale-105 
        focus:bg-robin_egg focus:scale-105"> 
        <Link to="">
          Shop 
        </Link>
          {/* Caret */}
        <div 
            className={`
            transition-transform duration-600 border-t-10 border-solid ease-in-out
            caret-right text-mauve group-hover:translate-x-1 `}/>
      </button>
  )
}