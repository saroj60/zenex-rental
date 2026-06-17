import React, { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

const CancellationPolicy = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="bg-[#fcf9ee] min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-8">
            <div className="w-16 h-16 bg-orange-50 text-[#EA580C] rounded-2xl flex items-center justify-center shrink-0">
              <AlertCircle size={32} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-[#331a47]">Cancellation Policy</h1>
              <p className="text-gray-500 font-medium mt-1">Clear and transparent refund rules</p>
            </div>
          </div>

          <div className="space-y-8 text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">1. Standard Cancellations</h2>
              <p>We understand that travel plans can change. Our standard cancellation policy is as follows:</p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li><strong>7+ days before departure:</strong> 100% full refund of your deposit.</li>
                <li><strong>3 to 6 days before departure:</strong> 50% refund of your deposit.</li>
                <li><strong>Less than 48 hours:</strong> No refund will be issued.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">2. Force Majeure & Weather</h2>
              <p>If a trip must be canceled due to extreme weather conditions, government restrictions, or natural disasters (Force Majeure) prior to departure, we offer a full refund or the option to reschedule your trip at no additional cost.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">3. How to Cancel</h2>
              <p>To cancel your booking, please contact us immediately via email at <strong>info@zenextravel.com</strong> or call us directly. Cancellations are only valid once you receive a confirmation email from our team.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancellationPolicy;
