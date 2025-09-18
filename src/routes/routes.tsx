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
  Cart 
} from "../pages";



export const AppRoutes = () => {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/portfolio' element={<Portfolio />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/custom' element={<CustomOrder />} />
        <Route path='/faq' element={<Faq />} />
        <Route path='/cart' element={<Cart />} />
        {/* <Route path='/checkout' element={<Checkout />} /> */}
        {/* <Route path='/events' element={<Events />} /> */}
        <Route path='/shop/:id' element={<ProductDetails />}/>
      </Routes>
    </>
  )
}