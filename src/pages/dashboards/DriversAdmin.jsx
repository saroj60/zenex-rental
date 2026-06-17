import React, { useState } from 'react';
import { Users, DollarSign, Search, Trash2, X, Edit, UserPlus, Star } from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';
import { useCurrency } from '../../context/CurrencyContext';

const DriversAdmin = () => {
  const { drivers, deleteDriver, addDriver, updateDriver, vehicles } = useAppData();
  const { formatPrice } = useCurrency();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [newDriver, setNewDriver] = useState({
    name: '', label: '', price: 0, img: '', type: 'Verified Local Driver', rating: 5.0, experience: '', languages: '', quote: '', assignedVehicleId: ''
  });

  const stats = [
    { label: 'Total Drivers', val: drivers.length, icon: <Users />, color: 'bg-blue-100 text-blue-600' },
  ];

  const filteredDrivers = drivers.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleAddDriver = (e) => {
    e.preventDefault();
    if (isEditMode) {
      updateDriver(editingId, { ...newDriver, price: Number(newDriver.price), rating: Number(newDriver.rating) });
    } else {
      addDriver({ ...newDriver, price: Number(newDriver.price), rating: Number(newDriver.rating) });
    }
    setIsModalOpen(false);
    setNewDriver({ name: '', label: '', price: 0, img: '', type: 'Verified Local Driver', rating: 5.0, experience: '', languages: '', quote: '', assignedVehicleId: '' });
    setIsEditMode(false);
    setEditingId(null);
  };

  const openAddModal = () => {
    setNewDriver({ name: '', label: '', price: 0, img: '', type: 'Verified Local Driver', rating: 5.0, experience: '', languages: '', quote: '', assignedVehicleId: '' });
    setIsEditMode(false);
    setEditingId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (driver) => {
    setNewDriver({ ...driver, assignedVehicleId: driver.assignedVehicleId || '' });
    setIsEditMode(true);
    setEditingId(driver.id);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-headline-lg text-2xl md:text-3xl font-bold text-himalayan-blue">Driver Management</h1>
        <button onClick={openAddModal} className="bg-himalayan-blue text-white px-4 py-2 rounded-lg text-sm font-bold shadow hover:bg-primary transition flex items-center gap-2">
          <UserPlus size={16} /> Add Driver
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-5 rounded-xl shadow-sm border border-sky-tint flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${s.color}`}>
              {s.icon}
            </div>
            <div>
              <p className="text-xs text-on-surface-variant font-bold uppercase">{s.label}</p>
              <h3 className="text-2xl font-bold text-on-surface mt-1">{s.val}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Table Area */}
      <div className="bg-white rounded-xl shadow-sm border border-sky-tint overflow-hidden">
        <div className="p-4 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-low">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={18} />
            <input 
              type="text" 
              placeholder="Search drivers..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-outline-variant rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-himalayan-blue" 
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-container-low text-on-surface-variant font-bold text-xs uppercase border-b border-outline-variant/30">
              <tr>
                <th className="px-6 py-4">Driver</th>
                <th className="px-6 py-4">Label/Type</th>
                <th className="px-6 py-4">Experience</th>
                <th className="px-6 py-4">Assigned To</th>
                <th className="px-6 py-4">Rate (per day)</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {filteredDrivers.map((d) => (
                <tr key={d.id} className="hover:bg-surface/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                        {d.img ? <img src={d.img} alt={d.name} className="w-full h-full object-cover" /> : <Users className="w-6 h-6 m-2 text-gray-400" />}
                      </div>
                      <div>
                        <p className="font-bold text-on-surface">{d.name}</p>
                        <div className="flex items-center text-xs text-amber-500 gap-1"><Star size={10} fill="currentColor"/> {d.rating}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold">{d.label}</p>
                    <p className="text-xs text-on-surface-variant">{d.type}</p>
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant">{d.experience}</td>
                  <td className="px-6 py-4 text-on-surface-variant">
                    {d.assignedVehicleId 
                      ? vehicles?.find(v => v.id.toString() === d.assignedVehicleId.toString())?.name || 'Unknown Vehicle'
                      : 'Global / Any'}
                  </td>
                  <td className="px-6 py-4 font-bold text-green-700">{formatPrice(d.price)}</td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <button onClick={() => openEditModal(d)} className="text-blue-500 hover:text-blue-700 transition-colors p-2">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => deleteDriver(d.id)} className="text-sunset-orange hover:text-red-700 transition-colors p-2">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-outline-variant/30 text-xs text-on-surface-variant text-center bg-surface-container-low">
          Showing {filteredDrivers.length} drivers
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-surface-container-low">
              <h2 className="text-xl font-bold text-himalayan-blue">{isEditMode ? 'Edit Driver' : 'Add New Driver'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleAddDriver} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant">Driver Name</label>
                  <input type="text" required value={newDriver.name} onChange={e => setNewDriver({...newDriver, name: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue" placeholder="e.g. Ramesh Thapa" />
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant">Label (UI Display)</label>
                  <input type="text" required value={newDriver.label} onChange={e => setNewDriver({...newDriver, label: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue" placeholder="e.g. Car with Driver" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant">Price per Day (NPR)</label>
                  <input type="number" required min="0" value={newDriver.price} onChange={e => setNewDriver({...newDriver, price: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant">Type/Category</label>
                  <input type="text" required value={newDriver.type} onChange={e => setNewDriver({...newDriver, type: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue" placeholder="e.g. Verified Local Driver" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant">Experience</label>
                  <input type="text" required value={newDriver.experience} onChange={e => setNewDriver({...newDriver, experience: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue" placeholder="e.g. 8 Years Exp." />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant">Rating</label>
                  <input type="number" step="0.1" max="5" min="0" required value={newDriver.rating} onChange={e => setNewDriver({...newDriver, rating: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue" placeholder="e.g. 4.9" />
                </div>

                <div className="col-span-2 space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant">Assigned Vehicle</label>
                  <select value={newDriver.assignedVehicleId} onChange={e => setNewDriver({...newDriver, assignedVehicleId: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue">
                    <option value="">Global / Any Vehicle</option>
                    {vehicles?.map(v => (
                      <option key={v.id} value={v.id}>{v.name} ({v.type})</option>
                    ))}
                  </select>
                </div>

                <div className="col-span-2 space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant">Languages Spoken</label>
                  <input type="text" required value={newDriver.languages} onChange={e => setNewDriver({...newDriver, languages: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue" placeholder="e.g. English, Nepali, Hindi" />
                </div>
                
                <div className="col-span-2 space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant">Quote / Bio</label>
                  <textarea required value={newDriver.quote} onChange={e => setNewDriver({...newDriver, quote: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue" rows="2" placeholder="A short quote from the driver..."></textarea>
                </div>

                <div className="space-y-1 col-span-2">
                  <label className="text-xs font-bold text-on-surface-variant">Image URL</label>
                  <div className="flex gap-2">
                    <input type="text" value={newDriver.img} onChange={e => setNewDriver({...newDriver, img: e.target.value})} className="flex-1 border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue" placeholder="https://..." />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-3 bg-himalayan-blue text-white rounded-xl text-sm font-bold shadow-lg hover:bg-primary transition">{isEditMode ? 'Update Driver' : 'Save Driver'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriversAdmin;
