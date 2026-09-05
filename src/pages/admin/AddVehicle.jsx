import React, { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Car, Save, Info, Image as ImageIcon, Settings, Star } from 'lucide-react';

const AddVehicle = () => {
  const { addVehicle, updateVehicle } = useAppData();
  const navigate = useNavigate();
  const location = useLocation();
  const editingVehicle = location.state?.vehicle;

  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState(() => {
    if (editingVehicle) {
      const featuresStr = Array.isArray(editingVehicle.features)
        ? editingVehicle.features.join(', ')
        : (editingVehicle.features || '');
      return {
        name: editingVehicle.name || '',
        type: editingVehicle.type || 'Economy',
        price: editingVehicle.price || '',
        img: editingVehicle.img || '',
        pax: editingVehicle.pax || editingVehicle.seats || 4,
        trans: editingVehicle.trans || 'Manual',
        fuel: editingVehicle.fuel || 'Petrol',
        luggage: editingVehicle.luggage || 2,
        rating: editingVehicle.rating || 5.0,
        urgency: editingVehicle.urgency || 'Available Now',
        description: editingVehicle.description || '',
        features: featuresStr,
        driverIncluded: editingVehicle.driverIncluded !== undefined ? editingVehicle.driverIncluded : true,
        priceWithDriver: editingVehicle.priceWithDriver || '',
        tax: editingVehicle.tax || ''
      };
    }
    return {
      name: '',
      type: 'Economy',
      price: '',
      img: '',
      pax: 4,
      trans: 'Manual',
      fuel: 'Petrol',
      luggage: 2,
      rating: 5.0,
      urgency: 'Available Now',
      description: '',
      features: '',
      driverIncluded: true,
      priceWithDriver: '',
      tax: ''
    };
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Process features into an array
    const processedFeatures = typeof formData.features === 'string'
      ? formData.features.split(',').map(f => f.trim()).filter(f => f)
      : formData.features;
    
    const data = new FormData();
    data.append('name', formData.name);
    data.append('type', formData.type);
    data.append('price', parseFloat(formData.price) || 0);
    data.append('pax', parseInt(formData.pax) || 0);
    data.append('trans', formData.trans);
    data.append('fuel', formData.fuel);
    data.append('luggage', parseInt(formData.luggage) || 0);
    data.append('rating', parseFloat(formData.rating) || 5);
    data.append('urgency', formData.urgency);
    data.append('description', formData.description);
    data.append('features', JSON.stringify(processedFeatures));
    data.append('driverIncluded', formData.driverIncluded);
    data.append('priceWithDriver', formData.priceWithDriver ? parseFloat(formData.priceWithDriver) : 0);
    data.append('tax', formData.tax ? parseFloat(formData.tax) : 0);
    
    if (file) {
      data.append('images', file);
    }

    if (editingVehicle) {
      await updateVehicle(editingVehicle.id, data);
    } else {
      await addVehicle(data);
    }
    navigate('/admin/vehicles');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <Car className="text-[#e53a24]" size={32} />
          {editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
        </h1>
        <p className="text-gray-500 mt-2">{editingVehicle ? 'Update the details of the vehicle.' : 'Enter the details of the new vehicle to add it to your fleet.'}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        
        {/* Basic Info */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
            <Info size={20} className="text-blue-600" /> Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Vehicle Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g. Toyota Fortuner" 
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#e53a24]/50 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Vehicle Category</label>
              <select 
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#e53a24]/50 outline-none"
              >
                <option value="Economy">Economy</option>
                <option value="SUV / 4x4">SUV / 4x4</option>
                <option value="Luxury">Luxury</option>
                <option value="EV">Electric (EV)</option>
                <option value="Van / Micro">Van / Micro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Self Drive Price (NPR)</label>
              <input 
                type="number" 
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                placeholder="e.g. 15000" 
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#e53a24]/50 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">With Driver Price (NPR)</label>
              <input 
                type="number" 
                name="priceWithDriver"
                value={formData.priceWithDriver}
                onChange={handleChange}
                placeholder="e.g. 18000" 
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#e53a24]/50 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Availability Status</label>
              <select 
                name="urgency"
                value={formData.urgency}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#e53a24]/50 outline-none"
              >
                <option value="Available Now">Available Now</option>
                <option value="High Demand">High Demand</option>
                <option value="Limited Availability">Limited Availability</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Taxes & Fees (NPR)</label>
              <input 
                type="number" 
                name="tax"
                value={formData.tax}
                onChange={handleChange}
                placeholder="e.g. 25" 
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#e53a24]/50 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Specs */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
            <Settings size={20} className="text-blue-600" /> Specifications
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Passengers</label>
              <input 
                type="number" 
                name="pax"
                value={formData.pax}
                onChange={handleChange}
                min="1" max="50"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#e53a24]/50 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Bag Capacity</label>
              <input 
                type="number" 
                name="luggage"
                value={formData.luggage}
                onChange={handleChange}
                min="0" max="20"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#e53a24]/50 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Transmission</label>
              <select 
                name="trans"
                value={formData.trans}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#e53a24]/50 outline-none"
              >
                <option value="Manual">Manual</option>
                <option value="Auto">Auto</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Fuel Type</label>
              <select 
                name="fuel"
                value={formData.fuel}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#e53a24]/50 outline-none"
              >
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
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
              <label className="block text-sm font-bold text-gray-700 mb-2">Vehicle Image</label>
              <input 
                type="file" 
                name="image"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#e53a24]/50 outline-none"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  name="driverIncluded"
                  checked={formData.driverIncluded}
                  onChange={handleChange}
                  className="w-5 h-5 text-[#e53a24] rounded focus:ring-[#e53a24]"
                />
                <span className="font-bold text-gray-700">Driver Included</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Star size={16} className="text-yellow-500" /> Initial Rating
              </label>
              <input 
                type="number" 
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                step="0.1" min="1" max="5"
                className="w-full md:w-1/3 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#e53a24]/50 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                placeholder="Brief description of the vehicle..."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#e53a24]/50 outline-none resize-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Key Features (comma-separated)</label>
              <input 
                type="text" 
                name="features"
                value={formData.features}
                onChange={handleChange}
                placeholder="e.g. 4WD, Sunroof, Leather Seats" 
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#e53a24]/50 outline-none"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button 
            type="submit" 
            className="bg-[#1e3a8a] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-900 transition-colors shadow-lg"
          >
            <Save size={20} /> {editingVehicle ? 'Update Vehicle' : 'Save Vehicle'}
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddVehicle;
