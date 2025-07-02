import React, { useState } from 'react';
import ROLE from '../common/role';
import { IoMdClose } from 'react-icons/io';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const ChangeUserRole = ({
  name,
  email,
  role,
  userId,
  onClose,
  callFunc,
}) => {
  const [userRole, setUserRole] = useState(role);

  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value);
  };

  const updateUserRole = async () => {
    const fetchResponse = await fetch(SummaryApi.updateUser.url, {
      method: SummaryApi.updateUser.method,
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
        role: userRole,
      }),
    });

    const responseData = await fetchResponse.json();

    if (responseData.success) {
      toast.success(responseData.message);
      onClose();
      callFunc();
    } else {
      toast.error(responseData.message || "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <motion.div
        className="bg-white shadow-lg p-6 rounded-lg w-full max-w-sm"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="ml-auto text-gray-600 hover:text-[#38a3a5] text-2xl block mb-2"
        >
          <IoMdClose />
        </button>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
          Change User Role
        </h2>

        {/* User Info */}
        <div className="mb-3">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Name:</span> {name}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Email:</span> {email}
          </p>
        </div>

        {/* Role Select */}
        <div className="mb-5">
          <label className="block mb-1 text-sm text-gray-600">Role:</label>
          <select
            className="w-full border rounded px-3 py-2 bg-slate-50"
            value={userRole}
            onChange={handleOnChangeSelect}
          >
            {Object.values(ROLE).map((el) => (
              <option value={el} key={el}>
                {el}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <motion.button
          onClick={updateUserRole}
          className="w-full py-2 rounded text-white font-medium shadow-md"
          style={{ backgroundColor: '#38a3a5' }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Change Role
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ChangeUserRole;
