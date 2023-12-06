// import React, { Component, Suspense } from 'react'
// import { HashRouter, Route, Routes } from 'react-router-dom'
// import './scss/style.scss'

// const loading = (
//   <div className="pt-3 text-center">
//     <div className="sk-spinner sk-spinner-pulse"></div>
//   </div>
// )

// const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
// const Login = React.lazy(() => import('./views/pages/login/Login'))
// const Register = React.lazy(() => import('./views/pages/register/Register'))
// const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
// const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

// class App extends Component {
//   render() {
//     return (
//       <HashRouter>
//         <Suspense fallback={loading}>
//           <Routes>
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/404" element={<Page404 />} />
//             <Route path="/500" element={<Page500 />} />
//             <Route path="*" element={<DefaultLayout />} />
//           </Routes>
//         </Suspense>
//       </HashRouter>
//     )
//   }
// }

// export default App

import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import PrivateRoutes from './utils/PrivateRoutes'
import {routes} from './routes/index'
import './scss/style.scss' 

function App() {
  return (
    <div className="App flex h-screen">
      <Routes>
        <Route element={<PrivateRoutes />}>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={<route.element />} />
          ))}
          <Route path="*" element={<Home />} />
        </Route>
        <Route element={<Login />} path="/login" />
      </Routes>
    </div>
  )
}

export default App
