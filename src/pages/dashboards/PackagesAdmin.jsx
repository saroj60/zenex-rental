import React, { useState } from 'react';
import { Package, Search, Filter, MoreVertical, Plus, Trash2, X, Edit2, Check } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import { useAppData } from '../../context/AppDataContext';

const PackagesAdmin = () => {
  const { formatPrice } = useCurrency();
  const { packages, deletePackage, addPackage, updatePackage } = useAppData();
  const [searchTerm, setSearchTerm] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [inlineEditingId, setInlineEditingId] = useState(null);
  const [inlinePrice, setInlinePrice] = useState('');
  const [newPkg, setNewPkg] = useState({
    id: '', title: '', duration: '', desc: '', price: '', img: '', highlights: '', itinerary: '', category: 'Packages', location: '', tripCode: '', persons: ''
  });

  const filteredPackages = packages.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleSaveInlinePrice = (pkg) => {
    updatePackage(pkg.id, { ...pkg, price: inlinePrice });
    setInlineEditingId(null);
  };

  const handleEditClick = (pkg) => {
    setEditingId(pkg.id);
    const highlightsStr = pkg.highlights ? pkg.highlights.join(', ') : '';
    const itineraryStr = pkg.itinerary ? pkg.itinerary.map(i => `${i.day}: ${i.desc}`).join('\n') : '';
    setNewPkg({
      ...pkg,
      highlights: highlightsStr,
      itinerary: itineraryStr,
      category: pkg.category || 'Packages',
      location: pkg.location || '',
      tripCode: pkg.tripCode || '',
      persons: pkg.persons || ''
    });
    setIsModalOpen(true);
  };

  const handleAddPackage = (e) => {
    e.preventDefault();
    
    // Parse highlights and itinerary from simple text input for initial version
    const highlightsArray = newPkg.highlights ? newPkg.highlights.split(',').map(h => h.trim()).filter(Boolean) : [];
    const itineraryArray = newPkg.itinerary ? newPkg.itinerary.split('\n').map((line, idx) => {
      const parts = line.split(':');
      if (parts.length > 1) {
        return { day: parts[0].trim(), desc: parts.slice(1).join(':').trim() };
      }
      return { day: `Day ${idx + 1}`, desc: line.trim() };
    }).filter(i => i.desc) : [];

    const formattedPkg = {
      ...newPkg,
      id: newPkg.id || newPkg.title.toLowerCase().replace(/\s+/g, '-'),
      highlights: highlightsArray,
      itinerary: itineraryArray
    };

    if (editingId) {
      updatePackage(editingId, formattedPkg);
    } else {
      addPackage(formattedPkg);
    }
    setEditingId(null);
    setIsModalOpen(false);
    setNewPkg({ id: '', title: '', duration: '', desc: '', price: '', img: '', highlights: '', itinerary: '', category: 'Packages', location: '', tripCode: '', persons: '' });
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-headline-lg text-2xl md:text-3xl font-bold text-himalayan-blue">Packages Management</h1>
        <button onClick={() => { setEditingId(null); setNewPkg({ id: '', title: '', duration: '', desc: '', price: '', img: '', highlights: '', itinerary: '', category: 'Packages', location: '', tripCode: '', persons: '' }); setIsModalOpen(true); }} className="bg-himalayan-blue text-white px-4 py-2 rounded-lg text-sm font-bold shadow hover:bg-primary transition flex items-center gap-2">
          <Plus size={16} /> Create Package
        </button>
      </div>

      {/* Table Area */}
      <div className="bg-white rounded-xl shadow-sm border border-sky-tint overflow-hidden">
        <div className="p-4 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-low">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={18} />
            <input 
              type="text" 
              placeholder="Search packages..." 
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
                <th className="px-6 py-4">Package Name</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {filteredPackages.map((p) => (
                <tr key={p.id} className="hover:bg-surface/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-on-surface-variant">{p.id}</td>
                  <td className="px-6 py-4 font-bold flex items-center gap-2"><Package size={16} className="text-sunset-orange"/> {p.title}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{p.duration}</td>
                  <td className="px-6 py-4 font-bold text-on-surface">
                    {inlineEditingId === p.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={inlinePrice}
                          onChange={(e) => setInlinePrice(e.target.value)}
                          className="border border-himalayan-blue rounded px-2 py-1 text-sm w-24 outline-none font-normal"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveInlinePrice(p);
                            if (e.key === 'Escape') setInlineEditingId(null);
                          }}
                        />
                        <button onClick={() => handleSaveInlinePrice(p)} className="text-green-600 hover:text-green-800"><Check size={16}/></button>
                        <button onClick={() => setInlineEditingId(null)} className="text-gray-400 hover:text-gray-600"><X size={16}/></button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 group">
                        <span>{p.price}</span>
                        <button onClick={() => { setInlineEditingId(p.id); setInlinePrice(p.price); }} className="text-gray-300 hover:text-himalayan-blue opacity-0 group-hover:opacity-100 transition-opacity" title="Quick Edit Price">
                          <Edit2 size={14} />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <button onClick={() => handleEditClick(p)} className="text-himalayan-blue hover:text-blue-700 transition-colors p-2">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => deletePackage(p.id)} className="text-sunset-orange hover:text-red-700 transition-colors p-2">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-outline-variant/30 text-xs text-on-surface-variant text-center bg-surface-container-low">
          Showing {filteredPackages.length} packages
        </div>
      </div>

      {/* Create Package Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-surface-container-low shrink-0">
              <h2 className="text-xl font-bold text-himalayan-blue">{editingId ? 'Edit Package' : 'Create New Package'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            
            <div className="overflow-y-auto p-6">
              <form id="pkgForm" onSubmit={handleAddPackage} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 space-y-1">
                    <label className="text-xs font-bold text-on-surface-variant">Package Title</label>
                    <input type="text" required value={newPkg.title} onChange={e => setNewPkg({...newPkg, title: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue" placeholder="e.g. Annapurna Circuit Jeep Rental" />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-on-surface-variant">Category</label>
                    <select required value={newPkg.category} onChange={e => setNewPkg({...newPkg, category: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue">
                      <option value="Packages">Packages</option>
                      <option value="Tours">Tours</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-on-surface-variant flex items-center justify-between">
                      Location / Country
                      <span className="text-[10px] text-himalayan-blue font-normal">(Nepal, Tibet, Bhutan, India)</span>
                    </label>
                    <input type="text" value={newPkg.location} onChange={e => setNewPkg({...newPkg, location: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue" placeholder="e.g. Nepal - Chitwan" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-on-surface-variant flex items-center justify-between">
                      Duration
                      <span className="text-[10px] text-himalayan-blue font-normal">(e.g. 5 Days, 14 Days)</span>
                    </label>
                    <input type="text" value={newPkg.duration} onChange={e => setNewPkg({...newPkg, duration: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue" placeholder="e.g. 14 Days" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-on-surface-variant">Price string</label>
                    <input type="text" required value={newPkg.price} onChange={e => setNewPkg({...newPkg, price: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue" placeholder="e.g. US$1500" />
                  </div>

                  <div className="col-span-2 space-y-1">
                    <label className="text-xs font-bold text-on-surface-variant">Description</label>
                    <textarea value={newPkg.desc} onChange={e => setNewPkg({...newPkg, desc: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue" placeholder="A brief description of the package..." rows="2"></textarea>
                  </div>

                  <div className="col-span-2 space-y-1">
                    <label className="text-xs font-bold text-on-surface-variant">Image URL</label>
                    <input type="text" value={newPkg.img} onChange={e => setNewPkg({...newPkg, img: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue" placeholder="e.g. /images/destinations/annapurna.png or https://..." />
                  </div>

                  <div className="col-span-2 space-y-1">
                    <label className="text-xs font-bold text-on-surface-variant">Highlights (Comma separated)</label>
                    <input type="text" value={newPkg.highlights} onChange={e => setNewPkg({...newPkg, highlights: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue" placeholder="e.g. 4x4 Vehicle, Mountain Driver, Fuel Included" />
                  </div>

                  <div className="col-span-2 space-y-1">
                    <label className="text-xs font-bold text-on-surface-variant">Itinerary (One per line, Format: Day X: Description)</label>
                    <textarea value={newPkg.itinerary} onChange={e => setNewPkg({...newPkg, itinerary: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-himalayan-blue" placeholder="Day 1: Kathmandu to Besisahar&#10;Day 2-5: Besisahar to Manang" rows="3"></textarea>
                  </div>
                </div>
              </form>
            </div>
            
            <div className="p-6 border-t border-gray-100 shrink-0 flex gap-3">
              <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition">Cancel</button>
              <button type="submit" form="pkgForm" className="flex-1 px-4 py-3 bg-himalayan-blue text-white rounded-xl text-sm font-bold shadow-lg hover:bg-primary transition">{editingId ? 'Save Changes' : 'Create Package'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackagesAdmin;
