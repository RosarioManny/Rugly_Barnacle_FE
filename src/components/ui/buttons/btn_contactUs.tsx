import { Link } from "react-router-dom"
export const ContactUsBtn = () => (
    <Link to="/contact">
      <button className="
      drop-shadow-sm
      border-2 border-robin_egg
      h-[55px]
      active:border-robin_egg active:scale-105 active:border-majorelle
      focus:border-robin_egg focus:scale-105 focus:border-majorelle
      hover:scale-105 hover:border-majorelle"> 
        Contact Me
      </button>
    </Link>
  )