import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import {Provider} from 'react-redux';
import { createBrowserRouter,RouterProvider} from 'react-router-dom';
import AddService from './pages/WorkerDashboard/AddService.jsx';
import Bookings from './pages/WorkerDashboard/Bookings.jsx';
import History from './pages/CustomerDashboard/History.jsx';
import { store } from './app/store.js';



import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Home from './pages/public/Home.jsx';

<<<<<<< HEAD
import CustomerLayout from './pages/CustomerDashboard/CustomerLayout.jsx';
import WorkerLayout from './pages/WorkerDashboard/WorkerLayout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import RoleRoute from './components/RoleRoute.jsx';
import MyServices from './pages/WorkerDashboard/MyServices.jsx';
import MyBookings from './pages/CustomerDashboard/MyBookings.jsx';
=======
import CustomerLayout from './pages/CustomerDashboard/CustomerLayout.jsx'
import WorkerLayout from './pages/WorkerDashboard/WorkerLayout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import RoleRoute from './components/RoleRoute.jsx'
// import ServicesPage from './pages/ServicesPage.jsx'
>>>>>>> 4999102718d01af6eb89677d73dd93a9b3b7739b

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
<<<<<<< HEAD
=======
        // {
        //   path: '/services',
        //   element: <ServicesPage />,
        // },
>>>>>>> 4999102718d01af6eb89677d73dd93a9b3b7739b
        {
          path: '/customerdashboard',
          element: (
          <ProtectedRoute roleRequired="customer">
          
              <CustomerLayout/>
          
          </ProtectedRoute>
          ),
          children:[
            {
            path: 'mybookings',
            element: <MyBookings />
            },
            {
            path: 'history',
            element: <History />
            },

          ]
        },
        {
          path: '/workerdashboard',
          element: (
            <ProtectedRoute roleRequired="provider">
              
                <WorkerLayout />
              
            </ProtectedRoute>
          ),
          children:[
          {
            path: 'addservice',
            element: <AddService />
          },
          {
            path: 'bookings',
            element: <Bookings />
          },
          {
            path: 'myservices',
            element: <MyServices />
          }
        ]
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
