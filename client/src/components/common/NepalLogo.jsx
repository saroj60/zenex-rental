import React from 'react';

const NepalLogo = ({ variant = 'default', size = 'md' }) => {
  const isWhite = variant === 'white';

  return (
    <div className="flex items-center gap-2 select-none">
      <div className="relative flex items-center justify-center">
        {/* Mountain peak silhouette with car icon */}
        <div className={`rounded-xl p-2 flex items-center justify-center ${isWhite ? 'bg-white/10 text-white' : 'bg-[#0755C9] text-white shadow-md shadow-blue-500/20'}`}>
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            {/* Himalaya peaks */}
            <path d="M14 6l3.5 6H10l4-6zm-7 4l3 5H4l3-5z" opacity="0.6"/>
            {/* Sleek modern car silhouette */}
            <path d="M18.92 9.01C18.72 8.42 18.16 8 17.5 8h-11c-.66 0-1.21.42-1.42 1.01L3 14v6c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-6l-2.08-4.99zM6.85 10h10.29l1.04 2.5H5.81l1.04-2.5zM7.5 17a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
          </svg>
        </div>
      </div>
      <div className="flex flex-col leading-tight min-w-0">
        <span className={`font-extrabold tracking-tight truncate ${size === 'lg' ? 'text-xl sm:text-2xl' : 'text-sm sm:text-lg'} ${isWhite ? 'text-white' : 'text-[#0E1726]'}`}>
          Nepal <span className="text-[#0755C9]">Car Rental</span>
        </span>
        <span className={`text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase truncate ${isWhite ? 'text-blue-100' : 'text-slate-500'}`}>
          Himalayan Fleet Services
        </span>
      </div>
    </div>
  );
};

export default NepalLogo;
