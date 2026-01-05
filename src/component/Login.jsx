import React, { use, useEffect, useState } from 'react'
import { useTheme } from '../context/themeReducer'
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { loginUser } from '../redux/loginSlice/loginSlice'
import ClipLoader from "react-spinners/ClipLoader";

const Login = () => {
  const { theme, setTheme } = useTheme()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()


  const errorHandle = () => {
    setTimeout(() => {
      setErrors("")
    }, 3000);
  }

  const { user, loading, error } = useSelector(state => state.auth)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      alert("please enter a email and password")
      return;
    }

    dispatch(loginUser({ email, password }))

  }

  useEffect(() => {
    if (error) {
      setErrors(error)
      errorHandle()
      setEmail("")
      setPassword("")
    }

    if (user) {
      navigate("/")
      alert("login successfull")
      setEmail("")
      setPassword("")
      errorHandle()
    }
  }, [error,user])
  return (
    <div>
      <div className="flex items-center justify-center mt-4">
        <form onSubmit={handleSubmit} className={`shadow-xl rounded-2xl p-8 w-full max-w-md ${theme === "light" ? "bg-white" : "bg-gray-800"}`}>
          <h2 className={`text-2xl font-bold mb-6 text-center ${theme === "light" ? "text-blue-600" : ""} `}>Login Form</h2>



          {/* Email */}
          <div className="mb-4">
            <label className={`block text-sm font-medium ${theme === "light" ? "text-gray-700" : "text-gray-100"} `}>Email</label>
            <input
              name="email"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className={`block text-sm font-medium ${theme === "light" ? "text-gray-700" : "text-gray-100"} `}>Password</label>
            <input
              name="password"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
            {errors && <p className="text-red-500 text-sm mt-1">{errors}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 font-semibold text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            {loading ? <ClipLoader color='#ffff' className='font-medium'  /> : "Submit"
            }          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
