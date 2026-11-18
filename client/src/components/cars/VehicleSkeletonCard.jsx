import React from 'react';

export default function VehicleSkeletonCard() {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-soft space-y-4 animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 bg-slate-100 rounded-2xl w-full flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-slate-200"></div>
      </div>

      {/* Title & Brand Skeleton */}
      <div className="space-y-2">
        <div className="h-4 bg-slate-200 rounded-md w-3/4"></div>
        <div className="h-3 bg-slate-100 rounded-md w-1/2"></div>
      </div>

      {/* Specs Pill Grid */}
      <div className="grid grid-cols-4 gap-2 py-3 border-y border-slate-100">
        <div className="h-8 bg-slate-100 rounded-xl"></div>
        <div className="h-8 bg-slate-100 rounded-xl"></div>
        <div className="h-8 bg-slate-100 rounded-xl"></div>
        <div className="h-8 bg-slate-100 rounded-xl"></div>
      </div>

      {/* Pricing & Button */}
      <div className="pt-2 flex items-center justify-between">
        <div className="space-y-1.5">
          <div className="h-3 bg-slate-100 rounded-md w-16"></div>
          <div className="h-5 bg-slate-200 rounded-md w-24"></div>
        </div>
        <div className="h-9 bg-slate-200 rounded-xl w-28"></div>
      </div>
    </div>
  );
}
