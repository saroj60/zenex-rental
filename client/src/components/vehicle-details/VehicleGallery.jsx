import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Sparkles,
  ShieldCheck,
  Star
} from 'lucide-react';

export default function VehicleGallery({ images = [], vehicleName = 'Fleet Vehicle', category = 'SUV' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const displayImages = images && images.length > 0 ? images : ['/cars/creta.png'];

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      {/* 1. Main Showcase Frame */}
      <div className="relative bg-gradient-to-b from-slate-50 to-slate-100/80 rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-soft overflow-hidden group">
        
        {/* Category Pill Tag */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-white/95 backdrop-blur-xs text-[#0755C9] border border-blue-200 shadow-2xs">
            {category}
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <ShieldCheck className="w-3 h-3" />
            Verified Fleet
          </span>
        </div>

        {/* Fullscreen Zoom Button */}
        <button
          type="button"
          onClick={() => setIsLightboxOpen(true)}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-2xl bg-white/90 backdrop-blur-xs border border-slate-200/80 flex items-center justify-center text-slate-600 hover:text-[#0755C9] hover:bg-white shadow-2xs transition-all cursor-pointer"
          title="View Fullscreen Gallery"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Navigation Arrow Left */}
        {displayImages.length > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-2xl bg-white/90 backdrop-blur-xs border border-slate-200/80 flex items-center justify-center text-slate-700 hover:text-[#0755C9] hover:bg-white shadow-sm transition-all cursor-pointer"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Navigation Arrow Right */}
        {displayImages.length > 1 && (
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-2xl bg-white/90 backdrop-blur-xs border border-slate-200/80 flex items-center justify-center text-slate-700 hover:text-[#0755C9] hover:bg-white shadow-sm transition-all cursor-pointer"
            aria-label="Next photo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        {/* Central Vehicle Photography Display */}
        <div
          onClick={() => setIsLightboxOpen(true)}
          className="relative h-52 xs:h-64 sm:h-80 md:h-96 w-full flex items-center justify-center cursor-zoom-in select-none"
        >
          <img
            key={currentIndex}
            src={displayImages[currentIndex]}
            alt={`${vehicleName} view ${currentIndex + 1}`}
            className="max-h-full max-w-full object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.18)] transition-all duration-300 transform group-hover:scale-[1.02]"
            onError={(e) => {
              e.target.src = '/cars/creta.png';
            }}
          />
        </div>

        {/* Photo Counter */}
        <div className="absolute bottom-4 right-4 z-10 bg-slate-900/70 backdrop-blur-xs text-white text-[11px] font-mono px-2.5 py-1 rounded-xl">
          {currentIndex + 1} / {displayImages.length}
        </div>
      </div>

      {/* 2. Thumbnails Row */}
      {displayImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
          {displayImages.map((img, idx) => {
            const isActive = currentIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`relative w-20 h-16 sm:w-24 sm:h-18 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 border-2 transition-all cursor-pointer p-1.5 flex items-center justify-center ${
                  isActive
                    ? 'border-[#0755C9] shadow-md ring-2 ring-blue-500/20 bg-white'
                    : 'border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.src = '/cars/creta.png';
                  }}
                />
              </button>
            );
          })}
        </div>
      )}

      {/* 3. Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8 animate-in fade-in duration-200">
          
          {/* Lightbox Header */}
          <div className="flex items-center justify-between text-white pb-4">
            <div>
              <h3 className="text-base sm:text-lg font-black tracking-tight">{vehicleName}</h3>
              <p className="text-xs text-slate-400">
                Photo {currentIndex + 1} of {displayImages.length}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="w-10 h-10 rounded-2xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Lightbox Center Image */}
          <div className="relative flex-1 flex items-center justify-center py-4">
            {displayImages.length > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-2 sm:left-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            <img
              src={displayImages[currentIndex]}
              alt={vehicleName}
              className="max-h-[75vh] max-w-[90vw] object-contain drop-shadow-2xl"
              onError={(e) => {
                e.target.src = '/cars/creta.png';
              }}
            />

            {displayImages.length > 1 && (
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-2 sm:right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Lightbox Thumbnails Strip */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto py-2">
            {displayImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`w-16 h-12 rounded-xl overflow-hidden border-2 transition-all p-1 bg-white/10 ${
                  currentIndex === idx
                    ? 'border-white scale-105'
                    : 'border-transparent opacity-50 hover:opacity-80'
                }`}
              >
                <img
                  src={img}
                  alt={`Preview ${idx + 1}`}
                  className="w-full h-full object-contain"
                />
              </button>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}
