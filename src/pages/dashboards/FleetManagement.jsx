import React, { useState } from 'react';
import { Users, Car, DollarSign, Activity, Search, Filter, MoreVertical, Trash2, X } from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';
import { useCurrency } from '../../context/CurrencyContext';

const FleetManagement = () => {
  const { vehicles, deleteVehicle, addVehicle } = useAppData();
  const { formatPrice } = useCurrency();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    name: '', type: 'Economy', price: 0, img: '/images/economy_car.png', pax: 4, trans: 'Manual', fuel: 'Petrol', urgency: 'Available Now'
  });

  const stats = [
    { label: 'Total Vehicles', val: vehicles.length, icon: <Car />, color: 'bg-blue-100 text-blue-600' },
    { label: 'Available', val: vehicles.filter(v => v.urgency !== 'Maintenance').length, icon: <Activity />, color: 'bg-green-100 text-green-600' },
  ];

  const filteredVehicles = vehicles.filter(v => v.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleAddVehicle = (e) => {
    e.preventDefault();
    addVehicle({ ...newVehicle, price: Number(newVehicle.price), pax: Number(newVehicle.pax) });
    setIsModalOpen(false);
    setNewVehicle({ name: '', type: 'Economy', price: 0, img: '/images/economy_car.png', pax: 4, trans: 'Manual', fuel: 'Petrol', urgency: 'Available Now' });
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-headline-lg text-2xl md:text-3xl font-bold text-himalayan-blue">Fleet Overview</h1>
        <button onClick={() => setIsModalOpen(true)} className="bg-himalayan-blue text-white px-4 py-2 rounded-lg text-sm font-bold shadow hover:bg-primary transition">Add Vehicle</button>
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
                  <td className="px-6 py-4 text-right">
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
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-surface-container-low">
              <h2 className="text-xl font-bold text-himalayan-blue">Add New Vehicle</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleAddVehicle} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant">Vehicle Name</label>
                  <input type="text" required value={newVehicle.name} onChange={e => setNewVehicle({...newVehicle, name: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue" placeholder="e.g. Toyota Hilux" />
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant">Type</label>
                  <select value={newVehicle.type} onChange={e => setNewVehicle({...newVehicle, type: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue">
                    <option value="Economy">Economy</option>
                    <option value="SUV / 4x4">SUV / 4x4</option>
                    <option value="Luxury">Luxury</option>
                    <option value="EV">EV</option>
                    <option value="Van / Micro">Van / Micro</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant">Price per Day (NPR)</label>
                  <input type="number" required min="0" value={newVehicle.price} onChange={e => setNewVehicle({...newVehicle, price: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue" />
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
                
                <div className="space-y-1 col-span-2">
                  <label className="text-xs font-bold text-on-surface-variant">Image URL or Local Upload</label>
                  <div className="flex gap-2">
                    <input type="text" value={newVehicle.img} onChange={e => setNewVehicle({...newVehicle, img: e.target.value})} className="flex-1 border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue" placeholder="/images/economy_car.png or https://..." />
                    <label className="bg-surface-container-low border border-outline-variant rounded-lg px-4 flex items-center justify-center cursor-pointer hover:bg-surface-container transition-colors text-sm font-bold text-on-surface-variant">
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
                <button type="submit" className="flex-1 px-4 py-3 bg-himalayan-blue text-white rounded-xl text-sm font-bold shadow-lg hover:bg-primary transition">Save Vehicle</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FleetManagement;
