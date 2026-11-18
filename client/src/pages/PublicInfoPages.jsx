import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Award,
  Users,
  Compass,
  MapPin,
  Phone,
  Mail,
  Clock,
  Car,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  FileText,
  ChevronDown,
  ArrowRight,
  Send,
  Sparkles,
  Lock,
  RefreshCw,
  Calendar,
  CreditCard
} from 'lucide-react';
import CustomerFooter from '../components/customer/CustomerFooter';

// Common Breadcrumb Component
const PageBreadcrumb = ({ items }) => (
  <nav className="bg-slate-100/80 border-b border-slate-200 py-3 px-4 sm:px-6">
    <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-semibold text-slate-500">
      <Link to="/" className="hover:text-[#0755C9] transition-colors">Home</Link>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <span>/</span>
          {item.link ? (
            <Link to={item.link} className="hover:text-[#0755C9] transition-colors">{item.label}</Link>
          ) : (
            <span className="text-slate-900 font-bold">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </div>
  </nav>
);

// Common Hero Banner
const PageHero = ({ title, subtitle, badge }) => (
  <div className="bg-gradient-to-br from-[#10243A] via-[#0D1D2F] to-[#0755C9] text-white py-14 px-4 sm:px-6 relative overflow-hidden">
    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
    <div className="max-w-4xl mx-auto text-center relative z-10 space-y-3">
      {badge && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/10 text-[#F5A623] border border-white/15">
          <Sparkles className="w-3.5 h-3.5" />
          {badge}
        </span>
      )}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">{title}</h1>
      <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
    </div>
  </div>
);

// ==========================================
// 1. ABOUT US PAGE
// ==========================================
export const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-[#F5F8FC] flex flex-col justify-between">
      <div>
        <PageHero
          title="About Nepal Car Rental"
          subtitle="Pioneering modern, safe, and transparent vehicle mobility across the Himalayas since 2018."
          badge="Company Overview"
        />
        <PageBreadcrumb items={[{ label: 'About Us' }]} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
          {/* Mission & Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs font-black text-[#0755C9] uppercase tracking-wider">Our Journey</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                Empowering Travelers & Locals with Seamless Wheels in Nepal
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Founded with a vision to streamline road travel across Nepal's diverse terrains, Nepal Car Rental has grown from a humble fleet of 5 vehicles in Kathmandu to Nepal's most technologically integrated rental provider.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Whether you need a compact electric hatchback for navigating Kathmandu's historic alleyways, an executive chauffeur-driven sedan for diplomatic meetings, or a rugged 4x4 Mahindra Scorpio for the high-altitude trails of Mustang and Manang, our certified fleet delivers unmatched reliability.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <Link to="/cars" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0755C9] text-white text-xs font-bold hover:bg-blue-700 transition-colors shadow-md">
                  Explore Verified Fleet <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs font-bold hover:bg-slate-50 transition-colors">
                  Contact Our Team
                </Link>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <span className="text-3xl font-black text-[#0755C9]">12,500+</span>
                <p className="text-xs font-bold text-slate-500 mt-1">Trips Completed Safely</p>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <span className="text-3xl font-black text-[#F5A623]">4.9 / 5</span>
                <p className="text-xs font-bold text-slate-500 mt-1">Customer Satisfaction</p>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <span className="text-3xl font-black text-slate-900">77</span>
                <p className="text-xs font-bold text-slate-500 mt-1">Districts Coverage Network</p>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <span className="text-3xl font-black text-emerald-600">24/7</span>
                <p className="text-xs font-bold text-slate-500 mt-1">Highway Emergency Support</p>
              </div>
            </div>
          </div>

          {/* Pillars */}
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">The Nepal Car Rental Standard</h3>
              <p className="text-xs text-slate-500">Every vehicle and journey adheres to strict safety, legal, and operational audits.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0755C9] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Comprehensive Insurance</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Every self-drive and chauffeur trip is protected under full commercial comprehensive insurance with third-party liability coverage.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#F5A623] flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Verified & Sanitized Fleet</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Vehicles undergo a 42-point mechanical check before every dispatch, ensuring optimal brakes, tire health, and air conditioning.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Licensed Professional Drivers</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our chauffeurs possess over 5+ years of mountainous highway experience, verified by Nepal Department of Transport (Yatayat Byabastha).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CustomerFooter />
    </div>
  );
};

