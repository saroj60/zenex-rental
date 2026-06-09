import React, { useState } from 'react';
import { MapPin, Search, Filter, MoreVertical, Plus, Trash2, X } from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';

const DestinationsAdmin = () => {
  const { destinations, deleteDestination, addDestination } = useAppData();
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDest, setNewDest] = useState({
    id: '', name: '', region: 'Valley', desc: '', img: '', span: 'md:col-span-1 md:row-span-1', bestTime: '', terrain: '', vehicles: ''
  });

  const filteredDestinations = destinations.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleAddDestination = (e) => {
    e.preventDefault();
    const formattedDest = {
      ...newDest,
      id: newDest.id || newDest.name.toLowerCase().replace(/\s+/g, '-'),
      vehicles: newDest.vehicles.split(',').map(v => v.trim()).filter(Boolean)
    };
    addDestination(formattedDest);
    setIsModalOpen(false);
    setNewDest({ id: '', name: '', region: 'Valley', desc: '', img: '', span: 'md:col-span-1 md:row-span-1', bestTime: '', terrain: '', vehicles: '' });
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-headline-lg text-2xl md:text-3xl font-bold text-himalayan-blue">Destinations Management</h1>
        <button onClick={() => setIsModalOpen(true)} className="bg-himalayan-blue text-white px-4 py-2 rounded-lg text-sm font-bold shadow hover:bg-primary transition flex items-center gap-2">
          <Plus size={16} /> Add Destination
        </button>
      </div>

      {/* Table Area */}
      <div className="bg-white rounded-xl shadow-sm border border-sky-tint overflow-hidden">
        <div className="p-4 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-low">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={18} />
            <input 
              type="text" 
              placeholder="Search destinations..." 
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
                <th className="px-6 py-4">Destination Name</th>
                <th className="px-6 py-4">Region</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {filteredDestinations.map((d) => (
                <tr key={d.id} className="hover:bg-surface/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-on-surface-variant">{d.id}</td>
                  <td className="px-6 py-4 font-bold flex items-center gap-2"><MapPin size={16} className="text-himalayan-blue"/> {d.name}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{d.region}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => deleteDestination(d.id)} className="text-sunset-orange hover:text-red-700 transition-colors p-2">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-outline-variant/30 text-xs text-on-surface-variant text-center bg-surface-container-low">
          Showing {filteredDestinations.length} destinations
        </div>
      </div>

      {/* Add Destination Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-surface-container-low shrink-0">
              <h2 className="text-xl font-bold text-himalayan-blue">Add New Destination</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            
            <div className="overflow-y-auto p-6">
              <form id="destForm" onSubmit={handleAddDestination} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 space-y-1">
                    <label className="text-xs font-bold text-on-surface-variant">Destination Name</label>
                    <input type="text" required value={newDest.name} onChange={e => setNewDest({...newDest, name: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue" placeholder="e.g. Kathmandu Valley" />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-on-surface-variant">Region</label>
                    <select value={newDest.region} onChange={e => setNewDest({...newDest, region: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue">
                      <option value="Valley">Valley</option>
                      <option value="Himalayas">Himalayas</option>
                      <option value="Terai">Terai</option>
                      <option value="Hills">Hills</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-on-surface-variant">Best Time</label>
                    <input type="text" required value={newDest.bestTime} onChange={e => setNewDest({...newDest, bestTime: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue" placeholder="e.g. Sep - Nov" />
                  </div>

                  <div className="col-span-2 space-y-1">
                    <label className="text-xs font-bold text-on-surface-variant">Description</label>
                    <textarea required value={newDest.desc} onChange={e => setNewDest({...newDest, desc: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue" placeholder="A brief description of the destination..." rows="2"></textarea>
                  </div>

                  <div className="col-span-2 space-y-1">
                    <label className="text-xs font-bold text-on-surface-variant">Image URL</label>
                    <input type="text" required value={newDest.img} onChange={e => setNewDest({...newDest, img: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue" placeholder="e.g. /images/destinations/kathmandu.png or https://..." />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-on-surface-variant">Terrain</label>
                    <input type="text" value={newDest.terrain} onChange={e => setNewDest({...newDest, terrain: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue" placeholder="e.g. Paved / Highway" />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-on-surface-variant">Grid Span</label>
                    <select value={newDest.span} onChange={e => setNewDest({...newDest, span: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue">
                      <option value="md:col-span-1 md:row-span-1">Small (1x1)</option>
                      <option value="md:col-span-2 md:row-span-1">Wide (2x1)</option>
                      <option value="md:col-span-2 md:row-span-2">Large (2x2)</option>
                    </select>
                  </div>

                  <div className="col-span-2 space-y-1">
                    <label className="text-xs font-bold text-on-surface-variant">Recommended Vehicles (Comma separated)</label>
                    <input type="text" value={newDest.vehicles} onChange={e => setNewDest({...newDest, vehicles: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue" placeholder="e.g. SUV, Economy, Van" />
                  </div>
                </div>
              </form>
            </div>
            
            <div className="p-6 border-t border-gray-100 shrink-0 flex gap-3">
              <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition">Cancel</button>
              <button type="submit" form="destForm" className="flex-1 px-4 py-3 bg-himalayan-blue text-white rounded-xl text-sm font-bold shadow-lg hover:bg-primary transition">Save Destination</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DestinationsAdmin;
