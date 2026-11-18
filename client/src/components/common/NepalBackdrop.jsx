import React from 'react';

const NepalBackdrop = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}>
      {/* Sky Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c57c4] via-[#3b82f6]/70 to-[#F5F8FC]/90"></div>

      {/* SVG Himalayan Mountains & Buddhist Stupa */}
      <svg
        viewBox="0 0 1000 800"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full object-cover opacity-90"
      >
        <defs>
          <linearGradient id="snowPeak1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>
          <linearGradient id="mountainBody1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#64748B" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>
          <linearGradient id="stupaGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="50%" stopColor="#EAB308" />
            <stop offset="100%" stopColor="#CA8A04" />
          </linearGradient>
          <linearGradient id="stupaDome" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>
        </defs>

        {/* Far Himalayas Range */}
        <polygon points="-50,420 120,240 280,380 450,180 620,340 780,160 920,300 1050,210 1050,800 -50,800" fill="url(#snowPeak1)" opacity="0.4" />

        {/* Mid-range snow peaks */}
        <polygon points="-50,460 80,280 220,410 380,220 540,380 720,210 880,360 1050,250 1050,800 -50,800" fill="url(#snowPeak1)" opacity="0.75" />
        <polygon points="-50,520 80,360 220,480 380,310 540,460 720,290 880,440 1050,330 1050,800 -50,800" fill="url(#mountainBody1)" opacity="0.45" />

        {/* Iconic Buddhist Stupa (Right side, matching Screen 1 in reference photo!) */}
        <g transform="translate(680, 260) scale(1.1)">
          {/* Stupa Base / Plinth */}
          <rect x="60" y="320" width="200" height="40" rx="4" fill="#CBD5E1" />
          <rect x="75" y="295" width="170" height="25" rx="3" fill="#E2E8F0" />

          {/* White Hemisphere / Garbha Dome */}
          <path d="M 80 295 A 80 75 0 0 1 240 295 Z" fill="url(#stupaDome)" stroke="#CBD5E1" strokeWidth="2" />

          {/* Harmika (Square Cube) */}
          <rect x="135" y="175" width="50" height="45" fill="url(#stupaGold)" stroke="#B45309" strokeWidth="1.5" rx="2" />

          {/* Buddha's Wisdom Eyes & Nose (Nepali symbol '1' / Ek) */}
          {/* Left Eye */}
          <ellipse cx="148" cy="195" rx="5" ry="2.5" fill="#1E293B" />
          <circle cx="148" cy="195" r="1.5" fill="#FFFFFF" />
          <path d="M 143 192 Q 148 188 153 192" stroke="#1E293B" strokeWidth="1" fill="none" />
          {/* Right Eye */}
          <ellipse cx="172" cy="195" rx="5" ry="2.5" fill="#1E293B" />
          <circle cx="172" cy="195" r="1.5" fill="#FFFFFF" />
          <path d="M 167 192 Q 172 188 177 192" stroke="#1E293B" strokeWidth="1" fill="none" />
          {/* Nose (Question mark / Ek symbol) */}
          <path d="M 160 198 Q 163 205 160 212" stroke="#B45309" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Third Eye / Urna dot */}
          <circle cx="160" cy="184" r="2" fill="#B45309" />

          {/* 13 Golden Tiers of Spire (Thirteen rings to enlightenment) */}
          <polygon points="140,175 180,175 177,165 143,165" fill="url(#stupaGold)" />
          <polygon points="142,165 178,165 175,155 145,155" fill="url(#stupaGold)" />
          <polygon points="144,155 176,155 173,145 147,145" fill="url(#stupaGold)" />
          <polygon points="146,145 174,145 171,135 149,135" fill="url(#stupaGold)" />
          <polygon points="148,135 172,135 169,125 151,125" fill="url(#stupaGold)" />
          <polygon points="150,125 170,125 167,115 153,115" fill="url(#stupaGold)" />
          <polygon points="152,115 168,115 165,105 155,105" fill="url(#stupaGold)" />
          <polygon points="154,105 166,105 163,95 157,95" fill="url(#stupaGold)" />
          <polygon points="156,95 164,95 162,85 158,85" fill="url(#stupaGold)" />
          <polygon points="157,85 163,85 161,75 159,75" fill="url(#stupaGold)" />

          {/* Lotus & Pinnacle Umbrella (Gajur) */}
          <ellipse cx="160" cy="72" rx="8" ry="4" fill="url(#stupaGold)" />
          <path d="M 160 55 L 163 70 L 157 70 Z" fill="url(#stupaGold)" />
          <circle cx="160" cy="52" r="3" fill="#FDE047" />

          {/* Colorful fluttering Tibetan / Nepali Prayer Flags */}
          {/* String 1: to the left */}
          <path d="M 160 85 Q 80 140 -40 220" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3 3" fill="none" opacity="0.6" />
          <polygon points="120,110 135,100 130,125" fill="#3B82F6" /> {/* Blue */}
          <polygon points="90,132 105,122 100,147" fill="#F8FAFC" />  {/* White */}
          <polygon points="60,154 75,144 70,169" fill="#EF4444" />   {/* Red */}
          <polygon points="30,176 45,166 40,191" fill="#10B981" />   {/* Green */}
          <polygon points="0,198 15,188 10,213" fill="#F59E0B" />    {/* Yellow */}
        </g>
      </svg>

      {/* Atmospheric Mist at Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[#F5F8FC] via-[#F5F8FC]/80 to-transparent"></div>
    </div>
  );
};

export default NepalBackdrop;
