import React from 'react';
import { useFormik } from 'formik';

function Register(){
    var registerForm=useFormik({
        initialValues:{
            name:'',
            email:'',
            password:'',
            role:'',
            skills:[],
            experience:"",
            location:""

        },
        onSubmit:(values)=>{
            console.log(values)
        }
    })
    return (

            <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={registerForm.handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-96 space-y-4">
        <h2 className="text-xl font-bold text-center">Register</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={(ev)=>registerForm.setFieldValue('name',ev.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(ev)=>registerForm.setFieldValue('email',ev.target.value)}
          value={registerForm.values.email}
          className="w-full border p-2 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(ev)=>registerForm.setFieldValue('password',ev.target.value)}
          value={registerForm.values.password}
          className="w-full border p-2 rounded"
        />
        <input type="radio" name='role' value='customer' onChange={(ev)=>registerForm.setFieldValue('role',ev.target.value)} />
        <input type="radio" name='role' value='provider' onChange={(ev)=>registerForm.setFieldValue('role',ev.target.value)} />
        <input type="radio" name='role' value='admin' onChange={(ev)=>registerForm.setFieldValue('role',ev.target.value)} />

         <input
              type="text"
              name="skills"
              placeholder="Skills"
                onChange={(ev)=>registerForm.setFieldValue('skills',ev.target.value.split(','))}
              className="w-full border p-2 rounded"
            />

            <input
              type="number"
              name="experience"
              placeholder="Experience (years)"
              onChange={(ev)=>registerForm.setFieldValue('experience',ev.target.value)}
              value={registerForm.values.experience}
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              onChange={(ev)=>registerForm.setFieldValue('location',ev.target.value)}
              value={registerForm.values.location}
              className="w-full border p-2 rounded"
            />
             <button className="w-full bg-green-600 text-white py-2 rounded">
            Register
            </button>
        </form>
    </div>
    )
}

export default Register;