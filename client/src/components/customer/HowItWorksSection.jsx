import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Car,
  CreditCard,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function HowItWorksSection() {
  const navigate = useNavigate();

  const steps = [
    {
      number: '01',
      title: 'Search Your Car',
      description: 'Select your preferred pickup location in Kathmandu, Pokhara, or airport depot, and choose your travel dates and times.',
      icon: Search,
      color: 'bg-blue-50 text-[#0755C9] border-blue-200',
    },
    {
      number: '02',
      title: 'Choose Your Vehicle',
      description: 'Compare verified hatchbacks, SUVs, luxury cruisers, or Hiace vans. Filter by self-drive freedom or licensed chauffeur.',
      icon: Car,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    },
    {
      number: '03',
      title: 'Confirm Your Booking',
      description: 'Submit customer verification documents, choose full or advance booking, and pay seamlessly via eSewa, Khalti, or Counter Cash.',
      icon: CreditCard,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    },
    {
      number: '04',
      title: 'Enjoy Your Journey',
      description: 'Collect vehicle keys at your designated hub or opt for doorstep delivery. Cruise through the breathtaking vistas of Nepal with 24/7 backup.',
      icon: MapPin,
      color: 'bg-amber-50 text-amber-600 border-amber-200',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0755C9] text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simple 4-Step Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#10243A] tracking-tight">
            How Nepal Car Rental Works
          </h2>
          <p className="text-slate-500 text-sm sm:text-base font-medium">
            Renting a car in Nepal has never been simpler. Book online in minutes and hit the highway with complete peace of mind.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative p-7 rounded-3xl bg-[#F5F8FC] border border-slate-200/70 hover:bg-white hover:shadow-xl hover:border-blue-100 transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Step Number Watermark */}
                <span className="absolute top-4 right-6 text-3xl font-black text-slate-200/80 group-hover:text-blue-100 transition-colors pointer-events-none">
                  {step.number}
                </span>

                <div>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-xs ${step.color} mb-6 transition-transform group-hover:scale-110 duration-300`}>
                    <Icon className="w-6 h-6 stroke-[2.2]" />
                  </div>

                  <span className="text-[11px] font-black uppercase tracking-wider text-[#0755C9] block mb-1">
                    Step {idx + 1}
                  </span>

                  <h3 className="text-lg font-black text-[#10243A] mb-2 group-hover:text-[#0755C9] transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-bold text-slate-400 group-hover:text-slate-700 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Instant Confirmation</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-[#10243A] to-[#0755C9] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-blue-900/10">
          <div>
            <h4 className="text-xl font-black tracking-tight">Ready to start your road trip?</h4>
            <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
              Find the perfect car for Kathmandu, Pokhara, Chitwan, or Mustang today.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/cars')}
            className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-[#0755C9] font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer"
          >
            <span>Browse All Available Vehicles</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
