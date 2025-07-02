import React, { useEffect, useState } from 'react';
import UploadProduct from '../components/UploadProduct';
import SummaryApi from '../common';
import AdminProductCard from '../components/AdminProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import { MdModeEdit } from 'react-icons/md';

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url);
    const dataResponse = await response.json();
    console.log('product data', dataResponse);
    setAllProduct(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.div
        className="bg-white py-4 px-6 flex justify-between items-center shadow-md rounded-md m-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="font-semibold text-2xl text-gray-800">All Products</h2>
        <button
          onClick={() => setOpenUploadProduct(true)}
          className="bg-[#38a3a5] text-white hover:bg-[#38a3a5] transition-all px-4 py-2 rounded-full text-sm shadow"
        >
          Upload Product
        </button>
      </motion.div>

      {/* Product List */}
      <div className="px-6 pb-6 h-[calc(100vh-180px)] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {allProduct.map((product, index) => (
            <motion.div
              key={index + 'allProduct'}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <AdminProductCard data={product} fetchdata={fetchAllProduct} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Upload Product Modal with animation */}
      <AnimatePresence>
        {openUploadProduct && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm"
          >
            <UploadProduct
              onClose={() => setOpenUploadProduct(false)}
              fetchData={fetchAllProduct}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AllProducts;