// ==========================================
// 2. HOW IT WORKS PAGE
// ==========================================
export const HowItWorksPage = () => {
  const steps = [
    {
      num: '01',
      title: 'Choose Vehicle & Dates',
      desc: 'Browse our real-time catalog of sedans, SUVs, electric vehicles, and vans. Select pickup/drop-off locations and dates.',
      icon: Car
    },
    {
      num: '02',
      title: 'Verify Documents Online',
      desc: 'Upload your valid Nepal Driving Licence (or International Driving Permit) and Citizenship/Passport via our secure checkout.',
      icon: FileText
    },
    {
      num: '03',
      title: 'Confirm with Secure Payment',
      desc: 'Pay safely using eSewa, Khalti, Fonepay QR, Corporate Bank Transfer, or choose Cash on Pickup.',
      icon: CreditCard
    },
    {
      num: '04',
      title: 'Receive Key & Drive',
      desc: 'Pick up your keys at our Thamel/Pokhara hub or receive doorstep delivery to your hotel/Tribhuvan International Airport (KTM).',
      icon: CheckCircle2
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F8FC] flex flex-col justify-between">
      <div>
        <PageHero
          title="How It Works"
          subtitle="Rent your dream car in 4 simple steps. Quick, transparent, and 100% digital."
          badge="Simple 4-Step Process"
        />
        <PageBreadcrumb items={[{ label: 'How It Works' }]} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
          {/* Steps Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st, i) => {
              const Icon = st.icon;
              return (
                <div key={i} className="relative p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-black text-slate-200">{st.num}</span>
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0755C9] flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{st.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{st.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Rental Modes Explained */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-blue-50 text-[#0755C9]">Option A</span>
              <h4 className="text-lg font-bold text-slate-900">Self-Drive Experience</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Enjoy total freedom across Nepal's scenic highways. Requires a valid driving licence (minimum 2 years old) and a refundable security deposit of NPR 25,000 returned upon vehicle check-in.
              </p>
              <ul className="text-xs text-slate-600 space-y-1.5 pt-2">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Unlimited km options available</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 24/7 highway roadside assistance included</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-amber-50 text-amber-600">Option B</span>
              <h4 className="text-lg font-bold text-slate-900">With Professional Chauffeur</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Sit back, relax, and let our courteous, route-certified drivers handle narrow turns, mountain roads, and city traffic. Driver allowance and food are covered with ZERO security deposit.
              </p>
              <ul className="text-xs text-slate-600 space-y-1.5 pt-2">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> NPR 0 security deposit required</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> English & Nepali speaking drivers</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <CustomerFooter />
    </div>
  );
};

// ==========================================
// 3. CONTACT PAGE
// ==========================================
export const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F5F8FC] flex flex-col justify-between">
      <div>
        <PageHero
          title="Contact Nepal Car Rental"
          subtitle="Our reservation and roadside support team is ready to assist you 24 hours a day, 7 days a week."
          badge="Get In Touch"
        />
        <PageBreadcrumb items={[{ label: 'Contact Us' }]} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Details Card */}
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-[#10243A] text-white space-y-5 shadow-lg">
                <h3 className="text-lg font-black">Headquarters & Hubs</h3>

                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#F5A623] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white">Kathmandu Central Office</p>
                      <p className="text-slate-400">Tridevi Marg, Thamel, Kathmandu 44600</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#F5A623] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white">Pokhara Hub</p>
                      <p className="text-slate-400">Lakeside Road, Ward 6, Pokhara 33700</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white">24/7 Hotline</p>
                      <p className="text-slate-400">+977 1 4528900 / +977 9841892011</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white">Email Address</p>
                      <p className="text-slate-400">support@nepalcarrental.com.np</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>PAN: 609821445</span>
                  <span className="text-emerald-400 font-bold">Open 24/7</span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 p-8 rounded-2xl bg-white border border-slate-200 shadow-xs">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900">Message Received!</h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    Dhanyabad! Our Kathmandu operations team has received your inquiry. A representative will contact you within 30 minutes.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', message: '' }); }}
                    className="px-5 py-2 rounded-xl bg-[#0755C9] text-white text-xs font-bold hover:bg-blue-700 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-lg font-black text-slate-900">Send an Inquiry or Quote Request</h3>
                    <p className="text-xs text-slate-500">Need a long-term corporate rental or custom Himalayan tour? Leave us a message.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Ramesh Adhikari"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0755C9] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Nepal Mobile / WhatsApp *</label>
                      <input
                        type="text"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="98XXXXXXXX"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0755C9] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="your.email@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0755C9] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Message or Rental Requirements *</label>
                    <textarea
                      rows={4}
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Describe preferred dates, destinations (e.g. Pokhara, Muktinath), vehicle type, or specific questions..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0755C9] focus:outline-hidden"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0755C9] text-white text-xs font-bold hover:bg-blue-700 transition-colors shadow-md cursor-pointer"
                  >
                    <Send className="w-4 h-4" /> Submit Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <CustomerFooter />
    </div>
  );
};

