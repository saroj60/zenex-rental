import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppData } from '../../context/AppDataContext';
import { Trash2, Edit3, Star } from 'lucide-react';

const ManageTestimonials = () => {
  const { testimonials, deleteTestimonial } = useAppData();
  const navigate = useNavigate();

  const handleEdit = (testimonial) => {
    navigate('/admin/add-testimonial', { state: { testimonial } });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      deleteTestimonial(id);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Testimonials</h1>
          <p className="text-gray-500 mt-1">View, edit, or remove customer reviews and stories.</p>
        </div>
        <Link to="/admin/add-testimonial" className="px-5 py-2.5 bg-[#e53a24] text-white rounded-xl font-medium hover:bg-[#e53a24]/90 transition-colors">
          + Add Testimonial
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-4 px-4 font-semibold text-gray-600">Customer</th>
              <th className="py-4 px-4 font-semibold text-gray-600">Trip / Service</th>
              <th className="py-4 px-4 font-semibold text-gray-600">Rating</th>
              <th className="py-4 px-4 font-semibold text-gray-600">Review Text</th>
              <th className="py-4 px-4 font-semibold text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!testimonials || testimonials.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-8 text-center text-gray-500">
                  No testimonials found. Start by creating a new one!
                </td>
              </tr>
            ) : (
              testimonials.map((t) => (
                <tr key={t.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img src={t.img || 'https://via.placeholder.com/150'} alt={t.name} className="w-10 h-10 rounded-full object-cover shrink-0 border border-gray-100" />
                      <div>
                        <p className="font-bold text-gray-900">{t.name}</p>
                        <p className="text-[10px] text-gray-400">{t.date}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-semibold text-sm text-gray-700">{t.trip}</p>
                    {t.vehicle && <p className="text-[10px] text-slate-400">{t.vehicle}</p>}
                  </td>
                  <td className="py-4 px-4 text-gray-600">
                    <div className="flex gap-0.5 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 fill-current ${i < (t.rating || 5) ? 'text-amber-500' : 'text-gray-200'}`} />
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-600 text-sm max-w-xs truncate">
                    {t.text}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleEdit(t)} className="p-2 text-gray-400 hover:text-green-500 transition-colors" title="Edit">
                        <Edit3 size={18} />
                      </button>
                      <button onClick={() => handleDelete(t.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors" title="Delete">
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
  );
};

export default ManageTestimonials;
