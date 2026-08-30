import React, { useEffect, useState } from 'react';
import SEO from '../components/SEO';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Trek & Tour Booking',
    message: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoSubject = encodeURIComponent(`Zenex Contact Form: ${formData.subject}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n\n` +
      `Message:\n${formData.message}`
    );
    window.location.href = `mailto:info@zenextravels.com?subject=${mailtoSubject}&body=${mailtoBody}`;
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "Zenex Travel",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+977-9860156046",
        "contactType": "customer service",
        "availableLanguage": ["English", "Nepali"]
      }
    }
  };

  return (
    <div className="bg-[#F4F6F8] min-h-screen pb-20">
      <SEO 
        title="Contact Us"
        description="Get in touch with Zenex Travel. Our expert team is available 24/7 for tour bookings, trek planning, and vehicle rentals across Nepal."
        canonicalUrl="https://zenextravel.com/contact"
        structuredData={structuredData}
      />
      {/* Hero Section */}
      <div className="bg-[#0a2f4c] pt-32 pb-24 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center bg-blue-900/50 border border-blue-400/30 text-blue-300 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
            <MessageCircle size={16} className="mr-2" /> 24/7 Support
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            Get in <span className="text-[#e53a24]">Touch</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100/80 font-medium max-w-2xl mx-auto">
            Whether you need help planning a bespoke Himalayan trek, booking a comprehensive tour package, or securing the perfect vehicle, our travel experts are here for you.
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Contact Information (Left Column) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <h2 className="text-2xl font-extrabold text-[#1e3a8a] mb-8">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 mr-4">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Office Address</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Samakhushi, Kathmandu 44600<br />
                      Bagmati Province, Nepal
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 mr-4">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Phone Numbers</h4>
                    <p className="text-gray-600 leading-relaxed mb-1">
                      <span className="font-medium">Sales:</span> +977 9860156046
                    </p>
                    <p className="text-gray-600 leading-relaxed mb-1">
                      <span className="font-medium">Landline:</span> 015928752
                    </p>
                    <p className="text-[#e53a24] font-bold">
                      24/7 Emergency: +977 9860156046
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 mr-4">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Email Address</h4>
                    <a href="mailto:info@zenextravels.com" className="text-blue-600 font-medium hover:underline block">
                      info@zenextravels.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 mr-4">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Operating Hours</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Sunday - Friday: 8:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 2:00 PM
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-gray-100">
                <a href="https://wa.me/9779860156046" target="_blank" rel="noreferrer" className="w-full bg-[#25D366] text-white py-4 rounded-xl font-bold hover:bg-[#1DA851] transition-colors shadow-md flex items-center justify-center gap-2">
                  <MessageCircle size={20} /> Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form (Right Column) */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 h-full">
              <h2 className="text-2xl font-extrabold text-[#1e3a8a] mb-2">Send us a Message</h2>
              <p className="text-gray-500 mb-8 font-medium">Fill out the form below and we'll get back to you as soon as possible.</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Ram Sharma" 
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e53a24]/50 focus:border-[#e53a24] transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="info@zenextravels.com" 
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e53a24]/50 focus:border-[#e53a24] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Phone Number</label>
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+977 980-0000000" 
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e53a24]/50 focus:border-[#e53a24] transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Subject</label>
                    <select 
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e53a24]/50 focus:border-[#e53a24] transition-all text-gray-700"
                    >
                      <option>Trek & Tour Booking</option>
                      <option>Vehicle Rental Inquiry</option>
                      <option>Custom Trip Planning</option>
                      <option>Flight Ticketing</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Your Message</label>
                  <textarea 
                    rows="5" 
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="How can we help you today?" 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e53a24]/50 focus:border-[#e53a24] transition-all resize-none"
                  ></textarea>
                </div>

                <button type="submit" className="bg-[#1e3a8a] text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-900 transition-colors shadow-lg flex items-center justify-center gap-2 w-full md:w-auto">
                  Send Message <Send size={18} />
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>

      {/* Map Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12 mb-12 relative z-20">
        <div className="bg-white p-4 rounded-3xl shadow-xl border border-gray-100 overflow-hidden h-[400px]">
          <iframe 
            src="https://maps.google.com/maps?q=Zenex+Car+Rental&t=&z=17&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0, borderRadius: '1rem' }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Zenex Travel Office Location"
          ></iframe>
        </div>
      </div>

    </div>
  );
};

export default Contact;
