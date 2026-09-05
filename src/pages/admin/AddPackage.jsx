import React, { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Package, Save, Info, ImageIcon, Settings } from 'lucide-react';

const AddPackage = () => {
  const { addPackage, updatePackage } = useAppData();
  const navigate = useNavigate();
  const location = useLocation();
  const editingPackage = location.state?.package;

  const [formData, setFormData] = useState(() => {
    if (editingPackage) {
      const highlightsStr = Array.isArray(editingPackage.highlights) ? editingPackage.highlights.join(', ') : (editingPackage.highlights || '');
      const itineraryStr = Array.isArray(editingPackage.itinerary) ? editingPackage.itinerary.map(i => typeof i === 'string' ? i : `${i.day || ''}: ${i.desc || ''}`).join('\n') : (editingPackage.itinerary || '');
      return {
        title: editingPackage.title || '',
        category: editingPackage.category || 'Packages',
        location: editingPackage.location || '',
        duration: editingPackage.duration || '',
        price: editingPackage.price || '',
        desc: editingPackage.desc || editingPackage.description || '',
        img: editingPackage.img || editingPackage.image || '',
        highlights: highlightsStr,
        itinerary: itineraryStr,
        tripCode: editingPackage.tripCode || '',
        persons: editingPackage.persons || ''
      };
    }
    return {
      title: '',
      category: 'Packages',
      location: '',
      duration: '',
      price: '',
      desc: '',
      img: '',
      highlights: '',
      itinerary: '',
      tripCode: '',
      persons: ''
    };
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Parse highlights and itinerary
    const highlightsArray = formData.highlights ? formData.highlights.split(',').map(h => h.trim()).filter(Boolean) : [];
    const itineraryArray = formData.itinerary ? formData.itinerary.split('\n').map((line, idx) => {
      const parts = line.split(':');
      if (parts.length > 1) {
        return { day: parts[0].trim(), desc: parts.slice(1).join(':').trim() };
      }
      return { day: `Day ${idx + 1}`, desc: line.trim() };
    }).filter(i => i.desc) : [];

    const formattedPackage = {
      ...formData,
      id: editingPackage ? editingPackage.id : formData.title.toLowerCase().replace(/\s+/g, '-'),
      highlights: highlightsArray,
      itinerary: itineraryArray
    };

    if (editingPackage) {
      await updatePackage(editingPackage.id, formattedPackage);
    } else {
      await addPackage(formattedPackage);
    }
    navigate('/admin/packages');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <Package className="text-[#e53a24]" size={32} />
          {editingPackage ? 'Edit Package' : 'Add New Package'}
        </h1>
        <p className="text-gray-500 mt-2">{editingPackage ? 'Update the details of the package.' : 'Enter the details of the new package.'}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        
        {/* Basic Info */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
            <Info size={20} className="text-blue-600" /> Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Package Title</label>
              <input 
                type="text" name="title" value={formData.title} onChange={handleChange} required
                placeholder="e.g. Kathmandu Heritage Tour" 
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#e53a24]/50 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
              <select name="category" value={formData.category} onChange={handleChange} required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#e53a24]/50 outline-none"
              >
                <option value="Packages">Packages</option>
                <option value="Tours">Tours</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center justify-between">
                Location / Country
                <span className="text-xs text-blue-600 font-normal">(Nepal, Tibet, Bhutan, or India)</span>
              </label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} required
                placeholder="e.g. Nepal - Kathmandu Valley" 
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#e53a24]/50 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center justify-between">
                Duration
                <span className="text-xs text-blue-600 font-normal">(e.g. 5 Days, 14 Days)</span>
              </label>
              <input type="text" name="duration" value={formData.duration} onChange={handleChange} required
                placeholder="e.g. 5 Days" 
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#e53a24]/50 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Price String</label>
              <input type="text" name="price" value={formData.price} onChange={handleChange} required
                placeholder="e.g. US$500" 
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#e53a24]/50 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Group Size (Persons)</label>
              <input type="text" name="persons" value={formData.persons} onChange={handleChange}
                placeholder="e.g. 1-15" 
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#e53a24]/50 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Trip Code</label>
              <input type="text" name="tripCode" value={formData.tripCode} onChange={handleChange}
                placeholder="e.g. ZNX-KTM" 
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#e53a24]/50 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Media and Details */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
            <ImageIcon size={20} className="text-blue-600" /> Media & Details
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Image URL</label>
              <input type="text" name="img" value={formData.img} onChange={handleChange} required
                placeholder="/images/kathmandu.jpg" 
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#e53a24]/50 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
              <textarea name="desc" value={formData.desc} onChange={handleChange} required rows="3"
                placeholder="Brief description of the package..."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#e53a24]/50 outline-none resize-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Highlights (comma-separated)</label>
              <input type="text" name="highlights" value={formData.highlights} onChange={handleChange}
                placeholder="e.g. Durbar Square, Swayambhunath, Pashupatinath" 
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#e53a24]/50 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Itinerary (Format: Day X: Description)</label>
              <textarea name="itinerary" value={formData.itinerary} onChange={handleChange} rows="5"
                placeholder="Day 1: Arrival in Kathmandu&#10;Day 2: Full day sightseeing"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#e53a24]/50 outline-none resize-none"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button type="submit" className="bg-[#1e3a8a] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-900 transition-colors shadow-lg">
            <Save size={20} /> {editingPackage ? 'Update Package' : 'Save Package'}
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddPackage;
