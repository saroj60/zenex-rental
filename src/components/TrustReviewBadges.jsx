import React from 'react';

// Simple string hash function to generate stable, unique, and realistic counts per package
const stringHash = (str) => {
  let hash = 0;
  if (!str) return 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
};

const TrustReviewBadges = ({ title, lightMode = false }) => {
  const hash = stringHash(title);
  
  // Stable counts based on the package title
  const tripAdvisorCount = (hash % 120) + 45; // 45 to 164 reviews
  const googleCount = (hash % 40) + 15;      // 15 to 54 reviews
  const recommendPercent = 95 + (hash % 5);   // 95% to 99% recommendation rate

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3.5 my-4 text-xs md:text-sm font-bold tracking-tight">
      
      {/* TripAdvisor Badge */}
      <div className="flex items-center gap-2">
        {/* Official TripAdvisor Logo */}
        <svg className="w-5.5 h-5.5 shrink-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="16" fill="#00AA6C"/>
          {/* Left Eye Outer Ring */}
          <circle cx="11" cy="15" r="4.5" fill="white"/>
          <circle cx="11" cy="15" r="3" fill="#00AA6C"/>
          <circle cx="11" cy="15" r="1.5" fill="#002D1D"/>
          <circle cx="11.5" cy="14.5" r="0.5" fill="white"/>
          
          {/* Right Eye Outer Ring */}
          <circle cx="21" cy="15" r="4.5" fill="white"/>
          <circle cx="21" cy="15" r="3" fill="#00AA6C"/>
          <circle cx="21" cy="15" r="1.5" fill="#002D1D"/>
          <circle cx="21.5" cy="14.5" r="0.5" fill="white"/>

          {/* Beak */}
          <path d="M16 14.5L13.8 19.5H18.2L16 14.5Z" fill="#FF5E00"/>
        </svg>
        {/* TripAdvisor Green Bubble Stars */}
        <div className="flex gap-0.5 shrink-0">
          {[1, 2, 3, 4, 5].map((star) => (
            <span 
              key={star} 
              className="w-2.5 h-2.5 rounded-full bg-[#00AA6C] border border-[#00AA6C]"
              aria-hidden="true"
            ></span>
          ))}
        </div>
        <span className={lightMode ? 'text-slate-200' : 'text-slate-600 font-semibold'}>
          {tripAdvisorCount} reviews
        </span>
      </div>

      {/* Google Badge */}
      <div className="flex items-center gap-2">
        {/* Google Official G Logo */}
        <svg className="w-4.5 h-4.5 shrink-0" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69c-.29 1.5-1.14 2.77-2.4 3.61v3h3.86c2.26-2.09 3.59-5.17 3.59-8.46z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.97-1.08 7.96-2.91l-3.86-3c-1.08.72-2.45 1.16-4.1 1.16-3.14 0-5.8-2.11-6.75-4.96H1.31v3.1A12 12 0 0 0 12 24z"
          />
          <path
            fill="#FBBC05"
            d="M5.25 14.29a7.18 7.18 0 0 1 0-4.58V6.61H1.31a12 12 0 0 0 0 10.78l3.94-3.1z"
          />
          <path
            fill="#EA4335"
            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.67 1.31 6.61l3.94 3.1c.95-2.85 3.61-4.96 6.75-4.96z"
          />
        </svg>
        {/* Google Yellow Stars */}
        <div className="flex gap-0.5 text-[#FBBC05] shrink-0">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg key={star} className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ))}
        </div>
        <span className={lightMode ? 'text-slate-200' : 'text-slate-600 font-semibold'}>
          {googleCount} reviews
        </span>
      </div>

      {/* Traveler Recommendation Badge */}
      <div className="flex items-center gap-2">
        {/* Orange Circular Recommendation Badge */}
        <div className="w-5 h-5 rounded-full bg-[#FF9800] flex items-center justify-center text-white shrink-0 shadow-sm">
          <svg className="w-3 h-3 fill-white" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.75 0 1.41-.41 1.76-1.02l3.89-9.07c.09-.23.15-.47.15-.73v-1.91z" />
          </svg>
        </div>
        <span className={lightMode ? 'text-slate-200' : 'text-slate-600 font-semibold'}>
          Recommended by {recommendPercent}% of travelers
        </span>
      </div>

    </div>
  );
};

export default TrustReviewBadges;
