import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaRegCircleUser } from 'react-icons/fa6';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate('/');
    }
  }, [user]);

  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="min-h-[calc(100vh-80px)] flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 shadow-md flex flex-col">
        {/* Profile Header */}
        <div className="p-6 flex flex-col items-center text-center border-b border-gray-100">
          <div className="w-20 h-20 rounded-full overflow-hidden mb-3 border-2 border-gray-200">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                alt={user?.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <FaRegCircleUser className="text-5xl text-gray-500" />
            )}
          </div>
          <h2 className="text-lg font-semibold capitalize text-gray-800">
            {user?.name}
          </h2>
          <p className="text-sm text-gray-500">{user?.role}</p>
        </div>

        {/* Navigation */}
        <nav className="flex-grow p-4 space-y-2">
          <Link
            to="all-users"
            className={`block px-4 py-2 rounded-md font-medium text-sm transition ${
              isActive('all-users')
                ? 'bg-[#38a3a5] text-red-600'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            👥 All Users
          </Link>
          <Link
            to="all-products"
            className={`block px-4 py-2 rounded-md font-medium text-sm transition ${
              isActive('all-products')
                ? 'bg-[#38a3a5] text-red-600'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            📦 All Products
          </Link>
        </nav>

        {/* Footer (optional) */}
        <div className="p-4 text-xs text-center text-gray-400 border-t border-gray-100">
          Admin Panel v1.0
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
