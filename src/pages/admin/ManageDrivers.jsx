import React from 'react';
import { useAppData } from '../../context/AppDataContext';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Edit, PlusCircle } from 'lucide-react';

const ManageDrivers = () => {
  const { drivers, deleteDriver } = useAppData();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this driver?")) {
      deleteDriver(id);
    }
  };

  const handleEdit = (driver) => {
    navigate('/admin/add-driver', { state: { driver } });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Drivers</h2>
        <Link to="/admin/add-driver" className="bg-[#e53a24] text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-[#d04b08] transition-colors">
          <PlusCircle size={20} /> Add Driver
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm">
                <th className="p-4 font-semibold">Driver</th>
                <th className="p-4 font-semibold">Phone</th>
                <th className="p-4 font-semibold">License No</th>
                <th className="p-4 font-semibold">Experience</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {drivers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">
                    No drivers found.
                  </td>
                </tr>
              ) : (
                drivers.map((driver) => (
                  <tr key={driver.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        {driver.image ? (
                          <img src={driver.image} alt={driver.name} className="w-12 h-12 rounded-full object-cover border border-gray-200" />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-xl">
                            {driver.name.charAt(0)}
                          </div>
                        )}
                        <div className="font-medium text-gray-900">{driver.name}</div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">{driver.phone}</td>
                    <td className="p-4 text-gray-600">{driver.licenseNo}</td>
                    <td className="p-4 text-gray-600">{driver.experience}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleEdit(driver)}
                          className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit Driver"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(driver.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Driver"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageDrivers;
