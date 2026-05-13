import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from 'react-redux'
import { createBrowserRouter,RouterProvider} from 'react-router-dom'

import { store } from './app/store.js'



import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/public/Home.jsx'
import Customer_Dashboard from './pages/Customer_Dashboard.jsx'
import Worker_Dashboard from './pages/Worker_Dashboard.jsx'
import ServicesPage from './pages/ServicesPage.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import RoleRoute from './components/RoleRoute.jsx'

const  router=createBrowserRouter([
    {
      path:'/',
      element:<App />,
      children:[
        {
          index:true,
          element:<Home></Home>
        },
        {
          path:'/register',
          element:<Register></Register>
        },
        { path: '/login',
          element: <Login /> },
        {
          path: '/services',
          element: <ServicesPage />,
        },
        {
          path: '/customerdashboard',
          element: (
          <ProtectedRoute roleRequired="customer">
          
              <Customer_Dashboard />
          
          </ProtectedRoute>
          ),
        },
        {
          path: '/workerdashboard',
          element: (
            <ProtectedRoute roleRequired="provider">
              
                <Worker_Dashboard />
              
            </ProtectedRoute>
          ),
        }
      ]
    }
   
    
])

createRoot(document.getElementById('root')).render(
   <StrictMode>
   <Provider  store={store}>
    <RouterProvider router={router} />
     </Provider>
  </StrictMode>
)
