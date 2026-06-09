import React, { useState } from 'react';
import { MapPin, Navigation, Car, DollarSign, Clock, Plus, Trash2, Share2, ThumbsUp, Link as LinkIcon, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';

const TripPlanner = () => {
  const { formatPrice } = useCurrency();
  const [destinations, setDestinations] = useState(['Kathmandu', 'Pokhara']);
  const [showResult, setShowResult] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [votes, setVotes] = useState({ fortuner: 3, scorpio: 1 });
  const [hasVoted, setHasVoted] = useState(false);

  const addDestination = () => setDestinations([...destinations, '']);
  const updateDest = (idx, val) => {
    const newDests = [...destinations];
    newDests[idx] = val;
    setDestinations(newDests);
  };
  const removeDest = (idx) => {
    if (destinations.length <= 2) return;
    setDestinations(destinations.filter((_, i) => i !== idx));
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    setShowResult(true);
  };

  const handleCopyLink = () => {
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleVote = (vehicle) => {
    if (hasVoted) return;
    setVotes(prev => ({ ...prev, [vehicle]: prev[vehicle] + 1 }));
    setHasVoted(true);
  };

  return (
    <div className="px-margin-mobile md:px-margin-desktop py-8 bg-background min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-headline-lg text-3xl md:text-4xl text-himalayan-blue font-bold mb-2">Smart Trip Planner</h1>
        <p className="text-on-surface-variant mb-8">Plan your journey, estimate costs, and get tailored vehicle recommendations.</p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form Section */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-sky-tint">
              <h2 className="font-headline-md text-xl mb-6">Your Route</h2>
              <form onSubmit={handleCalculate} className="space-y-4">
                {destinations.map((dest, idx) => (
                  <div key={idx} className="flex items-center gap-2 relative">
                    <div className="flex-1 space-y-1">
                      <label className="text-xs font-bold text-on-surface-variant uppercase">{idx === 0 ? 'Starting Point' : `Stop ${idx}`}</label>
                      <div className="flex items-center bg-surface-container-low rounded-lg p-3">
                        <MapPin size={18} className={idx === 0 ? "text-forest-green mr-2" : "text-sunset-orange mr-2"}/>
                        <input 
                          type="text" 
                          value={dest}
                          onChange={(e) => updateDest(idx, e.target.value)}
                          className="bg-transparent outline-none w-full text-on-surface" 
                          placeholder="Enter city or landmark" 
                          required
                        />
                      </div>
                    </div>
                    {idx > 0 && destinations.length > 2 && (
                      <button type="button" onClick={() => removeDest(idx)} className="mt-5 text-outline hover:text-sunset-orange">
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>
                ))}

                <button type="button" onClick={addDestination} className="flex items-center gap-2 text-himalayan-blue font-bold text-sm py-2 hover:underline">
                  <Plus size={16} /> Add Destination
                </button>

                <div className="pt-4 mt-4 border-t border-outline-variant/30">
                  <button type="submit" className="w-full bg-himalayan-blue text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary transition-colors">
                    <Navigation size={18} /> Calculate Route
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:w-2/3">
            {showResult ? (
              <div className="animate-fade-in space-y-6">
                
                {/* Overview Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-sky-tint text-center">
                    <Navigation className="mx-auto text-himalayan-blue mb-2" size={24}/>
                    <p className="text-xs text-on-surface-variant uppercase font-bold">Distance</p>
                    <p className="text-xl font-bold text-on-surface">320 KM</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-sky-tint text-center">
                    <Clock className="mx-auto text-himalayan-blue mb-2" size={24}/>
                    <p className="text-xs text-on-surface-variant uppercase font-bold">Est. Driving</p>
                    <p className="text-xl font-bold text-on-surface">9.5 Hrs</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-sky-tint text-center">
                    <DollarSign className="mx-auto text-himalayan-blue mb-2" size={24}/>
                    <p className="text-xs text-on-surface-variant uppercase font-bold">Fuel Cost</p>
                    <p className="text-xl font-bold text-on-surface">{formatPrice(45)}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-sky-tint text-center">
                    <Car className="mx-auto text-himalayan-blue mb-2" size={24}/>
                    <p className="text-xs text-on-surface-variant uppercase font-bold">Ideal Rental</p>
                    <p className="text-xl font-bold text-on-surface">7 Days</p>
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-headline-md text-xl text-himalayan-blue">Recommended Vehicles (Group Voting)</h3>
                    <button 
                      onClick={handleCopyLink}
                      className="text-sm font-bold bg-surface-container-low px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-surface-container transition-colors border border-outline-variant/50"
                    >
                      {linkCopied ? <CheckCircle2 size={16} className="text-forest-green"/> : <LinkIcon size={16}/>}
                      {linkCopied ? 'Link Copied!' : 'Invite Friends to Vote'}
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-surface-container-low p-4 rounded-xl flex flex-col gap-4 relative overflow-hidden border-2 border-transparent hover:border-himalayan-blue transition-colors">
                      <div className="absolute top-0 right-0 bg-sunset-orange text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">BEST MATCH</div>
                      <div className="flex gap-4">
                        <img src="/images/suv_car.png" alt="SUV" className="w-24 h-16 object-cover rounded-lg bg-surface-container" />
                        <div>
                          <h4 className="font-bold text-on-surface">Toyota Fortuner</h4>
                          <p className="text-xs text-on-surface-variant mt-1">Perfect for the winding highways to Pokhara.</p>
                          <Link to="/vehicles/2" className="text-sm text-himalayan-blue font-bold mt-2 inline-block hover:underline">View Vehicle</Link>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleVote('fortuner')}
                        disabled={hasVoted}
                        className={`w-full py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors ${hasVoted ? 'bg-surface-container text-on-surface-variant' : 'bg-himalayan-blue text-white hover:bg-primary'}`}
                      >
                        <ThumbsUp size={16} /> Vote Fortuner ({votes.fortuner})
                      </button>
                    </div>
                    
                    <div className="bg-surface-container-low p-4 rounded-xl flex flex-col gap-4 border-2 border-transparent hover:border-himalayan-blue transition-colors">
                      <div className="flex gap-4">
                        <img src="/images/suv_car.png" alt="4x4" className="w-24 h-16 object-cover rounded-lg bg-surface-container" />
                        <div>
                          <h4 className="font-bold text-on-surface">Mahindra Scorpio</h4>
                          <p className="text-xs text-on-surface-variant mt-1">Excellent ground clearance for rough patches.</p>
                          <Link to="/vehicles/5" className="text-sm text-himalayan-blue font-bold mt-2 inline-block hover:underline">View Vehicle</Link>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleVote('scorpio')}
                        disabled={hasVoted}
                        className={`w-full py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors ${hasVoted ? 'bg-surface-container text-on-surface-variant' : 'bg-white border border-outline-variant text-on-surface hover:bg-surface-container-low'}`}
                      >
                        <ThumbsUp size={16} /> Vote Scorpio ({votes.scorpio})
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-sky-tint/30 p-4 rounded-xl border border-himalayan-blue/20">
                  <h4 className="font-bold text-sm text-himalayan-blue mb-1">Travel Advisory</h4>
                  <p className="text-xs text-on-surface-variant">The road between Mugling and Pokhara often experiences heavy traffic due to ongoing expansion works. We recommend adding a 2-hour buffer to your travel time.</p>
                </div>

              </div>
            ) : (
              <div className="bg-surface-container h-full rounded-2xl flex flex-col items-center justify-center p-12 text-center text-outline min-h-[400px]">
                <MapPin size={48} className="mb-4 opacity-50" />
                <h3 className="font-headline-md text-xl mb-2 text-on-surface-variant">Enter your destinations</h3>
                <p className="text-sm max-w-sm">We'll calculate the best route, estimate fuel costs, and recommend the perfect vehicle for your Himalayan journey.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripPlanner;
