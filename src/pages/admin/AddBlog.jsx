import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useBlogContext } from '../../context/BlogContext';
import ReactQuill from 'react-quill-new';
import 'quill/dist/quill.snow.css';
import { Upload, X, CheckCircle2 } from 'lucide-react';

const AddBlog = () => {
  const { addBlog, updateBlog } = useBlogContext();
  const navigate = useNavigate();
  const location = useLocation();
  const editingBlog = location.state?.blog;

  const [formData, setFormData] = useState(editingBlog || {
    title: '',
    category: '',
    content: ''
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(editingBlog?.coverImage || '');
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
    if (!formData.title || !formData.content) {
      alert('Title and Content are required!');
      return;
    }

    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('category', formData.category);
      data.append('content', formData.content);
      data.append('author', 'Admin');

      if (imageFile) {
        data.append('coverImage', imageFile);
      }

      if (editingBlog) {
        await updateBlog(editingBlog.id, data);
      } else {
        await addBlog(data);
      }
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/admin/blogs');
      }, 1500);
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('Failed to save blog. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{editingBlog ? 'Edit Blog' : 'Create New Blog'}</h1>
      <p className="text-gray-500 mb-8">{editingBlog ? 'Update the details below to save changes.' : 'Fill in the details below to publish a new blog post.'}</p>

      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center gap-3">
          <CheckCircle2 size={20} className="text-green-500" />
          <span className="font-medium">Blog saved successfully! Redirecting...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Photo Upload */}
        <div className="mb-8 flex flex-col items-start">
          <label className="block text-sm font-semibold text-gray-700 mb-4">Cover Image</label>
          
          {imagePreview ? (
            <div className="relative group inline-block">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="h-48 rounded-xl object-cover border border-gray-200"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-3 -right-3 bg-red-500 text-white p-1.5 rounded-full shadow-md hover:bg-red-600 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="w-full md:w-1/2 h-48 rounded-xl bg-gray-50 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 hover:border-gray-400 transition-colors relative overflow-hidden">
              <Upload size={32} className="text-gray-400 mb-3" />
              <span className="text-sm font-medium text-gray-500">Upload Cover Image</span>
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
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold text-gray-700">Blog Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. 10 Best Places to Visit in Nepal"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e53a24] focus:border-transparent transition-shadow"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e53a24] focus:border-transparent transition-shadow bg-white"
            >
              <option value="">Select a Category</option>
              <option value="Trekking">Trekking</option>
              <option value="Culture">Culture</option>
              <option value="Wildlife">Wildlife</option>
              <option value="Wellness">Wellness</option>
              <option value="Travel Tips">Travel Tips</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex justify-between">
            <span>Content *</span>
            <span className="text-xs text-gray-400 font-normal">Use the editor to add text, headings, and images</span>
          </label>
          <div className="bg-white rounded-xl overflow-hidden border border-gray-300 focus-within:ring-2 focus-within:ring-[#e53a24] focus-within:border-transparent transition-shadow">
            <ReactQuill 
              theme="snow" 
              value={formData.content} 
              onChange={(content) => setFormData((prev) => ({ ...prev, content }))}
              className="h-64 mb-12"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6">
          <button
            type="button"
            onClick={() => navigate('/admin/blogs')}
            className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-[#e53a24] text-white font-medium rounded-xl hover:bg-[#e53a24]/90 transition-colors disabled:opacity-70"
          >
            {isSubmitting ? 'Saving...' : (editingBlog ? 'Update Blog' : 'Publish Blog')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
