import React from 'react';

const CarIllustrations = ({ variant = 'creta', className = '' }) => {
  if (variant === 'creta') {
    // White Hyundai Creta SUV (exact match to reference image!)
    return (
      <svg
        viewBox="0 0 540 260"
        className={`w-full h-auto drop-shadow-2xl ${className}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="cretaBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#F1F5F9" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>
          <linearGradient id="cretaGlass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient id="cretaTire" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient id="alloyRim" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="50%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          <radialGradient id="shadowUnder" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(15, 23, 42, 0.45)" />
            <stop offset="80%" stopColor="rgba(15, 23, 42, 0.15)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Realistic Ground Shadow */}
        <ellipse cx="270" cy="235" rx="230" ry="16" fill="url(#shadowUnder)" />

        {/* Roof Rails (Silver metallic) */}
        <path d="M170 65 L360 65" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
        <line x1="210" y1="65" x2="210" y2="72" stroke="#64748B" strokeWidth="3" />
        <line x1="330" y1="65" x2="330" y2="72" stroke="#64748B" strokeWidth="3" />

        {/* Main Car Silhouette & Body Shell */}
        {/* Greenhouse / Cabin & Pillars */}
        <path
          d="M125 125 L165 72 C175 68 200 66 270 66 C340 66 365 68 400 100 L440 120 L480 135 C500 145 510 160 510 180 L495 195 L450 195 C440 165 410 145 375 145 C340 145 310 165 300 195 L210 195 C200 165 170 145 135 145 C100 145 70 165 60 195 L30 195 C20 185 20 165 35 145 L75 135 Z"
          fill="url(#cretaBody)"
          stroke="#94A3B8"
          strokeWidth="1.5"
        />

        {/* Windows / Cabin Glass */}
        <path
          d="M175 76 L265 76 L265 120 L138 120 Z"
          fill="url(#cretaGlass)"
        />
        <path
          d="M275 76 L355 76 L385 120 L275 120 Z"
          fill="url(#cretaGlass)"
        />
        <path
          d="M365 80 L395 105 L390 120 L365 120 Z"
          fill="url(#cretaGlass)"
        />
        {/* Glass reflection streak */}
        <path d="M190 78 L155 118" stroke="rgba(255,255,255,0.4)" strokeWidth="3" strokeLinecap="round" />

        {/* Character Lines & Door Sculpting */}
        <path d="M85 140 Q 270 148 480 140" stroke="#CBD5E1" strokeWidth="2.5" fill="none" />
        <path d="M70 165 Q 270 175 470 165" stroke="#E2E8F0" strokeWidth="2" fill="none" />

        {/* Front LED Projector Headlights (Creta Split-headlight signature) */}
        <path d="M470 138 L505 144 L490 156 L465 150 Z" fill="#E2E8F0" stroke="#64748B" strokeWidth="1" />
        <circle cx="488" cy="147" r="4" fill="#38BDF8" opacity="0.8" />
        <circle cx="478" cy="145" r="3" fill="#FFFFFF" />

        {/* Rear LED Taillight */}
        <path d="M35 148 L65 145 L60 158 L30 156 Z" fill="#EF4444" />

        {/* Front Chrome / Piano Black Grille */}
        <path d="M490 160 L508 165 L504 185 L485 183 Z" fill="#1E293B" />
        <rect x="492" y="167" width="12" height="2" rx="1" fill="#94A3B8" />
        <rect x="492" y="173" width="12" height="2" rx="1" fill="#94A3B8" />

        {/* Side Mirror */}
        <path d="M255 112 C255 105 275 105 285 112 C285 118 265 122 255 112 Z" fill="#FFFFFF" stroke="#64748B" strokeWidth="1" />
        <path d="M260 114 L275 114" stroke="#F59E0B" strokeWidth="1.5" /> {/* LED Indicator */}

        {/* Front Wheel Arch & Big Alloy Wheel */}
        <circle cx="375" cy="195" r="38" fill="url(#cretaTire)" />
        <circle cx="375" cy="195" r="26" fill="url(#alloyRim)" stroke="#0F172A" strokeWidth="3" />
        {/* Diamond Cut Alloy Spokes */}
        <line x1="375" y1="169" x2="375" y2="221" stroke="#F8FAFC" strokeWidth="3" />
        <line x1="349" y1="195" x2="401" y2="195" stroke="#F8FAFC" strokeWidth="3" />
        <line x1="357" y1="177" x2="393" y2="213" stroke="#F8FAFC" strokeWidth="3" />
        <line x1="357" y1="213" x2="393" y2="177" stroke="#F8FAFC" strokeWidth="3" />
        <circle cx="375" cy="195" r="6" fill="#0755C9" />

        {/* Rear Wheel Arch & Big Alloy Wheel */}
        <circle cx="135" cy="195" r="38" fill="url(#cretaTire)" />
        <circle cx="135" cy="195" r="26" fill="url(#alloyRim)" stroke="#0F172A" strokeWidth="3" />
        <line x1="135" y1="169" x2="135" y2="221" stroke="#F8FAFC" strokeWidth="3" />
        <line x1="109" y1="195" x2="161" y2="195" stroke="#F8FAFC" strokeWidth="3" />
        <line x1="117" y1="177" x2="153" y2="213" stroke="#F8FAFC" strokeWidth="3" />
        <line x1="117" y1="213" x2="153" y2="177" stroke="#F8FAFC" strokeWidth="3" />
        <circle cx="135" cy="195" r="6" fill="#0755C9" />

        {/* Lower Body Cladding (Rugged SUV Black Moldings) */}
        <path d="M60 193 L97 193 C102 185 115 178 135 178 C155 178 168 185 173 193 L337 193 C342 185 355 178 375 178 C395 178 408 185 413 193 L450 193 L450 200 L60 200 Z" fill="#1E293B" />
      </svg>
    );
  }

  if (variant === 'fortuner') {
    // Toyota Fortuner Premium SUV (Black / Dark luxury 4x4)
    return (
      <svg viewBox="0 0 540 260" className={`w-full h-auto drop-shadow-2xl ${className}`} fill="none">
        <defs>
          <linearGradient id="fortunerBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="50%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <radialGradient id="shadowUnderF" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(15, 23, 42, 0.45)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <ellipse cx="270" cy="235" rx="230" ry="16" fill="url(#shadowUnderF)" />
        {/* Massive 4x4 Cabin */}
        <path d="M110 120 L155 60 C170 55 210 52 290 52 C370 52 390 55 420 90 L460 115 L500 130 C520 140 525 155 525 180 L510 195 L460 195 C450 160 415 140 380 140 C345 140 310 160 300 195 L200 195 C190 160 155 140 120 140 C85 140 50 160 40 195 L20 195 C10 180 15 160 30 140 L70 130 Z" fill="url(#fortunerBody)" stroke="#475569" strokeWidth="1.5" />
        {/* Tinted Windows */}
        <path d="M165 65 L275 65 L275 115 L125 115 Z" fill="#020617" />
        <path d="M285 65 L375 65 L405 115 L285 115 Z" fill="#020617" />
        {/* Projector Lights */}
        <path d="M485 132 L520 138 L505 150 L475 144 Z" fill="#E2E8F0" />
        <circle cx="500" cy="140" r="4" fill="#38BDF8" />
        {/* Big Offroad Wheels */}
        <circle cx="380" cy="195" r="40" fill="#0F172A" />
        <circle cx="380" cy="195" r="26" fill="#64748B" stroke="#000" strokeWidth="2" />
        <circle cx="120" cy="195" r="40" fill="#0F172A" />
        <circle cx="120" cy="195" r="26" fill="#64748B" stroke="#000" strokeWidth="2" />
      </svg>
    );
  }

  if (variant === 'swift') {
    // Suzuki Swift Hatchback (Compact white city car)
    return (
      <svg viewBox="0 0 540 260" className={`w-full h-auto drop-shadow-2xl ${className}`} fill="none">
        <defs>
          <linearGradient id="swiftBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#F1F5F9" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>
        </defs>
        <ellipse cx="270" cy="235" rx="210" ry="14" fill="rgba(15, 23, 42, 0.35)" />
        {/* Swift Body */}
        <path d="M140 125 L180 80 C195 76 230 74 300 74 C360 74 375 78 400 110 L440 128 L475 140 C490 148 495 160 495 180 L480 195 L440 195 C430 168 405 152 375 152 C345 152 320 168 310 195 L220 195 C210 168 185 152 155 152 C125 152 100 168 90 195 L60 195 C50 185 50 170 60 152 L95 140 Z" fill="url(#swiftBody)" stroke="#94A3B8" strokeWidth="1.5" />
        {/* Black A-Pillars & Floating Roof */}
        <path d="M185 82 L280 82 L280 120 L150 120 Z" fill="#0F172A" />
        <path d="M290 82 L360 82 L385 120 L290 120 Z" fill="#0F172A" />
        {/* Wheels */}
        <circle cx="375" cy="195" r="34" fill="#1E293B" />
        <circle cx="375" cy="195" r="22" fill="#E2E8F0" stroke="#0F172A" strokeWidth="2" />
        <circle cx="155" cy="195" r="34" fill="#1E293B" />
        <circle cx="155" cy="195" r="22" fill="#E2E8F0" stroke="#0F172A" strokeWidth="2" />
      </svg>
    );
  }

  if (variant === 'ev') {
    // Modern White BYD Atto 3 / EV
    return (
      <svg viewBox="0 0 540 260" className={`w-full h-auto drop-shadow-2xl ${className}`} fill="none">
        <defs>
          <linearGradient id="evBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>
        </defs>
        <ellipse cx="270" cy="235" rx="220" ry="15" fill="rgba(15, 23, 42, 0.35)" />
        {/* Sleek EV Body */}
        <path d="M125 125 L170 70 C185 66 220 64 285 64 C350 64 370 66 405 95 L445 115 L485 130 C505 140 515 155 515 175 L500 195 L455 195 C445 165 415 145 380 145 C345 145 315 165 305 195 L215 195 C205 165 175 145 140 145 C105 145 75 165 65 195 L35 195 C25 185 25 165 40 145 L80 135 Z" fill="url(#evBody)" stroke="#94A3B8" strokeWidth="1.5" />
        <path d="M180 74 L270 74 L270 118 L142 118 Z" fill="#0F172A" />
        <path d="M280 74 L360 74 L390 118 L280 118 Z" fill="#0F172A" />
        {/* EV Blue aerodynamic accent line */}
        <path d="M90 142 Q 280 152 485 142" stroke="#0EA5E9" strokeWidth="2" fill="none" />
        {/* Wheels */}
        <circle cx="380" cy="195" r="36" fill="#1E293B" />
        <circle cx="380" cy="195" r="24" fill="#0EA5E9" stroke="#0F172A" strokeWidth="2" />
        <circle cx="140" cy="195" r="36" fill="#1E293B" />
        <circle cx="140" cy="195" r="24" fill="#0EA5E9" stroke="#0F172A" strokeWidth="2" />
      </svg>
    );
  }

  // Toyota Hiace Van
  return (
    <svg viewBox="0 0 540 260" className={`w-full h-auto drop-shadow-2xl ${className}`} fill="none">
      <ellipse cx="270" cy="235" rx="230" ry="16" fill="rgba(15, 23, 42, 0.35)" />
      {/* 14-seater Van Box */}
      <path d="M80 110 L90 55 C100 50 150 48 290 48 C410 48 450 52 470 65 L495 105 L505 145 C510 165 510 180 500 195 L460 195 C450 165 420 148 390 148 C360 148 330 165 320 195 L200 195 C190 165 160 148 130 148 C100 148 70 165 60 195 L40 195 C30 185 30 160 40 140 Z" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.5" />
      {/* 3 Tourist Side Windows */}
      <rect x="100" y="60" width="85" height="55" rx="4" fill="#1E293B" />
      <rect x="195" y="60" width="95" height="55" rx="4" fill="#1E293B" />
      <rect x="300" y="60" width="95" height="55" rx="4" fill="#1E293B" />
      <path d="M405 65 L460 70 L480 115 L405 115 Z" fill="#1E293B" />
      {/* Wheels */}
      <circle cx="390" cy="195" r="36" fill="#1E293B" />
      <circle cx="390" cy="195" r="23" fill="#E2E8F0" stroke="#0F172A" strokeWidth="2" />
      <circle cx="130" cy="195" r="36" fill="#1E293B" />
      <circle cx="130" cy="195" r="23" fill="#E2E8F0" stroke="#0F172A" strokeWidth="2" />
    </svg>
  );
};

export default CarIllustrations;
