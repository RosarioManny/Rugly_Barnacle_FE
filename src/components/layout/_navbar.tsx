import { Link } from "react-router-dom"
import { useDropdownHandlers } from "../../hooks/navbar"
import { MobileNavbar } from "../ui/navbar/mobileNavbar"
import { CartIcon } from "../ui/icons-svgs/SvgIcons"
import { useCart } from "../../hooks/useCart" // Import the cart hook
// import { useEffect, useState } from "react"

const shopSubMenu = [ "shop", "custom"];
const aboutSubMenu = ["about", "contact", "FAQ"]

export const NavBar = () => {
  const {
    closeDropdown,
    handleShopDropdown,
    handleAboutDropdown,
    shopDropdownOpen,
    aboutDropdownOpen
  } = useDropdownHandlers()

  const { cart } = useCart()
  const cartItemCount = cart?.items?.length || 0



  return (
    <nav className="
        z-40 
        bg-fleece 
        border-b-solid border-b-2 border-b-majorelle 
        rethink-sans 
        max-h-[5rem] min-h-[3.5rem]
        flex md:grid md:grid-cols-3 justify-between items-center">
      {/* Home - Brand image small logo*/}
      <section className="flex justify-self-start items-center focus:scale-110 hover:scale-110 transition-all">
        <Link className="brand-logo" to="/">
          <img 
            className="size-12 mx-6" 
            src="/assets/design/logo/Rugly_Barnacle_192x192.png" 
            alt="Rugly Barnacle Abrreviated Logo - RB"/>
        </Link>
      </section>

      {/* Desktop Navbar */}
      <section className="d-nav-links hidden justify-self-center md:justify-end md:flex">
        <div className="dropdown">
          {/* About Nav Button */}
          <button 
            className="dropbtn"
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
              className={`dropbtn group`}
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
                group-active:text-majorelle
                group-focus:text-majorelle"
              >
                {link.charAt(0).toUpperCase() + link.slice(1)}
              </p> 
            </Link>
            ))}
          </div>
        </div> 

          <Link className="dropbtn" to="/portfolio">
            Portfolio
          </Link>
        <div className="dropdown">
          {/* Shop Nav Button */}
          <button 
            className="dropbtn pointer"
            onClick={handleShopDropdown}>
            Shop 
            <div 
              className={`
              ${shopDropdownOpen ? "border-t-bittersweet rotate-x-180" : "border-t-majorelle"} 
              transition-transform duration-600 border-t-10 border-solid ease-in-out
              caret-down`}/>
          </button>

          {/* SHOP Dropdown Items */}
          <div 
            className={`
              ${shopDropdownOpen ? "opacity-100 max-h-96" : "opacity-0 max-h-0"}
              overflow-hidden transition-all duration-500 ease-in-out
              dropdown-content`}>
            {shopSubMenu.map((item) => (
              <Link 
              key={item} 
              to={`/${item}`} 
              className={`dropbtn group`}
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
                group-active:text-majorelle
                group-focus:text-majorelle"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </p> 
            </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Navbar */}
      <section className="z-50 justify-between md:hidden">
        <MobileNavbar 
          shopSubMenu={shopSubMenu} 
          aboutSubMenu={aboutSubMenu}  
        /> 
      </section>

      {/* Cart Link with Item Count */}
      <section className="justify-self-end mr-4 md:mr-6 relative">
        <button 
          className="flex-shrink-0 p-3 hover:bg-majorelle/30 rounded-full transition-colors duration-200 group relative"
          aria-label={`Cart with ${cartItemCount} items`}
        >
          <Link to="/cart"> 
            <CartIcon className="
              size-10 md:size-11
              group-hover:scale-110  group-hover:text-majorelle
              group-focus:scale-110
              transform-all duration-200 text-space_cadet"
            />
            
            {/* Cart Item Count Badge */}
            {cartItemCount > 0 && (
              <span className="
                absolute top-1 right-1
                min-w-[20px] h-5
                bg-bittersweet text-fleece
                rounded-full
                text-xs font-bold
                flex items-center justify-center
                px-1
                border-2 border-fleece
                shadow-sm
                group-hover:bg-robin_egg
              ">
                {cartItemCount > 99 ? '99+' : cartItemCount}
              </span>
            )}
          </Link>
        </button>
      </section>
    </nav>
  )
}