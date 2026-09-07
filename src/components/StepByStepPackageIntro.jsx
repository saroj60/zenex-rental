import React from 'react';
import { Compass, MapPin, CheckCircle2, ArrowRight, ShieldCheck, Car, Star } from 'lucide-react';

const StepByStepPackageIntro = ({ itinerary = [], title = '', category = '' }) => {
  // If detailed itinerary exists, extract up to 5 steps, otherwise construct standard steps
  const steps = itinerary && itinerary.length > 0 
    ? itinerary.slice(0, 5).map((item, idx) => ({
        stepNum: idx + 1,
        dayLabel: item.day ? `Day ${item.day}` : `Step ${idx + 1}`,
        title: item.title || `Journey Milestone ${idx + 1}`,
        desc: item.desc || item.description || 'Guided trip highlights and private transportation included.'
      }))
    : [
        {
          stepNum: 1,
          dayLabel: 'Step 1',
          title: 'Arrival & Warm Nepalese Welcome',
          desc: 'Airport pickup in private AC vehicle & transfer to high-grade hotel with briefing.'
        },
        {
          stepNum: 2,
          dayLabel: 'Step 2',
          title: 'UNESCO Heritage & Cultural Tours',
          desc: 'Guided exploration of ancient Kathmandu Durbar Square, Swayambhunath & Pashupatinath.'
        },
        {
          stepNum: 3,
          dayLabel: 'Step 3',
          title: 'Scenic Mountain Drive & Sunrise',
          desc: 'Travel to Pokhara / Nagarkot for Sarangkot sunrises & breathtaking Himalayan views.'
        },
        {
          stepNum: 4,
          dayLabel: 'Step 4',
          title: 'Wildlife Safari & Mountain Trekking',
          desc: 'Experience Pokhara boating, Chitwan jungle safari, or Annapurna foothill mini-treks.'
        },
        {
          stepNum: 5,
          dayLabel: 'Step 5',
          title: 'Cultural Farewell & Final Departure',
          desc: 'Enjoy authentic Nepali cultural dinner & smooth private airport transfer for return flight.'
        }
      ];

  return (
    <div className="bg-gradient-to-br from-[#0a2f4c] via-[#1e3a8a] to-[#0f172a] text-white rounded-3xl p-6 md:p-8 shadow-xl border border-white/10 mb-10 text-left relative overflow-hidden">
      {/* Decorative Background Accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/15">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-400/20 backdrop-blur-md border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0 shadow-inner">
            <Compass size={26} />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">Step-by-Step Package Journey</h3>
            <p className="text-xs md:text-sm text-blue-200/90 font-medium mt-0.5">
              How your {title ? `"${title}"` : 'tour'} experience unfolds step by step
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-blue-100 border border-white/15 w-fit">
          <ShieldCheck size={14} className="text-amber-400" />
          <span>All-Inclusive Private Service</span>
        </div>
      </div>

      {/* Step Cards Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {steps.map((step, idx) => (
          <div 
            key={idx} 
            className="bg-white/10 backdrop-blur-md border border-white/15 hover:border-amber-400/40 rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-widest bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full shadow-sm">
                  Step {step.stepNum}
                </span>
                <span className="text-[11px] text-blue-200/90 font-bold bg-white/10 px-2 py-0.5 rounded-md">
                  {step.dayLabel}
                </span>
              </div>
              <h4 className="font-bold text-sm text-white mb-2 leading-snug group-hover:text-amber-300 transition-colors">
                {step.title}
              </h4>
              <p className="text-xs text-blue-100/80 leading-relaxed line-clamp-3">
                {step.desc}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center text-[10px] font-semibold text-blue-200/70">
              <CheckCircle2 size={12} className="text-amber-400 mr-1.5 shrink-0" />
              <span>Private AC Transport</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepByStepPackageIntro;
