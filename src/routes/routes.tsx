import { Routes, Route } from 'react-router-dom'
import { 
  Home, 
  About, 
  Contact, 
  Portfolio, 
  CustomOrder, 
  Faq, 
  Shop, 
  ProductDetails, 
  Cart,
  CheckoutPage,
  // TempShop,
  // Booking,
  Blog,
  BlogDetails,
  Events
} from "../pages";
import { CartProvider } from '../hooks/cart/cartProvider';

export const AppRoutes = () => {

  return (
    <>
        <CartProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/portfolio' element={<Portfolio />} />
        <Route path='/custom-order' element={<CustomOrder />} />
        <Route path='/faq' element={<Faq />} />
        {/* <Route path='/shop' element={<TempShop />} /> */}
          <Route path='/shop' element={<Shop />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/shop/:id' element={<ProductDetails />}/>
        <Route path='/checkout' element={<CheckoutPage />} />
          {/* 
            <Route path='/checkout/success' element={<CheckoutSuccess />} />
            <Route path='/checkout/canceled' element={<CheckoutCanceled />} /> 
          */}

        <Route path='/events' element={<Events />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/blog/:id' element={<BlogDetails />} />
        {/* <Route path='/bookings' element={<Booking />} /> */}
      </Routes>
        </CartProvider>
    </>
  )
}