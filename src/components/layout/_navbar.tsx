import { useState } from "react"
import { Link } from "react-router-dom"

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Nav Links */}
      <section  className="text-red-500">
        <Link to="/"> Home </Link>
        <span 
        onMouseEnter={() => {setIsOpen(!isOpen)}}
        onMouseLeave={() => {setIsOpen(!isOpen)}}
        > About 
        {isOpen && 
          <>
            <Link to="/about">About Me</Link>
            <Link to="/faq">Faq</Link>
          </>
        }
        </span>
        <Link to="/shop"> Shop </Link>
        <Link to="/portfolio"> Portfolio </Link>
      </section>
      {/* Home - Brand image small logo*/}
      <section>
        <Link to="/">
          <img src="/assets/Logo/Rugly_Barnacle_192x192.png"/>
        </Link>
      </section>
      {/* Cart Link */}
      <section>
        <Link to="/cart"> Cart </Link>
      </section>
    </>
  )
}