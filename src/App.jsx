
import { useState } from 'react'
import './App.css'
import Navbar from './component/Navbar'
import Blog from './component/Blog';
import Form from './component/Form';
import { Route, Routes } from 'react-router-dom';
import Login from './component/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
 
  const [display, setDisplay] = useState(false);
  


  return (
    <>
   <Navbar  setDisplay={setDisplay} />
         <ToastContainer position="top-right" autoClose={3000} />
   <Routes>
    <Route path='/' element={<Blog  display={display} setDisplay={setDisplay} />}/>
    <Route path='/signup' element={<Form setDisplay={setDisplay} />}/>
    <Route path='/login' element={<Login setDisplay={setDisplay} />}/>
   </Routes>
   
    </>
  )
}

export default App
