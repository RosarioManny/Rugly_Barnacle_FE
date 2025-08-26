import { Routes, Route } from 'react-router-dom'
import { Home } from '../pages/Home/home'
import { About } from '../pages/About/about'
import { TempShop } from '../pages/Shop/tempShop'
import { Portfolio } from '../pages/Portfolio/portfolio'
import { Faq } from '../pages/Faq/faq'
import { Contact } from '../pages/Contact/contact'
// import { Checkout } from '../pages/Checkout/checkout'
// import { ProductDetails } from '../pages/Products/productDetails'
// import { Cart } from '../pages/Cart/cart'
// import { Shop } from '../pages/Shop/shop'



export const AppRoutes = () => {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/portfolio' element={<Portfolio />} />
        <Route path='/shop' element={<TempShop />} />
        <Route path='/faq' element={<Faq />} />
        {/* <Route path='/cart' element={<Cart />} /> */}
        {/* <Route path='/checkout' element={<Checkout />} /> */}
        {/* <Route path='/events' element={<Home />} /> */}
        {/* <Route path='/shop/:id' element={<ProductDetails />}/> */}
      </Routes>
    </>
  )
}