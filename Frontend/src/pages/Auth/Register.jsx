import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AiOutlineMail, AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { IoMaleFemaleSharp } from "react-icons/io5";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "editor",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        formData
      );
      console.log("Form Data:", formData);
      setAuthUser(response.data);
      console.log("Response:", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Error:", error.response.data);
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full flex items-center justify-center p-10 h-screen bg-gradient-to-r from-violet-500 to-pink-500">
        <section className="bg-white rounded-3xl w-[70%] shadow-lg ">
          <div className=" px-6 py-24 mx-auto lg:py-32">
            <div className="lg:flex px-12">
              <div className="lg:w-1/2">
                <h1 className="mt-4 text-gray-600 md:text-lg">Welcome back</h1>
                <h1 className="mt-4 text-2xl font-bold text-gray-800 capitalize lg:text-3xl ">
                  Register to create your new account
                </h1>
                <h1 className="lg:mt-14 text-gray-600 md:text-lg">
                  Already have an account? &nbsp;
                  <Link to="/login" className="text-blue-500 hover:underline">
                    Login
                  </Link>
                </h1>
              </div>
              <div className="mt-8 lg:w-1/2 lg:mt-0">
                <form onSubmit={handleSubmit} className="w-full lg:max-w-xl">
                  <div className="relative flex items-center">
                    <span className="absolute">
                      <AiOutlineMail className="w-6 h-6 mx-3 text-gray-300" />
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      placeholder="Email address"
                    />
                  </div>
                  <div className="relative flex items-center mt-4">
                    <span className="absolute">
                      <AiOutlineUser className="w-6 h-6 mx-3 text-gray-300" />
                    </span>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      placeholder="Username"
                    />
                  </div>
                  <div className="relative flex items-center mt-4">
                    <span className="absolute">
                      <AiOutlineLock className="w-6 h-6 mx-3 text-gray-300" />
                    </span>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      placeholder="Password"
                    />
                  </div>
                  <div className="relative flex items-center mt-4">
                    <span className="absolute">
                      <AiOutlineLock className="w-6 h-6 mx-3 text-gray-300" />
                    </span>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      placeholder="Confirm Password"
                    />
                  </div>
                  <div className="relative flex items-center mt-4">
                    <span className="absolute">
                      <IoMaleFemaleSharp className="w-6 h-6 mx-3 text-gray-300" />
                    </span>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    >
                      <option value="editor" className="text-gray-700">
                        Editor
                      </option>
                      <option value="creator" className="text-gray-700">
                        Creator
                      </option>
                    </select>
                  </div>
                  <div className="mt-8 md:flex md:items-center">
                    <button
                      type="submit"
                      className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-all duration-300 transform bg-purple-600 rounded-lg md:w-1/2 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                    >
                      Sign in
                    </button>

                    <a
                      href="#"
                      className=" mt-4 text-center text-blue-500 md:mt-0 md:mx-6 hover:underline "
                    >
                      Forgot your password?
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Register;
