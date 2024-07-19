import React, { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import productCategory from "../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import { toast } from 'react-toastify';
import SummaryApi from "../common";

const UploadProduct = ({ onClose, fetchData }) => {
  const [data, setData] = useState({
    productName: "",
    specification: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    selling: "",
  });
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadImageToCloudinary = await uploadImage(file);

    setData((prevData) => ({
      ...prevData,
      productImage: [...prevData.productImage, uploadImageToCloudinary.url],
    }));
  };

  const handleDeleteImage = (imageUrl) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete the uploaded image?"
    );
    if (confirmDelete) {
      setData((prevData) => ({
        ...prevData,
        productImage: prevData.productImage.filter((img) => img !== imageUrl),
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(SummaryApi.uploadProduct.url, {
        method: SummaryApi.uploadProduct.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        toast.success(responseData.message);
        onClose();
        fetchData()
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error('An error occurred while uploading the product');
    }
  };
  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center z-40">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Upload Product</h2>
          <div
            className="w-fit ml-auto text-2xl hover:text-blue-600 cursor-pointer"
            onClick={onClose}
          >
            <IoMdCloseCircle />
          </div>
        </div>
        <form className="grid p-4 gap-2 overflow-y-scroll h-full pb-5" onSubmit={handleSubmit}>
          <label htmlFor="productName">Product Name :</label>
          <input
            type="text"
            id="productName"
            placeholder="Enter Product Name"
            name="productName"
            value={data.productName}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />
          <label htmlFor="specification" className="mt-3">
          Specifications :
          </label>
          <textarea 
          className="h-28 bg-slate-100 border resize-none p-1" 
          placeholder="Enter Specifications Of Product (Optional)" 
          rows={3}  
          onChange={handleOnChange} 
          name="specification"
          value={data.specification}
          required
          >
          </textarea>

        <label htmlFor="description" className="mt-3">Description :</label>
       <textarea 
          className="h-28 bg-slate-100 border resize-none p-1" 
          placeholder="Enter Description About Product (Optional)" 
          rows={3}  
          onChange={handleOnChange}
          name="description" 
          value={data.description}
       >
       </textarea>
          <label htmlFor="category" className="mt-3">
            Category :
          </label>
          <select
            value={data.category}
            name="category"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
          >
          <option value={""}>Select Category
              </option>
            {productCategory.map((el, index) => (
              <option value={el.value} key={el.value + index}>
                {el.label}
              </option>
            ))}
          </select>
          <label htmlFor="productImage" className="mt-3">
            Product Image :
          </label>
          <label htmlFor="uploadImage">
            <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer ">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                <span className="text-4xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Upload Product Image</p>
                <input
                  type="file"
                  id="uploadImage"
                  className="hidden"
                  onChange={handleUploadProduct}
                />
              </div>
            </div>
          </label>
          <div>
            {data?.productImage[0] ? (
              <div className="flex items-center gap-3 flex-wrap">
                {data.productImage.map((el) => (
                  <div key={el} className="relative">
                    <img
                      src={el}
                      alt="el"
                      width={80}
                      height={80}
                      className="bg-slate-100 border cursor-pointer"
                      onClick={() => {
                        setOpenFullScreenImage(true);
                        setFullScreenImage(el);
                      }}
                    />
                    <button
                      className="absolute text-red-500 top-0 right-0 text-xl"
                      onClick={() => handleDeleteImage(el)}
                    >
                      <MdOutlineDeleteOutline />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-blue-600 text-xs">
                *Please Upload Product Image
              </p>
            )}
          </div>
          <label htmlFor="price" className="mt-3">Price :</label>
          <input
            type="number"
            id="price"
            placeholder="Enter Price"
            name="price"
            value={data.price}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

        <label htmlFor="selling" className="mt-3">Selling Price :</label>
          <input
            type="number"
            id="selling"
            placeholder="Enter Selling Price"
            name="selling"
            value={data.selling}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />
          <button className="px-3 py-2 my-2 bg-blue-500 text-white mb-10 hover:bg-blue-700">
            Upload Product
          </button>
        </form>
      </div>
      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imgUrl={fullScreenImage}
        />
      )}
    </div>
  );
};

export default UploadProduct;
