import React, { useEffect } from 'react'
import { useState, useRef } from 'react'


const Blog = () => {
  const [array, setArray] = useState([]);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState(null);
  const [display, setDisplay] = useState(false);
  const [editIndex, setEditIndex] = useState(null);


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
      setDisplay(false)

    } 
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

      // useEffect(() => {
      //   const now = new Date().getTime();
      //   let store = JSON.parse(localStorage.getItem("blog")) || [];

      //   // Remove blogs older than 24 hours
      //   const filtered = store.filter(item => now - item.createdAt < 24 * 60 * 60 * 1000);
      //   setArray(filtered);
      //   localStorage.setItem("blog", JSON.stringify(filtered)); // keep only fresh blogs
      // }, []);

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
      setDisplay(false)
      setEditIndex(null);
      fileInputRef.current.value = "";
    
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
    setDisplay(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    let updatedarray = [...array];
    updatedarray.splice(index, 1);
    setArray(updatedarray);
    localStorage.setItem("blog", JSON.stringify(updatedarray))

  };
  return (
    <div className='relative'>
      <div className='p-2'>
        <button onClick={() => setDisplay(true)} className='bg-blue-600 p-1 cursor-pointer text-white rounded  ps-3 pe-3'>Add new blog</button>
      </div>




      {display === true ? <div className='absolute top-20  right-100 bg-white p-3 rounded shadow-lg shadow-blue-300  h-100'>
        <form action="" onSubmit={submit}>
          <label htmlFor='101' className='font-semibold ps-2 text-xl'>author</label><br />
          <input id='101' className="border w-100 p-1 rounded-2xl" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='enter a name' required /><br />
          <label htmlFor='102' className='font-semibold ps-2 text-xl'>title</label><br />
          <input id='102' className='border w-100 p-1 rounded-2xl' type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='enter a title' required /><br />
          <label htmlFor='103' className='font-semibold ps-2 text-xl'>despcrition</label><br />
          <input id='103' className="border w-100 p-1 rounded-2xl" type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder='enter a description' required /><br />
          <label htmlFor='104' className='font-semibold ps-2 text-xl'>images</label><br />
          <input id='104' className="border w-100 p-1 rounded-2xl" type="file" ref={fileInputRef} onChange={handleImageChange} required /><br />
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
            <div className='   bg-gray-200  shadow-md rounded-lg p-4' key={index}>
              <p className='text-xl font-bold'>Name:- {item.name}</p>
              <p className='font-medium'>Title:- {item.title}</p>
              <p className="text-gray-600 font-medium">Description:- {item.description}</p>
              <div className=' mt-2 h-auto w-full  rounded '>
                <img className='object-cover md:object-coiver w-full md:h-80  rounded-2xl  ' src={item.img} alt="" />
              </div>
              <p className='font-medium'>Time:- {item.time}</p>
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
