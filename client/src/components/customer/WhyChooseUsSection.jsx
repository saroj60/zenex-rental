import React from 'react';
import {
  Coins,
  ShieldCheck,
  CalendarCheck,
  Headphones,
  Check,
  Sparkles
} from 'lucide-react';

export default function WhyChooseUsSection() {
  const features = [
    {
      id: 'pricing',
      icon: Coins,
      title: 'Affordable Pricing',
      description: 'Transparent rental prices with zero hidden charges. Clear fuel policies, instant invoices, and upfront security deposit refunds.',
      color: 'text-amber-500 bg-amber-50 border-amber-200',
      tag: 'Best Value',
    },
    {
      id: 'vehicles',
      icon: ShieldCheck,
      title: 'Verified Vehicles',
      description: 'All 42 fleet vehicles are commercially insured, routinely serviced, and thoroughly inspected for rigorous Nepal highway and hill terrain.',
      color: 'text-emerald-500 bg-emerald-50 border-emerald-200',
      tag: '100% Insured',
    },
    {
      id: 'booking',
      icon: CalendarCheck,
      title: 'Flexible Booking',
      description: 'Choose between pure self-drive freedom or licensed local chauffeur-assisted rentals with airport delivery and one-way drop-off.',
      color: 'text-[#0755C9] bg-blue-50 border-blue-200',
      tag: 'Self Drive & Chauffeur',
    },
    {
      id: 'support',
      icon: Headphones,
      title: 'Customer Support',
      description: '24/7 dedicated helpline and highway roadside assistance across Prithvi, Tribhuvan, and East-West highways anywhere in Nepal.',
      color: 'text-indigo-500 bg-indigo-50 border-indigo-200',
      tag: '24/7 Assistance',
    },
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0755C9] text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Nepal Car Rental Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#10243A] tracking-tight">
            Why Choose Us For Your Journey
          </h2>
          <p className="text-slate-500 text-sm sm:text-base font-medium">
            We provide Nepal's most reliable, trusted, and professionally managed car rental service for residents, expats, and international tourists.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.id}
                className="p-7 rounded-3xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:shadow-xl hover:border-blue-100 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-xs ${f.color} transition-transform group-hover:scale-110 duration-300`}>
                      <Icon className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-500">
                      {f.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-[#10243A] mb-2 group-hover:text-[#0755C9] transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                    {f.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-bold text-slate-400 group-hover:text-[#0755C9] transition-colors">
                  <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                  <span>Guaranteed Standards</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
