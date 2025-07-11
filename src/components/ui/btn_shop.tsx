export const ShopBtn = () => {
  return (
      <button className="
        btn_general btn_start_order 
        hover:bg-robin_egg hover:scale-105 focus:bg-robin_egg focus:scale-105"> 
          Shop 
          <div 
              className={`
              transition-transform duration-600 border-t-10 border-solid ease-in-out
              caret-right`}/>
      </button>
  )
}