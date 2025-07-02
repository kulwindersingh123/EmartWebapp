import React, { useContext, useEffect, useRef, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayCADCurrency from '../helpers/displayCurrency';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';
import { motion } from 'framer-motion';

const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);

  const scrollElement = useRef();
  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    e.preventDefault();
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setData(categoryProduct?.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };

  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  return (
    <div className="container mx-auto px-4 my-8 relative">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{heading}</h2>

      <div className="relative">
        <button
          className="bg-white shadow-md rounded-full p-2 absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden md:block"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <button
          className="bg-white shadow-md rounded-full p-2 absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden md:block"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>

        <div
          className="flex gap-6 overflow-x-scroll scrollbar-none transition-all scroll-smooth py-2"
          ref={scrollElement}
        >
          {loading
            ? loadingList.map((_, index) => (
                <div
                  key={index}
                  className="w-full min-w-[280px] max-w-[320px] h-36 bg-white rounded-xl shadow-md flex animate-pulse"
                >
                  <div className="bg-slate-200 h-full w-[140px] rounded-l-xl"></div>
                  <div className="p-4 w-full space-y-2">
                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                    <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                    <div className="h-8 bg-slate-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))
            : data.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <Link
                    to={`/product/${product._id}`}
                    className="w-full min-w-[280px] max-w-[320px] h-36 bg-white rounded-xl shadow-md flex hover:shadow-lg transition-transform hover:-translate-y-1"
                  >
                    <div className="bg-slate-100 h-full w-[140px] p-2 flex items-center justify-center rounded-l-xl">
                      <img
                        src={product.productImage[0]}
                        className="object-contain h-full transition-transform duration-300 hover:scale-110"
                        alt={product.productName}
                      />
                    </div>
                    <div className="p-4 flex flex-col justify-between flex-1">
                      <div>
                        <h2 className="font-semibold text-base text-ellipsis line-clamp-1 text-gray-800">
                          {product?.productName}
                        </h2>
                        <p className="text-sm text-gray-500 capitalize">
                          {product?.category}
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-sm mb-2">
                          <span className="text-[#38a3a5] font-semibold">
                            {displayCADCurrency(product?.sellingPrice)}
                          </span>
                          <span className="line-through text-gray-400">
                            {displayCADCurrency(product?.price)}
                          </span>
                        </div>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          whileHover={{ scale: 1.05 }}
                          className="bg-[#38a3a5] hover:bg-[#2e8686] text-white text-sm px-4 py-1 rounded-md transition-all w-full font-medium"
                          onClick={(e) => handleAddToCart(e, product?._id)}
                        >
                          Add to Cart
                        </motion.button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default HorizontalCardProduct;
