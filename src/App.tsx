import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'
import Pagenoautorized from './Auth/Pagenoautorized'
import Admin from './pages/dashbord/admin/Admin'
import Employee from './pages/dashbord/employee/Employee'
import Login from './pages/login/Login'
import NoFound from './pages/NoFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={
          <Pagenoautorized>
            <Login />
          </Pagenoautorized>
        } />


        <Route path='/dashbord/admin' element={
          <Pagenoautorized> <Admin /> </Pagenoautorized>
        } />



        <Route path='/dashbord/employee' element={
          <Pagenoautorized> <Employee /> </Pagenoautorized>
        } />

        <Route path='*' element={<NoFound />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </BrowserRouter>
  )
}

export default App