// ==========================================
// 4. FAQ PAGE
// ==========================================
export const FaqPage = () => {
  const [openIdx, setOpenIdx] = useState(null);

  const faqs = [
    {
      q: 'What documents are required to rent a self-drive car in Nepal?',
      a: 'For Nepali citizens: Valid Nepal Driving Licence (minimum 1 year old) and National Citizenship / Passport. For International tourists: Valid National Driving Licence accompanied by an International Driving Permit (IDP) and Passport with Nepal Tourist Visa.'
    },
    {
      q: 'How does the refundable security deposit work?',
      a: 'For self-drive rentals, a refundable security deposit of NPR 25,000 is required upon booking/vehicle hand-over. Once the vehicle is returned without damage or traffic violations, the deposit is refunded within 24 to 48 hours directly to your eSewa, Khalti, or bank account. Chauffeur-driven rentals require NPR 0 deposit.'
    },
    {
      q: 'What happens if the vehicle breaks down or gets a flat tire?',
      a: 'We provide 24/7 emergency roadside assistance across major Nepal arterial highways (Prithvi Highway, Tribhuvan Highway, East-West Highway). If a mechanical fault occurs, our mobile mechanic team responds immediately or provides an equivalent replacement vehicle free of charge.'
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept digital instant payments via eSewa, Khalti, and Fonepay QR, corporate wire transfers to Nabil Bank, and Cash on Pickup at our designated pickup counters.'
    },
    {
      q: 'Can I pick up a car in Kathmandu and drop it off in Pokhara?',
      a: 'Yes! We support one-way intercity rentals between Kathmandu, Pokhara, and Chitwan. A standard one-way relocation surcharge applies and is automatically calculated during checkout.'
    },
    {
      q: 'Is fuel included in the rental price?',
      a: 'All rentals operate on a "Same-to-Same" fuel policy. If the vehicle is handed over with a full tank, it should be returned with a full tank. For chauffeur-driven trips, all-inclusive fuel options can also be arranged.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F8FC] flex flex-col justify-between">
      <div>
        <PageHero
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about renting a car, documents, deposits, and driving in Nepal."
          badge="Help & Knowledge Base"
        />
        <PageBreadcrumb items={[{ label: 'FAQs' }]} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-4">
          {faqs.map((f, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/80 transition-colors"
                >
                  <span className="text-sm font-bold text-slate-900">{f.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? 'rotate-180 text-[#0755C9]' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}

          <div className="p-6 rounded-2xl bg-blue-50 border border-blue-100 text-center space-y-2 mt-8">
            <h4 className="text-sm font-bold text-[#0755C9]">Still have questions?</h4>
            <p className="text-xs text-slate-600">Our customer support agents are standing by to guide you through your booking.</p>
            <div className="pt-2">
              <Link to="/contact" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0755C9] text-white text-xs font-bold hover:bg-blue-700 transition-colors">
                Contact Customer Care <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <CustomerFooter />
    </div>
  );
};

// ==========================================
// 5. TERMS & CONDITIONS PAGE
// ==========================================
export const TermsPage = () => {
  return (
    <div className="min-h-screen bg-[#F5F8FC] flex flex-col justify-between">
      <div>
        <PageHero
          title="Terms & Conditions"
          subtitle="Legal guidelines and rental agreement rules for Nepal Car Rental Services Pvt. Ltd."
          badge="Legal Agreement"
        />
        <PageBreadcrumb items={[{ label: 'Terms & Conditions' }]} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-8 text-xs text-slate-600 leading-relaxed">
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-400">Effective Date: January 1, 2026 | Kathmandu, Nepal</span>
              <h2 className="text-lg font-black text-slate-900">1. Master Rental Agreement</h2>
              <p>
                By reserving or operating a motor vehicle provided by Nepal Car Rental Services Pvt. Ltd. (Company Registration NCR-2018-99214, PAN 609821445), the renter agrees to comply with all terms herein and the Motor Vehicle and Transport Management Act of Nepal (2049 BS).
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900">2. Driver Eligibility & Licences</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>The renter must be at least 21 years of age for standard vehicles and 25 years for 4x4 off-road SUVs.</li>
                <li>The driver must present an original, unexpired Driving Licence issued by the Government of Nepal or a valid International Driving Permit (IDP).</li>
                <li>Only authorized drivers named in the rental voucher are insured to operate the vehicle. Unapproved third-party driving voids all insurance coverages.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900">3. Security Deposit & Returns</h3>
              <p>
                A refundable deposit of NPR 25,000 is collected for self-drive vehicles. The deposit will be released within 24 to 48 hours post-inspection, deducting any unpaid tolls, traffic violation citations issued by Nepal Traffic Police, or vehicle damage.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900">4. Prohibited Uses</h3>
              <p>Vehicles must NOT be used for:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Commercial ride-hailing or unauthorized passenger transport for hire.</li>
                <li>Driving under the influence of alcohol, narcotics, or intoxicating substances (Zero Tolerance under Nepal Law).</li>
                <li>Crossing international borders into India or China without prior written embassy/customs permits.</li>
                <li>Rally racing, vehicle testing, or off-roading beyond designated trails without 4x4 clearance.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900">5. Fuel & Cleanliness</h3>
              <p>
                All vehicles operate under the "Same-to-Same" fuel rule. Failure to return the vehicle at the agreed fuel level incurs a refueling charge equal to the prevailing Nepal Oil Corporation (NOC) fuel rate plus a 10% service surcharge.
              </p>
            </div>
          </div>
        </div>
      </div>
      <CustomerFooter />
    </div>
  );
};

// ==========================================
// 6. PRIVACY POLICY PAGE
// ==========================================
export const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-[#F5F8FC] flex flex-col justify-between">
      <div>
        <PageHero
          title="Privacy & Data Protection Policy"
          subtitle="How we collect, safeguard, and respect your personal identification and driving credentials."
          badge="Privacy First"
        />
        <PageBreadcrumb items={[{ label: 'Privacy Policy' }]} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-8 text-xs text-slate-600 leading-relaxed">
            <div className="space-y-2">
              <h2 className="text-lg font-black text-slate-900">1. Information We Collect</h2>
              <p>
                When you create an account or book a rental with Nepal Car Rental, we collect your full legal name, email address, mobile phone number, physical address, and required government documents (Nepal Driving Licence, Citizenship Card, or Passport).
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900">2. Storage & Encryption of Documents</h3>
              <p>
                Identity and driving licence files uploaded during checkout are stored on private, encrypted server volumes. Access is strictly restricted to certified administrative verification personnel and is never sold, traded, or shared with third-party advertisers.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900">3. Payment Information Security</h3>
              <p>
                All digital transactions via eSewa, Khalti, and Fonepay are processed over 256-bit SSL encrypted channels. Nepal Car Rental does not store your bank passwords, MPINs, or credit card CVV codes on our servers.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900">4. GPS Vehicle Telematics</h3>
              <p>
                For passenger safety and highway breakdown recovery, vehicles are fitted with GPS location trackers. Location telemetry is accessed solely for emergency rescue, theft recovery, and geo-fence tracking.
              </p>
            </div>
          </div>
        </div>
      </div>
      <CustomerFooter />
    </div>
  );
};

// ==========================================
// 7. CANCELLATION & REFUND POLICY PAGE
// ==========================================
export const CancellationPolicyPage = () => {
  return (
    <div className="min-h-screen bg-[#F5F8FC] flex flex-col justify-between">
      <div>
        <PageHero
          title="Cancellation & Refund Policy"
          subtitle="Clear, fair, and transparent cancellation rules for all vehicle bookings in Nepal."
          badge="Transparent Policy"
        />
        <PageBreadcrumb items={[{ label: 'Cancellation Policy' }]} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
          {/* Policy Matrix Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-emerald-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-600">Free Cancellation</span>
                <Clock className="w-5 h-5 text-emerald-500" />
              </div>
              <h3 className="text-base font-bold text-slate-900">More than 24 Hours Before Pickup</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                If you cancel your reservation more than 24 hours prior to the scheduled pickup time, you receive a <b>100% full refund</b> of your rental amount and security deposit. No cancellation fees apply.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-amber-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-amber-50 text-amber-600">Late Cancellation</span>
                <AlertCircle className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Within 24 Hours of Pickup</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cancellations made within 24 hours of pickup incur a flat cancellation fee of <b>NPR 2,500</b> to cover vehicle prep, reservation lock, and allocation loss. The remaining balance and full deposit are refunded.
              </p>
            </div>
          </div>

          {/* Refund Timeline & Process */}
          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6 text-xs text-slate-600 leading-relaxed">
            <h3 className="text-sm font-bold text-slate-900">Refund Processing Timeline</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <RefreshCw className="w-4 h-4 text-[#0755C9] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-800">eSewa & Khalti Wallets</p>
                  <p className="text-slate-500">Processed within 24 business hours directly back to the originating wallet identifier.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <RefreshCw className="w-4 h-4 text-[#0755C9] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-800">Bank Wire / Fonepay Transactions</p>
                  <p className="text-slate-500">Credited to customer bank accounts within 2 to 3 Nepal banking days.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <RefreshCw className="w-4 h-4 text-[#0755C9] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-800">Cash on Pickup Bookings</p>
                  <p className="text-slate-500">No advance charge is deducted; booking is simply released back into the available pool.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <h4 className="text-xs font-bold text-slate-800 mb-1">Unforeseen Natural Events (Force Majeure):</h4>
              <p className="text-slate-500">
                In cases of severe landslides, highway closures by Department of Roads, or extreme weather conditions affecting your route (e.g. Narayangadh-Mugling road closure), 100% full credit or free date reschedule is granted upon notification.
              </p>
            </div>
          </div>
        </div>
      </div>
      <CustomerFooter />
    </div>
  );
};
