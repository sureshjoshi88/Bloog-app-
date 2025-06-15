import React, { useEffect } from 'react'
import { useState, useRef } from 'react'


const Blog = (props) => {


// const blogData = [
//   {
//     id: 1,
//     author: "Aarav Mehta",
//     title: "Mastering React in 30 Days",
//     description: "A complete roadmap for beginners to become confident React developers in just a month.",
//     img: "https://images.unsplash.com/photo-1581093588401-6c2a30e84e53"
//   },
//   {
//     id: 2,
//     author: "Ritika Sharma | Frontend Developer",
//     title: "10 CSS Tricks Every Web Developer Should Know",
//     description: "Enhance your UI/UX skills with these simple yet powerful CSS techniques.",
//     img: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg"
//   },
//   {
//     id: 3,
//     author: "Kunal Verma",
//     title: "Understanding the MERN Stack: A Beginner’s Guide",
//     description: "Explore MongoDB, Express, React, and Node.js with real-world examples and tips.",
//     img: "https://images.unsplash.com/photo-1556155092-8707de31f9c4"
//   },
//   {
//     id: 4,
//     author: "Priya Bansal | UI/UX Designer",
//     title: "Why Mobile-First Design Is the Future",
//     description: "Learn how mobile-first design can improve your user engagement and accessibility.",
//     img: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg"
//   },
//   {
//     id: 5,
//     author: "Rahul Dev",
//     title: "From Zero to Hero in JavaScript",
//     description: "This guide will help you build a solid JavaScript foundation from scratch.",
//     img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c"
//   }
// ];


  const [array, setArray] = useState([]);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState('');
  // const [viewMore, setViewMore] = useState(1);

  const [currentPage, setCurrentPage] = useState(1);
const blogsPerPage = 3;



  // const handleViewMore = ()=>{
  //   setViewMore(viewMore + 1);
  // }

  
  const filteredArray = array.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  item.name.toLowerCase().includes(searchTerm.toLowerCase())
);
// const filterData = filteredArray.slice(0, viewMore);

const totalPages = Math.ceil(filteredArray.length / blogsPerPage);
const indexOfLastBlog = currentPage * blogsPerPage;
const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
const filterData = filteredArray.slice(indexOfFirstBlog, indexOfLastBlog);

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

    } else {


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

  }, [array]);


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

  const handledescription = (e) => {
    const descriptionValeu = e.target.value
    if (descriptionValeu.length <= 100) {
      setDescription(descriptionValeu);
    } else {
      setDescription('');
      setError("⚠️ Aap 200 characters se zyada nahi likh sakte.")
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }


  return (
    <div className='relative'>

      <div className='flex justify-center md:gap-20 flex-wrap mt-5 mb-2'>
        <input type="search" name="" className={`border-2 font-semibold border-blue-500 h-10 w-100 p-2 rounded-3xl mb-4 outline-0`}
          value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder='Seach by title and author...' id="" />
        <p className='font-medium text-2xl'>Total Blog = {array.length}</p>
      </div>

      {props.display === true ? <div className={`absolute z-50 md:w-150 sm:w-auto w-80    md:right-85 p-3 m-1 rounded shadow-2xl shadow-blue-300 ${props.mode === 'light' ? 'bg-white' : 'bg-black'}`}>
        <div className='flex justify-end'>
          <p className='text-2xl  bg-red-600 rounded text-white cursor-pointer ps-2 pe-2' onClick={() => props.setDisplay(false)}>X</p>
        </div>
        <form action="" onSubmit={submit}>
          <label htmlFor='101' className='font-semibold ps-2 text-xl'>author</label><br />
          <input id='101' className="border-2 border-blue-500 h-10 w-full sm:w-full p-1 rounded-3xl" autoFocus type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='enter a name' required /><br />
          <label htmlFor='102' className='font-semibold ps-2 text-xl'>title</label><br />
          <input id='102' className='border-2 border-blue-500 h-10 w-full sm:w-full p-1 rounded-3xl' type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='enter a title' required /><br />
          <label htmlFor='103' className='font-semibold ps-2 text-xl'>despcrition</label><br />
          <input id='103' className="border-2 border-blue-500 h-10 w-full sm:w-full p-1 rounded-3xl" type="text" value={description} onChange={handledescription} placeholder='enter a description' max={10} required /><br />
          <p className='font-medium text-red-600 p-1'>{error}</p>
          <label htmlFor='104' className='font-semibold ps-2 text-xl'>images</label><br />
          <input id='104' className="border-2 border-blue-500 h-10 w-full sm:w-full p-1 rounded-3xl" type="file" ref={fileInputRef} onChange={handleImageChange} required /><br />
          <button type='submit' className='border rounded-3xl bg-blue-500 text-white w-full mt-4 p-2 font-semibold text-xl cursor-pointer' onClick={mainbutton}>Submit</button>
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
          filterData.map((item, index) =>
            <div className={` ${props.mode === 'light' ? 'bg-gray-200 ' : 'bg-gray-800'} shadow-md rounded-lg p-4`} key={index}>
              <p className='text-xl font-bold'>Name:- {item.name}</p>
              <p className='font-medium'>Title:- {item.title}</p>
              <p className={`${props.mode === 'light' ? 'text-gray-600' : 'text-gray-300'} font-medium`}>Description:- {item.description}</p>
              <div className=' mt-2 h-auto w-full  rounded '>
                <img className='object-cover  w-full md:h-100 md:object-contain  rounded-2xl  ' src={item.img} alt="" />
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
      {/* <div className='flex justify-center mt-5 mb-5'>
      <button onClick={handleViewMore} className='bg-blue-500 p-1 font-medium mt-2 ps-4 pe-4 rounded text-white'>View More</button>
      </div> */}
      <div className='flex justify-center items-center gap-4 mt-5 mb-5'>
  <button
    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
    className='bg-blue-500 p-2 rounded text-white disabled:opacity-50'
    disabled={currentPage === 1}
  >
    Previous
  </button>

  <span className='font-semibold'>Page {currentPage} of {totalPages}</span>

  <button
    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
    className='bg-blue-500 p-2 rounded text-white disabled:opacity-50'
    disabled={currentPage === totalPages}
  >
    Next
  </button>
</div>
{/* <div className='flex justify-center items-center flex-wrap gap-2 mt-2'>
  {Array.from({ length: totalPages }, (_, index) => (
    <button
      key={index}
      onClick={() => setCurrentPage(index + 1)}
      className={`px-4 py-1 rounded ${
        currentPage === index + 1 ? 'bg-blue-700 text-white' : 'bg-gray-300 text-black'
      }`}
    >
      {index + 1}
    </button>
  ))}
</div> */}


    </div>
  )
}

export default Blog
