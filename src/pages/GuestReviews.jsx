import React, { useState, useEffect } from 'react';
import { Star, MapPin, Calendar, CheckCircle2, ChevronRight, Sparkles, Plus, X, Send, ThumbsUp, Filter } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { useAppData } from '../context/AppDataContext';

const premiumReviews = [
  {
    id: 'p1',
    rating: 5,
    title: "Stunning family Chitwan Jungle Safari",
    text: "We booked the Chitwan Jungle Safari Tour for our family of 8, and it was unforgettable. Zenex arranged the perfect minibus, a stunning eco-resort, and all the safari activities. Having a dedicated tour operator made everything comfortable.",
    name: "Elena Rodriguez",
    country: "Spain",
    date: "February 2026",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150",
    destination: "Chitwan National Park",
    tour: "Chitwan Jungle Safari Tour",
    category: "Tour Packages",
    platform: "Tripadvisor"
  },
  {
    id: 'p2',
    rating: 5,
    title: "An unforgettable journey through Nepal.",
    text: "From the moment we arrived, everything was perfectly organized. Our guide was knowledgeable, friendly, and made the entire journey feel effortless. Nepal exceeded all our expectations.",
    name: "Fedor Treney",
    country: "Russia",
    date: "August 2026",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
    destination: "Annapurna Circuit",
    tour: "Annapurna Sanctuary Trek",
    category: "Trekking",
    platform: "Google Reviews"
  },
  {
    id: 'p3',
    rating: 5,
    title: "Incredible Mustang off-road experience!",
    text: "Our Mustang jeep tour with Zenex Travel was incredible. The 4x4 they provided was immaculate for the rough terrain, and our guide was deeply knowledgeable. The entire tour package gave us total peace of mind.",
    name: "Sarah Jenkins",
    country: "USA",
    date: "March 2026",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    destination: "Mustang Region",
    tour: "Mustang Off-Road Expedition",
    category: "Vehicle Rental",
    platform: "Tripadvisor"
  },
  {
    id: 'p4',
    rating: 5,
    title: "Seamless Annapurna Base Camp Trek",
    text: "Booking our Annapurna trek was seamless. The team handled everything from the airport pickup to the permits and providing a highly experienced guide. Our entire trip was flawlessly organized. Highly recommend Zenex for any Nepal tour!",
    name: "David Chen",
    country: "Taiwan",
    date: "April 2026",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    destination: "Annapurna Base Camp",
    tour: "Complete ABC Trek Package",
    category: "Trekking",
    platform: "Google Reviews"
  },
  {
    id: 'p5',
    rating: 5,
    title: "Everest Flight & Cultural Valley Tour",
    text: "An absolute dream come true. The Everest flight was breathtaking, and the guided historical tours around Kathmandu, Patan, and Bhaktapur durbar squares were rich in details. Exceptional hospitality from the local drivers.",
    name: "John Miller",
    country: "UK",
    date: "October 2025",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
    destination: "Everest Region",
    tour: "Everest Heli Tour & Sightseeing",
    category: "Tour Packages",
    platform: "Tripadvisor"
  },
  {
    id: 'p6',
    rating: 5,
    title: "Beautiful Pokhara Lakes & Sarangkot Sunrise",
    text: "Seeing the sunrise over the Himalayas from Sarangkot and boating on Fewa Lake was ethereal. The vehicle rentals were top-tier, exceptionally clean, and the booking coordinators responded to all our queries within minutes.",
    name: "Yuki Tanaka",
    country: "Japan",
    date: "May 2026",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
    destination: "Pokhara Valley",
    tour: "Pokhara Lakes & Sarangkot Sunrise Tour",
    category: "Tour Packages",
    platform: "Google Reviews"
  }
];

