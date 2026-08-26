import React, { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { useNavigate } from 'react-router-dom';
import { Mountain, Save, Info, ImageIcon, Settings } from 'lucide-react';

const AddTrek = () => {
  const { addTrek } = useAppData();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    category: 'Treks',
    location: '',
    duration: '',
    price: '',
    desc: '',
    img: '',
    highlights: '',
    itinerary: '',
    tripCode: '',
    persons: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
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

    const formattedTrek = {
      ...formData,
      id: formData.title.toLowerCase().replace(/\s+/g, '-'),
      highlights: highlightsArray,
      itinerary: itineraryArray
    };

    addTrek(formattedTrek);
    navigate('/admin/treks');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <Mountain className="text-[#e53a24]" size={32} />
          Add New Trek
        </h1>
        <p className="text-gray-500 mt-2">Enter the details of the new trek.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        
        {/* Basic Info */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
            <Info size={20} className="text-blue-600" /> Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Trek Title</label>
              <input 
                type="text" name="title" value={formData.title} onChange={handleChange} required
                placeholder="e.g. Everest Base Camp Trek" 
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#e53a24]/50 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
              <select name="category" value={formData.category} onChange={handleChange} required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#e53a24]/50 outline-none"
              >
                <option value="Treks">Treks</option>
                <option value="Tours">Tours</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center justify-between">
                Location / Country
                <span className="text-xs text-blue-600 font-normal">(Nepal, Tibet, Bhutan, or India)</span>
              </label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} required
                placeholder="e.g. Nepal - Everest Region" 
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#e53a24]/50 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center justify-between">
                Duration
                <span className="text-xs text-blue-600 font-normal">(e.g. 5 Days, 14 Days)</span>
              </label>
              <input type="text" name="duration" value={formData.duration} onChange={handleChange} required
                placeholder="e.g. 14 Days" 
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#e53a24]/50 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Price String</label>
              <input type="text" name="price" value={formData.price} onChange={handleChange} required
                placeholder="e.g. US$1500" 
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#e53a24]/50 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Group Size (Persons)</label>
              <input type="text" name="persons" value={formData.persons} onChange={handleChange}
                placeholder="e.g. 1-10" 
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#e53a24]/50 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Trip Code</label>
              <input type="text" name="tripCode" value={formData.tripCode} onChange={handleChange}
                placeholder="e.g. ZNX-EBC" 
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
                placeholder="/images/ebc.jpg" 
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#e53a24]/50 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
              <textarea name="desc" value={formData.desc} onChange={handleChange} required rows="3"
                placeholder="Brief description of the trek..."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#e53a24]/50 outline-none resize-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Highlights (comma-separated)</label>
              <input type="text" name="highlights" value={formData.highlights} onChange={handleChange}
                placeholder="e.g. Scenic Flight, Namche Bazaar, Everest Base Camp" 
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#e53a24]/50 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Itinerary (Format: Day X: Description)</label>
              <textarea name="itinerary" value={formData.itinerary} onChange={handleChange} rows="5"
                placeholder="Day 1: Arrival in Kathmandu&#10;Day 2: Fly to Lukla and trek to Phakding"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#e53a24]/50 outline-none resize-none"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button type="submit" className="bg-[#1e3a8a] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-900 transition-colors shadow-lg">
            <Save size={20} /> Save Trek
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddTrek;
