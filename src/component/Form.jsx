import React, { useState } from 'react';
import { useTheme } from '../context/themeReducer';

const Form = (props) => {
  const {theme, setTheme} = useTheme()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  // const validate = () => {
  //   const newErrors = {};

  //   if (!/^[A-Za-z\s]+$/.test(formData.name)) {
  //     newErrors.name = 'Name must contain only letters';
  //   }

  //   if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,6}$/.test(formData.email)) {
  //     newErrors.email = 'Invalid email format';
  //   }

  //   if (!/^[A-Za-z\d@$!%*#?&]{6,}$/.test(formData.password)) {
  //     newErrors.password = 'Password must be at least 6 characters';
  //   }


  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify(formData);

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

await fetch("http://localhost:8000/api/blogs/signup", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    console.log("signup succesfull",result.token);
    localStorage.setItem("token",JSON.stringify(result.token))
      setFormData({ name: '', email: '', password: '' });
    props.setDisplay(false)
  })
  } catch (error) {
      console.log(error);
      alert("problem signup falied")
      
    }
   
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className={`shadow-xl rounded-2xl p-8 w-full max-w-md ${theme==="light"?"bg-white":"bg-gray-800"}`}>
        <h2 className={`text-2xl font-bold mb-6 text-center ${theme==="light"?"text-blue-600":""} `}>Registration Form</h2>

        {/* Name */}
        <div className="mb-4">
          <label className={`block text-sm font-medium ${theme==="light"?"text-gray-700":"text-gray-100"} `}>Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder="Enter your name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className={`block text-sm font-medium ${theme==="light"?"text-gray-700":"text-gray-100"} `}>Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="email"
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className={`block text-sm font-medium ${theme==="light"?"text-gray-700":"text-gray-100"} `}>Password</label>
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="password"
            placeholder="Enter password"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-blue-600 font-semibold text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
