import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'
import Pagenoautorized from './Auth/Pagenoautorized'
import Admin from './pages/dashbord/admin/Admin'
import Employee from './pages/dashbord/employee/Employee'
import Login from './pages/login/Login'
import NoFound from './pages/NoFound'
import logout from './controllers/logout'
import Landingpage from './pages/Landingpage'

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
        <Route path='/' element={<Landingpage />} />
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

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box bg-violet-2 max-w-60">

          <h3 className="text-lg font-bold text-center">
            Êtes-vous sûr de vouloir <br />
            vous déconnecter ?
          </h3>

          <div className="modal-action mt-10  justify-center">
            <button className="btn bg-red-400 text-white " onClick={() => {
              logout()
            }}>
              Deconnexion
            </button>
            <label htmlFor="my_modal_6" className="btn bg-blue-100 text-black">Anuller!</label>
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
