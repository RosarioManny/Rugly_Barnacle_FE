import { Link } from "react-router-dom"
export const NavBar = () => {

  return (
    <>
      <Link to="/"> Home </Link>
      <Link to="/about"> About </Link>
      <Link to="/faq"> FAQ </Link>
      <Link to="/shop"> Shop </Link>
      <Link to="/cart"> Cart </Link>
      <Link to="/portfolio"> Portfolio </Link>
      <Link to="/checkout"> Checkout </Link>
    </>
  )
}