import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      <Navbar></Navbar>
      <div>
        <Outlet></Outlet>
      </div>
    </>
  )
}

export default App
