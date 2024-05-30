import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { AuthContext } from "../../context/userContext";

const Login = () => {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const navigate = useNavigate();
  const { setAuthUser } = useContext(AuthContext);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        formData
      );
      console.log("Response:", response.data);
      localStorage.setItem("studiouser", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);
      setAuthUser(response.data);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full flex items-center justify-center p-10 h-screen bg-gradient-to-r from-violet-400 to-pink-500">
        <section className="bg-white rounded-3xl w-[70%] shadow-lg ">
          <div className=" px-6 py-24 mx-auto lg:py-32">
            <div className="lg:flex px-12">
              <div className="lg:w-1/2">
                {/* <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="" /> */}

                <h1 className="mt-4 text-gray-600 md:text-lg">Welcome back</h1>

                <h1 className="mt-4 text-2xl font-semibold text-gray-800 capitalize lg:text-3xl ">
                  login to your account
                </h1>
                <h1 className="lg:mt-14 text-gray-600 md:text-lg">
                  Don't have an account? &nbsp;
                  <Link
                    to="/register"
                    className="text-blue-500 hover:underline"
                  >
                    Register
                  </Link>
                </h1>
              </div>

              <div className="mt-8 lg:w-1/2 lg:mt-0">
                <form onSubmit={handleSubmit} className="w-full lg:max-w-xl">
                  <div className="relative flex items-center">
                    <span className="absolute">
                      <AiOutlineUser className="w-6 h-6 mx-3 text-gray-300" />
                    </span>
                    <input
                      type="text"
                      name="identifier"
                      value={formData.identifier}
                      onChange={handleChange}
                      className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11  focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      placeholder="Email or Username"
                    />
                  </div>

                  <div className="relative flex items-center mt-4">
                    <span className="absolute">
                      <AiOutlineLock className="w-6 h-6 mx-3 text-gray-300" />
                    </span>
                    <input
                      autoComplete="on"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      placeholder="Password"
                    />
                  </div>

                  <div className="mt-8 md:flex md:items-center">
                    <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-all duration-300 transform bg-purple-600 rounded-lg md:w-1/2 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
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

export default Login;
