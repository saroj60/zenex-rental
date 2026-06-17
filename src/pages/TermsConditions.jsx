import React, { useEffect } from 'react';
import { Shield } from 'lucide-react';

const TermsConditions = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="bg-[#fcf9ee] min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-8">
            <div className="w-16 h-16 bg-blue-50 text-[#1e3a8a] rounded-2xl flex items-center justify-center shrink-0">
              <Shield size={32} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-[#331a47]">Terms & Conditions</h1>
              <p className="text-gray-500 font-medium mt-1">Last updated: June 2026</p>
            </div>
          </div>

          <div className="space-y-8 text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">1. Agreement to Terms</h2>
              <p>By accessing or using Zenex Travel's car rental and tour services, you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, you may not access the service.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">2. Booking and Payments</h2>
              <p>All bookings are subject to vehicle availability. A minimum deposit of 20% is required to secure your booking. Full payment must be made prior to the commencement of the journey. We accept major credit cards, eSewa, and bank transfers.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">3. Vehicle Usage and Driver Policy</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>All our rentals come with an experienced, licensed professional driver. Self-drive is not permitted on off-road routes (e.g., Mustang).</li>
                <li>The renter is responsible for any damage caused to the interior of the vehicle due to negligence.</li>
                <li>Smoking is strictly prohibited inside all Zenex Travel vehicles.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">4. Liability</h2>
              <p>Zenex Travel is not liable for delays caused by natural disasters, roadblocks, political strikes, or unforeseen mechanical failures. In the event of a breakdown, we will provide a replacement vehicle as quickly as possible.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
