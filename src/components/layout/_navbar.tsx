import { Link } from "react-router-dom"
import { useDropdownHandlers } from "../../hooks/navbar"
import { MobileNavbar } from "../ui/navbar/mobileNavbar"
import { CartIcon } from "../ui/icons-svgs/SvgIcons"


const shopSubMenu = ["shop", "rugs", "mirror rugs", "mug rugs", "custom rugs"]
const aboutSubMenu = ["about", "contact", "FAQ"]

export const NavBar = () => {


  const {
    closeDropdown,
    handleShopDropdown,
    handleAboutDropdown,
    shopDropdownOpen,
    aboutDropdownOpen
  } = useDropdownHandlers()


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
            overflow-hidden transition-all duration-500 ease-in-out mt-[1.5px] 
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
          {/* <Link className="dropbtn" to="/shop">
            Shop
          </Link> */}
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
            {shopSubMenu.map((link, idx) => (
              <Link 
              key={`${link}-${idx}`} 
              to={`/${link}`} 
              className={``}
              onClick={closeDropdown}
              >
              <div className={`caret-right text-robin_egg`} />
              <p> {link.charAt(0).toUpperCase() + link.slice(1)}</p> 
            </Link>
            ))}
          </div>
        </div>
            {/* TODO: Fix Links to actual Shop Category Pages */}
      </section>

      {/* Mobile Navbar */}
      <section className="z-50 justify-between md:hidden">
        <MobileNavbar 
          shopSubMenu={shopSubMenu} 
          aboutSubMenu={aboutSubMenu}  
        /> 
      </section>

      {/* Cart Link */}
      <section className="justify-self-end">
        <button 
          className="flex-shrink-0 p-2 hover:bg-majorelle/30 rounded-full transition-colors duration-200 group"
          aria-label="Cart Icon">
          {/* Version 2  */}
          <Link className="" to="/cart"> 
            <CartIcon className="
              size-8 md:size-9
              group-hover:scale-110  group-hover:text-majorelle
              group-focus:scale-110
              transform-all duration-200 text-space_cadet"
            />
          </Link>
        </button>
      </section>
    </nav>
  )
}