import { useState } from "react"
import { Link } from "react-router-dom"

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="">
      {/* Nav Links */}  
      <div className="navbar">
        <Link to="/portfolio">Portfolio</Link>
        {/* <Link to="/shop">Shop</Link> */}
        <div className="dropdown">
          <button className="dropbtn">Shop 
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-content">
            <Link to="/about">About Me</Link>
            <Link to="/faq">Faq</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div> 
        <div className="dropdown">
          <button className="dropbtn">About 
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-content">
            <Link to="/about">About Me</Link>
            <Link to="/faq">Faq</Link>
            <Link to="/contact">Contact</Link>
          </div>
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