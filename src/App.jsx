
import { useState } from 'react'
import './App.css'
import Navbar from './component/Navbar'
import Blog from './component/Blog';

function App() {
  const [mode,setMode] = useState("light");
  const handlechangeColor=()=>{
    if(mode==="light"){
      document.body.style.backgroundColor = "black";
      document.body.style.color = "white"
      setMode("dark")
    }else{
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black"
      setMode("light")
    }
  }

  return (
    <>
   <Navbar handlechangeColor={handlechangeColor} mode={mode}/>
    <Blog mode={mode}/>
    </>
  )
}

export default App
