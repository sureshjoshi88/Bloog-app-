
import { useState } from 'react'
import './App.css'
import Navbar from './component/Navbar'
import Blog from './component/Blog';
import Form from './component/Form';
import { Route, Routes } from 'react-router-dom';
import Login from './component/Login';

function App() {
 
  const [display, setDisplay] = useState(false);
  


  return (
    <>
   <Navbar  setDisplay={setDisplay} />
   <Routes>
    <Route path='/' element={<Blog  display={display} setDisplay={setDisplay} />}/>
    <Route path='/signup' element={<Form setDisplay={setDisplay} />}/>
    <Route path='/login' element={<Login setDisplay={setDisplay} />}/>
   </Routes>
   
    </>
  )
}

export default App
