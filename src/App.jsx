
import { useState } from 'react'
import './App.css'
import Navbar from './component/Navbar'
import Blog from './component/Blog';
import Form from './component/Form';
import { Route, Routes } from 'react-router-dom';

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
  const [display, setDisplay] = useState(false);
  


  return (
    <>
   <Navbar handlechangeColor={handlechangeColor} setDisplay={setDisplay} mode={mode}/>
   <Routes>
    <Route path='/' element={<Blog mode={mode}  display={display} setDisplay={setDisplay} />}/>
    <Route path='/from' element={<Form mode={mode} />}/>
   </Routes>
   
    </>
  )
}

export default App
