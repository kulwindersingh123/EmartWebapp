import React from 'react';
import { CgClose } from 'react-icons/cg';
import { motion, AnimatePresence } from 'framer-motion';

const DisplayImage = ({ imgUrl, onClose }) => {
  return (
    <AnimatePresence>
      {imgUrl && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-center items-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative max-w-5xl w-full bg-white rounded-lg overflow-hidden shadow-2xl"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-3xl text-gray-600 hover:text-[#38a3a5] transition duration-200"
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DisplayImage;
