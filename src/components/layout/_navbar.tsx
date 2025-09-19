import { Link } from "react-router-dom"
import { useDropdownHandlers } from "../../hooks/navbar"
import { MobileNavbar } from "../ui/navbar/mobileNavbar"
import { CartIcon } from "../ui/icons-svgs/SvgIcons"
import { useCart } from "../../hooks/CartProvider" // Import the cart hook
import { useEffect } from "react"
// import { useEffect, useState } from "react"



const aboutSubMenu = ["about", "contact", "FAQ"]

export const NavBar = () => {
  const {
    closeDropdown,
    handleShopDropdown,
    handleAboutDropdown,
    aboutDropdownOpen
  } = useDropdownHandlers()

  const { cartItemCount } = useCart()
  useEffect(() => {
    console.log("CIC >>",cartItemCount)
  }, [cartItemCount])
  // const [ cartItemCount, setCartItemCount] = useState(cart?.items?.length || 0)
  // // const cartItemCount = cart?.items?.length || 0÷
  // useEffect(() => {
  //   console.log("CIC >>",cartItemCount)
  //   if (cartItemCount > 0) {

  //   }
  // },[cartItemCount])

  return (
    <nav className="
        z-40 
        bg-fleece 
        border-b-solid border-b-2 border-b-majorelle 
        rethink-sans 
        max-h-[70px] min-h-[70px]
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
      <section className="text-majorelle hidden items-center justify-self-center md:justify-end md:flex">
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
              className={`nav-buttons duration-200 transform transition-all hover:bg-majorelle/10  group`}
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
        <Link className="text-majorelle cursor-pointer" to="/portfolio">
          <button className="nav-buttons ">
          Portfolio
          </button>
        </Link>
        
          {/* Shop Nav Button */}
          <Link className="cursor-pointer" to="/shop">
            <button 
              className="nav-buttons "
              onClick={handleShopDropdown}>
                  Shop 
            </button>
          </Link>
      </section>

      {/* Mobile Navbar */}
      <section className="z-50 justify-between md:hidden">
        <MobileNavbar 
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
              <span className=
              {`absolute top-1 right-1
                min-w-[20px] h-5
                bg-bittersweet text-fleece
                rounded-full
                text-xs font-bold
                flex items-center justify-center
                px-1
                border-2 border-fleece
                shadow-sm
                group-hover:bg-robin_egg
                ease-in-out duration-200
                ${cartItemCount ? "bg-yellow-500" : "bg-green-600"}
                `}
              >
                {cartItemCount > 99 ? '99+' : cartItemCount}
              </span>
            )}
          </Link>
        </button>
      </section>
    </nav>
  )
}