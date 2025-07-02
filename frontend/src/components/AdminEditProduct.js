import React, { useState } from 'react';
import { CgClose } from 'react-icons/cg';
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from 'react-icons/fa';
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from 'react-icons/md';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const AdminEditProduct = ({ onClose, productData, fetchdata }) => {
  const [data, setData] = useState({
    ...productData,
    productName: productData?.productName,
    brandName: productData?.brandName,
    category: productData?.category,
    productImage: productData?.productImage || [],
    description: productData?.description,
    price: productData?.price,
    sellingPrice: productData?.sellingPrice,
  });

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState('');

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);
    setData((prev) => ({
      ...prev,
      productImage: [...prev.productImage, uploadImageCloudinary.url],
    }));
  };

  const handleDeleteProductImage = async (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);
    setData((prev) => ({ ...prev, productImage: [...newProductImage] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(SummaryApi.updateProduct.url, {
      method: SummaryApi.updateProduct.method,
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      fetchdata();
    } else if (responseData.error) {
      toast.error(responseData?.message);
    }
  };

  return (
    <div className="fixed w-full h-full bg-black bg-opacity-30 backdrop-blur-sm top-0 left-0 flex justify-center items-center z-50">
      <motion.div
        className="bg-white p-5 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-xl"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="font-semibold text-xl text-gray-700">Edit Product</h2>
          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-red-600 transition"
          >
            <CgClose />
          </button>
        </div>

        {/* Form */}
        <form
          className="grid gap-3 overflow-y-auto max-h-[calc(90vh-80px)] pr-2"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="text-sm">Product Name</label>
            <input
              type="text"
              name="productName"
              value={data.productName}
              onChange={handleOnChange}
              className="p-2 bg-slate-100 border rounded w-full"
              required
            />
          </div>

          <div>
            <label className="text-sm">Brand Name</label>
            <input
              type="text"
              name="brandName"
              value={data.brandName}
              onChange={handleOnChange}
              className="p-2 bg-slate-100 border rounded w-full"
              required
            />
          </div>

          <div>
            <label className="text-sm">Category</label>
            <select
              name="category"
              value={data.category}
              onChange={handleOnChange}
              className="p-2 bg-slate-100 border rounded w-full"
              required
            >
              <option value="">Select Category</option>
              {productCategory.map((el, index) => (
                <option value={el.value} key={el.value + index}>
                  {el.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm">Product Image</label>
            <label htmlFor="uploadImageInput">
              <div className="p-3 bg-slate-100 border rounded flex justify-center items-center cursor-pointer h-32">
                <div className="text-slate-500 flex flex-col items-center gap-2">
                  <FaCloudUploadAlt className="text-3xl" />
                  <p className="text-sm">Upload Product Image</p>
                </div>
              </div>
              <input
                type="file"
                id="uploadImageInput"
                className="hidden"
                onChange={handleUploadProduct}
              />
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {data.productImage.length > 0 ? (
                data.productImage.map((el, index) => (
                  <div className="relative group" key={index}>
                    <img
                      src={el}
                      alt="preview"
                      className="w-20 h-20 object-cover border bg-white cursor-pointer"
                      onClick={() => {
                        setOpenFullScreenImage(true);
                        setFullScreenImage(el);
                      }}
                    />
                    <button
                      className="absolute -top-2 -right-2 bg-red-600 text-white p-1 rounded-full text-xs hidden group-hover:block"
                      onClick={() => handleDeleteProductImage(index)}
                      type="button"
                    >
                      <MdDelete />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-[#38a3a5] text-sm mt-1">
                  * Please upload at least one image
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm">Price</label>
              <input
                type="number"
                name="price"
                value={data.price}
                onChange={handleOnChange}
                className="p-2 bg-slate-100 border rounded w-full"
                required
              />
            </div>
            <div>
              <label className="text-sm">Selling Price</label>
              <input
                type="number"
                name="sellingPrice"
                value={data.sellingPrice}
                onChange={handleOnChange}
                className="p-2 bg-slate-100 border rounded w-full"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm">Description</label>
            <textarea
              name="description"
              value={data.description}
              onChange={handleOnChange}
              rows={4}
              className="p-2 bg-slate-100 border rounded w-full resize-none"
              placeholder="Enter product description"
              required
            />
          </div>

          <motion.button
            type="submit"
            className="w-full py-2 mt-2 text-white rounded hover:shadow-lg"
            style={{ backgroundColor: '#38a3a5' }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Update Product
          </motion.button>
        </form>
      </motion.div>

      {/* Full screen image preview */}
      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imgUrl={fullScreenImage}
        />
      )}
    </div>
  );
};

export default AdminEditProduct;
