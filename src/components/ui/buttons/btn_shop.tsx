import { Link } from "react-router-dom"


export const ShopBtn = () => (
    <Link to="/shop">
      <button className="
        bg-majorelle
        w-auto h-[55px]
        flex items-center gap-2 group
        drop-shadow-sm/50 duration-600 rounded-lg
        hover:bg-space_cadet hover:scale-105 
        active:bg-space_cadet active:scale-105 
        focus:bg-space_cadet focus:scale-105"
        > 
          Shop 
        {/* Caret */}
        <div 
          className={`
            transition-all duration-400 
            border-t-10 border-solid ease-in-out
            caret-right text-fleece 
            group-hover:text-mauve group-hover:translate-x-1 `}/>
      </button>
    </Link>
  )
