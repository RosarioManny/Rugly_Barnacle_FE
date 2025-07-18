import { useState } from "react"
import { Link } from "react-router-dom"
import { CartIcon } from "../icons-svgs/SvgIcons"

const shopSubMenu = ["shop all", "rugs", "mirror rugs", "mug rugs", "custom rugs"]
const aboutSubMenu = ["about me", "contact", "faq"]
export const NavBar = () => {
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false)
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false)
  const [isToggled, setIsToggled] = useState(false)
  const [mobileShopOpen, setMobileShopOpen] = useState(false)
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false)

  const closeDropdown = () => {
    if (shopDropdownOpen) setShopDropdownOpen(false)
    if (aboutDropdownOpen) setAboutDropdownOpen(false)
  }

  const handleShopDropdown = () => {
    setShopDropdownOpen(!shopDropdownOpen)
  }

  const handleAboutDropdown = () => {
    setAboutDropdownOpen(!aboutDropdownOpen)
  }

  const handleClick = () => {
    setIsToggled(!isToggled)
    // Reset mobile dropdowns when closing menu
    if (isToggled) {
      setMobileShopOpen(false)
      setMobileAboutOpen(false)
    }
  }

  const toggleMobileShop = () => {
    setMobileShopOpen(!mobileShopOpen)
    // Close about if it's open
    if (mobileAboutOpen) setMobileAboutOpen(false)
  }

  const toggleMobileAbout = () => {
    setMobileAboutOpen(!mobileAboutOpen)
    // Close shop if it's open
    if (mobileShopOpen) setMobileShopOpen(false)
  }

  return (
    <nav className="navbar max-h-[10] grid grid-cols-3 align-center items-center">
      {/* Home - Brand image small logo*/}
      <section className="flex justify-self-start items-center focus:scale-110 hover:scale-110 transition-all">
        <Link className="brand-logo" to="/">
          <img className="size-12 mx-6" src="/assets/design/logo/Rugly_Barnacle_192x192.png" alt="Rugly Barnacle Abrreviated Logo - RB"/>
        </Link>
      </section>

      {/* Desktop Navbar */}
      <section className="d-nav-links hidden md:flex">
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
              className={``}
              onClick={closeDropdown}
              >
              <div className={`caret-right text-robin_egg`} />
              <p> {link.charAt(0).toUpperCase() + link.slice(1)}</p> 
            </Link>
            ))}
          </div>
        </div> 
        
        <button>
          <Link to="/portfolio">
            Portfolio
          </Link>
        </button>
  
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
          {/* TODO: Fix Links to actual Shop Category Pages */}
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
      </section>

      {/* Mobile Navbar */}
      <section className="justify-self-center md:hidden">
        <button 
          onClick={handleClick} 
          className="z-20 relative overscroll-none w-[50px] h-[40px] space-y-1 p-2 z-10"
          aria-label="Mobile navigation menu - Three lined burger icon">
          <BurgerLine isToggled={isToggled} index={1} />
          <BurgerLine isToggled={isToggled} index={2} />
          <BurgerLine isToggled={isToggled} index={3} />
        </button>
        
        {/* OFF-SCREEN Menu */}

        
        <div 
          className={`
            h-screen w-full fixed top-0 overscroll-none
            flex items-center justify-center text-center 
            text-3xl 
            transition-all ease-in-out duration-[1000ms] delay-100
            bg-fleece z-10
            ${isToggled ? 'right-0' : '-right-[800px]'}`}>
        
          {/* Main Menu */}
          <div className={`flex flex-col h-fit text-white transition-all duration-100  ${mobileShopOpen || mobileAboutOpen ? 'opacity-0' : 'opacity-100 delay-250'}`}>
            <button 
              onClick={toggleMobileShop}
              className="flex gap-2 justify-center items-center text-space_cadet focus:scale-110 hover:animate-pulse p-2 relative group pointer-cursor">
              Shop
              <div className={`caret-right text-majorelle`} />
            </button>
            
            <button 
              onClick={toggleMobileAbout}
              className="flex gap-2 justify-center items-center text-space_cadet focus:scale-110 hover:animate-pulse p-2 relative group pointer-cursor">
              About
              <div className={`caret-right text-majorelle`} />
            </button>
            <button>
              <Link 
                to="/portfolio" 
                onClick={handleClick} 
                className="text-space_cadet focus:scale-110 hover:animate-pulse p-2 relative group pointer-cursor">
                Portfolio
              </Link>
            </button>
          </div>

          {/* Shop Submenu */}
          <div className={`flex flex-col  w-full fixed transition-all ease-in-out duration-[500ms] ${mobileShopOpen ? 'right-0' : '-right-[800px]'}`}>
            <button 
              onClick={toggleMobileShop}
              className="flex gap-2 justify-center items-center text-space_cadet/60 focus:scale-110 hover:animate-pulse p-2 relative group pointer-cursor">
              <div className={`caret-left text-bittersweet`} />
              Back
            </button>
            {shopSubMenu.map((link, idx) => (
              <Link 
                key={`${link}-${idx}`} 
                to={`/${link.replace(/\s+/g, '-').toLowerCase()}`} 
                onClick={handleClick} 
                className="text-space_cadet focus:scale-110 hover:animate-pulse p-2 relative group pointer-cursor">
                {link.charAt(0).toUpperCase() + link.slice(1)}
              </Link>
            ))}
          </div>

          {/* About Submenu */}
          <div className={`flex flex-col  w-full fixed transition-all ease-in-out duration-[500ms] ${mobileAboutOpen ? 'right-0' : '-right-[800px]'}`}>
            <button 
              onClick={toggleMobileAbout}
              className="flex gap-2 justify-center items-center text-space_cadet/60 focus:scale-110 hover:animate-pulse p-2 relative group pointer-cursor">
              <div className={`caret-left text-bittersweet`} />
              Back
            </button>
            {aboutSubMenu.map((link) => (
              <Link 
                key={link} 
                to={`/${link.replace(/\s+/g, '-').toLowerCase()}`} 
                onClick={handleClick} 
                className="text-space_cadet focus:scale-110 hover:animate-pulse p-2 relative group pointer-cursor">
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
      </section>

      {/* Cart Link */}
      <section className="justify-self-end">
        <button className="my-2 flex ">
          <Link className="" to="/cart"> 
            <CartIcon className="text-space_cadet focus:scale-110 hover:text-majorelle" />
          </Link>
        </button>
      </section>
    </nav>
  )
}

// Define Burger Line props
interface BurgerLineProps {
  isToggled: boolean;
  index: 1 | 2 | 3;
}

const BurgerLine = ({ isToggled, index }: BurgerLineProps) => {
  const lineClass = `rounded bg-space_cadet block h-1 w-10 transition-transform duration-300 ease-in-out`;
  const transforms = [
    isToggled ? "rotate-45 translate-y-2" : "",
    isToggled ? "opacity-0" : "opacity-100",
    isToggled ? "-rotate-45 -translate-y-2" : "",
  ];
  return <span aria-label={`Mobile burger line ${index}`} className={`${lineClass} ${transforms[index - 1]}`} />;
};