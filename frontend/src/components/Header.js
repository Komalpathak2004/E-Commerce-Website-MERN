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
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div style={{ padding: 9, margin: 15, marginLeft: "0%" }}>
          <Link to={"/"}>
            <Logo w={70} h={50} />
          </Link>
        </div>
        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-3">
          <input
            type="text"
            placeholder="Search Products"
            className="w-full outline-none"
            onChange={handleSearch}
          />
          <div className="text-lg min-w-[50px] h-8 bg-blue-800 flex items-center justify-center rounded-r-full text-white">
            <IoSearch />
          </div>
        </div>

        <div className="flex items-center gap-7">
          <div className="relative flex justify-center">
            {user?._id && (
              <div
                className="text-3xl justify-center cursor-pointer relative flex"
                onClick={() => setMenuDisplay((prev) => !prev)}
              >
                {user?.profilePic ? (
                  <img src={user?.profilePic} className="w-10 h-10 rounded-full" />
                ) : (
                  <HiOutlineUserCircle />
                )}
              </div>
            )}

            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded">
                <nav>
                  <Link
                    to={"/profile"}
                    className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2"
                    onClick={() => setMenuDisplay(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to={"/orders"}
                    className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2"
                    onClick={() => setMenuDisplay(false)}
                  >
                    Orders
                  </Link>
                  {user?.role === ROLE.ADMIN && (
                    <>
                      <Link
                        to={"/admin-panel/all-products"}
                        className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2"
                        onClick={() => setMenuDisplay(false)}
                      >
                        Admin Panel
                      </Link>
                    </>
                  )}
                </nav>
              </div>
            )}
          </div>
          {user?._id && (
            <Link to={"/cart"} className="text-3xl relative">
              <span>
                <BsCartFill />
              </span>
              <div className="bg-blue-700 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute top-2 -right-3">
                <p className="text-sm">{context?.cartProductCount}</p>
              </div>
            </Link>
          )}

          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-full text-white bg-blue-700 hover:bg-blue-900"
              >
                Logout
              </button>
            ) : (
              <Link
                className="px-3 py-1 rounded-full text-white bg-blue-700 hover:bg-blue-900"
                to="/login"
              >
                Login
              </Link>
            )}
          </div>
          <div>
            <Link to="/" className="text-3xl text-blue-700">
              <IoHomeOutline />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
