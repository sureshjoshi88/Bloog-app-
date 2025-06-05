import React, { useEffect } from 'react'
import { useState, useRef } from 'react'


const Blog = (props) => {
  const [array, setArray] = useState([]);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [error ,setError] = useState("");


  const fileInputRef = useRef(null);
  const submit = (e) => {
    e.preventDefault()
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

  const mainbutton = () => {
    if (name === "" || title === "" || description === "" || img === "") {
      alert("please enter value")
      props.setDisplay(false)

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
    let dates = `${date}-${month}-${year}`

    const updatedBlog = {
      name,
      title,
      description,
      img,
      time: currentTime,
      date: dates,
      createdAt: new Date().getTime() // add this line

    };

    let updatedArray;
    if (editIndex !== null) {
      updatedArray = [...array];
      updatedArray[editIndex] = updatedBlog;
    } else {
      updatedArray = [...array, updatedBlog];
    }

    setArray(updatedArray)
    localStorage.setItem("blog", JSON.stringify(updatedArray))
    setName("")
    setTitle("")
    setDescription("")
    setImg(null)
    props.setDisplay(false)
    setEditIndex(null);
    fileInputRef.current.value = "";

  }
};

  useEffect(() => {
    let store = JSON.parse(localStorage.getItem("blog")) || [];
    setArray(store)

  }, []);


  const handleEdit = (index) => {
    const item = array[index];
    setName(item.name);
    setTitle(item.title);
    setDescription(item.description);
    setImg(item.img);
    props.setDisplay(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    let updatedarray = [...array];
    updatedarray.splice(index, 1);
    setArray(updatedarray);
    localStorage.setItem("blog", JSON.stringify(updatedarray))

  };

  const handledescription=(e)=>{
    const descriptionValeu = e.target.value
    if(descriptionValeu.length<=100){
      setDescription(descriptionValeu);
    }else{
      setDescription('');
      setError("⚠️ Aap 200 characters se zyada nahi likh sakte.")
       setTimeout(() => {
    setError("");
  }, 3000);
    }
  }

 
  return (
    <div className='relative'>
      {/* <div className='p-2 sticky top-22'>
        <button onClick={() => props.setDisplay(true)} className='bg-blue-600 p-1 cursor-pointer text-white rounded  ps-3 pe-3'>Add new blog</button>
      </div> */}

      {props.display === true ? <div className={`absolute z-50 w-150   right-85 p-5 rounded shadow-2xl shadow-blue-300 ${props.mode==='light'?'bg-white':'bg-black'}`}>
        <div className='flex justify-end'>
                  <p className='text-2xl  bg-red-600 rounded text-white cursor-pointer ps-2 pe-2' onClick={()=>props.setDisplay(false)}>X</p>
        </div>
        <form action="" onSubmit={submit}>
          <label htmlFor='101' className='font-semibold ps-2 text-xl'>author</label><br />
          <input id='101' className="border-2 border-blue-500 h-12 w-full p-1 rounded-3xl" autoFocus type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='enter a name' required /><br />
          <label htmlFor='102' className='font-semibold ps-2 text-xl'>title</label><br />
          <input id='102' className='border-2 border-blue-500 h-12 w-full p-1 rounded-3xl' type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='enter a title' required /><br />
          <label htmlFor='103' className='font-semibold ps-2 text-xl'>despcrition</label><br />
          <input id='103' className="border-2 border-blue-500 h-12 w-full p-1 rounded-3xl" type="text" value={description} onChange={ handledescription} placeholder='enter a description' max={10} required /><br />
          <p className='font-medium text-red-600 p-1'>{error}</p>
          <label htmlFor='104' className='font-semibold ps-2 text-xl'>images</label><br />
          <input id='104' className="border-2 border-blue-500 h-12 w-full p-1 rounded-3xl" type="file" ref={fileInputRef} onChange={handleImageChange} required /><br />
          <button type='submit' className='border rounded-2xl bg-green-500 text-white w-100 mt-4 p-2 font-bold text-xl cursor-pointer' onClick={mainbutton}>submit</button>
        </form>
      </div>
        : ""
      }
      {array.length <= 0 ? <div className='   bg-gray-200  shadow-md rounded-lg p-4 max-w-md mx-auto'>
        <p className="text-xl font-bold mb-2">Authore Name</p>
        <p className='font-semibold'>Title</p>
        <p className="text-gray-600 font-medium">Description</p>
        <img className='w-80 mt-2 rounded h-50' src="https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg" alt="img" />
      </div> : ""}
      <div className=' grid md:grid-cols-3 gap-4 p-1'>
        {
          array.map((item, index) =>
            <div className={` ${props.mode === 'light' ? 'bg-gray-200 ' : 'bg-blue-950'} shadow-md rounded-lg p-4`} key={index}>
              <p className='text-xl font-bold'>Name:- {item.name}</p>
              <p className='font-medium'>Title:- {item.title}</p>
              <p className={`${props.mode === 'light' ? 'text-gray-600' : 'text-gray-300'} font-medium`}>Description:- {item.description}</p>
              <div className=' mt-2 h-auto w-full  rounded '>
                <img className='object-cover md:object-coiver w-full md:h-80  rounded-2xl  ' src={item.img} alt="" />
              </div>
              <p className='font-medium pt-2'>Time:- {item.time}</p>
              <p className='font-medium'>Date:- {item.date}</p>
              <div className='flex gap-2 flex-wrap'>
                <button onClick={() => {
                  if (window.confirm("Are you sure you want to delete this blog?")) { handleDelete(index) }
                }} className='bg-red-500 p-1 font-medium mt-2 ps-4 pe-4 rounded text-white'>Delete</button>
                <button onClick={() => handleEdit(index)} className='bg-amber-500 p-1 font-medium mt-2 ps-4 pe-4 rounded text-white'>Edit</button>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Blog
