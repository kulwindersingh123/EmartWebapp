import React, { useContext, useEffect, useState } from 'react';
import SummaryApi from '../common';
import Context from '../context';
import displayCADCurrency from '../helpers/displayCurrency';
import { MdDelete } from 'react-icons/md';

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(4).fill(null);

  const fetchData = async () => {
    const response = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
    });

    const responseData = await response.json();
    if (responseData.success) {
      setData(responseData.data);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData().then(() => setLoading(false));
  }, []);

  const increaseQty = async (id, qty) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ _id: id, quantity: qty + 1 }),
    });

    const data = await response.json();
    if (data.success) fetchData();
  };

  const decraseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ _id: id, quantity: qty - 1 }),
      });

      const data = await response.json();
      if (data.success) fetchData();
    }
  };

  const deleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ _id: id }),
    });

    const resData = await response.json();
    if (resData.success) {
      fetchData();
      context.fetchUserAddToCart();
    }
  };

  const totalQty = data.reduce((prev, curr) => prev + curr.quantity, 0);
  const totalPrice = data.reduce(
    (prev, curr) => prev + curr.quantity * curr?.productId?.sellingPrice,
    0
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-4">🛒 Your Cart</h2>

      {data.length === 0 && !loading && (
        <div className="text-center bg-white py-6 rounded shadow-md">
          <p className="text-lg text-gray-500">Your cart is empty.</p>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Product List */}
        <div className="w-full max-w-3xl space-y-4">
          {loading
            ? loadingCart.map((_, i) => (
                <div
                  key={i}
                  className="bg-slate-200 animate-pulse h-32 rounded-md"
                />
              ))
            : data.map((product, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md flex gap-4 p-3 hover:shadow-lg transition-all"
                >
                  <div className="w-28 h-28 bg-slate-100 rounded-md flex justify-center items-center">
                    <img
                      src={product?.productId?.productImage[0]}
                      className="h-full object-contain mix-blend-multiply"
                      alt={product?.productId?.productName}
                    />
                  </div>

                  <div className="flex-1 relative">
                    <div
                      className="absolute top-0 right-0 text-red-600 p-2 cursor-pointer hover:bg-red-100 rounded-full"
                      onClick={() => deleteCartProduct(product?._id)}
                    >
                      <MdDelete size={20} />
                    </div>

                    <h3 className="text-lg font-semibold line-clamp-1">
                      {product?.productId?.productName}
                    </h3>
                    <p className="text-gray-500 capitalize">
                      {product?.productId?.category}
                    </p>

                    <div className="flex justify-between items-center mt-1">
                      <p className="text-red-600 font-semibold text-lg">
                        {displayCADCurrency(product?.productId?.sellingPrice)}
                      </p>
                      <p className="text-gray-600 font-semibold text-lg">
                        {displayCADCurrency(
                          product?.productId?.sellingPrice * product?.quantity
                        )}
                      </p>
                    </div>

                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() =>
                          decraseQty(product?._id, product?.quantity)
                        }
                        className="w-7 h-7 rounded-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
                      >
                        -
                      </button>
                      <span className="px-2 font-medium">
                        {product?.quantity}
                      </span>
                      <button
                        onClick={() =>
                          increaseQty(product?._id, product?.quantity)
                        }
                        className="w-7 h-7 rounded-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/* Summary */}
        <div className="w-full max-w-sm">
          {loading ? (
            <div className="bg-slate-200 h-36 rounded-md animate-pulse" />
          ) : (
            <div className="bg-white rounded-lg shadow-xl p-5 border border-red-100">
              <h2 className="text-lg font-bold border-b border-red-500 pb-2 mb-3 text-red-600">
                🧾 Summary
              </h2>

              <div className="flex justify-between text-gray-700 mb-2">
                <p>Total Items:</p>
                <p className="font-semibold">{totalQty}</p>
              </div>

              <div className="flex justify-between text-gray-700 mb-4">
                <p>Total Price:</p>
                <p className="font-bold text-red-500">
                  {displayCADCurrency(totalPrice)}
                </p>
              </div>

              <button className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-2 rounded hover:scale-[1.02] transition-all shadow-sm hover:shadow-md">
                Proceed to Payment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
