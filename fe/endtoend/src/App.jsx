import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';

const App = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    number: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  
    // Here you can handle API calls to send the form data
    try {
      const response = await fetch("http://localhost:3007/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
      if (response.ok) {
        console.log(result.msg); // Show success message
        navigate('/dashboard');
        // Reset form fields after successful submission
        setFormData({
          name: "",
          email: "",
          password: "",
          number: "",
        });
      } else {
        console.error(result.msg); // Show error message
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  const topTextAnimation = useSpring({
    from: { transform: 'translateX(-100%)' }, // Start off-screen to the left
    to: { transform: 'translateX(0%)' },     // Move to its natural position
    config: { duration: 1000 },               // Animation duration
  });

  return (
    <div>
      <animated.div style={topTextAnimation} className="bg-red-400 flex justify-center items-center text-2xl font-bold italic p-2">
        Welcome to the endtoend
      </animated.div>
      <div className="flex items-center justify-center h-screen">
      
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-96"
        >
          <h2 className="text-2xl font-bold text-center mb-6">User Form</h2>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="number">
              Number
            </label>
            <input
              type="tel"
              id="number"
              name="number"
              value={formData.number}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your number"
              required
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate(); // Place the hook inside the component

  return (
    <div className="bg-slate-700 text-2xl flex justify-center items-center h-screen text-white">
      <h1>Welcome to the dashboard</h1>
      <button
        className="bg-red-400"
        onClick={() => {
          navigate("/"); 
        }}
      >
        Home
      </button>
    </div>
  );
};


export {App, Dashboard};
