import React, { Component, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import PublicRouter from './PublicRouter'
import PrivateRouter from './PrivateRouter'
import 'react-toastify/dist/ReactToastify.css'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const LoginPage = React.lazy(() => import('./views/login/LoginPage'))

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ToastContainer />
        <Suspense fallback={loading}>
          <Routes>
            <Route element={<PublicRouter />}>
              <Route path="/login" element={<LoginPage />} />
            </Route>

            <Route element={<PrivateRouter />}>
              <Route path="*" element={<DefaultLayout />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    )
  }
}

export default App
