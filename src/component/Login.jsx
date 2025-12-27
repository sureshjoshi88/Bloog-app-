import React, { useState } from 'react'
import { useTheme } from '../context/themeReducer'
import { useNavigate } from "react-router-dom"
import { useSelector,useDispatch } from 'react-redux'

const Login = () => {
  const { theme, setTheme } = useTheme()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const [error, setError] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()
  

  const errorHandle = () => {
    setTimeout(() => {
      setError("")
    }, 3000);
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      alert("please enter a email and password")
      return;
    }
    try {

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "email": email,
        "password": password
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      await fetch("http://localhost:8000/api/auth/login", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (!result.status) {
            setError(result.message)
            errorHandle()
            setEmail("")
            setPassword("")
            return;
          }
          localStorage.setItem("token", JSON.stringify(result.token))
          navigate("/")
          alert(result.message)
          setEmail("")
          setPassword("")
          errorHandle()
        })

    } catch (error) {
      console.log(error)
      setError(error.message)
      setEmail("")
      setPassword("")
    }
  }


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
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
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
