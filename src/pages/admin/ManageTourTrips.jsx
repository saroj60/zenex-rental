import React, { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle, Trash2, Edit, Copy, Eye, Map as MapIcon, CheckCircle, XCircle, Search, Star } from 'lucide-react';
import { formatDuration } from '../../utils/duration';

const ManageTourTrips = () => {
  const { tourTrips, deleteTourTrip, updateTourTrip, addTourTrip, regions, packages, deletePackage, updatePackage } = useAppData();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [destinationFilter, setDestinationFilter] = useState('All');
  const [regionFilter, setRegionFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [featuredFilter, setFeaturedFilter] = useState('All');

  const combinedTrips = [
    ...(tourTrips || []).map(t => ({ ...t, isTourTrip: true })),
    ...(packages || []).map(p => ({
      ...p,
      isTourTrip: false,
      slug: p.id,
      destination: p.location,
      region: p.location,
      duration: p.duration || '',
      price: p.price,
      status: p.status || 'Published',
      featured: p.featured || false,
      image: p.img,
      createdAt: p.createdAt || new Date().toISOString()
    }))
  ];

  const handleDelete = (trip) => {
    if (window.confirm(`Are you sure you want to delete "${trip.title}"?`)) {
      if (trip.isTourTrip) {
        deleteTourTrip(trip.id);
      } else {
        deletePackage(trip.id);
      }
    }
  };

  const handleDuplicate = (trip) => {
    const duplicate = { ...trip };
    delete duplicate.id;
    duplicate.title = `${trip.title} (Copy)`;
    duplicate.slug = `${trip.slug}-copy-${Date.now()}`;
    duplicate.createdAt = new Date().toISOString();
    duplicate.updatedAt = new Date().toISOString();
    duplicate.status = 'Draft';
    addTourTrip(duplicate);
  };

  const toggleStatus = (trip) => {
    const newStatus = trip.status === 'Published' ? 'Draft' : 'Published';
    if (trip.isTourTrip) {
      updateTourTrip(trip.id, { ...trip, status: newStatus, updatedAt: new Date().toISOString() });
    } else {
      updatePackage(trip.id, { ...trip, status: newStatus, updatedAt: new Date().toISOString() });
    }
  };

  const toggleFeatured = (trip) => {
    const newFeatured = !trip.featured;
    if (trip.isTourTrip) {
      updateTourTrip(trip.id, { ...trip, featured: newFeatured, updatedAt: new Date().toISOString() });
    } else {
      updatePackage(trip.id, { ...trip, featured: newFeatured, updatedAt: new Date().toISOString() });
    }
  };

  const categories = ['All', 'Treks', 'Tours', 'Tours Packages', 'Expeditions'];
  const destinations = ['All', ...new Set(combinedTrips.map(t => t.destination).filter(Boolean))];
  const uniqueRegions = ['All', ...regions.map(r => r.name)];

  const filteredTrips = combinedTrips.filter(t => {
    const matchesSearch = t.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = categoryFilter === 'All' || t.category === categoryFilter;
    const matchesDest = destinationFilter === 'All' || t.destination === destinationFilter;
    const matchesRegion = regionFilter === 'All' || t.region === regionFilter;
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    const matchesFeatured = featuredFilter === 'All' || (featuredFilter === 'Featured' ? t.featured : !t.featured);
    return matchesSearch && matchesCat && matchesDest && matchesRegion && matchesStatus && matchesFeatured;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Manage Tours & Treks</h1>
        <Link to="/dashboard/add-tour-trip" className="bg-[#e53a24] text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-[#d04b08] transition-colors">
          <PlusCircle size={20} /> Add New Trip
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search trips..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#e53a24]"
          />
        </div>
        <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
          {categories.map(c => <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>)}
        </select>
        <select value={destinationFilter} onChange={e => setDestinationFilter(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
          {destinations.map(d => <option key={d} value={d}>{d === 'All' ? 'All Destinations' : d}</option>)}
        </select>
        <select value={regionFilter} onChange={e => setRegionFilter(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
          {uniqueRegions.map(r => <option key={r} value={r}>{r === 'All' ? 'All Regions' : r}</option>)}
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
          <option value="All">All Statuses</option>
          <option value="Published">Published</option>
          <option value="Draft">Draft</option>
        </select>
        <select value={featuredFilter} onChange={e => setFeaturedFilter(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
          <option value="All">All Featured</option>
          <option value="Featured">Featured</option>
          <option value="Not Featured">Not Featured</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {filteredTrips && filteredTrips.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b border-gray-100 uppercase text-xs font-bold text-gray-500 tracking-wider">
                <tr>
                  <th className="px-6 py-4">Trip Info</th>
                  <th className="px-6 py-4">Destination & Region</th>
                  <th className="px-6 py-4">Duration & Price</th>
                  <th className="px-6 py-4">Status & Featured</th>
                  <th className="px-6 py-4">Created Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredTrips.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                          {t.image ? (
                            <img src={t.image} alt={t.title} className="w-full h-full object-cover" />
                          ) : (
                            <MapIcon className="w-6 h-6 m-3 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{t.title}</div>
                          <div className="text-xs text-gray-500 font-mono mt-0.5">{t.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-800">{t.destination}</div>
                      <div className="text-xs text-gray-500">{t.region ? t.region : t.category}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-800">{formatDuration(t.duration, t.durationUnit)}</div>
                      <div className="text-[#e53a24] font-bold mt-0.5">{t.price}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 mb-1 cursor-pointer" onClick={() => toggleStatus(t)} title="Click to toggle status">
                        {t.status === 'Published' ? (
                          <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold border border-green-200"><CheckCircle size={12}/> Published</span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs font-bold border border-gray-200"><XCircle size={12}/> Draft</span>
                        )}
                      </div>
                      <div className="cursor-pointer" onClick={() => toggleFeatured(t)} title="Click to toggle featured">
                        {t.featured ? (
                          <span className="inline-flex items-center gap-1 text-yellow-600 text-xs font-bold"><Star size={12} fill="currentColor" /> Featured</span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-gray-400 text-xs font-medium"><Star size={12} /> Standard</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500 whitespace-nowrap">
                      {t.createdAt ? new Date(t.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => navigate(t.isTourTrip ? `/dashboard/preview-tour-trip/${t.id}` : `/packages/${t.id}`)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded" title="Preview">
                          <Eye size={18} />
                        </button>
                        <button onClick={() => navigate(`/dashboard/edit-tour-trip/${t.id}`)} className="p-1.5 text-orange-600 hover:bg-orange-50 rounded" title="Edit">
                          <Edit size={18} />
                        </button>
                        <button onClick={() => handleDuplicate(t)} className="p-1.5 text-gray-600 hover:bg-gray-100 rounded" title="Duplicate">
                          <Copy size={18} />
                        </button>
                        <button onClick={() => handleDelete(t)} className="p-1.5 text-red-600 hover:bg-red-50 rounded" title="Delete">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-gray-500">
            <MapIcon size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-700 mb-2">No trips found</h3>
            <p>Try adjusting your filters or add a new trip.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageTourTrips;
