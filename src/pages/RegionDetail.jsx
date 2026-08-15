import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppData } from '../context/AppDataContext';
import { MapPin, Clock, Star, ArrowLeft } from 'lucide-react';

const RegionDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { regions, tourTrips } = useAppData();

  const region = regions.find(r => r.slug === slug);
  const regionTrips = tourTrips.filter(t => t.region === region?.name);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!region) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Region not found</h2>
        <button onClick={() => navigate('/')} className="mt-4 text-blue-600 hover:underline">Return Home</button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="relative h-[400px] sm:h-[500px]">
        {region.image ? (
          <img src={region.image} alt={region.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-blue-900"></div>
        )}
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-wider mb-4 drop-shadow-lg">{region.name}</h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl drop-shadow-md">{region.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-[#e53a24] transition-colors mb-8 font-medium">
          <ArrowLeft size={20} /> Back
        </button>

        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Packages in {region.name}</h2>
            <p className="text-gray-500 mt-2">Showing {regionTrips.length} available packages</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regionTrips.map(trip => (
            <Link to={`/tour/${trip.id}`} key={trip.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 flex flex-col h-full transform hover:-translate-y-1">
              <div className="h-56 overflow-hidden relative">
                <img 
                  src={trip.mainImage || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa'} 
                  alt={trip.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm">
                  {trip.grade}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-xs font-bold text-[#e53a24] uppercase tracking-wider mb-2">
                  <MapPin size={14} /> {trip.region}
                </div>
                <h3 className="text-xl font-bold text-gray-900 leading-tight mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">{trip.title}</h3>
                
                <div className="flex items-center gap-4 text-gray-500 text-sm mb-6 pb-6 border-b border-gray-100 mt-auto">
                  <div className="flex items-center gap-1.5 font-medium"><Clock size={16} className="text-blue-500"/> {trip.duration} {trip.durationUnit}</div>
                  {trip.reviews?.rating && (
                    <div className="flex items-center gap-1.5 font-medium"><Star size={16} className="text-yellow-500 fill-current"/> {trip.reviews.rating}</div>
                  )}
                </div>

                <div className="flex items-end justify-between">
                  <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">Starting From</div>
                  <div className="text-right">
                    {trip.pricing?.discountPercentage > 0 && (
                      <span className="text-sm text-gray-400 line-through mr-2">${trip.pricing.originalPrice}</span>
                    )}
                    <span className="text-2xl font-bold text-gray-900">${trip.pricing?.sellingPrice || trip.pricing?.originalPrice || '0'}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {regionTrips.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No packages found</h3>
            <p className="text-gray-500">We are currently updating our packages for this region. Please check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegionDetail;
