import React from 'react';
import {
  Users,
  Settings,
  Fuel,
  Snowflake,
  Gauge,
  Palette,
  Calendar,
  Briefcase,
  DoorClosed,
  Cpu,
  Car,
  Tag,
  ShieldCheck
} from 'lucide-react';

export default function VehicleSpecsGrid({ vehicle }) {
  if (!vehicle) return null;

  const specs = vehicle.specifications || {};

  const specItems = [
    {
      id: 'year',
      label: 'Model Year',
      value: vehicle.modelYear || 2024,
      icon: Calendar,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      id: 'seats',
      label: 'Seating Capacity',
      value: `${vehicle.seats} Passengers`,
      icon: Users,
      color: 'text-indigo-600 bg-indigo-50',
    },
    {
      id: 'transmission',
      label: 'Transmission',
      value: vehicle.transmission || 'Automatic',
      icon: Settings,
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      id: 'fuel',
      label: 'Fuel Type',
      value: vehicle.fuelType || 'Petrol',
      icon: Fuel,
      color: 'text-amber-600 bg-amber-50',
    },
    {
      id: 'ac',
      label: 'Air Conditioning',
      value: vehicle.hasAC !== false ? 'Climate Control AC' : 'Standard Ventilation',
      icon: Snowflake,
      color: 'text-sky-600 bg-sky-50',
    },
    {
      id: 'mileage',
      label: 'Fuel Economy',
      value: specs.mileage || '16.8 km/l',
      icon: Gauge,
      color: 'text-purple-600 bg-purple-50',
    },
    {
      id: 'luggage',
      label: 'Luggage Trunk',
      value: specs.luggageCapacity || '3 Large Suitcases',
      icon: Briefcase,
      color: 'text-rose-600 bg-rose-50',
    },
    {
      id: 'doors',
      label: 'Doors',
      value: `${specs.doors || 5} Doors`,
      icon: DoorClosed,
      color: 'text-teal-600 bg-teal-50',
    },
    {
      id: 'engine',
      label: 'Engine Power',
      value: specs.engineCapacity || '1.5 L Smartstream',
      icon: Cpu,
      color: 'text-slate-700 bg-slate-100',
    },
    {
      id: 'color',
      label: 'Exterior Color',
      value: specs.color || 'Polar White',
      icon: Palette,
      color: 'text-pink-600 bg-pink-50',
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-soft space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-base font-black text-[#10243A]">
            Technical Specifications & Details
          </h3>
          <p className="text-xs text-slate-500 font-semibold">
            Manufacturer specifications certified by Nepal Car Rental fleet engineers
          </p>
        </div>

        {/* Nepal Registration Number Badge */}
        {vehicle.registrationNumber && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono font-black text-slate-800">
            <span className="text-[10px] text-[#0755C9] font-sans font-black">NEP</span>
            <span>{vehicle.registrationNumber}</span>
          </div>
        )}
      </div>

      {/* Grid of Specification Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {specItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 hover:bg-white hover:border-blue-100 hover:shadow-xs transition-all flex flex-col justify-between space-y-2"
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${item.color}`}>
                <Icon className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  {item.label}
                </span>
                <span className="text-xs font-black text-slate-900 truncate block">
                  {item.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
