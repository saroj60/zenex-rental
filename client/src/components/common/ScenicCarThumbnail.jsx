import React from 'react';

const CAR_IMAGES = {
  creta: '/cars/creta.png',
  fortuner: '/cars/fortuner.jpg',
  swift: '/cars/swift.jpg',
  hiace: '/cars/hiace.jpg',
  ev: '/cars/ev.jpg',
  scorpio: '/cars/scorpio.jpg',
};

const ScenicCarThumbnail = ({ imageUrl, variant = 'creta', className = '' }) => {
  const imgSrc = imageUrl || CAR_IMAGES[variant] || '/cars/creta.png';

  return (
    <div className={`w-36 sm:w-44 h-36 rounded-2xl relative overflow-hidden flex-shrink-0 flex items-center justify-center bg-slate-900 border border-blue-200/40 ${className}`}>
      {/* Real Mountain Landscape Background with vivid Himalayan sky */}
      <img
        src="/landscapes/annapurna.jpg"
        alt="Nepal Himalayan Backdrop"
        className="absolute inset-0 w-full h-full object-cover opacity-65"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-blue-900/30"></div>

      {/* Top Left Badge: ✔ Available */}
      <div className="absolute top-2 left-2 z-20 flex items-center gap-1 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-full shadow-2xs border border-emerald-100">
        <div className="w-3 h-3 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[8px] font-black">
          ✓
        </div>
        <span className="text-[10px] font-extrabold text-emerald-700">Available</span>
      </div>

      {/* Real Car Photograph in Foreground */}
      <div className="relative z-10 w-full px-2 flex items-center justify-center transform hover:scale-[1.04] transition-transform">
        <img
          src={imgSrc}
          alt="Vehicle"
          className="w-full h-24 object-contain drop-shadow-[0_8px_14px_rgba(0,0,0,0.6)]"
          onError={(e) => {
            if (e.target.src !== window.location.origin + '/cars/creta.png') {
              e.target.src = '/cars/creta.png';
            }
          }}
        />
      </div>

      {/* Bottom Center 4 Carousel Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 bg-black/45 backdrop-blur-xs px-2 py-0.5 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
        <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
        <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
        <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
      </div>
    </div>
  );
};

export default ScenicCarThumbnail;
