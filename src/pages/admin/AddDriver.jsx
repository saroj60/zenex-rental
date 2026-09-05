import React, { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { Upload, X, CheckCircle2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const AddDriver = () => {
  const { addDriver, updateDriver } = useAppData();
  const navigate = useNavigate();
  const location = useLocation();
  const editingDriver = location.state?.driver;
  
  const [formData, setFormData] = useState(editingDriver || {
    name: '',
    phone: '',
    licenseNo: '',
    experience: ''
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(editingDriver?.image || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('phone', formData.phone);
      data.append('licenseNo', formData.licenseNo);
      data.append('experience', formData.experience);
      
      if (imageFile) {
        data.append('image', imageFile);
      }

      if (editingDriver) {
        await updateDriver(editingDriver.id, data);
      } else {
        await addDriver(data);
      }
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/admin/drivers');
      }, 1500);
    } catch (error) {
      console.error('Error saving driver:', error);
      alert('Failed to save driver. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{editingDriver ? 'Edit Driver' : 'Add New Driver'}</h2>
        <p className="text-gray-600 mt-1">{editingDriver ? 'Update driver profile details' : 'Create a new driver profile'}</p>
      </div>

      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center gap-3">
          <CheckCircle2 size={20} className="text-green-500" />
          <span className="font-medium">Driver added successfully! Redirecting...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
        
        {/* Photo Upload */}
        <div className="mb-8 flex flex-col items-center">
          <label className="block text-sm font-semibold text-gray-700 mb-4 text-center">Driver Photo</label>
          
          {imagePreview ? (
            <div className="relative group">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full shadow-md hover:bg-red-600 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-50 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 hover:border-gray-400 transition-colors relative overflow-hidden">
              <Upload size={24} className="text-gray-400 mb-2" />
              <span className="text-xs font-medium text-gray-500">Upload Photo</span>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Full Name *</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#e53a24] focus:border-transparent outline-none"
              placeholder="e.g. Ram Bahadur"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Phone Number *</label>
            <input
              type="text"
              name="phone"
              required
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#e53a24] focus:border-transparent outline-none"
              placeholder="e.g. +977-98XXXXXXXX"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">License Number *</label>
            <input
              type="text"
              name="licenseNo"
              required
              value={formData.licenseNo}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#e53a24] focus:border-transparent outline-none"
              placeholder="e.g. DL-12345"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Experience</label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#e53a24] focus:border-transparent outline-none"
              placeholder="e.g. 5 Years"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/drivers')}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#e53a24] text-white px-6 py-2.5 font-medium rounded-lg shadow-md hover:bg-red-700 hover:shadow-lg transition-all disabled:opacity-70 flex items-center gap-2"
          >
            {isSubmitting ? 'Saving...' : (editingDriver ? 'Update Driver' : 'Add Driver')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDriver;
