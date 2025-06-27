import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { Link } from 'react-router-dom';

const pastelColors = [
  'bg-gradient-to-br from-pink-100 to-pink-200',
  'bg-gradient-to-br from-green-100 to-green-200',
  'bg-gradient-to-br from-blue-100 to-blue-200',
  'bg-gradient-to-br from-yellow-100 to-yellow-200',
  'bg-gradient-to-br from-purple-100 to-purple-200',
  'bg-gradient-to-br from-orange-100 to-orange-200',
];

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const categoryLoading = new Array(6).fill(null);

  const fetchCategoryProduct = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.categoryProduct.url);
    const dataResponse = await response.json();
    setLoading(false);
    setCategoryProduct(dataResponse.data);
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-xl md:text-2xl font-semibold mb-4">✨ Categories for You</h2>

      <div className="flex gap-4 overflow-x-auto scrollbar-none pb-2">
        {(loading ? categoryLoading : categoryProduct).map((product, index) => {
          const bgColor = pastelColors[index % pastelColors.length];
          return (
            <div key={index} className="shrink-0 w-24 md:w-28 text-center">
              {loading ? (
                <div className="animate-pulse">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-slate-200 mx-auto" />
                  <div className="h-4 mt-2 bg-slate-200 rounded w-16 mx-auto"></div>
                </div>
              ) : (
                <Link
                  to={`/product-category?category=${product?.category}`}
                  className="group block"
                >
                  <div
                    className={`w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full ${bgColor} shadow-md group-hover:shadow-xl flex items-center justify-center overflow-hidden transition-transform transform group-hover:scale-105`}
                  >
                    <img
                      src={product?.productImage[0]}
                      alt={product?.category}
                      className="h-10 md:h-12 object-contain mix-blend-multiply transition-transform group-hover:scale-110"
                    />
                  </div>
                  <p className="mt-2 text-sm md:text-base font-semibold text-gray-700 group-hover:text-gray-900 capitalize transition-all duration-300">
                    {product?.category}
                  </p>
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryList;
