import { Link } from "react-router-dom"
import { useDropdownHandlers } from "../../hooks/navbar"
import { MobileNavbar } from "../ui/navbar/mobileNavbar"
// import { CartIcon } from "../ui/icons-svgs/SvgIcons"
// import { useCart } from "../../hooks/CartProvider"
import { StartOrderBtn } from "../ui/buttons"

const aboutSubMenu = ["about", "contact", "FAQ"]

export const NavBar = () => {
  const {
    closeDropdown,
    handleShopDropdown,
    handleAboutDropdown,
    aboutDropdownOpen
  } = useDropdownHandlers()

  // const { cartItemCount } = useCart()

  return (
    <nav className="
        z-40 
        bg-fleece 
        border-b-solid border-b-2 border-b-majorelle 
        rethink-sans 
        max-h-[70px] min-h-[70px]
        flex justify-between items-center px-4 md:px-6">
      
      {/* LEFT SIDE: Logo and Navigation */}
      <section className="flex items-center space-x-6">
        {/* Logo */}
        <Link className="focus:scale-110 hover:scale-110 transition-all" to="/">
          <img 
            className="size-12" 
            src="/assets/design/logo/Rugly_Barnacle_192x192.png" 
            alt="Rugly Barnacle Abrreviated Logo - RB"/>
        </Link>

        {/* Desktop Navigation - Hidden on mobile */}
        <section className="text-majorelle hidden md:flex items-center space-x-4">
          <div className="dropdown">
            {/* About Nav Button */}
            <button 
              className="nav-buttons gap-2"
              onClick={handleAboutDropdown}>
              About 
              <div 
                className={`
                ${aboutDropdownOpen ? "border-t-bittersweet rotate-x-180" : "border-t-majorelle"} 
                transition-transform duration-600 border-t-10 border-solid ease-in-out
                caret-down`}/>
            </button>

            {/* ABOUT Dropdown Items */}
            <div 
              className={`
              ${aboutDropdownOpen ? "opacity-100 max-h-96" : "opacity-0 max-h-0"}
              overflow-hidden transition-all duration-500 ease-in-out 
              dropdown-content`}>
              {aboutSubMenu.map((link) => (
              <Link 
                key={link} 
                to={`/${link}`} 
                className={`nav-buttons duration-200 transform transition-all hover:bg-majorelle/10 group`}
                onClick={closeDropdown}
              >
                <div className={`
                  caret-right text-robin_egg 
                  pointer duration-200 transform transition-all
                  text-fleece body_text 
                  group-hover:text-bittersweet 
                  group-active:text-bittersweet 
                  group-focus:text-bittersweet `} />
                <p className="
                  pointer duration-200 transform transition-all
                  text-space_cadet body_text 
                  group-hover:text-majorelle 
                  p-1
                  group-active:text-majorelle
                  group-focus:text-majorelle"
                >
                  {link.charAt(0).toUpperCase() + link.slice(1)}
                </p> 
              </Link>
              ))}
            </div>
          </div> 
          
          <Link to="/portfolio">
            <button className="nav-buttons cursor-pointer">
              Portfolio
            </button>
          </Link>
          
          <Link to="/shop">
            <button 
              className="nav-buttons cursor-pointer"
              onClick={handleShopDropdown}>
                Shop 
            </button>
          </Link>
        </section>
      </section>

      {/* RIGHT SIDE: Cart and Start Order Button */}
      <section className="flex items-center justify-center space-x-4">
        {/* Cart Button */}
        {/* <div className="relative">
          <Link to="/cart"> 
            <button 
              className="group transform-all duration-400 flex-shrink-0 justify-center items-center p-3 hover:bg-majorelle/30 rounded-full transition-colors"
              aria-label={`Cart with ${cartItemCount} items`}
            >
              <CartIcon className="
                size-8 md:size-10
                group-hover:scale-110 group-hover:text-majorelle
                group-focus:scale-110
                transform-all duration-400
                text-space_cadet"
              /> */}
              
              {/* Cart Item Count Badge */}
              {/* {cartItemCount > 0 && (
                <span className=
                {`absolute top-1 right-1
                  min-w-[20px] h-5
                  bg-midnight_green text-fleece
                  rounded-full
                  text-xs font-bold
                  flex items-center justify-center
                  px-1
                  border-2 border-fleece
                  shadow-sm
                  group-hover:bg-robin_egg
                  ease-in-out duration-400 transition-all
                  `}
                >
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </button>
          </Link>
        </div> */}

        {/* Start Order Button */}
        <div className="hidden md:block">
          <StartOrderBtn />
        </div>

        {/* Mobile Navbar - Hidden on desktop */}
        <div className="md:hidden">
          <MobileNavbar aboutSubMenu={aboutSubMenu} />
        </div>
      </section>
    </nav>
  )
}