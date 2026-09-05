import React, { useState, useEffect } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { useNavigate, useParams } from 'react-router-dom';
import { packageExtraData } from '../PackageDetail';
import { Map as MapIcon, Save, Info, ImageIcon, LayoutList, List, Trash2, ArrowUp, ArrowDown, Plus, MapPin, DollarSign, Calendar, Copy, ChevronDown, ChevronRight, CheckCircle2, XCircle, Puzzle, BookOpen, Briefcase, HelpCircle } from 'lucide-react';

const EditTourTrip = () => {
  const { id } = useParams();
  const { tourTrips, updateTourTrip, uploadImage, regions, packages, updatePackage } = useAppData();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '', slug: '', shortDescription: '', description: '',
    category: 'Tours', destination: '', region: '', tripType: 'Private',
    duration: '', durationUnit: 'Days', price: '', status: 'Draft', featured: false, image: '',
    badge: '', displayOrder: '',
    country: '', grade: 'Moderate', maxAltitude: '', altitudeUnit: 'm',
    startLocation: '', endLocation: '', activities: [], accommodation: '',
    meals: [], bestTime: '', minTravelers: '', maxTravelers: '',
    gallery: [], routeMap: '', altitudeChart: '', videoUrl: '', youtubeUrl: '', highlights: [],
    itinerary: [], pricingInfo: { currency: 'USD', originalPrice: '', sellingPrice: '', discountPercentage: '', pricePer: 'Person', notes: '' },
    groupPricing: [], departures: [],
    inclusions: [], exclusions: [], addOns: [], essentialInfo: [], equipment: [], faqs: []
  });

  const [newActivity, setNewActivity] = useState('');
  const [expandedDay, setExpandedDay] = useState(-1);
  const [hasDraft, setHasDraft] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const mealOptions = ['Breakfast', 'Lunch', 'Dinner'];

  // Check if draft exists on mount
  useEffect(() => {
    const saved = localStorage.getItem(`zenex_draft_edit_tour_trip_${id}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.title || parsed.description || parsed.itinerary?.length > 0) {
          setHasDraft(true);
        }
      } catch (e) {
        console.error('Failed to parse draft:', e);
      }
    }
  }, [id]);

  // Autosave to localStorage as form data changes
  useEffect(() => {
    if (formData.title || formData.description) {
      localStorage.setItem(`zenex_draft_edit_tour_trip_${id}`, JSON.stringify(formData));
    }
  }, [formData, id]);

  const restoreDraft = () => {
    const saved = localStorage.getItem(`zenex_draft_edit_tour_trip_${id}`);
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
        setHasDraft(false);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const clearDraft = () => {
    localStorage.removeItem(`zenex_draft_edit_tour_trip_${id}`);
    setHasDraft(false);
  };

  useEffect(() => {
    let trip = null;
    if (tourTrips && tourTrips.length > 0) {
      trip = tourTrips.find(t => t.id === id);
    }
    if (!trip && packages && packages.length > 0) {
      const foundPkg = packages.find(p => p.id === id);
      if (foundPkg) {
        const extra = packageExtraData[foundPkg.id] || {};
        trip = {
          id: foundPkg.id,
          title: foundPkg.title,
          slug: foundPkg.id,
          category: foundPkg.category,
          destination: foundPkg.location,
          price: foundPkg.price ? String(foundPkg.price).replace('US$', '') : '',
          shortDescription: extra.overview?.replace(/<[^>]*>/g, '').slice(0, 150) + '...' || foundPkg.title,
          description: extra.overview || foundPkg.title,
          status: 'Published',
          featured: false,
          country: extra.quickInfo?.find(q => q.label === 'Country')?.value || 'Nepal',
          grade: extra.quickInfo?.find(q => q.label === 'Grade')?.value || 'Moderate',
          maxAltitude: extra.quickInfo?.find(q => q.label === 'Max. Altitude')?.value || '',
          altitudeUnit: 'm',
          startLocation: extra.quickInfo?.find(q => q.label === 'Start/End')?.value || 'Kathmandu',
          endLocation: extra.quickInfo?.find(q => q.label === 'Start/End')?.value || 'Kathmandu',
          activities: [foundPkg.category],
          accommodation: extra.quickInfo?.find(q => q.label === 'Accommodation')?.value || 'Hotel / Teahouse',
          meals: [],
          bestTime: extra.quickInfo?.find(q => q.label === 'Best Season')?.value || '',
          minTravelers: 2,
          maxTravelers: 12,
          gallery: extra.gallery?.map(g => ({ url: g, alt: 'Gallery Image' })) || [],
          routeMap: '',
          altitudeChart: '',
          videoUrl: '',
          youtubeUrl: '',
          highlights: extra.highlights || [],
          itinerary: extra.itinerary?.map((it, idx) => ({
            dayNumber: idx + 1,
            title: it.title || `Day ${idx + 1}`,
            description: it.desc || ''
          })) || [],
          pricingInfo: {
            currency: 'USD',
            originalPrice: '',
            sellingPrice: foundPkg.price ? String(foundPkg.price).replace('US$', '') : '',
            discountPercentage: '',
            pricePer: foundPkg.persons ? foundPkg.persons.replace('for ', '') : 'Person',
            notes: ''
          },
          groupPricing: [],
          departures: [],
          inclusions: extra.inclusions?.map(inc => ({ title: inc })) || [],
          exclusions: extra.exclusions?.map(exc => ({ title: exc })) || [],
          equipment: [],
          faqs: []
        };
      }
    }

    if (trip) {
      setFormData({
        ...trip,
        activities: trip.activities || [], meals: trip.meals || [], gallery: trip.gallery || [], highlights: trip.highlights || [],
        itinerary: trip.itinerary || [], pricingInfo: trip.pricingInfo || { currency: 'USD', originalPrice: '', sellingPrice: '', discountPercentage: '', pricePer: 'Person', notes: '' },
        groupPricing: trip.groupPricing || [], departures: trip.departures || [],
        inclusions: trip.inclusions || [], exclusions: trip.exclusions || [], addOns: trip.addOns || [], essentialInfo: trip.essentialInfo || [], equipment: trip.equipment || [], faqs: trip.faqs || []
      });
    }
  }, [id, tourTrips, packages]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleMealsChange = (meal) => setFormData(prev => ({ ...prev, meals: prev.meals.includes(meal) ? prev.meals.filter(m => m !== meal) : [...prev.meals, meal] }));
  const addActivity = () => { if (newActivity.trim() && !formData.activities.includes(newActivity.trim())) { setFormData(prev => ({ ...prev, activities: [...prev.activities, newActivity.trim()] })); setNewActivity(''); } };
  const removeActivity = (act) => setFormData(prev => ({ ...prev, activities: prev.activities.filter(a => a !== act) }));

  const addArrayItem = (field, initial) => setFormData(prev => ({ ...prev, [field]: [...prev[field], initial] }));
  const updateArrayItem = (field, index, subField, value) => setFormData(prev => { const newArr = [...prev[field]]; newArr[index] = { ...newArr[index], [subField]: value }; return { ...prev, [field]: newArr }; });
  const removeArrayItem = (field, index) => setFormData(prev => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }));
  const moveArrayItem = (field, index, dir) => setFormData(prev => {
    if (index + dir < 0 || index + dir >= prev[field].length) return prev;
    const newArr = [...prev[field]]; const temp = newArr[index]; newArr[index] = newArr[index + dir]; newArr[index + dir] = temp;
    return { ...prev, [field]: newArr };
  });

  const addEquipItem = (catIndex) => setFormData(prev => { const newEq = [...prev.equipment]; newEq[catIndex].items.push({ name: '', description: '', required: true, quantity: 1 }); return { ...prev, equipment: newEq }; });
  const updateEquipItem = (catIndex, itemIndex, field, value) => setFormData(prev => { const newEq = [...prev.equipment]; newEq[catIndex].items[itemIndex][field] = value; return { ...prev, equipment: newEq }; });
  const removeEquipItem = (catIndex, itemIndex) => setFormData(prev => { const newEq = [...prev.equipment]; newEq[catIndex].items = newEq[catIndex].items.filter((_, i) => i !== itemIndex); return { ...prev, equipment: newEq }; });

  const duplicateItineraryDay = (index) => {
    setFormData(prev => {
      const newItin = [...prev.itinerary];
      const dup = JSON.parse(JSON.stringify(newItin[index])); dup.dayNumber = newItin.length + 1; dup.title = `${dup.title} (Copy)`;
      newItin.splice(index + 1, 0, dup);
      return { ...prev, itinerary: newItin };
    });
  };
  const handleItineraryMeal = (dayIdx, meal) => setFormData(prev => {
    const newItin = prev.itinerary.map((day, idx) => {
      if (idx !== dayIdx) return day;
      const currentMeals = day.meals || [];
      const newMeals = currentMeals.includes(meal)
        ? currentMeals.filter(m => m !== meal)
        : [...currentMeals, meal];
      return { ...day, meals: newMeals };
    });
    return { ...prev, itinerary: newItin };
  });

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (isSaving) return;
    setIsSaving(true);
    try {
      const isLegacy = packages.some(p => p.id === id);
      if (isLegacy) {
        await updatePackage(id, { ...formData, updatedAt: new Date().toISOString() });
      } else {
        await updateTourTrip(id, { ...formData, updatedAt: new Date().toISOString() });
      }
      localStorage.removeItem(`zenex_draft_edit_tour_trip_${id}`);
      navigate('/dashboard/tour-trips');
    } catch (err) {
      console.error(err);
      alert("Failed to save changes: " + (err.message || err));
    } finally {
      setIsSaving(false);
    }
  };

  const SectionHeader = ({ title, icon: Icon, count = null }) => (
    <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50 select-none">
      <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3"><Icon size={24} className="text-[#e53a24]"/> {title} {count !== null && <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full ml-2">{count}</span>}</h2>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="mb-8 flex justify-between items-end">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3"><MapIcon className="text-[#e53a24]" size={36} /> Edit Tour & Trek</h1>
        <button type="button" onClick={handleSubmit} disabled={isSaving} className="bg-[#1e3a8a] text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-900 shadow-md disabled:opacity-50">
          <Save size={18} /> {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {hasDraft && (
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
          <div className="flex items-start gap-3">
            <Info className="text-orange-500 shrink-0 mt-0.5" size={20} />
            <div>
              <p className="font-bold text-orange-900 text-sm">Unsaved Changes Found</p>
              <p className="text-xs text-orange-700 mt-0.5">You have unsaved changes from a previous session on this form.</p>
            </div>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button type="button" onClick={restoreDraft} className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors flex-1 sm:flex-initial">Restore Changes</button>
            <button type="button" onClick={clearDraft} className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold px-4 py-2.5 rounded-xl transition-colors flex-1 sm:flex-initial">Clear Changes</button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* SECTION: Core & Facts */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <SectionHeader title="Core Information & Facts" icon={Info} />
          <div className="p-6 border-t border-gray-100 space-y-8 bg-gray-50/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" name="title" value={formData.title} onChange={handleChange} required placeholder="Trip Title" className="border border-gray-200 rounded-xl px-4 py-3 focus:ring-[#e53a24]" />
              <input type="text" name="slug" value={formData.slug} onChange={handleChange} required placeholder="URL Slug" className="border border-gray-200 rounded-xl px-4 py-3 font-mono text-sm focus:ring-[#e53a24]" />
              <textarea name="shortDescription" value={formData.shortDescription} onChange={handleChange} required rows="2" placeholder="Short Description..." className="col-span-2 border border-gray-200 rounded-xl px-4 py-3 resize-none focus:ring-[#e53a24]"></textarea>
              <textarea name="description" value={formData.description} onChange={handleChange} required rows="5" placeholder="Full Description..." className="col-span-2 border border-gray-200 rounded-xl px-4 py-3 resize-none focus:ring-[#e53a24]"></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <select name="category" value={formData.category} onChange={handleChange} required className="border border-gray-200 rounded-xl px-4 py-3">
                <option>Treks</option>
                <option>Tours</option>
                <option>Tours Packages</option>
                <option>Expeditions</option>
              </select>
              <input type="text" name="destination" value={formData.destination} onChange={handleChange} required placeholder="Destination" className="col-span-2 border border-gray-200 rounded-xl px-4 py-3" />
              <select name="tripType" value={formData.tripType} onChange={handleChange} required className="border border-gray-200 rounded-xl px-4 py-3"><option>Private</option><option>Group</option></select>
              <div className="flex gap-2 col-span-2">
                <input type="number" name="duration" value={formData.duration} onChange={handleChange} required placeholder="Duration" className="w-2/3 border border-gray-200 rounded-xl px-4 py-3" />
                <select name="durationUnit" value={formData.durationUnit} onChange={handleChange} className="w-1/3 border border-gray-200 rounded-xl px-2 py-3">
                  <option value="Days">Days</option>
                  <option value="Hours">Hours</option>
                  <option value="Days & Nights">Days & Nights</option>
                </select>
              </div>
              <select name="region" value={formData.region} onChange={handleChange} required className="col-span-2 border border-gray-200 rounded-xl px-4 py-3">
                <option value="" disabled>Select Region / Category</option>
                {regions.map(r => (
                  <option key={r.id} value={r.name}>{r.name}</option>
                ))}
              </select>
              <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Country (e.g. Nepal)" className="col-span-2 border border-gray-200 rounded-xl px-4 py-3" />
              <select name="grade" value={formData.grade} onChange={handleChange} className="col-span-2 border border-gray-200 rounded-xl px-4 py-3"><option>Easy</option><option>Moderate</option><option>Difficult</option><option>Challenging</option><option>Extreme</option></select>
              
              {/* Trip Facts Additions */}
              <div className="flex gap-2 col-span-2">
                <input type="number" name="maxAltitude" value={formData.maxAltitude} onChange={handleChange} placeholder="Max Altitude" className="w-2/3 border border-gray-200 rounded-xl px-4 py-3" />
                <select name="altitudeUnit" value={formData.altitudeUnit} onChange={handleChange} className="w-1/3 border border-gray-200 rounded-xl px-2 py-3"><option>meters</option><option>ft</option></select>
              </div>
              <input type="text" name="startLocation" value={formData.startLocation} onChange={handleChange} placeholder="Starts (e.g. Kathmandu)" className="col-span-2 border border-gray-200 rounded-xl px-4 py-3" />
              <input type="text" name="endLocation" value={formData.endLocation} onChange={handleChange} placeholder="Ends (e.g. Kathmandu)" className="col-span-2 border border-gray-200 rounded-xl px-4 py-3" />
              <input type="text" name="accommodation" value={formData.accommodation} onChange={handleChange} placeholder="Accommodation (e.g. Hotel / Lodges)" className="col-span-2 border border-gray-200 rounded-xl px-4 py-3" />
              <input type="text" name="bestTime" value={formData.bestTime} onChange={handleChange} placeholder="Best Time (e.g. Spring & Autumn)" className="col-span-2 border border-gray-200 rounded-xl px-4 py-3" />
              
              <div className="col-span-4 bg-white p-4 rounded-xl border border-gray-200">
                <label className="block text-sm font-bold text-gray-700 mb-2">Activities (e.g. Trekking / Hiking)</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.activities.map(act => (
                    <span key={act} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">{act} <button type="button" onClick={() => removeActivity(act)}><XCircle size={14}/></button></span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input type="text" value={newActivity} onChange={e => setNewActivity(e.target.value)} placeholder="Add activity..." className="border border-gray-200 rounded-lg px-3 py-2 flex-1" onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addActivity())} />
                  <button type="button" onClick={addActivity} className="bg-gray-100 px-4 py-2 rounded-lg font-bold">Add</button>
                </div>
              </div>

              <div className="col-span-4 bg-white p-4 rounded-xl border border-gray-200">
                <label className="block text-sm font-bold text-gray-700 mb-2">Meals Included</label>
                <div className="flex gap-4">
                  {mealOptions.map(m => (
                    <label key={m} className="flex items-center gap-2 cursor-pointer font-medium"><input type="checkbox" checked={formData.meals.includes(m)} onChange={() => handleMealsChange(m)} className="w-4 h-4 text-[#e53a24] rounded border-gray-300 focus:ring-[#e53a24]"/> {m}</label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: Pricing & Departures */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <SectionHeader title="Pricing & Departures" icon={DollarSign} count={formData.groupPricing.length + formData.departures.length} />
          <div className="p-6 border-t border-gray-100 space-y-8 bg-gray-50/10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div><label className="block text-xs font-bold text-gray-500 mb-1">Currency</label><select value={formData.pricingInfo.currency} onChange={e => setFormData(p => ({...p, pricingInfo: {...p.pricingInfo, currency: e.target.value}}))} className="w-full border border-gray-300 rounded-lg px-3 py-2"><option>USD</option><option>EUR</option><option>NPR</option></select></div>
              <div><label className="block text-xs font-bold text-gray-500 mb-1">Selling Price</label><input type="number" value={formData.pricingInfo.sellingPrice} onChange={e => setFormData(p => ({...p, pricingInfo: {...p.pricingInfo, sellingPrice: e.target.value}}))} className="w-full border border-gray-300 rounded-lg px-3 py-2" /></div>
              <div><label className="block text-xs font-bold text-gray-500 mb-1">Price Per</label><select value={formData.pricingInfo.pricePer} onChange={e => setFormData(p => ({...p, pricingInfo: {...p.pricingInfo, pricePer: e.target.value}}))} className="w-full border border-gray-300 rounded-lg px-3 py-2"><option>Person</option><option>Group</option></select></div>
              <div><label className="block text-xs font-bold text-gray-500 mb-1">String Price (Fallback)</label><input type="text" name="price" value={formData.price} onChange={handleChange} required placeholder="e.g. From $500" className="w-full border border-gray-300 rounded-lg px-3 py-2" /></div>
            </div>
            <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
              <div className="flex justify-between items-center mb-4"><span className="font-bold text-gray-700">Group Pricing Tiers</span><button type="button" onClick={() => addArrayItem('groupPricing', { minTravelers: '', maxTravelers: '', pricePerPerson: '', currency: 'USD' })} className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-1"><Plus size={16}/> Add Tier</button></div>
              <div className="space-y-2">
                {formData.groupPricing.map((tier, idx) => (
                  <div key={idx} className="flex gap-2 items-center"><input type="number" placeholder="Min Pax" value={tier.minTravelers} onChange={e => updateArrayItem('groupPricing', idx, 'minTravelers', e.target.value)} className="w-20 border border-gray-200 rounded px-2 py-1 text-sm" /><span>to</span><input type="number" placeholder="Max Pax" value={tier.maxTravelers} onChange={e => updateArrayItem('groupPricing', idx, 'maxTravelers', e.target.value)} className="w-20 border border-gray-200 rounded px-2 py-1 text-sm" /><span>→</span><select value={tier.currency} onChange={e => updateArrayItem('groupPricing', idx, 'currency', e.target.value)} className="w-20 border border-gray-200 rounded px-2 py-1 text-sm"><option>USD</option><option>EUR</option></select><input type="number" placeholder="Price/Pax" value={tier.pricePerPerson} onChange={e => updateArrayItem('groupPricing', idx, 'pricePerPerson', e.target.value)} className="flex-1 border border-gray-200 rounded px-2 py-1 text-sm" /><button type="button" onClick={() => removeArrayItem('groupPricing', idx)} className="text-red-500"><Trash2 size={16}/></button></div>
                ))}
              </div>
            </div>
            <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
              <div className="flex justify-between items-center mb-4"><span className="font-bold text-gray-700">Departure Dates</span><button type="button" onClick={() => addArrayItem('departures', { startDate: '', endDate: '', maxSeats: '', status: 'Available', guaranteed: false })} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-1"><Plus size={16}/> Add Departure</button></div>
              <div className="space-y-3">
                {formData.departures.map((dep, idx) => (
                  <div key={idx} className="flex flex-wrap gap-3 items-end"><div className="w-32"><label className="text-xs font-bold text-gray-500 block mb-1">Start Date</label><input type="date" value={dep.startDate} onChange={e => updateArrayItem('departures', idx, 'startDate', e.target.value)} className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm" /></div><div className="w-32"><label className="text-xs font-bold text-gray-500 block mb-1">End Date</label><input type="date" value={dep.endDate} onChange={e => updateArrayItem('departures', idx, 'endDate', e.target.value)} className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm" /></div><div className="w-20"><label className="text-xs font-bold text-gray-500 block mb-1">Seats</label><input type="number" placeholder="Max" value={dep.maxSeats} onChange={e => updateArrayItem('departures', idx, 'maxSeats', e.target.value)} className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm" /></div><div className="w-24"><label className="text-xs font-bold text-gray-500 block mb-1">Status</label><select value={dep.status} onChange={e => updateArrayItem('departures', idx, 'status', e.target.value)} className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm"><option>Available</option><option>Limited Seats</option><option>Full</option><option>Cancelled</option></select></div><div className="flex items-center gap-2 pb-1.5"><input type="checkbox" checked={dep.guaranteed} onChange={e => updateArrayItem('departures', idx, 'guaranteed', e.target.checked)} className="rounded text-purple-600"/><span className="text-sm font-bold text-purple-800">Guaranteed</span></div><button type="button" onClick={() => removeArrayItem('departures', idx)} className="p-2 text-red-500 self-end mb-0.5"><Trash2 size={16}/></button></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: Itinerary */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <SectionHeader title="Itinerary Builder" icon={MapPin} count={formData.itinerary.length} />
          <div className="p-6 border-t border-gray-100 bg-gray-50/10">
            <div className="flex justify-end mb-4"><button type="button" onClick={() => { addArrayItem('itinerary', { dayNumber: formData.itinerary.length + 1, title: '', description: '', meals: [] }); setExpandedDay(formData.itinerary.length); }} className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2"><Plus size={16}/> Add Itinerary Day</button></div>
            <div className="space-y-4">
              {formData.itinerary.map((day, idx) => (
                <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                  <div className="p-4 bg-white flex justify-between items-center cursor-pointer hover:bg-gray-50" onClick={() => setExpandedDay(expandedDay === idx ? -1 : idx)}>
                    <div className="flex items-center gap-3"><span className="font-bold text-[#1e3a8a]">Day {day.dayNumber || idx + 1}</span><span className="text-gray-600 font-medium truncate max-w-sm">— {day.title || 'Untitled Day'}</span></div>
                    <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                      <button type="button" onClick={() => moveArrayItem('itinerary', idx, -1)} disabled={idx===0} className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30"><ArrowUp size={16}/></button><button type="button" onClick={() => moveArrayItem('itinerary', idx, 1)} disabled={idx===formData.itinerary.length-1} className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30"><ArrowDown size={16}/></button><button type="button" onClick={() => duplicateItineraryDay(idx)} className="p-1 text-blue-500 hover:bg-blue-50 rounded mx-1"><Copy size={16}/></button><button type="button" onClick={() => removeArrayItem('itinerary', idx)} className="p-1 text-red-500 hover:bg-red-50 rounded"><Trash2 size={16}/></button>
                    </div>
                  </div>
                  {expandedDay === idx && (
                    <div className="p-4 bg-gray-50/50 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input type="text" placeholder="Day Title (e.g. Arrival in Kathmandu)" value={day.title} onChange={e => updateArrayItem('itinerary', idx, 'title', e.target.value)} className="col-span-2 border border-gray-200 rounded-lg px-3 py-2 font-bold focus:ring-[#e53a24]" />
                      <textarea placeholder="Description..." value={day.description} onChange={e => updateArrayItem('itinerary', idx, 'description', e.target.value)} rows="3" className="col-span-2 border border-gray-200 rounded-lg px-3 py-2 resize-none focus:ring-[#e53a24]"></textarea>
                      
                      {/* New fields: Image, Note, Mode of Travel */}
                      <div className="col-span-2 flex gap-2">
                        <input type="text" placeholder="Day Image URL (Optional)" value={day.image || ''} onChange={e => updateArrayItem('itinerary', idx, 'image', e.target.value)} className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                        <label className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg cursor-pointer text-sm font-bold flex items-center justify-center">
                          Upload
                          <input type="file" className="hidden" accept="image/*" onChange={async (e) => {
                            if (e.target.files[0]) {
                              const url = await uploadImage(e.target.files[0]);
                              updateArrayItem('itinerary', idx, 'image', url);
                            }
                          }} />
                        </label>
                      </div>
                      <textarea placeholder="Important Note (Optional)" value={day.note || ''} onChange={e => updateArrayItem('itinerary', idx, 'note', e.target.value)} rows="2" className="col-span-2 border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none"></textarea>
                      
                      <div className="flex gap-2"><input type="number" placeholder="Max Altitude" value={day.maxAltitude || ''} onChange={e => updateArrayItem('itinerary', idx, 'maxAltitude', e.target.value)} className="w-2/3 border border-gray-200 rounded-lg px-3 py-2 text-sm" /><select value={day.altitudeUnit || 'm'} onChange={e => updateArrayItem('itinerary', idx, 'altitudeUnit', e.target.value)} className="w-1/3 border border-gray-200 rounded-lg px-2 py-2 text-sm"><option>m</option><option>ft</option></select></div>
                      <div className="flex gap-2"><input type="number" placeholder="Distance" value={day.distance || ''} onChange={e => updateArrayItem('itinerary', idx, 'distance', e.target.value)} className="w-2/3 border border-gray-200 rounded-lg px-3 py-2 text-sm" /><select value={day.distanceUnit || 'km'} onChange={e => updateArrayItem('itinerary', idx, 'distanceUnit', e.target.value)} className="w-1/3 border border-gray-200 rounded-lg px-2 py-2 text-sm"><option>km</option><option>miles</option></select></div>
                      <input type="text" placeholder="Walking/Driving Duration (e.g. 5-6 hours)" value={day.walkingDuration || ''} onChange={e => updateArrayItem('itinerary', idx, 'walkingDuration', e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                      <input type="text" placeholder="Accommodation" value={day.accommodation || ''} onChange={e => updateArrayItem('itinerary', idx, 'accommodation', e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                      <input type="text" placeholder="Mode of Travel (e.g. Private Vehicle)" value={day.modeOfTravel || ''} onChange={e => updateArrayItem('itinerary', idx, 'modeOfTravel', e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                      
                      <div className="col-span-2 flex gap-4 mt-2 border-t border-gray-200 pt-3">
                        <span className="text-sm font-bold text-gray-700">Meals Included:</span>
                        {mealOptions.map(m => (<label key={m} className="flex items-center gap-1 text-sm cursor-pointer font-medium"><input type="checkbox" checked={(day.meals || []).includes(m)} onChange={() => handleItineraryMeal(idx, m)} className="rounded text-[#e53a24]"/> {m}</label>))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION: Inclusions & Exclusions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <SectionHeader title="Inclusions & Exclusions" icon={CheckCircle2} count={formData.inclusions.length + formData.exclusions.length} />
          <div className="p-6 border-t border-gray-100 bg-gray-50/10 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Inclusions */}
            <div className="bg-white p-4 rounded-xl border border-green-100 shadow-sm">
              <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-green-700 flex items-center gap-2"><CheckCircle2 size={18}/> Includes</h3><button type="button" onClick={() => addArrayItem('inclusions', { title: '', description: '', icon: '' })} className="text-green-600 bg-green-50 px-2 py-1 rounded text-sm font-bold">+ Add</button></div>
              <div className="space-y-3">
                {formData.inclusions.map((inc, idx) => (
                  <div key={idx} className="flex gap-2 items-start group">
                    <div className="flex-1 space-y-2">
                      <input type="text" placeholder="Title (e.g. Airport Transfer)" value={inc.title} onChange={e => updateArrayItem('inclusions', idx, 'title', e.target.value)} className="w-full border border-gray-200 rounded px-3 py-1.5 text-sm font-bold" />
                      <textarea placeholder="Description (Optional)" value={inc.description} onChange={e => updateArrayItem('inclusions', idx, 'description', e.target.value)} rows="2" className="w-full border border-gray-200 rounded px-3 py-1.5 text-sm resize-none"></textarea>
                    </div>
                    <div className="flex flex-col gap-1"><button type="button" onClick={() => moveArrayItem('inclusions', idx, -1)} className="text-gray-400 hover:text-gray-700"><ArrowUp size={14}/></button><button type="button" onClick={() => moveArrayItem('inclusions', idx, 1)} className="text-gray-400 hover:text-gray-700"><ArrowDown size={14}/></button><button type="button" onClick={() => removeArrayItem('inclusions', idx)} className="text-red-400 hover:text-red-600 mt-2"><Trash2 size={16}/></button></div>
                  </div>
                ))}
              </div>
            </div>
            {/* Exclusions */}
            <div className="bg-white p-4 rounded-xl border border-red-100 shadow-sm">
              <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-red-700 flex items-center gap-2"><XCircle size={18}/> Excludes</h3><button type="button" onClick={() => addArrayItem('exclusions', { title: '', description: '', icon: '' })} className="text-red-600 bg-red-50 px-2 py-1 rounded text-sm font-bold">+ Add</button></div>
              <div className="space-y-3">
                {formData.exclusions.map((exc, idx) => (
                  <div key={idx} className="flex gap-2 items-start group">
                    <div className="flex-1 space-y-2">
                      <input type="text" placeholder="Title (e.g. Travel Insurance)" value={exc.title} onChange={e => updateArrayItem('exclusions', idx, 'title', e.target.value)} className="w-full border border-gray-200 rounded px-3 py-1.5 text-sm font-bold" />
                      <textarea placeholder="Description (Optional)" value={exc.description} onChange={e => updateArrayItem('exclusions', idx, 'description', e.target.value)} rows="2" className="w-full border border-gray-200 rounded px-3 py-1.5 text-sm resize-none"></textarea>
                    </div>
                    <div className="flex flex-col gap-1"><button type="button" onClick={() => moveArrayItem('exclusions', idx, -1)} className="text-gray-400 hover:text-gray-700"><ArrowUp size={14}/></button><button type="button" onClick={() => moveArrayItem('exclusions', idx, 1)} className="text-gray-400 hover:text-gray-700"><ArrowDown size={14}/></button><button type="button" onClick={() => removeArrayItem('exclusions', idx)} className="text-red-400 hover:text-red-600 mt-2"><Trash2 size={16}/></button></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: Route Map & Media */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <SectionHeader title="Route Map & Media" icon={ImageIcon} />
          <div className="p-6 border-t border-gray-100 space-y-6 bg-gray-50/10">
            
            {/* Route Map Upload */}
            <div className="bg-white p-5 rounded-xl border border-gray-200 space-y-4 shadow-sm">
              <h3 className="font-bold text-gray-800 flex items-center gap-2"><MapIcon size={18} className="text-[#e53a24]"/> Route Map Image</h3>
              <p className="text-xs text-gray-500">Upload a 2D map image showing the trek routing and camps. This will show on the Route Map tab of the package details.</p>
              <div className="flex flex-col md:flex-row items-center gap-4">
                <input type="text" name="routeMap" value={formData.routeMap || ''} onChange={handleChange} placeholder="Route Map Image URL" className="flex-1 w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:ring-[#e53a24]" />
                <label className="w-full md:w-auto bg-[#1e3a8a] text-white px-5 py-2.5 rounded-xl cursor-pointer text-sm font-bold flex items-center justify-center hover:bg-blue-900 transition-colors shrink-0">
                  Upload Route Map
                  <input type="file" className="hidden" accept="image/*" onChange={async (e) => {
                    if (e.target.files[0]) {
                      const url = await uploadImage(e.target.files[0]);
                      setFormData(p => ({ ...p, routeMap: url }));
                    }
                  }} />
                </label>
              </div>
              {formData.routeMap && (
                <div className="border border-gray-100 rounded-lg p-2 bg-gray-50 max-w-md">
                  <img src={formData.routeMap} alt="Route Map Preview" className="h-32 w-auto object-contain rounded-md" />
                </div>
              )}
            </div>

            {/* Main Featured Image Upload */}
            <div className="bg-white p-5 rounded-xl border border-gray-200 space-y-4 shadow-sm">
              <h3 className="font-bold text-gray-800 flex items-center gap-2"><ImageIcon size={18} className="text-[#e53a24]"/> Main Featured Banner Image</h3>
              <p className="text-xs text-gray-500">The main banner cover image for the package details hero area and listings.</p>
              <div className="flex flex-col md:flex-row items-center gap-4">
                <input type="text" name="image" value={formData.image || ''} onChange={handleChange} required placeholder="Main Featured Image URL" className="flex-1 w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:ring-[#e53a24]" />
                <label className="w-full md:w-auto bg-[#e53a24] text-white px-5 py-2.5 rounded-xl cursor-pointer text-sm font-bold flex items-center justify-center hover:bg-red-700 transition-colors shrink-0">
                  Upload Banner
                  <input type="file" className="hidden" accept="image/*" onChange={async (e) => {
                    if (e.target.files[0]) {
                      const url = await uploadImage(e.target.files[0]);
                      setFormData(p => ({ ...p, image: url }));
                    }
                  }} />
                </label>
              </div>
              {formData.image && (
                <div className="border border-gray-100 rounded-lg p-2 bg-gray-50 max-w-md">
                  <img src={formData.image} alt="Featured Banner Preview" className="h-32 w-auto object-cover rounded-md" />
                </div>
              )}
            </div>

            {/* Gallery Image 2 Upload */}
            <div className="bg-white p-5 rounded-xl border border-gray-200 space-y-4 shadow-sm">
              <h3 className="font-bold text-gray-800 flex items-center gap-2"><ImageIcon size={18} className="text-[#e53a24]"/> Hero Gallery Image 2</h3>
              <p className="text-xs text-gray-500">The second image shown in the hero grid (25% width on desktop).</p>
              <div className="flex flex-col md:flex-row items-center gap-4">
                <input 
                  type="text" 
                  value={formData.gallery?.[0] || ''} 
                  onChange={(e) => {
                    const newGallery = [...(formData.gallery || [])];
                    newGallery[0] = e.target.value;
                    setFormData(p => ({ ...p, gallery: newGallery }));
                  }} 
                  placeholder="Hero Gallery Image 2 URL" 
                  className="flex-1 w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:ring-[#e53a24]" 
                />
                <label className="w-full md:w-auto bg-[#e53a24] text-white px-5 py-2.5 rounded-xl cursor-pointer text-sm font-bold flex items-center justify-center hover:bg-red-700 transition-colors shrink-0">
                  Upload Image 2
                  <input type="file" className="hidden" accept="image/*" onChange={async (e) => {
                    if (e.target.files[0]) {
                      const url = await uploadImage(e.target.files[0]);
                      const newGallery = [...(formData.gallery || [])];
                      newGallery[0] = url;
                      setFormData(p => ({ ...p, gallery: newGallery }));
                    }
                  }} />
                </label>
              </div>
              {formData.gallery?.[0] && (
                <div className="border border-gray-100 rounded-lg p-2 bg-gray-50 max-w-md">
                  <img src={formData.gallery[0]} alt="Gallery Image 2 Preview" className="h-32 w-auto object-cover rounded-md" />
                </div>
              )}
            </div>

            {/* Gallery Image 3 Upload */}
            <div className="bg-white p-5 rounded-xl border border-gray-200 space-y-4 shadow-sm">
              <h3 className="font-bold text-gray-800 flex items-center gap-2"><ImageIcon size={18} className="text-[#e53a24]"/> Hero Gallery Image 3</h3>
              <p className="text-xs text-gray-500">The third image shown in the hero grid (25% width on desktop).</p>
              <div className="flex flex-col md:flex-row items-center gap-4">
                <input 
                  type="text" 
                  value={formData.gallery?.[1] || ''} 
                  onChange={(e) => {
                    const newGallery = [...(formData.gallery || [])];
                    newGallery[1] = e.target.value;
                    setFormData(p => ({ ...p, gallery: newGallery }));
                  }} 
                  placeholder="Hero Gallery Image 3 URL" 
                  className="flex-1 w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:ring-[#e53a24]" 
                />
                <label className="w-full md:w-auto bg-[#e53a24] text-white px-5 py-2.5 rounded-xl cursor-pointer text-sm font-bold flex items-center justify-center hover:bg-red-700 transition-colors shrink-0">
                  Upload Image 3
                  <input type="file" className="hidden" accept="image/*" onChange={async (e) => {
                    if (e.target.files[0]) {
                      const url = await uploadImage(e.target.files[0]);
                      const newGallery = [...(formData.gallery || [])];
                      newGallery[1] = url;
                      setFormData(p => ({ ...p, gallery: newGallery }));
                    }
                  }} />
                </label>
              </div>
              {formData.gallery?.[1] && (
                <div className="border border-gray-100 rounded-lg p-2 bg-gray-50 max-w-md">
                  <img src={formData.gallery[1]} alt="Gallery Image 3 Preview" className="h-32 w-auto object-cover rounded-md" />
                </div>
              )}
            </div>

          </div>
        </div>

        {/* SECTION: Add-Ons & Essential Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <SectionHeader title="Add-Ons & Essential Info" icon={Puzzle} count={formData.addOns.length + formData.essentialInfo.length} />
          <div className="p-6 border-t border-gray-100 bg-gray-50/10 space-y-8">
            {/* Add-Ons */}
            <div className="border border-gray-200 bg-white rounded-xl p-5 shadow-sm">
              <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-gray-800 flex items-center gap-2">Optional Add-Ons</h3><button type="button" onClick={() => addArrayItem('addOns', { name: '', description: '', price: '', currency: 'USD', pricingType: 'Per Person', active: true })} className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-sm font-bold">+ Add Service</button></div>
              <div className="space-y-3">
                {formData.addOns.map((addon, idx) => (
                  <div key={idx} className="flex flex-wrap gap-2 items-start border-b border-gray-100 pb-3">
                    <input type="text" placeholder="Name (e.g. 5-Star Hotel Upgrade)" value={addon.name} onChange={e => updateArrayItem('addOns', idx, 'name', e.target.value)} className="w-full md:w-1/3 border border-gray-200 rounded px-3 py-1.5 text-sm font-bold" />
                    <input type="number" placeholder="Price" value={addon.price} onChange={e => updateArrayItem('addOns', idx, 'price', e.target.value)} className="w-24 border border-gray-200 rounded px-3 py-1.5 text-sm" />
                    <select value={addon.pricingType} onChange={e => updateArrayItem('addOns', idx, 'pricingType', e.target.value)} className="w-32 border border-gray-200 rounded px-2 py-1.5 text-sm"><option>Per Person</option><option>Per Group</option><option>Per Night</option><option>Fixed</option></select>
                    <label className="flex items-center gap-1 text-sm mt-1.5 ml-2"><input type="checkbox" checked={addon.active} onChange={e => updateArrayItem('addOns', idx, 'active', e.target.checked)}/> Active</label>
                    <button type="button" onClick={() => removeArrayItem('addOns', idx)} className="text-red-500 p-1.5 ml-auto"><Trash2 size={16}/></button>
                    <input type="text" placeholder="Short description..." value={addon.description} onChange={e => updateArrayItem('addOns', idx, 'description', e.target.value)} className="w-full border border-gray-200 rounded px-3 py-1.5 text-sm mt-1" />
                  </div>
                ))}
              </div>
            </div>
            {/* Essential Info */}
            <div className="border border-gray-200 bg-white rounded-xl p-5 shadow-sm">
              <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-gray-800 flex items-center gap-2"><BookOpen size={18}/> Essential Information Sections</h3><button type="button" onClick={() => addArrayItem('essentialInfo', { title: '', content: '', published: true })} className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-sm font-bold">+ Add Section</button></div>
              <div className="space-y-4">
                {formData.essentialInfo.map((info, idx) => (
                  <div key={idx} className="border border-gray-100 rounded-lg p-3 bg-gray-50/50 flex gap-3">
                    <div className="flex-1 space-y-2">
                      <input type="text" placeholder="Section Title (e.g. Permits Required)" value={info.title} onChange={e => updateArrayItem('essentialInfo', idx, 'title', e.target.value)} className="w-full border border-gray-200 rounded px-3 py-2 font-bold" />
                      <textarea placeholder="Content..." value={info.content} onChange={e => updateArrayItem('essentialInfo', idx, 'content', e.target.value)} rows="4" className="w-full border border-gray-200 rounded px-3 py-2 resize-none"></textarea>
                    </div>
                    <div className="flex flex-col gap-2 pt-1"><button type="button" onClick={() => moveArrayItem('essentialInfo', idx, -1)} className="p-1 bg-white border rounded text-gray-500"><ArrowUp size={14}/></button><button type="button" onClick={() => moveArrayItem('essentialInfo', idx, 1)} className="p-1 bg-white border rounded text-gray-500"><ArrowDown size={14}/></button><button type="button" onClick={() => removeArrayItem('essentialInfo', idx)} className="p-1 bg-red-50 text-red-500 border border-red-100 rounded mt-auto"><Trash2 size={16}/></button></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: Equipment & FAQs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <SectionHeader title="Equipment List & FAQs" icon={Briefcase} count={formData.equipment.length + formData.faqs.length} />
          <div className="p-6 border-t border-gray-100 bg-gray-50/10 space-y-8">
            {/* Equipment */}
            <div className="border border-gray-200 bg-white rounded-xl p-5 shadow-sm">
              <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-gray-800 flex items-center gap-2"><Briefcase size={18}/> Packing List Categories</h3><button type="button" onClick={() => addArrayItem('equipment', { category: '', items: [] })} className="bg-orange-50 text-orange-600 px-3 py-1.5 rounded-lg text-sm font-bold">+ Add Category</button></div>
              <div className="space-y-4">
                {formData.equipment.map((cat, catIdx) => (
                  <div key={catIdx} className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className="bg-gray-50 p-3 flex gap-2 border-b border-gray-200 items-center">
                      <input type="text" placeholder="Category Name (e.g. Clothing)" value={cat.category} onChange={e => updateArrayItem('equipment', catIdx, 'category', e.target.value)} className="font-bold border border-gray-300 rounded px-3 py-1 flex-1" />
                      <button type="button" onClick={() => addEquipItem(catIdx)} className="bg-white border border-gray-300 px-2 py-1 rounded text-xs font-bold shadow-sm">+ Add Item</button>
                      <button type="button" onClick={() => removeArrayItem('equipment', catIdx)} className="text-red-500 p-1 mx-1"><Trash2 size={16}/></button>
                    </div>
                    <div className="p-3 bg-white space-y-2">
                      {cat.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="flex flex-wrap gap-2 items-center">
                          <input type="text" placeholder="Item name" value={item.name} onChange={e => updateEquipItem(catIdx, itemIdx, 'name', e.target.value)} className="w-1/3 border border-gray-200 rounded px-2 py-1 text-sm font-medium" />
                          <input type="number" placeholder="Qty" value={item.quantity} onChange={e => updateEquipItem(catIdx, itemIdx, 'quantity', e.target.value)} className="w-16 border border-gray-200 rounded px-2 py-1 text-sm text-center" />
                          <select value={item.required} onChange={e => updateEquipItem(catIdx, itemIdx, 'required', e.target.value === 'true')} className="border border-gray-200 rounded px-2 py-1 text-sm text-gray-600"><option value={true}>Required</option><option value={false}>Optional</option></select>
                          <input type="text" placeholder="Notes (optional)" value={item.description} onChange={e => updateEquipItem(catIdx, itemIdx, 'description', e.target.value)} className="flex-1 border border-gray-200 rounded px-2 py-1 text-sm" />
                          <button type="button" onClick={() => removeEquipItem(catIdx, itemIdx)} className="text-gray-400 hover:text-red-500 p-1"><XCircle size={16}/></button>
                        </div>
                      ))}
                      {cat.items.length === 0 && <p className="text-xs text-gray-400 italic">No items in this category.</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* FAQs */}
            <div className="border border-gray-200 bg-white rounded-xl p-5 shadow-sm">
              <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-gray-800 flex items-center gap-2"><HelpCircle size={18}/> Frequently Asked Questions</h3><button type="button" onClick={() => addArrayItem('faqs', { question: '', answer: '', published: true })} className="bg-purple-50 text-purple-600 px-3 py-1.5 rounded-lg text-sm font-bold">+ Add FAQ</button></div>
              <div className="space-y-3">
                {formData.faqs.map((faq, idx) => (
                  <div key={idx} className="flex gap-3 items-start border border-gray-100 p-3 rounded-lg bg-gray-50/50">
                    <div className="flex-1 space-y-2">
                      <input type="text" placeholder="Question" value={faq.question} onChange={e => updateArrayItem('faqs', idx, 'question', e.target.value)} className="w-full border border-gray-200 rounded px-3 py-2 font-bold text-sm" />
                      <textarea placeholder="Answer..." value={faq.answer} onChange={e => updateArrayItem('faqs', idx, 'answer', e.target.value)} rows="2" className="w-full border border-gray-200 rounded px-3 py-2 text-sm resize-none"></textarea>
                    </div>
                    <div className="flex flex-col gap-1 pt-1"><button type="button" onClick={() => moveArrayItem('faqs', idx, -1)} className="p-1 text-gray-400 hover:text-gray-700"><ArrowUp size={14}/></button><button type="button" onClick={() => moveArrayItem('faqs', idx, 1)} className="p-1 text-gray-400 hover:text-gray-700"><ArrowDown size={14}/></button><button type="button" onClick={() => removeArrayItem('faqs', idx)} className="p-1 text-red-400 hover:text-red-600 mt-2"><Trash2 size={16}/></button></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Publish */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-wrap gap-4 items-center justify-between sticky bottom-4 z-50">
          <div className="flex flex-wrap items-center gap-6">
            <select name="status" value={formData.status} onChange={handleChange} className="border border-gray-200 rounded-xl px-4 py-3 font-bold bg-gray-50"><option value="Draft">Draft (Hidden)</option><option value="Published">Published (Live)</option></select>
            <label className="flex items-center gap-2 cursor-pointer select-none"><input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} className="w-6 h-6 text-[#e53a24] rounded border-gray-300"/> <span className="font-bold text-lg">Featured</span></label>
            <input type="text" name="badge" placeholder="Badge (e.g. Bestseller)" value={formData.badge || ''} onChange={handleChange} className="border border-gray-200 rounded-xl px-4 py-3 text-sm max-w-[200px] font-semibold" />
            <input type="number" name="displayOrder" placeholder="Display Order (e.g. 1)" value={formData.displayOrder || ''} onChange={handleChange} className="border border-gray-200 rounded-xl px-4 py-3 text-sm max-w-[150px] font-semibold" />
          </div>
          <button type="submit" disabled={isSaving} className="bg-[#e53a24] text-white px-10 py-4 rounded-xl font-bold text-lg flex items-center gap-2 hover:bg-red-700 shadow-xl hover:-translate-y-1 transition-all disabled:opacity-50">
            <Save size={24} /> {isSaving ? 'Saving Changes...' : 'Save Changes'}
          </button>
        </div>

      </form>
    </div>
  );
};

export default EditTourTrip;
