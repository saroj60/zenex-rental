import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlogContext } from '../../context/BlogContext';
import ReactQuill from 'react-quill-new';
import 'quill/dist/quill.snow.css';

const AddBlog = () => {
  const { addBlog } = useBlogContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    coverImage: '',
    category: '',
    content: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      alert('Title and Content are required!');
      return;
    }

    addBlog(formData);
    alert('Blog published successfully!');
    navigate('/dashboard/blogs');
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Create New Blog</h1>
      <p className="text-gray-500 mb-8">Fill in the details below to publish a new blog post.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold text-gray-700">Blog Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. 10 Best Places to Visit in Nepal"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ea580c] focus:border-transparent transition-shadow"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Cover Image URL</label>
            <input
              type="url"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/photo-..."
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ea580c] focus:border-transparent transition-shadow"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ea580c] focus:border-transparent transition-shadow bg-white"
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
          <div className="bg-white rounded-xl overflow-hidden border border-gray-300 focus-within:ring-2 focus-within:ring-[#ea580c] focus-within:border-transparent transition-shadow">
            <ReactQuill 
              theme="snow" 
              value={formData.content} 
              onChange={(content) => setFormData((prev) => ({ ...prev, content }))}
              className="h-64 mb-12"
              modules={{
                toolbar: [
                  [{ 'header': [1, 2, 3, false] }],
                  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                  [{'list': 'ordered'}, {'list': 'bullet'}],
                  ['link', 'image'],
                  ['clean']
                ]
              }}
            />
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
          <button type="button" onClick={() => navigate('/admin/blogs')} className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button type="submit" className="px-8 py-3 rounded-xl bg-[#ea580c] text-white font-medium hover:bg-[#ea580c]/90 transition-colors shadow-md shadow-[#ea580c]/20">
            Publish Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
