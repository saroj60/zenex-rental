import React from 'react';

/**
 * Renders the "Trip Cost for 2026/27 (Price is Per Person /US$)" matrix table
 * showing package categories (Luxury, Comfort, Standard, Budget) across group sizes.
 */
const TripCostMatrixTable = ({ item }) => {
  if (!item) return null;

  const getBasePriceNum = () => {
    if (!item.price) return 650;
    const str = String(item.price).replace(/[^0-9.]/g, '');
    const num = parseFloat(str);
    return isNaN(num) || num <= 0 ? 650 : num;
  };

  const basePrice = getBasePriceNum();

  const formatCost = (catMult, paxMult) => {
    const raw = basePrice * catMult * paxMult;
    const rounded = Math.round(raw / 5) * 5;
    return `$${rounded.toLocaleString()}`;
  };

  const categories = [
    { name: 'Luxury', colorClass: 'text-purple-700 font-extrabold', catMult: 1.75 },
    { name: 'Comfort', colorClass: 'text-blue-600 font-extrabold', catMult: 1.35 },
    { name: 'Standard', colorClass: 'text-emerald-600 font-extrabold', catMult: 1.15 },
    { name: 'Budget', colorClass: 'text-[#e53a24] font-extrabold', catMult: 1.0 },
  ];

  const paxCols = [
    { label: '1 Person', mult: 1.65 },
    { label: '2 Persons', mult: 1.0 },
    { label: '3-5 Persons', mult: 0.88 },
    { label: '6-8 Persons', mult: 0.80 },
    { label: '9+ Persons', mult: 0.72 },
  ];

  return (
    <section id="cost-matrix" className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 font-sans my-6 scroll-mt-24">
      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 font-sans flex items-center justify-between flex-wrap gap-2">
        <span>Trip Cost for 2026/27 <span className="text-sm font-semibold text-gray-500 font-sans">(Price is Per Person /US$)</span></span>
      </h3>
      <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-2xs font-sans">
        <table className="w-full text-left text-sm border-collapse font-sans min-w-[580px]">
          <thead>
            <tr className="bg-slate-50/90 text-slate-700 font-bold border-b border-gray-200">
              <th className="px-5 py-4 text-left font-bold text-slate-800 text-sm font-sans w-[28%]">Package Category</th>
              {paxCols.map((col, idx) => (
                <th key={idx} className="px-4 py-4 text-center font-bold text-slate-700 text-sm font-sans">{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-sans bg-white">
            {categories.map((row, rIdx) => (
              <tr key={rIdx} className="hover:bg-slate-50/60 transition-colors">
                <td className={`px-5 py-4 font-bold text-sm font-sans ${row.colorClass}`}>{row.name}</td>
                {paxCols.map((col, cIdx) => (
                  <td key={cIdx} className="px-4 py-4 text-center font-semibold text-gray-800 text-sm font-sans">
                    {formatCost(row.catMult, col.mult)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TripCostMatrixTable;
