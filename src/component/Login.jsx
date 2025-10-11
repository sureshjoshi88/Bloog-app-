import React from 'react'
import { useTheme } from '../context/themeReducer'

const Login = () => {
      const {theme, setTheme} = useTheme()
    

      const handleSubmit = (e)=>{
        e.preventDefault()
      }
  return (
    <div>
       <div className="flex items-center justify-center mt-4">
      <form onSubmit={handleSubmit} className={`shadow-xl rounded-2xl p-8 w-full max-w-md ${theme==="light"?"bg-white":"bg-gray-800"}`}>
        <h2 className={`text-2xl font-bold mb-6 text-center ${theme==="light"?"text-blue-600":""} `}>Login Form</h2>

    

        {/* Email */}
        <div className="mb-4">
          <label className={`block text-sm font-medium ${theme==="light"?"text-gray-700":"text-gray-100"} `}>Email</label>
          <input
            name="email"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="email"
            placeholder="Enter your email"
          />
          {/* {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>} */}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className={`block text-sm font-medium ${theme==="light"?"text-gray-700":"text-gray-100"} `}>Password</label>
          <input
            name="password"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="password"
            placeholder="Enter password"
          />
          {/* {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>} */}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 font-semibold text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
    </div>
  )
}

export default Login
