import { Routes, Route } from 'react-router-dom'
import { 
  Home, 
  About, 
  Contact, 
  Shop, 
  ProductDetails, 
  Portfolio, 
  CustomOrder, 
  Faq, 
  Cart,
  Checkout
} from "../pages";
// import { CartProvider } from '../hooks/CartProvider';

// const ContextWrapper = useContext()


export const AppRoutes = () => {

  return (
    <>
        {/* <CartProvider> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/portfolio' element={<Portfolio />} />
        <Route path='/custom-order' element={<CustomOrder />} />
        <Route path='/faq' element={<Faq />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/shop/:id' element={<ProductDetails />}/>
        <Route path='/checkout' element={<Checkout />} />
        {/* <Route path='/events' element={<Events />} /> */}
      </Routes>
        {/* </CartProvider> */}
    </>
  )
}