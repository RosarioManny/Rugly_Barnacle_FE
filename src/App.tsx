import { AppRoutes } from './routes/routes'
import { BrowserRouter} from 'react-router-dom'
import { NavBar } from './components/layout/_navbar'
import { Footer } from './components/layout/_footer'
import { SmoothScrollToTop } from './hooks/navbar/smoothScrollToTop'
import { CartProvider } from './hooks/CartProvider'


function App() {

  
  return (
    <BrowserRouter>
      <CartProvider>
        <SmoothScrollToTop/>
        <NavBar />
          <AppRoutes/>
        <Footer/>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
