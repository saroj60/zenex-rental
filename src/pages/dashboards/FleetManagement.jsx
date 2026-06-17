import React, { useState } from 'react';
import { Users, Car, DollarSign, Activity, Search, Filter, MoreVertical, Trash2, X, Edit } from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';
import { useCurrency } from '../../context/CurrencyContext';

const FleetManagement = () => {
  const { vehicles, deleteVehicle, addVehicle, updateVehicle } = useAppData();
  const { formatPrice } = useCurrency();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [newVehicle, setNewVehicle] = useState({
    name: '', type: 'Economy', price: 0, priceWithDriver: 0, tax: 0, img: '/images/economy_car.png', pax: 4, trans: 'Manual', fuel: 'Petrol', urgency: 'Available Now', luggage: 2, images: []
  });

  const stats = [
    { label: 'Total Vehicles', val: vehicles.length, icon: <Car />, color: 'bg-blue-100 text-blue-600' },
    { label: 'Available', val: vehicles.filter(v => v.urgency !== 'Maintenance').length, icon: <Activity />, color: 'bg-green-100 text-green-600' },
  ];

  const filteredVehicles = vehicles.filter(v => v.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleAddVehicle = (e) => {
    e.preventDefault();
    if (isEditMode) {
      updateVehicle(editingId, { ...newVehicle, price: Number(newVehicle.price), priceWithDriver: Number(newVehicle.priceWithDriver || 0), tax: Number(newVehicle.tax || 0), pax: Number(newVehicle.pax) });
    } else {
      addVehicle({ ...newVehicle, price: Number(newVehicle.price), priceWithDriver: Number(newVehicle.priceWithDriver || 0), tax: Number(newVehicle.tax || 0), pax: Number(newVehicle.pax) });
    }
    setIsModalOpen(false);
    setNewVehicle({ name: '', type: 'Economy', price: 0, priceWithDriver: 0, tax: 0, img: '/images/economy_car.png', pax: 4, trans: 'Manual', fuel: 'Petrol', urgency: 'Available Now', luggage: 2, images: [] });
    setIsEditMode(false);
    setEditingId(null);
  };

  const openAddModal = () => {
    setNewVehicle({ name: '', type: 'Economy', price: 0, priceWithDriver: 0, tax: 0, img: '/images/economy_car.png', pax: 4, trans: 'Manual', fuel: 'Petrol', urgency: 'Available Now', luggage: 2, images: [] });
    setIsEditMode(false);
    setEditingId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (vehicle) => {
    setNewVehicle({ ...vehicle, luggage: vehicle.luggage || 2, images: vehicle.images || [], priceWithDriver: vehicle.priceWithDriver || 0, tax: vehicle.tax || 0 });
    setIsEditMode(true);
    setEditingId(vehicle.id);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-headline-lg text-2xl md:text-3xl font-bold text-himalayan-blue">Fleet Overview</h1>
        <button onClick={openAddModal} className="bg-himalayan-blue text-white px-4 py-2 rounded-lg text-sm font-bold shadow hover:bg-primary transition">Add Vehicle</button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
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

      {/* Vehicle Table Area */}
      <div className="bg-white rounded-xl shadow-sm border border-sky-tint overflow-hidden">
        <div className="p-4 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-low">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={18} />
            <input 
              type="text" 
              placeholder="Search vehicles..." 
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
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Vehicle</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {filteredVehicles.map((v) => (
                <tr key={v.id} className="hover:bg-surface/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-on-surface-variant">{v.id}</td>
                  <td className="px-6 py-4 font-bold">{v.name}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{v.type}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{formatPrice(v.price)}/day</td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <button onClick={() => openEditModal(v)} className="text-blue-500 hover:text-blue-700 transition-colors p-2">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => deleteVehicle(v.id)} className="text-sunset-orange hover:text-red-700 transition-colors p-2">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-outline-variant/30 text-xs text-on-surface-variant text-center bg-surface-container-low">
          Showing {filteredVehicles.length} vehicles
        </div>
      </div>

      {/* Add Vehicle Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-surface-container-low shrink-0 rounded-t-2xl">
              <h2 className="text-xl font-bold text-himalayan-blue">{isEditMode ? 'Edit Vehicle' : 'Add New Vehicle'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleAddVehicle} className="p-6 space-y-4 overflow-y-auto flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant">Vehicle Name</label>
                  <input type="text" required value={newVehicle.name} onChange={e => setNewVehicle({...newVehicle, name: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue" placeholder="e.g. Toyota Hilux" />
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant">Type</label>
                  <select value={newVehicle.type} onChange={e => setNewVehicle({...newVehicle, type: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue">
                    <option value="Economy">Economy</option>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV / 4x4">SUV / 4x4</option>
                    <option value="Luxury">Luxury</option>
                    <option value="EV">EV</option>
                    <option value="Van / Micro">Van / Micro</option>
                    <option value="Minibus">Minibus</option>
                    <option value="Pickup Truck">Pickup Truck</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant">Self Drive Price (NPR)</label>
                  <input type="number" required min="0" value={newVehicle.price} onChange={e => setNewVehicle({...newVehicle, price: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant">With Driver Price (NPR)</label>
                  <input type="number" min="0" value={newVehicle.priceWithDriver} onChange={e => setNewVehicle({...newVehicle, priceWithDriver: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant">Transmission</label>
                  <select value={newVehicle.trans} onChange={e => setNewVehicle({...newVehicle, trans: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue">
                    <option value="Manual">Manual</option>
                    <option value="Auto">Auto</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant">Fuel</label>
                  <select value={newVehicle.fuel} onChange={e => setNewVehicle({...newVehicle, fuel: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue">
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant">Passengers</label>
                  <input type="number" required min="1" value={newVehicle.pax} onChange={e => setNewVehicle({...newVehicle, pax: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant">Bag Capacity</label>
                  <input type="number" required min="0" value={newVehicle.luggage} onChange={e => setNewVehicle({...newVehicle, luggage: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue" />
                </div>
                
                <div className="space-y-1 col-span-2 border border-outline-variant/30 p-3 rounded-xl bg-surface-container-low/50">
                  <label className="text-xs font-bold text-on-surface-variant flex justify-between">
                    <span>Main Thumbnail Image</span>
                  </label>
                  <div className="flex gap-2">
                    <input type="text" value={newVehicle.img} onChange={e => setNewVehicle({...newVehicle, img: e.target.value})} className="flex-1 border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue bg-white" placeholder="/images/economy_car.png or https://..." />
                    <label className="bg-white border border-outline-variant rounded-lg px-4 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors text-sm font-bold text-on-surface-variant">
                      <span>Upload</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setNewVehicle({...newVehicle, img: reader.result});
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>
                  {newVehicle.img && newVehicle.img.startsWith('data:image') && <p className="text-[10px] text-green-600 mt-1">Local image attached successfully.</p>}

                  <div className="mt-4 pt-4 border-t border-outline-variant/30">
                    <label className="text-xs font-bold text-on-surface-variant mb-2 block">Additional Gallery Images</label>
                    <div className="flex gap-2 mb-3">
                      <input 
                        type="text" 
                        id="new-gallery-img"
                        className="flex-1 border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue bg-white" 
                        placeholder="Add another image URL..." 
                      />
                      <button type="button" onClick={() => {
                        const val = document.getElementById('new-gallery-img').value;
                        if(val) {
                          setNewVehicle({...newVehicle, images: [...(newVehicle.images || []), val]});
                          document.getElementById('new-gallery-img').value = '';
                        }
                      }} className="bg-himalayan-blue text-white px-3 rounded-lg text-sm font-bold shadow-sm hover:bg-primary transition">Add URL</button>
                      
                      <label className="bg-white border border-outline-variant rounded-lg px-4 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors text-sm font-bold text-on-surface-variant">
                        <span>Upload Local</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          multiple
                          className="hidden" 
                          onChange={(e) => {
                            const files = Array.from(e.target.files);
                            const promises = files.map(file => {
                              return new Promise((resolve) => {
                                const reader = new FileReader();
                                reader.onloadend = () => resolve(reader.result);
                                reader.readAsDataURL(file);
                              });
                            });
                            Promise.all(promises).then(results => {
                              setNewVehicle({...newVehicle, images: [...(newVehicle.images || []), ...results]});
                            });
                          }}
                        />
                      </label>
                    </div>

                    {newVehicle.images && newVehicle.images.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {newVehicle.images.map((img, idx) => (
                          <div key={idx} className="relative w-16 h-16 rounded overflow-hidden border border-outline-variant group">
                            <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                            <button type="button" onClick={() => {
                              const newImgs = [...newVehicle.images];
                              newImgs.splice(idx, 1);
                              setNewVehicle({...newVehicle, images: newImgs});
                            }} className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant">Taxes & Fees (NPR)</label>
                  <input type="number" min="0" value={newVehicle.tax} onChange={e => setNewVehicle({...newVehicle, tax: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant">Status</label>
                  <select value={newVehicle.urgency} onChange={e => setNewVehicle({...newVehicle, urgency: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue">
                    <option value="Available Now">Available Now</option>
                    <option value="High Demand">High Demand</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-3 bg-himalayan-blue text-white rounded-xl text-sm font-bold shadow-lg hover:bg-primary transition">{isEditMode ? 'Update Vehicle' : 'Save Vehicle'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FleetManagement;
