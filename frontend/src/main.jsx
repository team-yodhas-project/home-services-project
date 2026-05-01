import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from 'react-redux'
import { createBrowserRouter,RouterProvider} from 'react-router-dom'
import Register from './pages/Register.jsx'
import { store } from './app/store.js'


const  router=createBrowserRouter([
    {
      path:'/',
      element:<App />,
      children:[
        {
          path:'/register',
          element:<Register></Register>
        }
      ]
    }
   
    
])

createRoot(document.getElementById('root')).render(
  <Provider  store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
