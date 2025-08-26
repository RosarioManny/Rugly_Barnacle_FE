import { AppRoutes } from './routes/routes'
import { BrowserRouter } from 'react-router-dom'
import { NavBar } from './components/layout/_navbar'
import { Footer } from './components/layout/_footer'

function App() {

  return (
    <BrowserRouter>
      <NavBar/>
        <AppRoutes/>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
