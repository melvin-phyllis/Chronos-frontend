import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/login/Login'
import NoFound from './pages/NoFound'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<NoFound />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
