import React, { useContext, useState } from "react";
import loginIcons from "../assest/Sigin.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
const navigate = useNavigate()
const { fetchUserDetails,fetchUserAddToCart } = useContext(Context)
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const dataResponse = await fetch(SummaryApi.signIn.url, {
            method: SummaryApi.signIn.method,
            credentials : 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // Replace data with your actual data object
        });

        const dataApi = await dataResponse.json();

        if (dataApi.success) {
            toast.success(dataApi.message);
            navigate('/')
            fetchUserDetails()
            fetchUserAddToCart()
            console.log("Data Login:", dataApi); // Log the entire response for debugging
        }
        if (dataApi.error) {
            toast.error(dataApi.message);
        }
        console.log("Data Login:", dataApi); 
    } catch (error) {
        // Handle errors if needed, or omit this block if no error handling is desired
    }
};
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <section id="login" className="p-12 container-lg ">
      <div className="bg-white p-4 py-5 rounded-lg shadow-lg w-full max-w-md mx-auto relative">
        <div className="relative w-24 h-24 mx-auto overflow-hidden rounded-full">
          <img
            src={loginIcons}
            alt="login icons"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <form className="pt-6 mt-10 mx-5" onSubmit={handleSubmit}>
          <div className="grid mb-6">
            <label>Email:</label>
            <div className="bg-slate-100 p-2">
              <input
                className="w-full h-full outline-none bg-transparent"
                type="email"
                placeholder="Enter Your Email"
                name="email"
                value={data.email}
                onChange={handleOnChange}
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label>Password:</label>
            <div className="bg-slate-100 p-2 flex items-center">
              <input
                className="w-full h-full outline-none bg-transparent"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                name="password"
                value={data.password}
                onChange={handleOnChange}
                required
              />
              <div
                className="cursor-pointer text-xl ml-2"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <Link
              to={"/forgot-password"}
              className="block w-fit ml-auto hover:underline hover:text-blue-500"
            >
              Forgot Password
            </Link>
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
            Login
          </button>
        </form>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to={"/sign-up"} className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;