import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProfile } from "./features/auth/authSlice";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token  && window.location.pathname !== "/login"  && window.location.pathname !="/register") {
      dispatch(getProfile());
    }
  }, []);


  return (
    <>
      
      <div>
        <Outlet></Outlet>
      </div>
    </>
  )
}

export default App
