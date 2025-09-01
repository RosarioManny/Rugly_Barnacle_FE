import { Link } from "react-router-dom"


export const ShopBtn = () => (
      <button className="
        btn_general
        flex items-center gap-2 group
        drop-shadow-sm/50 duration-600 
        hover:bg-robin_egg hover:scale-105 
        active:bg-robin_egg active:scale-105 
        focus:bg-robin_egg focus:scale-105"> 
        <Link to="/shop">
          Shop 
        </Link>
          {/* Caret */}
        <div 
            className={`
            transition-all duration-400 
            border-t-10 border-solid ease-in-out
            caret-right text-mauve 
            group-hover:text-midnight_green group-hover:translate-x-1 `}/>
      </button>
  )