const GuestReviews = () => {
  const { testimonials = [], addTestimonial } = useAppData() || {};
  const [combinedReviews, setCombinedReviews] = useState(premiumReviews);
  const [visibleCount, setVisibleCount] = useState(6);
  const [activeCategory, setActiveCategory] = useState('All');

  // Review Form Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    name: '',
    country: '',
    email: '',
    tour: '',
    title: '',
    text: ''
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('modal') === 'write' || searchParams.get('write') === 'true') {
      setIsModalOpen(true);
    }
  }, [location]);

  useEffect(() => {
    const dbReviews = (testimonials || []).map((t, idx) => {
      if (premiumReviews.some(p => p.name.toLowerCase() === t.name.toLowerCase())) {
        return null;
      }
      return {
        id: t.id || `db-${idx}`,
        rating: t.rating || 5,
        title: t.title || "An incredible adventure in Nepal!",
        text: t.text,
        name: t.name,
        country: t.country || "Verified Guest",
        date: t.date || "2026",
        avatar: t.img || `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=0F766E&color=fff`,
        destination: t.trip || "Nepal",
        tour: t.vehicle || "Zenex Guided Tour",
        category: t.category || "Tour Packages",
        platform: t.platform || "Direct Booking"
      };
    }).filter(Boolean);

    setCombinedReviews([...premiumReviews, ...dbReviews]);
  }, [testimonials]);

  const handleRatingSelect = (rating) => {
    setNewReview(prev => ({ ...prev, rating }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text || !newReview.title) {
      alert("Please fill in your name, review title, and review message.");
      return;
    }

    const reviewToAdd = {
      id: `rev-${Date.now()}`,
      rating: newReview.rating,
      title: newReview.title,
      text: newReview.text,
      name: newReview.name,
      country: newReview.country || "Verified Traveler",
      date: "Just Now",
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(newReview.name)}&background=25D366&color=fff`,
      destination: newReview.tour || "Nepal",
      tour: newReview.tour || "Zenex Experience",
      category: "Tour Packages",
      platform: "Verified Customer"
    };

    setCombinedReviews(prev => [reviewToAdd, ...prev]);

    if (typeof addTestimonial === 'function') {
      try {
        addTestimonial({
          name: newReview.name,
          text: newReview.text,
          country: newReview.country,
          trip: newReview.tour,
          rating: newReview.rating
        });
      } catch (err) {
        console.error(err);
      }
    }

    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setIsModalOpen(false);
      setNewReview({ rating: 5, name: '', country: '', email: '', tour: '', title: '', text: '' });
    }, 2000);
  };

  const filteredReviews = combinedReviews.filter(r => {
    if (activeCategory === 'All') return true;
    if (activeCategory === '5 Stars') return r.rating === 5;
    return r.category === activeCategory;
  });

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 6, filteredReviews.length));
  };

  return (
    <div className="bg-[#EBF3FA] min-h-screen pt-28 md:pt-32 pb-24 font-sans">
      <SEO 
        title="Verified Guest Reviews & Stories | Zenex Travels"
        description="Read real traveler reviews and write your own review for Zenex Travels and Tours Nepal."
        canonicalUrl="https://zenextravel.com/guest-reviews"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Write Review Action */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 text-center md:text-left">
          <div>
            <span className="text-xs font-black tracking-[0.2em] text-[#0F766E] uppercase block mb-2">
              AUTHENTIC TRAVEL DIARIES
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-[#1e3a8a] tracking-tight font-headline" style={{ fontFamily: "'Playfair Display', serif" }}>
              Guest Reviews & Testimonials
            </h1>
            <p className="text-gray-500 max-w-xl font-medium text-sm md:text-base mt-2">
              Real stories and ratings from travelers who explored Nepal with Zenex Travels.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="shrink-0 bg-[#e53a24] hover:bg-red-600 text-white font-extrabold text-sm px-6 py-4 rounded-2xl shadow-lg hover:shadow-red-500/20 transition-all flex items-center gap-2"
          >
            <Plus size={18} /> Write a Review
          </button>
        </div>

        {/* Rating Summary Banner */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="bg-[#1e3a8a]/5 rounded-2xl p-6 flex flex-col items-center justify-center shrink-0">
              <span className="text-4xl font-black text-[#1e3a8a]">4.9</span>
              <span className="text-xs text-gray-500 font-bold mt-1">out of 5</span>
            </div>
            
            <div>
              <div className="flex justify-center sm:justify-start gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="fill-[#E59A2F] text-[#E59A2F]" />
                ))}
              </div>
              <h3 className="text-lg font-extrabold text-[#1e3a8a]">99% Satisfaction Rate</h3>
              <p className="text-xs text-gray-400 font-semibold mt-1">Verified aggregations from TripAdvisor & Google reviews.</p>
            </div>
          </div>

          <div className="flex items-center gap-8 border-t md:border-t-0 md:border-l border-slate-150 pt-6 md:pt-0 md:pl-8 w-full md:w-auto justify-center">
            <div className="flex flex-col items-center gap-1">
              <span className="text-base font-black text-[#1e3a8a]">Tripadvisor</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">5.0 Star Rating</span>
            </div>
            <div className="h-8 w-px bg-slate-200"></div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-base font-black text-[#1e3a8a]">Google Reviews</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">4.9 Star Rating</span>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex overflow-x-auto gap-2.5 pb-4 mb-8 no-scrollbar">
          {['All', '5 Stars', 'Trekking', 'Tour Packages', 'Vehicle Rental'].map(cat => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setVisibleCount(6); }}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all border ${
                activeCategory === cat
                  ? 'bg-[#1e3a8a] text-white border-[#1e3a8a] shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredReviews.slice(0, visibleCount).map((review) => (
            <div 
              key={review.id}
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(7,22,36,0.02)] flex flex-col justify-between hover:shadow-md transition-shadow duration-300 relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={14} className="fill-[#E59A2F] text-[#E59A2F]" />
                    ))}
                  </div>
                  <span className="text-[10px] font-black text-[#0F766E] uppercase tracking-wider">
                    {review.platform}
                  </span>
                </div>

                <h4 className="text-[16px] font-bold text-[#1e3a8a] mb-3 leading-snug">
                  “{review.title}”
                </h4>
                <p className="text-gray-500 text-xs font-medium leading-relaxed mb-6">
                  "{review.text}"
                </p>
              </div>

              <div className="border-t border-slate-50 pt-4 mt-auto">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full overflow-hidden border border-slate-100 shadow-sm shrink-0 bg-slate-50">
                    <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-[#1e3a8a] text-xs flex items-center gap-1">
                      {review.name}
                      <span className="text-[#0F766E]" title="Verified Guest">
                        <CheckCircle2 size={12} />
                      </span>
                    </h5>
                    <p className="text-[10px] text-gray-400 font-semibold">
                      {review.country} &bull; {review.date}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <div className="bg-slate-50 rounded-xl px-2.5 py-1 flex items-center gap-1 border border-slate-100 max-w-full">
                    <MapPin size={10} className="text-[#0F766E]" />
                    <span className="text-[10px] text-slate-500 font-bold truncate">{review.destination}</span>
                  </div>
                  <div className="bg-slate-50 rounded-xl px-2.5 py-1 flex items-center gap-1 border border-slate-100 max-w-full">
                    <Sparkles size={10} className="text-[#E59A2F]" />
                    <span className="text-[10px] text-slate-500 font-bold truncate">{review.tour}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {visibleCount < filteredReviews.length && (
          <div className="text-center">
            <button 
              onClick={loadMore}
              className="inline-flex items-center justify-center gap-2 bg-[#1e3a8a] hover:bg-[#0a2366] text-white font-extrabold text-sm px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
            >
              Load More Reviews <ChevronRight size={16} />
            </button>
          </div>
        )}

      </div>

      {/* Write a Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative border border-slate-100 my-8">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 bg-slate-100 p-2 rounded-full transition-colors"
            >
              <X size={18} />
            </button>

            {submitSuccess ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-2xl font-extrabold text-slate-800">Thank You!</h3>
                <p className="text-sm text-slate-500 font-medium max-w-xs mx-auto">
                  Your review has been submitted successfully and added to our guest diary.
                </p>
              </div>
            ) : (
              <div>
                <h3 className="text-2xl font-extrabold text-slate-800 mb-1 font-headline">Write a Review</h3>
                <p className="text-xs text-slate-500 font-medium mb-6">Share your travel experience with future visitors</p>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {/* Star Rating Picker */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Overall Rating *</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => handleRatingSelect(star)}
                          className="focus:outline-none transition-transform hover:scale-110"
                        >
                          <Star 
                            size={28} 
                            className={star <= newReview.rating ? "fill-[#E59A2F] text-[#E59A2F]" : "text-slate-300"} 
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. Sarah Jenkins"
                        value={newReview.name}
                        onChange={e => setNewReview({ ...newReview, name: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#1e3a8a] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Your Country</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Australia"
                        value={newReview.country}
                        onChange={e => setNewReview({ ...newReview, country: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#1e3a8a] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Trek / Package / Vehicle Booked</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Annapurna Base Camp Trek"
                      value={newReview.tour}
                      onChange={e => setNewReview({ ...newReview, tour: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#1e3a8a] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Review Headline *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Incredible journey through Nepal!"
                      value={newReview.title}
                      onChange={e => setNewReview({ ...newReview, title: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#1e3a8a] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Feedback *</label>
                    <textarea 
                      rows={4} 
                      required
                      placeholder="Tell us about your experience with Zenex Travel..."
                      value={newReview.text}
                      onChange={e => setNewReview({ ...newReview, text: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#1e3a8a] outline-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#e53a24] hover:bg-red-600 text-white font-extrabold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm uppercase tracking-wider mt-4"
                  >
                    <Send size={16} /> Submit Review
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestReviews;
