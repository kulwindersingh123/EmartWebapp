import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import moment from 'moment';
import { MdModeEdit } from 'react-icons/md';
import ChangeUserRole from '../components/ChangeUserRole';
import { motion, AnimatePresence } from 'framer-motion';

const AllUsers = () => {
  const [allUser, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: '',
    name: '',
    role: '',
    _id: '',
  });

  const fetchAllUsers = async () => {
    const fetchData = await fetch(SummaryApi.allUser.url, {
      method: SummaryApi.allUser.method,
      credentials: 'include',
    });

    const dataResponse = await fetchData.json();

    if (dataResponse.success) {
      setAllUsers(dataResponse.data);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <motion.div
        className="bg-white rounded-md shadow-lg overflow-x-auto"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Sr.</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Role</th>
              <th className="py-3 px-6 text-left">Created</th>
              <th className="py-3 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            <AnimatePresence>
              {allUser.map((el, index) => (
                <motion.tr
                  key={el._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className="hover:bg-gray-100 transition-colors"
                >
                  <td className="py-3 px-6">{index + 1}</td>
                  <td className="py-3 px-6">{el?.name}</td>
                  <td className="py-3 px-6">{el?.email}</td>
                  <td className="py-3 px-6 capitalize">{el?.role}</td>
                  <td className="py-3 px-6">{moment(el?.createdAt).format('LL')}</td>
                  <td className="py-3 px-6">
                    <button
                        className="flex items-center gap-1 px-4 py-1 rounded-lg text-white hover:shadow-md transition"
                        style={{ backgroundColor: '#38a3a5' }}
                        onClick={() => {
                        setUpdateUserDetails(el);
                        setOpenUpdateRole(true);
                        }}
                    >
                        <MdModeEdit size={18} />
                        <span className="text-sm font-medium">Edit</span>
                    </button>
                    </td>

                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {openUpdateRole && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-xl"
            >
              <ChangeUserRole
                onClose={() => setOpenUpdateRole(false)}
                name={updateUserDetails.name}
                email={updateUserDetails.email}
                role={updateUserDetails.role}
                userId={updateUserDetails._id}
                callFunc={fetchAllUsers}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AllUsers;
