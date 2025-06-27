import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingCart } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { GrSearch } from "react-icons/gr";
import { toast } from 'react-toastify';

import Context from '../context';
import SummaryApi from '../common';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Logo from './Logo';

// ... import statements remain the same

const Header = () => {
  const user = useSelector(state => state?.user?.user);
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    navigate(value ? `/search?q=${value}` : `/search`);
  };

  const handleLogout = async () => {
    const res = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: 'include',
    });
    const data = await res.json();
    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    } else {
      toast.error(data.message);
    }
  };

  return (
    <header className="w-full fixed top-0 z-50 bg-white text-gray-800 shadow-sm border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center py-2 px-4 md:px-10">
        
        {/* Logo with tagline */}
        <Link to="/" className="flex flex-col justify-center items-start">
          <div className="flex items-center gap-1">
            <Logo w={90} h={32} />
          </div>
        </Link>

        {/* Search Bar */}
        <div className="flex items-center flex-grow max-w-lg mx-5 bg-blue-50 border border-blue-200 rounded-md px-3 py-1">
          <GrSearch className="text-gray-500 text-lg mr-2" />
          <input
            type="text"
            placeholder="Search for Products, Brands and More"
            className="w-full bg-transparent text-sm placeholder-gray-500 text-gray-700 focus:outline-none"
            value={search}
            onChange={handleSearch}
          />
        </div>

        {/* Login and Cart */}
        <div className="flex items-center gap-6">
          {/* Cart */}
          {user?._id && (
            <Link to="/cart" className="relative flex items-center gap-1 hover:text-blue-600 transition">
              <FaShoppingCart className="text-xl" />
              <span className="text-sm">Cart</span>
              {context?.cartProductCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full animate-pulse">
                  {context.cartProductCount}
                </span>
              )}
            </Link>
          )}

          {/* Profile/Login */}
          {user?._id ? (
            <div className="relative">
              <button
                className="flex items-center gap-1 rounded-md px-2 py-1 border border-gray-300 hover:border-blue-500"
                onClick={() => setMenuOpen(prev => !prev)}
              >
                {user?.profilePic ? (
                  <img src={user?.profilePic} className="w-6 h-6 rounded-full object-cover" />
                ) : (
                  <FaRegCircleUser className="text-lg text-gray-600" />
                )}
                <span className="text-sm">Login</span>
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                  <nav className="py-2 text-sm text-gray-700">
                    {user?.role === ROLE.ADMIN && (
                      <Link
                        to="/admin-panel/all-products"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setMenuOpen(false)}
                      >
                        Admin Panel
                      </Link>
                    )}
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </nav>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="text-sm font-medium hover:text-blue-600 transition flex items-center gap-1"
            >
              <FaRegCircleUser className="text-lg" />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
