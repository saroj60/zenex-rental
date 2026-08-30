import React, { useEffect } from 'react';
import { Lock } from 'lucide-react';

const PrivacyPolicy = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="bg-[#ebf3fa] min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-8">
            <div className="w-16 h-16 bg-blue-50 text-[#1e3a8a] rounded-2xl flex items-center justify-center shrink-0">
              <Lock size={32} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-[#1e3a8a]">Privacy Policy</h1>
              <p className="text-gray-500 font-medium mt-1">Last updated: June 2026</p>
            </div>
          </div>

          <div className="space-y-8 text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">1. Information We Collect</h2>
              <p>When you book a vehicle or tour with Zenex Travel, we collect personal information necessary to fulfill your request. This may include your name, email address, phone number, passport details (for restricted area permits), and payment information.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">2. How We Use Your Information</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>To process your bookings and provide customer support.</li>
                <li>To acquire necessary travel permits on your behalf (e.g., TIMS, ACAP).</li>
                <li>To send you important updates regarding your trip.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">3. Data Protection</h2>
              <p>We implement a variety of security measures to maintain the safety of your personal information. Your personal data is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
