import React, { useContext, useEffect, useRef, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayCADCurrency from '../helpers/displayCurrency';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';
import { motion } from 'framer-motion';

const VerticalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(8).fill(null);

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
    setLoading(false);
    setData(categoryProduct?.data || []);
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
    <div className="container mx-auto px-4 my-12 relative">
      <motion.div
  initial={{ opacity: 0, x: -20 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.4 }}
  viewport={{ once: true }}
  className="relative mb-6"
>
  <h2 className="text-3xl font-light text-gray-800 tracking-tight inline-block relative z-10">
    {heading}
  </h2>
  <div className="absolute bottom-1 left-0 w-24 h-1 bg-gradient-to-r from-[#38a3a5] to-[#2d8688] z-0 rounded-md"></div>
</motion.div>


      <button
        onClick={scrollLeft}
        className="absolute z-10 top-1/3 -left-2 bg-white hover:bg-[#38a3a5] hover:text-white text-gray-700 px-4 py-2 rounded-md shadow-md transition-all duration-300 hidden md:flex items-center justify-center"
      >
        ⯇
      </button>

      <button
        onClick={scrollRight}
        className="absolute z-10 top-1/3 -right-2 bg-white hover:bg-[#38a3a5] hover:text-white text-gray-700 px-4 py-2 rounded-md shadow-md transition-all duration-300 hidden md:flex items-center justify-center"
      >
        ⯈
      </button>

      {/* Product Cards */}
      <div
        ref={scrollElement}
        className="flex gap-5 overflow-x-auto scroll-smooth scrollbar-hide pb-2"
      >
        {loading
          ? loadingList.map((_, index) => (
              <div
                key={index}
                className="min-w-[280px] md:min-w-[320px] bg-white rounded-lg shadow p-4 animate-pulse"
              >
                <div className="bg-slate-200 h-40 rounded-md mb-4" />
                <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-slate-200 rounded w-1/2 mb-3"></div>
                <div className="flex gap-4 mb-3">
                  <div className="h-4 bg-slate-200 w-1/3 rounded"></div>
                  <div className="h-4 bg-slate-200 w-1/4 rounded"></div>
                </div>
                <div className="h-8 bg-slate-200 w-full rounded"></div>
              </div>
            ))
          : data.map((product, index) => (
              <motion.div
                key={product?._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={`/product/${product?._id}`}
                  className="min-w-[280px] md:min-w-[320px] bg-white rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="h-48 flex justify-center items-center p-4 bg-gray-50 rounded-t-lg">
                    <img
                      src={product.productImage[0]}
                      alt={product.productName}
                      className="max-h-full object-contain hover:scale-110 transition-transform duration-500 ease-in-out mix-blend-multiply"
                    />
                  </div>
                  <div className="p-4 grid gap-2">
                    <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
                      {product?.productName}
                    </h2>
                    <p className="text-sm text-gray-500 capitalize">{product?.category}</p>
                    <div className="flex items-center gap-3 text-sm">
                      <p className="text-[#38a3a5] font-bold">
                        {displayCADCurrency(product?.sellingPrice)}
                      </p>
                      <p className="text-gray-400 line-through">
                        {displayCADCurrency(product?.price)}
                      </p>
                    </div>
                    <button
                      className="text-sm bg-[#38a3a5] hover:bg-[#2d8688] text-white px-4 py-2 rounded shadow transition duration-300"
                      onClick={(e) => handleAddToCart(e, product?._id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </Link>
              </motion.div>
            ))}
      </div>
    </div>
  );
};

export default VerticalCardProduct;
