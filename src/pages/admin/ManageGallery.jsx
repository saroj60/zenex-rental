import React, { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { Plus, Trash2, Edit2, Image as ImageIcon } from 'lucide-react';

const ManageGallery = () => {
  const { galleryImages, addGalleryImage, updateGalleryImage, deleteGalleryImage } = useAppData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [newImage, setNewImage] = useState({ title: '', url: '' });

  const handleOpenAdd = () => {
    setEditingImage(null);
    setNewImage({ title: '', url: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (img) => {
    setEditingImage(img);
    setNewImage({ title: img.title || '', url: img.url || '' });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (newImage.url) {
      if (editingImage) {
        updateGalleryImage(editingImage.id, newImage);
      } else {
        addGalleryImage(newImage);
      }
      setNewImage({ title: '', url: '' });
      setEditingImage(null);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Gallery</h1>
          <p className="text-gray-500 mt-1">Add, edit, or remove images from the home page gallery.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
        >
          <Plus size={20} />
          Add Image
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {galleryImages.map((img) => (
          <div key={img.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group">
            <div className="relative h-48">
              <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => handleOpenEdit(img)}
                  className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition shadow-lg"
                  title="Edit Image"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => deleteGalleryImage(img.id)}
                  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition shadow-lg"
                  title="Delete Image"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="p-4 flex items-center gap-2">
              <ImageIcon size={16} className="text-gray-400" />
              <span className="font-medium text-gray-700 line-clamp-1">{img.title || 'Untitled'}</span>
            </div>
          </div>
        ))}
        {galleryImages.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
            No images in the gallery yet. Click "Add Image" to get started.
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-gray-800">{editingImage ? 'Edit Image' : 'Add New Image'}</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="url"
                  required
                  value={newImage.url}
                  onChange={(e) => setNewImage({ ...newImage, url: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image Title</label>
                <input
                  type="text"
                  value={newImage.title}
                  onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  placeholder="e.g. Kathmandu Valley"
                />
              </div>
              <div className="flex gap-3 justify-end mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
                >
                  {editingImage ? 'Update Image' : 'Add Image'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageGallery;
