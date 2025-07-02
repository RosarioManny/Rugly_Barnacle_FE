import { AppRoutes } from './routes/routes'
import { BrowserRouter } from 'react-router-dom'
import { NavBar } from './components/layout/_navbar'

function App() {

  return (
    <BrowserRouter>
      <NavBar/>
      <AppRoutes/>
    </BrowserRouter>
  )
}

export default App
