import React, { useEffect } from 'react'
import { useState, useRef } from 'react'
import { useTheme } from '../context/themeReducer';
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch, useSelector } from 'react-redux';
import { getBlog } from '../redux/userSlice/getBlog';
import { addBlog } from '../redux/userSlice/addBlog';
// import { updateBlog } from '../redux/userSlice/updateBlog';


const Blog = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState(null);
  const { theme, setTheme } = useTheme();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [updateId, setUpdateId] = useState("");

  const dispatch = useDispatch()

  const submit = (e) => {
    e.preventDefault();
  }

  const { user, token, } = useSelector(state => state.auth)
  const { blog, loading, error } = useSelector(state => state.allBlogs)
  const { blogs, isloading, iserror } = useSelector(state => state.addBlogs)
  const {  isloadings, iserrors } = useSelector(state => state.updateBlog)

  console.log(blog,'dd')


  useEffect(() => {
    dispatch(getBlog(search))

  }, [search]);

  const handleEdit = (item) => {
    setOpen(true)
    setTitle(item.title)
    setDescription(item.description)
    setUpdateId(item._id)
  };

  const handleUpdate = async (e) => {
    e.preventDefault()
    if (!title || !description) {
      return
    }
    try {
      const raw = JSON.stringify({ title, description });
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      myHeaders.append("Content-Type", "application/json");
      const requestOptions = {
        method: "PUT",
        body: raw,
        headers: myHeaders,
        redirect: "follow"
      };

      const data = await fetch(`http://localhost:8000/api/blogs/blog/${updateId}`, requestOptions)
      const response = await data.json();
      console.log(response)
      alert(response.message)
      setTitle("")
      setDescription("")
      setOpen(false)
    } catch (error) {
      alert(error.message)
      console.log(error);

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
    console.log(formdata)
    dispatch(addBlog(formdata))
    if(iserror){
      alert(iserror);
      setTitle("")
      setDescription("");
      setImg(null)
      props.setDisplay(false)
      
    }
  }


  return (



    <div className='relative'>


      {
        open && <div className='flex justify-center'>
          <form action="" className='p-3 shadow-2xl rounded'>
            <input className='border rounded-full p-1 border-blue-500 mt-3 w-80' value={title} onChange={(e) => setTitle(e.target.value)} type="text" required placeholder='Title' /><br />
            <input className='border rounded-full p-1 border-blue-500 mt-3 w-80' value={description} onChange={(e) => setDescription(e.target.value)} type="text" required placeholder='Description' /><br />
            <button className='w-full bg-blue-500 rounded-full p-1.5 cursor-pointer mt-3 text-white font-semibold' onClick={handleUpdate} >{isloadings ?<ClipLoader/>: "Update"}</button>
          </form>
        </div>}

      <div className='flex justify-center md:gap-20 flex-wrap mt-5 mb-2'>
        <input type="search" name="" className={`border-2 font-semibold border-blue-500 h-10 w-100 p-2 rounded-3xl mb-4 outline-0`}
          value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Seach by title and author...' id="" />
        <p className='font-medium text-2xl'>Total Blog = {blog?.blog?.length || 0}</p>
      </div>


      {props.display === true ? <div className={`absolute z-50 md:w-120 sm:w-auto w-auto    md:right-85 top-30 p-5 right-auto m-2 rounded shadow-2xl shadow-blue-300 ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>
        <div className='flex justify-end'>
          <p className='text-2xl  font-medium  rounded text-red-600 cursor-pointer p-1' onClick={() => props.setDisplay(false)}>x</p>
        </div>
        <form action="" onSubmit={submit}>
          <label htmlFor='102' className='font-semibold ps-2 text-xl'>title</label><br />
          <input id='102' className='border-2 border-blue-500 h-10 w-full sm:w-full p-1 rounded-3xl' type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='enter a title' required /><br />
          <label htmlFor='103' className='font-semibold ps-2 text-xl'>despcrition</label><br />
          <input id='103' className="border-2 border-blue-500 h-10 w-full sm:w-full p-1 rounded-3xl" type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder='enter a description' required /><br />
          <label htmlFor='104' className='font-semibold ps-2 text-xl'>images</label><br />
          <input id='104' className="border-2 border-blue-500 h-10 w-full sm:w-full p-1 rounded-3xl" type="file" onChange={(e) => setImg(e.target.files[0])} required /><br />
          <button type='submit' className='border rounded-3xl bg-blue-500 text-white w-full mt-4 p-2 font-semibold text-xl cursor-pointer' onClick={handleAddData}>{!isloading ? "Submit" : <ClipLoader color='white' size={20} />}</button>
        </form>
      </div>
        : ""
      }

      {loading && (
        <div className="flex justify-center mt-10">
          <ClipLoader size={40} />
        </div>
      )}
      {error && <p className='text-2xl font-semibold text-center mt-10'>{error}</p>}

      {blog?.blog?.length == 0 && <p className='font-medium text-2xl text-center p-6'>Something went wrong</p>}
      <div className=' grid md:grid-cols-3 gap-4 p-1'>
        {!loading && !error &&
          blog?.blog?.map((item, index) =>
            <div className={` ${theme === 'light' ? 'bg-gray-200 ' : 'bg-gray-800'} shadow-md rounded-lg p-4`} key={index}>
              <div className=' mt-2  w-full  rounded '>
                <img className='object-cover  w-full md:h-50  rounded-2xl  ' src={item.image} alt="" />
              </div>
              <p className='font-medium pt-2'>Title:- {item.title}</p>
              <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} font-medium`}>Description:- {item.description}</p>
              <p className='font-medium'>Date:- {new Date(item.createdAt).toLocaleDateString()}</p>
              <div className='flex gap-5 mt-2 flex-wrap'>
                <button onClick={() => handleEdit(item)} className='bg-amber-500 p-1 font-medium mt-2 ps-4 pe-4 rounded text-white cursor-pointer'>Edit</button>
                <button onClick={() => {
                  if (window.confirm("Are you sure you want to delete this blog?")) { handleDelete(item._id) }
                }} className='bg-red-500 p-1 font-medium mt-2 ps-4 pe-4 rounded text-white cursor-pointer'>Delete</button>
              </div>
            </div>
          )
        }
      </div>

    </div>
  )
}

export default Blog
