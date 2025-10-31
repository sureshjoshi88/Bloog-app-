import React, { useEffect } from 'react'
import { useState, useRef } from 'react'
import { useTheme } from '../context/themeReducer';


const Blog = (props) => {



  const [array, setArray] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState("");
  const { theme, setTheme } = useTheme()
  const [search, setSearch] = useState("")
  const [open,setOpen] = useState(false)
  const {updateId ,setUpdateId} = useState("")
  // const [viewMore, setViewMore] = useState(1);

  // const [currentPage, setCurrentPage] = useState(1);
  // const blogsPerPage = 3;



  // // const handleViewMore = ()=>{
  // //   setViewMore(viewMore + 1);
  // // }


  // // const totalPages = Math.ceil(filteredArray.length / blogsPerPage);
  // // const indexOfLastBlog = currentPage * blogsPerPage;
  // // const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  // // const filterData = filteredArray.slice(indexOfFirstBlog, indexOfLastBlog);



  const submit = (e) => {
    e.preventDefault();
  }

  let token = JSON.parse(localStorage.getItem("token"))
  const handleapi = async () => {

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");


    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(`http://localhost:8000/api/blogs/blog?title=${search}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setArray(result.blog)

      })
      .catch((error) => console.error(error));

  }

  useEffect(() => {

    handleapi()
  }, [search]);

  const handleEdit =  (item) => {
     setOpen(true)
     setTitle(item.title)
     setDescription(item.description)
     setUpdateId(item.id)

  };
    const handleUpdate = async(e)=>{
      e.preventDefault()
        if(!title||!description){
      return
    }
      try {
      const formdata = new FormData();
      formdata.append("title", title);
      formdata.append("description", description);
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      const requestOptions = {
        method: "PUT",
        body: formdata,
        headers: myHeaders,
        redirect: "follow"
      };

      const data = await fetch(`http://localhost:8000/api/blogs/blog/${id}`, requestOptions)
      const response = await data.json();
      console.log(response)
      setArray(response.blog)

      handleapi()
      alert(response.message)
      setTitle("")
      setDescription("")
      props.setDisplay(false)

    } catch (error) {
        alert(error.message)
    }

    }

  const handleDelete = (id) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow"
      };

      fetch(`http://localhost:8000/api/blogs/blog/${id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result),
            alert(result.message)
          handleapi()
        })
    } catch (error) {
      console.log(error);

    }

  };



  const handleAddData = () => {
    if (!title || !description || !img) {
      alert("please fill the all filed")
      return;
    }
    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("description", description);
    formdata.append("image", img);

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    const requestOptions = {
      method: "POST",
      body: formdata,
      headers: myHeaders,
      redirect: "follow"
    };

    fetch("http://localhost:8000/api/blogs/blog", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        handleapi()
        alert(result.message)
        setTitle("")
        setDescription("")
        setImg("")
        props.setDisplay(false)
      })
      .catch((error) => console.error(error));
  }

  return (



    <div className='relative'>


{
    open &&  <div className='flex justify-center'>
        <form action="" className='p-3 shadow-2xl rounded'>
          <input className='border rounded-full p-1 border-blue-500 mt-3 w-80' type="text" required placeholder='Title'/><br />
          <input className='border rounded-full p-1 border-blue-500 mt-3 w-80' type="text" required placeholder='Description'/><br />
          <button className='w-full bg-blue-500 rounded-full p-1.5 cursor-pointer mt-3 text-white font-semibold' onCanPlay={handleUpdate} >Update</button>
        </form>
      </div>}

      <div className='flex justify-center md:gap-20 flex-wrap mt-5 mb-2'>
        <input type="search" name="" className={`border-2 font-semibold border-blue-500 h-10 w-100 p-2 rounded-3xl mb-4 outline-0`}
          value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Seach by title and author...' id="" />
        <p className='font-medium text-2xl'>Total Blog = {array?.length || 0}</p>
      </div>

      {props.display === true ? <div className={`absolute z-50 md:w-120 sm:w-auto w-auto    md:right-85 p-3 right-auto m-2 rounded shadow-2xl shadow-blue-300 ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>
        <div className='flex justify-end'>
          <p className='text-2xl  bg-red-600 rounded text-white cursor-pointer ps-2 pe-2' onClick={() => props.setDisplay(false)}>X</p>
        </div>
        <form action="" onSubmit={submit}>
          <label htmlFor='102' className='font-semibold ps-2 text-xl'>title</label><br />
          <input id='102' className='border-2 border-blue-500 h-10 w-full sm:w-full p-1 rounded-3xl' type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='enter a title' required /><br />
          <label htmlFor='103' className='font-semibold ps-2 text-xl'>despcrition</label><br />
          <input id='103' className="border-2 border-blue-500 h-10 w-full sm:w-full p-1 rounded-3xl" type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder='enter a description' required /><br />
          <p className='font-medium text-red-600 p-1'>{error}</p>
          <label htmlFor='104' className='font-semibold ps-2 text-xl'>images</label><br />
          <input id='104' className="border-2 border-blue-500 h-10 w-full sm:w-full p-1 rounded-3xl" type="file" onChange={(e) => setImg(e.target.files[0])} required /><br />
          <button type='submit' className='border rounded-3xl bg-blue-500 text-white w-full mt-4 p-2 font-semibold text-xl cursor-pointer' onClick={handleAddData}>Submit</button>
        </form>
      </div>
        : ""
      }

      {array?.length == 0 ? <div className='   bg-gray-200  shadow-md rounded-lg p-4 max-w-md mx-auto'>
        <p className="text-xl font-bold mb-2">Authore Name</p>
        <p className='font-semibold'>Title</p>
        <p className="text-gray-600 font-medium">Description</p>
        <img className='w-80 mt-2 rounded h-50' src="https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg" alt="img" />
      </div> : ""}



      {array == undefined && <p className='text-2xl font-semibold text-center mt-10'>no blog found</p>}


      <div className=' grid md:grid-cols-3 gap-4 p-1'>
        {
          array?.map((item, index) =>
            <div className={` ${theme === 'light' ? 'bg-gray-200 ' : 'bg-gray-800'} shadow-md rounded-lg p-4`} key={index}>
              <div className=' mt-2  w-full  rounded '>
                <img className='object-cover  w-full md:h-70 md:object-contain  rounded-2xl  ' src={item.image} alt="" />
              </div>
              <p className='font-medium pt-2'>Title:- {item.title}</p>
              <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} font-medium`}>Description:- {item.description}</p>
              <p className='font-medium'>Date:- {item.date}</p>
              <div className='flex gap-5 mt-2 flex-wrap'>
                <button onClick={() => handleEdit(item._id)} className='bg-amber-500 p-1 font-medium mt-2 ps-4 pe-4 rounded text-white cursor-pointer'>Edit</button>
                <button onClick={() => {
                  if (window.confirm("Are you sure you want to delete this blog?")) { handleDelete(item._id) }
                }} className='bg-red-500 p-1 font-medium mt-2 ps-4 pe-4 rounded text-white cursor-pointer'>Delete</button>
              </div>
            </div>
          )
        }
      </div>

      {/* <div className='flex justify-center items-center gap-4 mt-5 mb-5'>
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          className='bg-blue-500 p-2 rounded text-white disabled:opacity-50 cursor-pointer'
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span className='font-semibold'>Page {currentPage} of {totalPages}</span>

        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          className='bg-blue-500 p-2 rounded text-white disabled:opacity-50 cursor-pointer'
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div> */}
    </div>
  )
}

export default Blog
