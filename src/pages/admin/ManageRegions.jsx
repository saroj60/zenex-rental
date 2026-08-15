import React, { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { Map as MapIcon, Plus, Edit2, Trash2, Image as ImageIcon, Save, X } from 'lucide-react';

const ManageRegions = () => {
  const { regions, addRegion, updateRegion, deleteRegion, uploadImage, tourTrips } = useAppData();
  const [isEditing, setIsEditing] = useState(false);
  const [currentRegion, setCurrentRegion] = useState(null);
  
  const [formData, setFormData] = useState({ name: '', description: '', image: '', country: 'Nepal', type: 'Tours' });

  const getPackageCount = (regionName) => {
    return tourTrips.filter(t => t.region === regionName).length;
  };

  const handleOpenEdit = (region = null) => {
    if (region) {
      setCurrentRegion(region);
      setFormData({ 
        name: region.name, 
        description: region.description || '', 
        image: region.image || '',
        country: region.country || 'Nepal',
        type: region.type || 'Tours'
      });
    } else {
      setCurrentRegion(null);
      setFormData({ name: '', description: '', image: '', country: 'Nepal', type: 'Tours' });
    }
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
    setCurrentRegion(null);
  };

  const handleSave = async () => {
    if (!formData.name) return alert('Name is required');
    
    // Auto-generate slug
    const slug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const dataToSave = { ...formData, slug };

    if (currentRegion) {
      await updateRegion(currentRegion.id, dataToSave);
    } else {
      await addRegion(dataToSave);
    }
    handleCloseEdit();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this region?')) {
      await deleteRegion(id);
    }
  };

  const handleImageUpload = async (e) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const url = await uploadImage(e.target.files[0]);
        setFormData(prev => ({ ...prev, image: url }));
      } catch (err) {
        alert('Failed to upload image');
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3"><MapIcon className="text-[#e53a24]" size={36} /> Manage Regions</h1>
          <p className="text-gray-500 mt-2">Create and organize trip categories/regions.</p>
        </div>
        <button onClick={() => handleOpenEdit()} className="bg-[#1e3a8a] text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-900 transition-colors shadow-md">
          <Plus size={18} /> Add New Region
        </button>
      </div>

      {isEditing && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">{currentRegion ? 'Edit Region' : 'Add New Region'}</h2>
            <button onClick={handleCloseEdit} className="text-gray-400 hover:text-gray-700"><X size={24} /></button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Region Name</label>
              <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. Everest Region Treks" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-[#e53a24]" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Country</label>
                <select value={formData.country} onChange={e => setFormData({ ...formData, country: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-[#e53a24] cursor-pointer">
                  <option>Nepal</option>
                  <option>Tibet</option>
                  <option>Bhutan</option>
                  <option>India</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Category Type</label>
                <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-[#e53a24] cursor-pointer">
                  <option>Tours</option>
                  <option>Treks</option>
                  <option>Both</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
              <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Short description..." rows="3" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-[#e53a24]"></textarea>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Cover Image</label>
              <div className="flex gap-4 items-center">
                <input type="text" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} placeholder="Image URL" className="flex-1 border border-gray-300 rounded-lg px-4 py-2" />
                <label className="bg-gray-100 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-200 font-bold text-gray-700 text-sm">
                  Upload
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                </label>
              </div>
              {formData.image && <img src={formData.image} alt="Preview" className="h-32 object-cover rounded-lg mt-4 border border-gray-200" />}
            </div>
            <div className="flex justify-end pt-4">
              <button onClick={handleSave} className="bg-[#e53a24] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-red-700">
                <Save size={18} /> Save Region
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {regions.map(region => {
          const count = getPackageCount(region.name);
          return (
            <div key={region.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group">
              <div className="h-48 bg-gray-100 relative">
                {region.image ? (
                  <img src={region.image} alt={region.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300"><ImageIcon size={48} /></div>
                )}
                <div className="absolute top-2 right-2 flex gap-1">
                  <button onClick={() => handleOpenEdit(region)} className="p-2 bg-white/90 backdrop-blur rounded-lg text-blue-600 hover:bg-blue-50 shadow-sm"><Edit2 size={16} /></button>
                  <button onClick={() => handleDelete(region.id)} className="p-2 bg-white/90 backdrop-blur rounded-lg text-red-600 hover:bg-red-50 shadow-sm"><Trash2 size={16} /></button>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-gray-900 text-lg uppercase tracking-wide leading-tight mb-1">{region.name}</h3>
                <div className="flex gap-2 items-center text-xs font-bold text-[#e53a24] mb-3">
                  <span>{region.country || 'Nepal'}</span>
                  <span className="text-gray-300">•</span>
                  <span>{region.type || 'Tours'}</span>
                </div>
                <p className="text-gray-500 text-sm">{count} Packages</p>
              </div>
            </div>
          );
        })}
        {regions.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
            No regions created yet. Click "Add New Region" to start organizing your trips.
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageRegions;
