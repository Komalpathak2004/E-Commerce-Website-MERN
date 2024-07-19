import React from "react";
import { IoMdCloseCircle } from "react-icons/io";

const DisplayImage = ({ onClose, imgUrl }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 z-50 flex justify-center items-center">
      <div className="relative w-full h-full flex justify-center items-center">
        <img src={imgUrl} alt="FullScreen" className="max-w-full max-h-full" />
        <button
          className="absolute top-5 right-5 text-white text-3xl"
          onClick={onClose}
        >
          <IoMdCloseCircle />
        </button> 
      </div>
    </div>
  );
};

export default DisplayImage;
