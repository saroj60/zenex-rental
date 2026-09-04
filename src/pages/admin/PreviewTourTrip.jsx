import React, { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { useParams, Link } from 'react-router-dom';
import { Map as MapIcon, ArrowLeft, Clock, MapPin, Tag, CheckCircle, Edit, Compass, List, DollarSign, Calendar, ChevronDown, ChevronUp, CheckCircle2, XCircle, Puzzle, BookOpen, Briefcase, HelpCircle } from 'lucide-react';
import { formatDuration } from '../../utils/duration';

const PreviewTourTrip = () => {
  const { id } = useParams();
  const { tourTrips } = useAppData();
  const [expandedDay, setExpandedDay] = useState(0);
  
  const trip = tourTrips?.find(t => t.id === id);

  if (!trip) {
    return (
      <div className="p-12 text-center text-gray-500">
        <MapIcon size={48} className="mx-auto text-gray-300 mb-4" />
        <h3 className="text-xl font-bold text-gray-700 mb-2">Trip not found</h3>
        <Link to="/dashboard/tour-trips" className="text-[#e53a24] hover:underline">Return to Trips</Link>
      </div>
    );
  }

  const toggleDay = (idx) => setExpandedDay(expandedDay === idx ? -1 : idx);

  return (
    <div className="max-w-6xl mx-auto pb-10">
      <div className="mb-6 flex justify-between items-center">
        <Link to="/dashboard/tour-trips" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
          <ArrowLeft size={20} /> Back to Trips
        </Link>
        <Link to={`/dashboard/edit-tour-trip/${trip.id}`} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-200 transition-colors">
          <Edit size={18} /> Edit Trip
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header Image */}
        <div className="h-48 md:h-64 w-full bg-gray-900 relative">
          {trip.image && <img src={trip.image} alt={trip.title} className="w-full h-full object-cover opacity-60" />}
          <div className="absolute bottom-6 left-8">
            <h1 className="text-3xl font-bold text-white mb-2">{trip.title}</h1>
            <p className="text-gray-200">{trip.shortDescription}</p>
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
            {trip.status === 'Published' && <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1"><CheckCircle size={14} /> Published</span>}
            {trip.featured && <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">Featured</span>}
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 border-b pb-8">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="text-gray-500 flex items-center gap-2 mb-1 text-sm font-bold"><MapPin size={16} /> Destination</div>
              <div className="text-lg font-bold text-gray-900">{trip.destination}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="text-gray-500 flex items-center gap-2 mb-1 text-sm font-bold"><Clock size={16} /> Duration</div>
              <div className="text-lg font-bold text-gray-900">{formatDuration(trip.duration, trip.durationUnit)}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="text-gray-500 flex items-center gap-2 mb-1 text-sm font-bold"><Tag size={16} /> Category</div>
              <div className="text-lg font-bold text-gray-900">{trip.category}</div>
            </div>
            <div className="bg-[#e53a24]/10 p-4 rounded-xl border border-[#e53a24]/20">
              <div className="text-[#e53a24] mb-1 text-sm font-bold flex items-center gap-1"><DollarSign size={16}/> Base Price</div>
              <div className="text-xl font-bold text-[#e53a24]">{trip.pricingInfo?.currency} {trip.pricingInfo?.sellingPrice || trip.price} <span className="text-sm font-normal">/{trip.pricingInfo?.pricePer}</span></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* Detailed Itinerary */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2 border-b pb-2"><List className="text-[#1e3a8a]" /> Detailed Itinerary</h2>
                {trip.itinerary && trip.itinerary.length > 0 ? (
                  <div className="space-y-4">
                    {trip.itinerary.map((day, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                        <div className="p-4 bg-gray-50 flex justify-between items-center cursor-pointer hover:bg-gray-100" onClick={() => toggleDay(idx)}>
                          <div className="flex items-center gap-3">
                            <span className="bg-[#1e3a8a] text-white px-3 py-1 rounded-lg text-sm font-bold">Day {day.dayNumber || idx + 1}</span>
                            <span className="font-bold text-gray-900">{day.title}</span>
                          </div>
                          {expandedDay === idx ? <ChevronUp size={20} className="text-gray-400"/> : <ChevronDown size={20} className="text-gray-400"/>}
                        </div>
                        {expandedDay === idx && (
                          <div className="p-5 border-t border-gray-100">
                            {day.image && <img src={day.image} alt={day.title} className="w-full h-48 object-cover rounded-xl mb-4" />}
                            <p className="text-gray-700 leading-relaxed mb-4">{day.description}</p>
                            {day.note && <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4 rounded-r-lg"><p className="text-sm text-yellow-800"><strong className="font-bold">Note:</strong> {day.note}</p></div>}
                            
                            <div className="flex flex-wrap gap-4 text-sm bg-gray-50 p-3 rounded-lg border border-gray-100">
                              {day.maxAltitude && <div><strong className="text-gray-900">Max Altitude:</strong> {day.maxAltitude} {day.altitudeUnit}</div>}
                              {day.distance && <div><strong className="text-gray-900">Distance:</strong> {day.distance} {day.distanceUnit}</div>}
                              {day.walkingDuration && <div><strong className="text-gray-900">Duration:</strong> {day.walkingDuration}</div>}
                              {day.modeOfTravel && <div><strong className="text-gray-900">Mode of Travel:</strong> {day.modeOfTravel}</div>}
                              {day.accommodation && <div><strong className="text-gray-900">Accom:</strong> {day.accommodation}</div>}
                              {day.meals && <div><strong className="text-gray-900">Meals:</strong> {Array.isArray(day.meals) ? day.meals.join(', ') : day.meals}</div>}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No itinerary added.</p>
                )}
              </section>

              {/* Inclusions & Exclusions */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 border-b pb-2"><CheckCircle2 className="text-green-600" /> Inclusions</h2>
                  {trip.inclusions && trip.inclusions.length > 0 ? (
                    <ul className="space-y-2">
                      {trip.inclusions.map((inc, i) => (
                        <li key={i} className="flex gap-2 items-start"><CheckCircle2 size={18} className="text-green-500 mt-0.5 shrink-0"/><div><span className="font-bold text-gray-800">{inc.title}</span>{inc.description && <p className="text-xs text-gray-500">{inc.description}</p>}</div></li>
                      ))}
                    </ul>
                  ) : <p className="text-sm text-gray-500 italic">No inclusions added.</p>}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 border-b pb-2"><XCircle className="text-red-600" /> Exclusions</h2>
                  {trip.exclusions && trip.exclusions.length > 0 ? (
                    <ul className="space-y-2">
                      {trip.exclusions.map((exc, i) => (
                        <li key={i} className="flex gap-2 items-start"><XCircle size={18} className="text-red-500 mt-0.5 shrink-0"/><div><span className="font-bold text-gray-800">{exc.title}</span>{exc.description && <p className="text-xs text-gray-500">{exc.description}</p>}</div></li>
                      ))}
                    </ul>
                  ) : <p className="text-sm text-gray-500 italic">No exclusions added.</p>}
                </div>
              </section>

              {/* Add-Ons */}
              {trip.addOns && trip.addOns.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2 border-b pb-2"><Puzzle className="text-blue-600" /> Optional Add-Ons</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {trip.addOns.map((addon, idx) => (
                      <div key={idx} className={`p-4 rounded-xl border ${addon.active ? 'border-gray-200 bg-gray-50' : 'border-red-100 bg-red-50/50 opacity-60'}`}>
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-gray-900">{addon.name}</h4>
                          <span className="font-bold text-blue-700">{addon.currency} {addon.price}</span>
                        </div>
                        <span className="text-xs text-gray-500 block mb-2">{addon.pricingType}</span>
                        {addon.description && <p className="text-sm text-gray-600">{addon.description}</p>}
                        {!addon.active && <span className="text-xs text-red-500 font-bold mt-2 block">Inactive</span>}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Essential Info */}
              {trip.essentialInfo && trip.essentialInfo.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2 border-b pb-2"><BookOpen className="text-orange-600" /> Essential Information</h2>
                  <div className="space-y-6">
                    {trip.essentialInfo.map((info, idx) => (
                      <div key={idx}>
                        <h4 className="font-bold text-lg text-gray-800 mb-2">{info.title}</h4>
                        <p className="text-gray-600 text-sm whitespace-pre-wrap">{info.content}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Equipment */}
              {trip.equipment && trip.equipment.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2 border-b pb-2"><Briefcase className="text-indigo-600" /> Packing List Preview</h2>
                  <div className="space-y-4">
                    {trip.equipment.map((cat, catIdx) => (
                      <div key={catIdx} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                        <h4 className="font-bold text-gray-900 mb-3">{cat.category}</h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {cat.items?.map((item, itemIdx) => (
                            <li key={itemIdx} className="text-sm flex gap-2"><span className="text-gray-400">•</span> <span><strong className={item.required ? 'text-gray-800' : 'text-gray-500 font-normal'}>{item.name}</strong> {item.quantity > 1 && `(x${item.quantity})`} {item.description && <span className="text-xs text-gray-500 block">{item.description}</span>}</span></li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* FAQs */}
              {trip.faqs && trip.faqs.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2 border-b pb-2"><HelpCircle className="text-purple-600" /> FAQs Preview</h2>
                  <div className="space-y-4">
                    {trip.faqs.map((faq, idx) => (
                      <div key={idx} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                        <h4 className="font-bold text-gray-900 mb-2">Q: {faq.question}</h4>
                        <p className="text-sm text-gray-600">A: {faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

            </div>

            {/* Sidebar Column */}
            <div className="space-y-8">
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2 flex items-center gap-2"><Compass className="text-[#e53a24]"/> Trip Facts Summary</h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex justify-between"><span className="font-bold text-gray-900">Country:</span> <span>{trip.country || 'N/A'}</span></li>
                  <li className="flex justify-between"><span className="font-bold text-gray-900">Grade:</span> <span>{trip.grade}</span></li>
                  <li className="flex justify-between"><span className="font-bold text-gray-900">Max Alt:</span> <span>{trip.maxAltitude ? `${trip.maxAltitude}${trip.altitudeUnit}` : 'N/A'}</span></li>
                  <li className="flex justify-between"><span className="font-bold text-gray-900">Starts:</span> <span>{trip.startLocation || 'N/A'}</span></li>
                  <li className="flex justify-between"><span className="font-bold text-gray-900">Ends:</span> <span>{trip.endLocation || 'N/A'}</span></li>
                  <li className="flex justify-between"><span className="font-bold text-gray-900">Accom:</span> <span>{trip.accommodation || 'N/A'}</span></li>
                </ul>
              </div>

              {/* Departure Dates Preview */}
              {trip.departures && trip.departures.length > 0 && (
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2 flex items-center gap-2"><Calendar className="text-purple-600"/> Departures</h3>
                  <div className="space-y-2 text-sm">
                    {trip.departures.slice(0, 3).map((dep, idx) => (
                      <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                        <span className="font-bold text-gray-700">{new Date(dep.startDate).toLocaleDateString(undefined, {month:'short', day:'numeric'})}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${dep.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{dep.status}</span>
                      </div>
                    ))}
                    {trip.departures.length > 3 && <div className="text-center text-xs text-blue-500 pt-2 cursor-pointer font-bold">+ {trip.departures.length - 3} more dates</div>}
                  </div>
                </div>
              )}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewTourTrip;
