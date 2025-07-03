import { useState } from "react"
import { Link } from "react-router-dom"

export const NavBar = () => {
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false)
  const [isToggled, setIsToggled] = useState(false)

  const handleShopDropdown = () => {
    setShopDropdownOpen(!shopDropdownOpen)
  }

  const handleClick = () => {
    setIsToggled(!isToggled)
  }

  return (
    <nav className="navbar flex justify-between items-center ">
      {/* Home - Brand image small logo*/}
      <section className="flex justify-center items-center">
        <Link className="brand-logo" to="/">
          <img className="h-[52px] w-[52px] mx-6" src="/assets/Logo/Rugly_Barnacle_192x192.png"/>
        </Link>
      </section>
      {/* Desktop Navbar */}
      <section className="d-nav-links hidden md:flex">
        <Link to="/portfolio">Portfolio</Link>
        <Link to="/about">About</Link>
        <div className="dropdown">
          <button 
            className="dropbtn pointer"
            onClick={handleShopDropdown}>
            Shop 
            <div 
              className={`
              ${shopDropdownOpen ? "border-t-bittersweet rotate-x-180" : "border-t-majorelle"} 
              transition-transform duration-600 border-t-10 border-solid ease-in-out
              caret-down`} 
            />
          </button>
          {/* Dropdown Menu Items */}
          <div 
            className={`
            ${shopDropdownOpen ? "max-h-96" : "max-h-0"}
            overflow-hidden transition-all duration-500 ease-in-out
            dropdown-content`}>
            <Link 
              className="flex justify-center"  
              to="/about"> 
              <div className={`caret-right`} />
              <p>About Me</p>
            </Link>
            <Link 
              className="flex justify-center" 
              to="/about"> 
              <div className={`caret-right`} />
              <p>Faq </p>
            </Link>
            <Link 
              className="flex justify-center" 
              to="/about"> 
              <div className={`caret-right`} />
              <p>Contact</p>
            </Link>
          </div>
        </div> 
      </section>
      {/* Mobile Navbar */}
      <section className="flex md:hidden">
        <button 
          onClick={handleClick} 
          className="relative w-[50px] h-[40px] flex flex-col justify-center items-center space-y-1 p-2 z-10"
          aria-label="Mobile navigation menu - Three lined burger icon">
          <BurgerLine isToggled={isToggled} index={1} />
          <BurgerLine isToggled={isToggled} index={2} />
          <BurgerLine isToggled={isToggled} index={3} />
        </button>
          {/* Off-screen Menu */}
          <div 
            className={`
              h-screen w-full fixed top-0 
              flex items-center justify-center text-center 
              text-3xl transition-all ease-in-out duration-[1000ms]
              bg-fleece
              ${isToggled ? 'right-0' : '-right-[800px]'}`}>
            <div className="flex flex-col h-fit text-white">
              {["shop", "about", "faq", "portfolio"].map((link) => (
                <Link 
                  key={link} 
                  to={`/${link}`} 
                  onClick={handleClick} 
                  className={`text-space_cadet hover:animate-pulse p-2 relative group pointer-cursor `}>
                  {link.charAt(0).toUpperCase() + link.slice(1)}
                </Link>
              ))}
            </div>
            <img 
              className="bottom-10 absolute h-40"
              src="/icons-logos/Nomad-logo-White-Transparent.png" 
              alt="Rugly Barnacle logo with writing"
              loading="lazy"
            />
          </div>
      </section>
      {/* Cart Link */}
      <section className="flex justify-center items-center">
        <Link className="mx-6"to="/cart"> Cart </Link>
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