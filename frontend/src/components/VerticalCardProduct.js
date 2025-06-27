import React, { useContext, useEffect, useRef, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';

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
    <div className="container mx-auto px-4 my-10 relative">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-red-500 pl-3">{heading}</h2>

      {/* Scroll Buttons */}
      <button
        className="absolute z-10 top-1/3 left-0 bg-gradient-to-r from-white to-transparent p-2 rounded-full shadow-md hidden md:block"
        onClick={scrollLeft}
      >
        <FaAngleLeft className="text-2xl text-gray-700" />
      </button>
      <button
        className="absolute z-10 top-1/3 right-0 bg-gradient-to-l from-white to-transparent p-2 rounded-full shadow-md hidden md:block"
        onClick={scrollRight}
      >
        <FaAngleRight className="text-2xl text-gray-700" />
      </button>

      {/* Product Cards */}
      <div
        className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide transition-all pb-2"
        ref={scrollElement}
      >
        {loading
          ? loadingList.map((_, index) => (
              <div
                key={index}
                className="min-w-[280px] md:min-w-[320px] bg-white rounded-lg shadow-md p-4 animate-pulse"
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
              <Link
                to={`/product/${product?._id}`}
                key={product?._id}
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
                    <p className="text-red-600 font-bold">
                      {displayINRCurrency(product?.sellingPrice)}
                    </p>
                    <p className="text-gray-400 line-through">
                      {displayINRCurrency(product?.price)}
                    </p>
                  </div>
                  <button
                    onClick={(e) => handleAddToCart(e, product?._id)}
                    className="mt-2 bg-red-600 hover:bg-red-700 text-white text-sm py-1.5 rounded-full transition-all duration-300 hover:shadow-md"
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default VerticalCardProduct;
