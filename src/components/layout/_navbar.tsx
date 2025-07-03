import { useState } from "react"
import { Link } from "react-router-dom"

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="">
      {/* Nav Links */}  
      <div className="navbar">
        <Link to="/portfolio">Portfolio</Link>
        {/* <Link to="/shop">Shop</Link> */}

        <div className="dropdown">
          <button 
          className="dropbtn pointer"
          onClick={handleDropdown}>
            Shop 
            <i className={`
              ${isOpen ? "border-t-bittersweet rotate-x-180" : "border-t-majorelle"} 
              transition-transform duration-600 border-t-10 border-solid ease-in-out
              fa fa-caret-down`} 
              />
          </button>

          <div className={`
            ${isOpen ? " max-h-96" : " max-h-0"}
            overflow-hidden transition-all duration-500 ease-in-out
            dropdown-content`}>
            <Link to="/about">About Me</Link>
            <Link to="/faq">Faq</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div> 

        <div className="dropdown">
          <button className="dropbtn">
            About 

          </button>
{/* 
          <div className="dropdown-content">
            <Link to="/about">About Me</Link>
            <Link to="/faq">Faq</Link>
            <Link to="/contact">Contact</Link>
          </div> */}
        </div> 
      </div>
      {/* Home - Brand image small logo*/}
      {/* <section>
        <Link to="/">
          <img src="/assets/Logo/Rugly_Barnacle_192x192.png"/>
        </Link>
      </section> */}
      {/* Cart Link */}
      {/* <section>
        <Link to="/cart"> Cart </Link>
      </section> */}
    </nav>
  )
}