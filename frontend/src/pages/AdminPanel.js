import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../common/role";

const AdminPanel = () => {
    const user = useSelector((state) => state?.user?.user);
    const navigate = useNavigate()

    useEffect(()=>{
      if(user?.role !== ROLE.ADMIN){
        navigate("/")
      }
    },[user])
  return (
    <div className="min-h-[calc(100vh-120px)] flex ">
      <aside className="bg-white max-h-full w-full max-w-60 -mt-20 customShadow z-40">
        <div className="h-40 flex justify-center items-center flex-col">
          <div className="text-6xl justify-center cursor-pointer relative flex">
            {user?.profilePic ? (
              <img src={user?.profilePic} className="w-20 h-20 rounded-full mt-14" />
            ) : (
              <HiOutlineUserCircle />
            )}
          </div>
          <p className="capitalize text-lg font font-semibold">{user?.name}</p>
          <p className=" text-sm ">{user?.role}</p>
        </div>
        <div>
            <nav className="grid p-4">
                <Link to={"all-users"} className="px-2 py-1 hover:bg-slate-100">All Users</Link>
                <Link to={"all-products"} className="px-2 py-1 hover:bg-slate-100">All Product</Link>
            </nav>
        </div>
      </aside>
      <main className="w-full h-full p-2">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
