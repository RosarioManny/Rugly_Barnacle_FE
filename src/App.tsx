import { AppRoutes } from './routes/routes'
import { BrowserRouter} from 'react-router-dom'
import { NavBar } from './components/layout/_navbar'
import { Footer } from './components/layout/_footer'
import { SmoothScrollToTop } from './hooks/navbar/smoothScrollToTop'


function App() {

  
  return (
    <BrowserRouter>
      <SmoothScrollToTop/>
      <NavBar/>
        <AppRoutes/>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
