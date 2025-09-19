import { Link } from "react-router-dom";
import { useMobileHandlers } from "../../../hooks/navbar";
import { BurgerLine } from "./Burgerline";

interface MobileNavbarProps {
  aboutSubMenu: string[];
}

export const MobileNavbar = ( { aboutSubMenu=[]}: MobileNavbarProps) => {

  const {
    handleClick,
    toggleMobileAbout,
    isToggled,
    mobileShopOpen,
    mobileAboutOpen
  } = useMobileHandlers()


  // console.log(shopSubMenu)
  return (
    <>
      <button 
        onClick={handleClick} 
        className="z-40 relative flex flex-col justify-center items-center  overscroll-none w-[50px] h-[40px] space-y-1 p-2"
        aria-label="Mobile navigation menu - Three lined burger icon">
        <BurgerLine isToggled={isToggled} index={1} />
        <BurgerLine isToggled={isToggled} index={2} />
        <BurgerLine isToggled={isToggled} index={3} />
      </button>
      
      {/* OFF-SCREEN Menu */}
      <div 
        className={`
          h-[100dvh] w-full fixed top-0 left-0 overscroll-none // Use dvh instead of screen
          flex items-center justify-center text-center 
          text-3xl 
          transition-all ease-in-out duration-[700ms] delay-[50ms]
          bg-fleece z-30
            ${isToggled ? 'translate-x-0' : 'translate-x-full'}`}
      >
      {/* Main Menu */}
      
      <div 
        className={`flex flex-col h-fit text-white transition-all duration-100  
        ${mobileShopOpen || mobileAboutOpen ? 'opacity-0' : 'opacity-100 delay-250'}`}
      >
        <button 
          onClick={toggleMobileAbout}
          className="flex gap-2 justify-center items-center text-space_cadet focus:scale-110 hover:animate-pulse p-2 relative group pointer-cursor"
        >
          About
          <div className={`caret-right text-majorelle`} />
        </button>

        <button 
          onClick={handleClick}
          className="flex gap-2 justify-center items-center text-space_cadet focus:scale-110 hover:animate-pulse p-2 relative group pointer-cursor"
        >
          <Link to="/shop">
            Shop
          </Link>
        </button>
        
        <button 
          onClick={handleClick}
          className="flex gap-2 justify-center items-center text-space_cadet focus:scale-110 hover:animate-pulse p-2 relative group pointer-cursor"
        >
          <Link to="/shop">
            Custom Order
          </Link>
        </button>
        
        
        <button onClick={handleClick} className="flex justify-center items-center text-space_cadet focus:scale-110 hover:animate-pulse p-2 relative group pointer-cursor">
          <Link to="/portfolio" >
            Portfolio
          </Link>
        </button>
      </div>
    
      
      {/* About Submenu */}
      <div className={`
        flex flex-col w-full fixed 
        transition-all ease-in-out duration-[500ms] 
        ${mobileAboutOpen ? 'right-0' : '-right-[800px]'}`}
      >
        <button 
          onClick={toggleMobileAbout}
          className="flex gap-2 justify-center items-center text-space_cadet/60 focus:scale-110 hover:animate-pulse p-2 relative group pointer-cursor"
        >
          <div className={`caret-left text-bittersweet`} />
          Back
        </button>
        {aboutSubMenu.map((link) => (
          <Link 
            key={link} 
            to={`/${link.replace(/\s+/g, '-').toLowerCase()}`} 
            onClick={handleClick} 
            className="text-space_cadet focus:scale-110 hover:animate-pulse p-2 relative group pointer-cursor"
          >
            {link.charAt(0).toUpperCase() + link.slice(1)}
          </Link>
        ))}
      </div>

      <Link 
        to="/" 
        className="absolute bottom-10"
        onClick={handleClick}>
        <img 
          className="duration-300 transform-all ease-in hover:scale-105 active:scale-105 focus:scale-105 h-20"
          src="/assets/design/logo/Rugly_Barnacle_192x192.png" 
          alt="Rugly Barnacle small logo"
          loading="lazy"
        />
      </Link>
      
      </div>
    </>
  )
}

