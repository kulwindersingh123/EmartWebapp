import React, { useContext, useState } from 'react';
import loginIcons from '../assest/signin.gif';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataResponse = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate('/');
      fetchUserDetails();
      fetchUserAddToCart();
    }

    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  return (
    <section id="login" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-slate-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 animate-fadeIn">

        {/* Image */}
        <div className="w-24 h-24 mx-auto">
          <img src={loginIcons} alt="login icon" className="w-full h-full object-contain" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter email"
              value={data.email}
              onChange={handleOnChange}
              required
              className="w-full px-3 py-2 border rounded-lg bg-slate-100 outline-[#38a3a5] focus:ring-2 focus:ring-[#38a3a5]"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Password</label>
            <div className="flex items-center bg-slate-100 border rounded-lg px-3 py-2">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter password"
                value={data.password}
                onChange={handleOnChange}
                required
                className="w-full bg-transparent outline-none"
              />
              <button
                type="button"
                className="text-xl text-gray-600 ml-2"
                onClick={() => setShowPassword(prev => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <Link to="/forgot-password" className="block text-sm text-right text-gray-500 hover:text-red-600 mt-1">
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <div className="text-center mt-6">
            <button
              type="submit"
              className="w-full max-w-[150px] bg-[#38a3a5] hover:bg-[#2f8788] text-white py-2 rounded-full transition-all duration-300 hover:scale-105 shadow-md"
            >
              Login
            </button>
          </div>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{' '}
          <Link to="/sign-up" className="text-[#38a3a5] font-semibold hover:underline hover:text-[#2f8788]">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
