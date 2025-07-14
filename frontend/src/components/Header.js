import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoSearch, IoHomeOutline } from "react-icons/io5";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { BsCartFill } from "react-icons/bs";
import Logo from "./Logo";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });
    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
    }
    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;

    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  return (
    <header className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-2 h-16">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <Logo w={60} h={40} />
          </Link>
        </div>
        {/* Search Bar */}
        <div className="hidden md:flex items-center w-full max-w-md mx-6 border border-gray-200 rounded-full focus-within:shadow-lg bg-gray-50">
          <input
            type="text"
            placeholder="Search Products"
            className="w-full px-4 py-2 bg-transparent outline-none text-gray-700 rounded-l-full"
            onChange={handleSearch}
          />
          <button className="flex items-center justify-center px-4 h-10 bg-blue-700 rounded-r-full text-white text-xl hover:bg-blue-800 transition">
            <IoSearch />
          </button>
        </div>
        {/* Navigation & User */}
        <div className="flex items-center gap-4 md:gap-7">
          {/* User Menu */}
          <div className="relative flex items-center">
            {user?._id && (
              <button
                className="text-3xl flex items-center justify-center focus:outline-none"
                onClick={() => setMenuDisplay((prev) => !prev)}
              >
                {user?.profilePic ? (
                  <img src={user?.profilePic} className="w-10 h-10 rounded-full object-cover border-2 border-blue-700" alt="profile" />
                ) : (
                  <HiOutlineUserCircle className="text-blue-700" />
                )}
              </button>
            )}
            {/* Dropdown */}
            {menuDisplay && (
              <div className="absolute right-0 top-12 bg-white shadow-lg rounded-lg py-2 w-40 animate-fade-in z-50">
                <nav className="flex flex-col">
                  <Link
                    to="/profile"
                    className="px-4 py-2 hover:bg-blue-50 text-gray-700 text-sm"
                    onClick={() => setMenuDisplay(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="px-4 py-2 hover:bg-blue-50 text-gray-700 text-sm"
                    onClick={() => setMenuDisplay(false)}
                  >
                    Orders
                  </Link>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to="/admin-panel/all-products"
                      className="px-4 py-2 hover:bg-blue-50 text-gray-700 text-sm"
                      onClick={() => setMenuDisplay(false)}
                    >
                      Admin Panel
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>
          {/* Cart */}
          {user?._id && (
            <Link to="/cart" className="relative text-2xl text-blue-700 hover:text-blue-900 transition">
              <BsCartFill />
              <span className="absolute -top-2 -right-2 bg-blue-700 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">
                {context?.cartProductCount}
              </span>
            </Link>
          )}
          {/* Contact Us Navigation Link */}
          <Link
            to="/contact"
            className="px-4 py-1 rounded-full text-white bg-green-600 hover:bg-green-700 transition text-sm font-semibold"
          >
            Contact Us
          </Link>
          {/* Auth Button */}
          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-4 py-1 rounded-full text-white bg-blue-700 hover:bg-blue-900 transition text-sm font-semibold"
              >
                Logout
              </button>
            ) : (
              <Link
                className="px-4 py-1 rounded-full text-white bg-blue-700 hover:bg-blue-900 transition text-sm font-semibold"
                to="/login"
              >
                Login
              </Link>
            )}
          </div>
          {/* Home Icon */}
          <Link to="/" className="text-2xl text-blue-700 hover:text-blue-900 transition">
            <IoHomeOutline />
          </Link>
        </div>
      </div>
      {/* Mobile Search Bar */}
      <div className="flex md:hidden px-4 pb-2 pt-1 bg-white shadow-sm">
        <div className="flex items-center w-full border border-gray-200 rounded-full focus-within:shadow-lg bg-gray-50">
          <input
            type="text"
            placeholder="Search Products"
            className="w-full px-4 py-2 bg-transparent outline-none text-gray-700 rounded-l-full"
            onChange={handleSearch}
          />
          <button className="flex items-center justify-center px-4 h-10 bg-blue-700 rounded-r-full text-white text-xl hover:bg-blue-800 transition">
            <IoSearch />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
