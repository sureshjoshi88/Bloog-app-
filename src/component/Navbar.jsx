import React from 'react'
import { FaMoon } from "react-icons/fa";
import { BsFillSunFill } from "react-icons/bs";
import { NavLink } from 'react-router-dom';


const Navbar = (props) => {
  return (
    <div className={`sticky top-0 w-full z-50 ${props.mode==="light"?'bg-white':'bg-black'}`}>
      <nav className='p-1 flex flex-wrap justify-around items-center  '>
        <div>
            <img className='w-20 h-20' src="https://cdn-icons-png.flaticon.com/512/10026/10026257.png" alt="" />
        </div>
        <div>
          <ul className='flex gap-7'>
            <li><NavLink className={({isActive})=>isActive?"border-b-2 text-blue-500 font-medium text-lg":"font-medium text-lg"} to='/'>Home</NavLink></li>
            <li><NavLink className={({isActive})=>isActive?"border-b-2 text-blue-500 font-medium text-lg":"font-medium text-lg"} to='/from'>Sign In</NavLink></li>
          </ul>
        </div>
         <div className='p-2 '>
        <button onClick={() => props.setDisplay(true)} className='bg-blue-600 p-1 cursor-pointer text-white rounded  ps-3 pe-3 font-medium shadow shadow-black'>Add new blog</button>
      </div>
        
        
        <div>
           {props.mode==="light"? <button className='font-bold text-2xl cursor-pointer' onClick={()=>props.handlechangeColor()}><FaMoon /></button>:
            <button className='font-bold text-2xl cursor-pointer' onClick={()=>props.handlechangeColor()}><BsFillSunFill /></button>}
        </div>
      </nav>
    </div>
  )
}

export default Navbar
