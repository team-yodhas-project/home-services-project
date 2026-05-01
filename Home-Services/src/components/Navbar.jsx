import React from 'react'
import { Link } from 'react-router-dom';

function Navbar(){
    return (
        <div>
            <h1>NavBar</h1>
            <button className='bg-blue-500 text-white px-4 py-2 rounded'>Login</button>
           <Link to="/register"> <button className='bg-green-500 text-white px-4 py-2 rounded'>Register</button></Link>
        </div>
    )
}
export default Navbar