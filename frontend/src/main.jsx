import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import Register from './pages/Register.jsx'
// import { store } from './app/store.js'
import Home from './pages/public/Home.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home></Home>
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Provider store={store}> */  }
      <RouterProvider router={router} />
    {/* </Provider> */}
  </StrictMode>
)
