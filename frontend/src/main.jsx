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
import CustomerLayout from './pages/CustomerDashboard/CustomerLayout.jsx';
import WorkerLayout from './pages/WorkerDashboard/WorkerLayout.jsx';
import AdminLayout from './pages/AdminLayout.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import AdminUsers from './pages/AdminUsers.jsx';
import AdminProviders from './pages/AdminProviders.jsx';
import AdminServices from './pages/AdminServices.jsx';
import AdminBookings from './pages/AdminBookings.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import MyServices from './pages/WorkerDashboard/MyServices.jsx';
import MyBookings from './pages/CustomerDashboard/MyBookings.jsx';
import Dashboard from './pages/CustomerDashboard/Dashboard.jsx';
import Requests from './pages/WorkerDashboard/Requests.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';


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
          path: '/forgot-password',
          element: <ForgotPassword />
        },
        {
          path: '/reset-password/:token',
          element: <ResetPassword />
        },
        {
          path: '/customerdashboard',
          element: (
          <ProtectedRoute roleRequired="customer">
          
              <CustomerLayout/>
          
          </ProtectedRoute>
          ),
          children:[
            {
              index:true,
              element:<Dashboard/>
            },
            {
            path: 'mybookings',
            element: <MyBookings />
            },
            {
            path: 'history',
            element: <History />
            }

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
              index:true,
              element:<Bookings/>
            },
            {
              path: 'addservice',
              element: <AddService />
            },
            {
              path: 'requests',
              element: <Requests />
            },
            {
              path: 'myservices',
              element: <MyServices />
            }
          ]
        },
        {
          path: '/admin',
          element: (
            <ProtectedRoute roleRequired="admin">
              <AdminLayout />
            </ProtectedRoute>
          ),
          children: [
            {
              index: true,
              element: <AdminDashboard />,
            },
            {
              path: 'users',
              element: <AdminUsers />,
            },
            {
              path: 'providers',
              element: <AdminProviders />,
            },
            {
              path: 'services',
              element: <AdminServices />,
            },
            {
              path: 'bookings',
              element: <AdminBookings />,
            },
          

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
