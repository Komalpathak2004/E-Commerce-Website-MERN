import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import AdminEditProduct from "./AdminEditProduct";
import displayINRCurrency from "../helpers/displayCurrency";

const AdminProductCard = ({ data, fetchdata }) => {
    const [editProduct,setEditProduct] = useState(false)
  return (
    <div className="bg-white p-2 rounded -ml-1">
      <div className="w-40 ">
       <div className="w-32 h-32 flex justify-center items-center ">
       <img src={data?.productImage[0]} width={120} height={120} className="object-fill mx-auto h-fill"/>
       </div>
      <h1 className="text-ellipsis line-clamp-2">{data.productName}</h1>
       <div>
        <p className="font-semibold">
            {
                displayINRCurrency(data.selling)
            }
            
        </p>
       <div className="w-fit ml-auto p-2 hover:bg-green-600 bg-green-100 rounded-full hover:text-white cursor-pointer" onClick={()=>setEditProduct(true)}>
        <CiEdit />
      </div>
       </div>
      
      </div>
        {
            editProduct &&(
                <AdminEditProduct productData ={data} onClose={()=>setEditProduct(false)}  fetchdata={fetchdata}/>
            )
        }
    </div>
  );
};

export default AdminProductCard;
