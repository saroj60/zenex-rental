import React from 'react';
import { useAppData } from '../../context/AppDataContext';
import { Link } from 'react-router-dom';
import { PlusCircle, Trash2, Edit } from 'lucide-react';

const ManageVehicles = () => {
  const { vehicles, deleteVehicle } = useAppData();

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      deleteVehicle(id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Manage Vehicles</h1>
        <Link to="/admin/add-vehicle" className="bg-[#ea580c] text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-[#d04b08] transition-colors">
          <PlusCircle size={20} /> Add Vehicle
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {vehicles && vehicles.length > 0 ? (
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-bold text-gray-700">Vehicle</th>
                <th className="px-6 py-4 font-bold text-gray-700">Type</th>
                <th className="px-6 py-4 font-bold text-gray-700">Price / Day</th>
                <th className="px-6 py-4 font-bold text-gray-700 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((v) => (
                <tr key={v.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 bg-gray-100 rounded overflow-hidden flex items-center justify-center shrink-0">
                        <img src={v.img || '/images/economy_car.png'} alt={v.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="font-bold text-gray-900">{v.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 font-medium">{v.type}</td>
                  <td className="px-6 py-4 text-[#ea580c] font-bold">NPR {v.price}</td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleDelete(v.id)}
                      className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-12 text-center text-gray-500">
            <Car size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-700 mb-2">No vehicles found</h3>
            <p>You haven't added any vehicles to your fleet yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageVehicles;
