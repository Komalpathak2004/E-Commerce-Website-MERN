import React, { useState } from "react";
import loginIcons from "../assest/Sigin.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import imageToBase64 from "../helpers/imageTobase64"; // Assuming imageToBase64 is correctly exported from imageToBase64.js
import SummaryApi from "../common";
import { toast } from "react-toastify";

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
        name: "",
        confirmPassword: "",
        profilePic: "",
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUploadPic = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const imagePic = await imageToBase64(file);
                setData((prev) => ({
                    ...prev,
                    profilePic: imagePic,
                }));
            } catch (error) {
                console.error("Error converting image to base64:", error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (data.password === data.confirmPassword) {
            try {
                const dataResponse = await fetch(SummaryApi.signUP.url, {
                    method: SummaryApi.signUP.method,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                const dataApi = await dataResponse.json();
                console.log("data", dataApi);
                setData({
                    email: "",
                    password: "",
                    name: "",
                    confirmPassword: "",
                    profilePic: "",
                });
                if (dataApi.success) {
                    localStorage.setItem('token', dataApi.token); 
                    toast.success(dataApi.message);
                } else {
                    toast.error(dataApi.message);
                }
            } catch (error) {
                console.error("Error submitting form:", error);
                toast.error("Error submitting form");
            }
        } else {
            toast.error("Passwords do not match");
        }
    };
    
    return (
        <section id="signup">
            <div className="mx-auto container-lg p-10 flex-col gap-2 items-center">
                <div className="bg-white p-4 py-5 rounded-lg shadow-lg w-full max-w-md mx-auto relative">
                    <div className="relative w-24 h-24 mx-auto overflow-hidden rounded-full">
                        <img
                            src={data.profilePic || loginIcons}
                            alt="Profile Icon"
                            className="w-full h-full object-cover rounded-full"
                        />
                        <form>
                            <label>
                                <div className="text-[10px] bg-slate-200 py-3 bg-opacity-80 text-center absolute bottom-0 w-full">
                                    Upload Image
                                </div>
                                <input type="file" className="hidden" onChange={handleUploadPic} />
                            </label>
                        </form>
                    </div>

                    <form className="pt-6 mx-5" onSubmit={handleSubmit}>
                        <div className="grid mb-6">
                            <label>Name:</label>
                            <div className="bg-slate-100 p-2">
                                <input
                                    className="w-full h-full outline-none bg-transparent"
                                    type="text"
                                    placeholder="Enter Your Name"
                                    name="name"
                                    value={data.name}
                                    onChange={handleOnChange}
                                    required
                                />
                            </div>
                        </div>
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
                                <div className="cursor-pointer text-xl ml-2" onClick={() => setShowPassword((prev) => !prev)}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>
                        </div>
                        <div className="mb-6">
                            <label>Confirm Password:</label>
                            <div className="bg-slate-100 p-2 flex items-center">
                                <input
                                    className="w-full h-full outline-none bg-transparent"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Enter Confirm Password"
                                    name="confirmPassword"
                                    value={data.confirmPassword}
                                    onChange={handleOnChange}
                                    required
                                />
                                <div className="cursor-pointer text-xl ml-2" onClick={() => setShowConfirmPassword((prev) => !prev)}>
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>
                        </div>
                        <button className="bg-blue-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
                            Sign Up
                        </button>
                    </form>

                    <p className="text-center mt-4">
                        Already have an account?{" "}
                        <Link to={"/login"} className="text-blue-600 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default SignUp;
