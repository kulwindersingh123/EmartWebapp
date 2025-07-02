import React, { useContext } from 'react';
import scrollTop from '../helpers/scrollTop';
import displayCADCurrency from '../helpers/displayCurrency';
import Context from '../context';
import addToCart from '../helpers/addToCart';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const VerticalCard = ({ loading, data = [] }) => {
  const loadingList = new Array(13).fill(null);
  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    e.preventDefault();
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-between md:gap-6 gap-4 overflow-x-scroll scrollbar-none px-2 py-4 transition-all'>
      {
        loading ? (
          loadingList.map((_, index) => (
            <div key={index} className='bg-white rounded shadow-md p-4 min-w-[280px] max-w-[300px] animate-pulse'>
              <div className='bg-slate-200 h-48 rounded mb-4'></div>
              <div className='h-4 bg-slate-200 rounded-full w-3/4 mb-2'></div>
              <div className='h-4 bg-slate-200 rounded-full w-1/2 mb-2'></div>
              <div className='h-4 bg-slate-200 rounded-full w-full mb-4'></div>
              <div className='h-8 bg-slate-200 rounded-full w-1/2'></div>
            </div>
          ))
        ) : (
          data.map((product, index) => (
            <motion.div
              key={product?._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <Link
                to={`/product/${product?._id}`}
                onClick={scrollTop}
                className='bg-white rounded-xl shadow-md hover:shadow-lg transition-transform hover:-translate-y-1 block min-w-[280px] max-w-[300px]'
              >
                <div className='bg-slate-100 h-48 rounded-t-xl p-3 flex justify-center items-center'>
                  <img
                    src={product?.productImage[0]}
                    alt={product?.productName}
                    className='object-contain h-full transition-transform duration-300 hover:scale-110 mix-blend-multiply'
                  />
                </div>
                <div className='p-4 space-y-2'>
                  <h2 className='font-semibold text-lg text-ellipsis line-clamp-1 text-gray-800'>{product?.productName}</h2>
                  <p className='capitalize text-sm text-gray-500'>{product?.category}</p>
                  <div className='flex items-center gap-2'>
                    <p className='text-[#38a3a5] font-semibold'>{displayCADCurrency(product?.sellingPrice)}</p>
                    <p className='line-through text-gray-400 text-sm'>{displayCADCurrency(product?.price)}</p>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05 }}
                    className='text-sm bg-[#38a3a5] hover:bg-[#2e8686] transition-all text-white px-4 py-2 rounded-md mt-2 font-medium shadow-md'
                    onClick={(e) => handleAddToCart(e, product?._id)}
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </Link>
            </motion.div>
          ))
        )
      }
    </div>
  );
};

export default VerticalCard;
