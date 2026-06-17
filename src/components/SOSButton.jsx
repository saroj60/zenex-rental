import React, { useState } from 'react';
import { ShieldAlert, X, PhoneCall, HeartPulse, Wrench, MapPin } from 'lucide-react';

const SOSButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating SOS Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-[10.5rem] sm:bottom-24 right-6 bg-[#DC2626] text-white p-4 rounded-full shadow-[0_10px_25px_rgba(220,38,38,0.4)] z-50 hover:scale-110 transition-transform flex items-center justify-center border-2 border-white animate-pulse"
      >
        <ShieldAlert size={28} />
      </button>

      {/* Emergency Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-fade-in border-4 border-[#DC2626]">
            
            <div className="bg-[#DC2626] p-6 text-white text-center relative">
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors bg-black/20 rounded-full p-1"
              >
                <X size={20} />
              </button>
              <ShieldAlert size={48} className="mx-auto mb-2 animate-bounce" />
              <h2 className="font-headline-lg text-2xl font-bold">Emergency Assistance</h2>
              <p className="text-white/80 mt-1 text-sm">We're here to help. Tap to call immediately.</p>
            </div>

            <div className="p-6 space-y-4">
              <a href="tel:100" className="flex items-center gap-4 bg-surface-container-low p-4 rounded-2xl hover:bg-surface-container transition-colors border border-outline-variant/30 group">
                <div className="w-12 h-12 bg-himalayan-blue/10 text-himalayan-blue rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ShieldAlert size={24} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-on-surface">Tourist Police (Nepal)</h4>
                  <p className="text-xs text-on-surface-variant font-mono mt-1">Dial 100 or 1144</p>
                </div>
                <PhoneCall size={20} className="text-himalayan-blue" />
              </a>

              <a href="tel:102" className="flex items-center gap-4 bg-surface-container-low p-4 rounded-2xl hover:bg-surface-container transition-colors border border-outline-variant/30 group">
                <div className="w-12 h-12 bg-sunset-orange/10 text-sunset-orange rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <HeartPulse size={24} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-on-surface">Ambulance Services</h4>
                  <p className="text-xs text-on-surface-variant font-mono mt-1">Dial 102</p>
                </div>
                <PhoneCall size={20} className="text-sunset-orange" />
              </a>

              <a href="tel:+9779767476521" className="flex items-center gap-4 bg-surface-container-low p-4 rounded-2xl hover:bg-surface-container transition-colors border border-outline-variant/30 group">
                <div className="w-12 h-12 bg-forest-green/10 text-forest-green rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Wrench size={24} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-on-surface">24/7 Roadside Assist</h4>
                  <p className="text-xs text-on-surface-variant font-mono mt-1">Zenex Support</p>
                </div>
                <PhoneCall size={20} className="text-forest-green" />
              </a>
            </div>

            <div className="bg-surface-container p-4 text-center">
              <p className="text-xs text-on-surface-variant flex items-center justify-center gap-2">
                <MapPin size={14} className="text-sunset-orange" />
                Sharing your current GPS location is highly recommended.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SOSButton;
