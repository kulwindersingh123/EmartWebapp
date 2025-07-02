import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SummaryApi from '../common';
import { FaStar, FaStarHalf } from "react-icons/fa";
import displayCADCurrency from '../helpers/displayCurrency';
import CategroyWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import addToCart from '../helpers/addToCart';
import Context from '../context';
import { motion } from 'framer-motion';

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: ""
  });

  const [activeImage, setActiveImage] = useState("");
  const [zoomImage, setZoomImage] = useState(false);
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({ x: 0, y: 0 });
  const { fetchUserAddToCart } = useContext(Context);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      const response = await fetch(SummaryApi.productDetails.url, {
        method: SummaryApi.productDetails.method,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ productId: params?.id })
      });
      const resData = await response.json();
      setData(resData?.data);
      setActiveImage(resData?.data?.productImage[0]);
    };
    fetchProductDetails();
  }, [params]);

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setZoomImageCoordinate({ x, y });
  }, []);

  const handleLeaveImageZoom = () => setZoomImage(false);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
    navigate("/cart");
  };

  return (
    <motion.div
      className='max-w-7xl mx-auto px-4 py-10'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 items-start'>
        
        {/* Image Section */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className='bg-gray-100 rounded-xl shadow-lg p-3 relative'>
            <img
              src={activeImage}
              alt="product"
              className='object-contain w-full h-[350px] rounded cursor-zoom-in transition-transform duration-300'
              onMouseMove={handleZoomImage}
              onMouseLeave={handleLeaveImageZoom}
            />
            {zoomImage && (
              <div className='absolute top-0 left-full ml-6 hidden lg:block w-[500px] h-[400px] bg-white border rounded-xl shadow-md overflow-hidden z-10'>
                <div
                  className='w-full h-full scale-150'
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundSize: '200%',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`,
                  }}
                />
              </div>
            )}
          </div>

          <div className='flex gap-3 mt-5 overflow-x-auto scrollbar-none'>
            {data?.productImage?.map((imgURL, index) => (
              <div
                key={index}
                className={`w-20 h-20 rounded-lg border-2 ${imgURL === activeImage ? 'border-[#38a3a5]' : 'border-gray-300'}`}
              >
                <img
                  src={imgURL}
                  alt={`preview-${index}`}
                  className='w-full h-full object-contain cursor-pointer rounded'
                  onMouseEnter={() => setActiveImage(imgURL)}
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Product Info Section */}
        <motion.div
          className='flex flex-col gap-5'
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className='bg-[#e2f4f3] text-[#38a3a5] px-4 py-1 rounded-full text-sm font-semibold w-fit'>
            {data?.brandName}
          </span>
          <h1 className='text-3xl lg:text-4xl font-bold text-gray-800 leading-tight'>{data?.productName}</h1>
          <p className='text-md text-gray-500 capitalize'>{data?.category}</p>

          <div className='flex gap-1 text-yellow-500 text-xl'>
            <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalf />
          </div>

          <div className='flex items-center gap-4 text-2xl font-bold'>
            <span className='text-[#38a3a5]'>{displayCADCurrency(data?.sellingPrice)}</span>
            <span className='line-through text-gray-400 text-lg'>{displayCADCurrency(data?.price)}</span>
          </div>

          <div className='flex flex-wrap gap-4 mt-3'>
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              className='bg-[#38a3a5] text-white px-6 py-2 rounded-lg font-semibold shadow hover:shadow-lg transition'
              onClick={(e) => handleBuyProduct(e, data?._id)}
            >
              Buy Now
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              className='border border-[#38a3a5] text-[#38a3a5] hover:bg-[#38a3a5] hover:text-white px-6 py-2 rounded-lg font-semibold shadow transition'
              onClick={(e) => handleAddToCart(e, data?._id)}
            >
              Add to Cart
            </motion.button>
          </div>

          <div className='mt-6'>
            <h3 className='text-xl font-semibold text-gray-700 mb-2'>Description</h3>
            <p className='text-gray-600 leading-relaxed text-justify'>{data?.description}</p>
          </div>
        </motion.div>
      </div>

      {/* Recommended Products */}
      {data.category && (
        <motion.div
          className='mt-14'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <CategroyWiseProductDisplay
            category={data?.category}
            heading={"Recommended Products"}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProductDetails;
