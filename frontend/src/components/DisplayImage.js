import React from 'react';
import { CgClose } from 'react-icons/cg';

const DisplayImage = ({ imgUrl, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-center items-center px-4 animate-fadeIn">
      <div className="relative max-w-5xl w-full bg-white rounded-lg overflow-hidden shadow-2xl animate-zoomIn">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-3xl text-gray-600 hover:text-red-500 transition duration-200"
        >
          <CgClose />
        </button>

        {/* Image Container */}
        <div className="flex justify-center items-center p-4">
          <img
            src={imgUrl}
            alt="Display"
            className="max-h-[80vh] w-auto rounded-md object-contain shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default DisplayImage;
