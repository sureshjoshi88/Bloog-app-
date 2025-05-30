import React from 'react'
import { FaMoon } from "react-icons/fa";
import { BsFillSunFill } from "react-icons/bs";


const Navbar = (props) => {
  return (
    <div>
      <nav className='p-2 flex justify-between items-center'>
        <div>
            <h1 className='text-2xl font-bold'>Blog-App</h1>
        </div>
        <div>
            <h1 className='text-2xl font-medium'>This is Blog App</h1>
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
