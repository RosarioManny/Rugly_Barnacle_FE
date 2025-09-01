import { Link } from "react-router-dom"
export const ContactUsBtn = () => (
    <button className="
    btn_contact_us drop-shadow-sm/30
    active:border-robin_egg active:scale-105 
    focus:border-robin_egg focus:scale-105 
    hover:border-robin_egg hover:scale-105"> 
      <Link to="/contact">
      Contact Me
      </Link>
    </button>
  )