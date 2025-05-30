import React from 'react'
import { useState,useRef  } from 'react'

 
const From = () => {
  const [array,setArray] = useState([]);
  const [name,setName]  = useState("");
  const [title,setTitle]  = useState("");
  const [desciption,setDesciption]  = useState("");
  const [img , setImg] = useState(null);
  const [display, setDisplay] = useState(false);

  const fileInputRef = useRef(null); 
  const submit=(e)=>{
    e.preventDefault()
  }
  const mainbutton = () => {
    if(name===""||title===""||desciption===""||img===""){
      alert("please enter value")
      setDisplay(false)

    }else{
      const time = new Date()
        let hours = time.getHours();
        let minute = time.getMinutes();
        let date = time.getDate();
        let month = time.getMonth();
        let year = time.getFullYear();
         const period = hours >= 12 ? "PM" : "AM";
            hours = hours % 12 || 12;
          let currentTime = `${hours}:${minute} ${period}`
          console.log(currentTime);
          let dates = `${date}-${month}-${year}`
          
      const upatedArray = [...array, {name:name,title:title,description:desciption,img:img,time:currentTime,date:dates}]
      setArray(upatedArray)
      localStorage.setItem("blog",JSON.stringify([...upatedArray]))
      setName("")
      setTitle("")
      setDesciption("")
      setImg(null)
      setDisplay(false)
    }

     
      fileInputRef.current.value = "";
    
  }
    const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
    reader.onloadend = () => {
      setImg(reader.result); // This will be a base64 string
    };
    reader.readAsDataURL(file);
    }
  };
  let cart = JSON.parse(localStorage.getItem("blog"))||[];
  return (
    <div className='relative'>
        <div className='p-2'>
            <button onClick={()=>setDisplay(true)} className='bg-blue-600 p-1 cursor-pointer text-white rounded  ps-3 pe-3'>Add new blog</button>
        </div>



       <div className='p-3'>
       { display===true ? <div className='absolute top-20 right-100 bg-white p-3 rounded border shadow h-100'>
           <form action="" onSubmit={submit}>
        <label htmlFor='101' className='font-semibold ps-2 text-xl'>author</label><br/>  
        <input id='101' className="border w-100 p-1 rounded-2xl" type="text" value={name} onChange={(e)=>setName(e.target.value)}  placeholder='enter a name' required/><br/>
        <label htmlFor='102' className='font-semibold ps-2 text-xl'>title</label><br/> 
        <input id='102' className='border w-100 p-1 rounded-2xl' type="text" value={title} onChange={(e)=>setTitle(e.target.value)}  placeholder='enter a title' required/><br/>  
        <label htmlFor='103' className='font-semibold ps-2 text-xl'>despcrition</label><br/> 
        <input id='103' className="border w-100 p-1 rounded-2xl" type="text"  value={desciption} onChange={(e)=>setDesciption(e.target.value)} placeholder='enter a description' required/><br/>  
        <label htmlFor='104' className='font-semibold ps-2 text-xl'>images</label><br/> 
        <input id='104' className="border w-100 p-1 rounded-2xl" type="file" ref={fileInputRef}  onChange={handleImageChange}  required/><br/>  
        <button type='submit' className='border rounded-2xl bg-green-500 text-white w-100 mt-4 p-2 font-bold text-xl' onClick={mainbutton}>submit</button>
        </form>
        </div>
        :""
       }
        {cart.length <=0?  <div className='border shadow rounded bg-amber-50 p-2 w-100'>
        <p>Authore Name</p>
        <p>Title</p>
        <p>Description</p>
        <img className='w-80 mt-2 rounded h-50' src="https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg" alt="" />
          </div>:""}
        <div className=' grid md:grid-cols-4 gap-4'>
          {
            cart.map((item,index)=>
           <div className='border shadow rounded bg-amber-50 p-2' key={index}> 
           <p>{item.time}</p>
           <p>{item.date}</p>
           <p>{item.name}</p>
            <p>{item.title}</p>
            <p>{item.description}</p>
            <img className='w-40 rounded' src={item.img} alt="" />
            </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default From
