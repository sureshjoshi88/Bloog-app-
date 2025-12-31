import React from 'react'
import { FaMoon } from "react-icons/fa";
import { BsFillSunFill } from "react-icons/bs";
import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/themeReducer';


const Navbar = (props) => {
  const { theme, setTheme } = useTheme();
  const handleColor = () => {
    if (theme === "light") {
      document.body.style.backgroundColor = "#181a1a";
      document.body.style.color = "white"
      setTheme("dark")
    } else {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black"
      setTheme("light")
    }
  }
  return (

    <div className={`sticky top-0 w-full z-50 shadow ${theme === "light" ? 'bg-white' : 'bg-gray-900'}`}>
      <nav className='p-1 flex flex-wrap justify-around items-center  '>
        <div>
          <img className='w-20 h-20 cursor-pointer' src="https://cdn-icons-png.flaticon.com/512/10026/10026257.png" alt="logo" />
        </div>
        <div>
          <ul className='flex gap-7'>
            <li><NavLink className={({ isActive }) => isActive ? "border-b-2 text-blue-500 font-medium text-lg" : "font-medium text-lg"} to='/'>Home</NavLink></li>
            <li><NavLink className={({ isActive }) => isActive ? "border-b-2 text-blue-500 font-medium text-lg" : "font-medium text-lg"} to='/signup'>Sign Up</NavLink></li>
            <li><NavLink className={({ isActive }) => isActive ? "border-b-2 text-blue-500 font-medium text-lg" : "font-medium text-lg"} to='/login'>Login</NavLink></li>
          </ul>
        </div>
        <div className='p-2 '>
          <button onClick={() => props.setDisplay(true)} className='bg-blue-600 p-1 cursor-pointer text-white rounded  ps-3 pe-3 font-medium shadow shadow-black'>Add new blog</button>
        </div>


        <div>
          {theme === "light" ? <button className='font-bold text-2xl cursor-pointer' onClick={handleColor}><FaMoon /></button> :
            <button className='font-bold text-2xl cursor-pointer' onClick={handleColor}><BsFillSunFill /></button>}
        </div>
        <div>
          <button>Logout</button>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
