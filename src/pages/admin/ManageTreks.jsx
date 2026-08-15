import React from 'react';
import { useAppData } from '../../context/AppDataContext';
import { Link } from 'react-router-dom';
import { PlusCircle, Trash2, Mountain } from 'lucide-react';

const ManageTreks = () => {
  const { treks, deleteTrek } = useAppData();

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this trek?')) {
      deleteTrek(id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Manage Treks</h1>
        <Link to="/admin/add-trek" className="bg-[#e53a24] text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-[#d04b08] transition-colors">
          <PlusCircle size={20} /> Add Trek
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {treks && treks.length > 0 ? (
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-bold text-gray-700">Trek</th>
                <th className="px-6 py-4 font-bold text-gray-700">Location</th>
                <th className="px-6 py-4 font-bold text-gray-700">Duration</th>
                <th className="px-6 py-4 font-bold text-gray-700">Price</th>
                <th className="px-6 py-4 font-bold text-gray-700 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {treks.map((t) => (
                <tr key={t.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 bg-gray-100 rounded overflow-hidden flex items-center justify-center shrink-0">
                        <img src={t.img || '/images/ktm-home.jpg'} alt={t.title} className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = '/images/ktm-home.jpg'; }} />
                      </div>
                      <span className="font-bold text-gray-900">{t.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 font-medium">{t.location}</td>
                  <td className="px-6 py-4 text-gray-600 font-medium">{t.duration}</td>
                  <td className="px-6 py-4 text-[#e53a24] font-bold">{t.price}</td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleDelete(t.id)}
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
            <Mountain size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-700 mb-2">No treks found</h3>
            <p>You haven't added any treks yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageTreks;
