import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppData } from '../../context/AppDataContext';
import { Upload, X, CheckCircle2, Star } from 'lucide-react';

const AddTestimonial = () => {
  const { addTestimonial, updateTestimonial } = useAppData();
  const navigate = useNavigate();
  const location = useLocation();
  const editingTestimonial = location.state?.testimonial;

  const [formData, setFormData] = useState(editingTestimonial || {
    name: '',
    trip: '',
    vehicle: '',
    date: '',
    rating: 5,
    text: ''
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(editingTestimonial?.img || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    if (!formData.name || !formData.text || !formData.trip) {
      alert('Name, Trip, and Review text are required!');
      return;
    }

    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('trip', formData.trip);
      data.append('vehicle', formData.vehicle);
      data.append('date', formData.date || new Date().toLocaleDateString(undefined, { month: 'long', year: 'numeric' }));
      data.append('rating', formData.rating);
      data.append('text', formData.text);

      if (imageFile) {
        data.append('image', imageFile);
      } else if (editingTestimonial?.img) {
        data.append('img', editingTestimonial.img);
      }

      if (editingTestimonial) {
        await updateTestimonial(editingTestimonial.id, data);
      } else {
        await addTestimonial(data);
      }
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/admin/testimonials');
      }, 1500);
    } catch (error) {
      console.error('Error saving testimonial:', error);
      alert('Failed to save testimonial. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}</h1>
      <p className="text-gray-500 mb-8">{editingTestimonial ? 'Update the traveler story details below.' : 'Fill in the details below to add a new traveler story.'}</p>

      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center gap-3">
          <CheckCircle2 size={20} className="text-green-500" />
          <span className="font-medium">Testimonial saved successfully! Redirecting...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Customer Avatar Upload */}
        <div className="mb-8 flex flex-col items-start">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Customer Photo</label>
          
          {imagePreview ? (
            <div className="relative group inline-block">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="w-24 h-24 rounded-full object-cover border border-gray-200 shadow-sm"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-1 -right-1 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-50 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 hover:border-gray-400 transition-colors relative overflow-hidden">
              <Upload size={20} className="text-gray-400 mb-1" />
              <span className="text-[10px] font-medium text-gray-500 text-center px-1">Upload</span>
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
            <label className="text-sm font-semibold text-gray-700">Customer Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. John Doe"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e53a24] focus:border-transparent transition-shadow text-sm"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Trip / Tour Name *</label>
            <input
              type="text"
              name="trip"
              value={formData.trip}
              onChange={handleChange}
              placeholder="e.g. Annapurna Base Camp Trek"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e53a24] focus:border-transparent transition-shadow text-sm"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Vehicle / Service Details</label>
            <input
              type="text"
              name="vehicle"
              value={formData.vehicle}
              onChange={handleChange}
              placeholder="e.g. Scorpio 4x4 Jeep Hire"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e53a24] focus:border-transparent transition-shadow text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Trip Date</label>
            <input
              type="text"
              name="date"
              value={formData.date}
              onChange={handleChange}
              placeholder="e.g. March 2026"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e53a24] focus:border-transparent transition-shadow text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Rating *</label>
            <select
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e53a24] focus:border-transparent transition-shadow text-sm bg-white"
              required
            >
              <option value={5}>5 Stars (Excellent)</option>
              <option value={4}>4 Stars (Very Good)</option>
              <option value={3}>3 Stars (Average)</option>
              <option value={2}>2 Stars (Poor)</option>
              <option value={1}>1 Star (Terrible)</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Review Content *</label>
          <textarea
            name="text"
            rows="5"
            value={formData.text}
            onChange={handleChange}
            placeholder="Write the traveler story / review here..."
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e53a24] focus:border-transparent transition-shadow text-sm"
            required
          />
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() => navigate('/admin/testimonials')}
            className="px-6 py-2.5 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-[#e53a24] text-white rounded-xl font-medium hover:bg-[#e53a24]/90 transition-colors disabled:opacity-50 text-sm"
          >
            {isSubmitting ? 'Saving...' : 'Save Testimonial'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTestimonial;
