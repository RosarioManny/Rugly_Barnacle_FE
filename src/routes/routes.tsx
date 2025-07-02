import { Routes, Route } from 'react-router-dom'
import { Home } from '../pages/Home/home'

export const AppRoutes = () => {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='about' element={<Home />} />
        <Route path='/portfolio' element={<Home />} />
        <Route path='/cart' element={<Home />} />
        <Route path='/shop' element={<Home />} />
        <Route path='/shop/:itemId' element={<Home />} />
        <Route path='/faq' element={<Home />} />
        {/* <Route path='/events' element={<Home />} /> */}
      </Routes>
    </>
  )
}