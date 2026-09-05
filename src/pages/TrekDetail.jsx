import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Clock, DollarSign, MapPin, CheckCircle2, ArrowLeft, Calendar,
  Mountain, Bed, Utensils, Users, Sun, Check, X, Map as MapIcon, Car, Star,
  ShieldCheck, CalendarCheck, FileText, Info, HelpCircle, Heart, Phone, Plus, Minus, Image as ImageIcon,
  AlertTriangle, Backpack, PlaneTakeoff, Activity, ChevronDown
} from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import SEO from '../components/SEO';
import html2pdf from 'html2pdf.js';
import TrustReviewBadges from '../components/TrustReviewBadges';

const TrekDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { treks } = useAppData();
  
  const [trek, setTrek] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [packageType, setPackageType] = useState('Budget');
  const [date, setDate] = useState('');
  const [persons, setPersons] = useState(2);
  const [isDiscountOpen, setIsDiscountOpen] = useState(false);
  
  // Active tab state for sticky nav
  const [activeTab, setActiveTab] = useState('overview');

  const getBasePriceNum = () => {
    if (!trek || !trek.price) return 0;
    const basePriceStr = trek.price.replace(/[^0-9.]/g, '');
    return parseFloat(basePriceStr) || 0;
  };

  const getDiscountedPerPersonPrice = (pax) => {
    let rawVal = null;

    if (Array.isArray(trek?.groupDiscounts)) {
      const tier = trek.groupDiscounts.find(item => {
        const paxStr = String(item.pax || item.paxRange || '');
        const matches = paxStr.match(/\d+/g);
        if (matches && matches.length >= 2) {
          const min = parseInt(matches[0], 10);
          const max = parseInt(matches[1], 10);
          return pax >= min && pax <= max;
        } else if (matches && matches.length === 1) {
          const min = parseInt(matches[0], 10);
          return pax >= min;
        }
        return false;
      });

      if (tier && tier.price) {
        rawVal = tier.price;
      }
    } else if (trek?.groupDiscounts && typeof trek.groupDiscounts === 'object') {
      if (pax >= 16 && trek.groupDiscounts["16"]) rawVal = trek.groupDiscounts["16"];
      else if (pax >= 12 && trek.groupDiscounts["12"]) rawVal = trek.groupDiscounts["12"];
      else if (pax >= 8 && trek.groupDiscounts["8"]) rawVal = trek.groupDiscounts["8"];
      else if (pax >= 4 && trek.groupDiscounts["4"]) rawVal = trek.groupDiscounts["4"];
      else if (pax >= 2 && trek.groupDiscounts["2"]) rawVal = trek.groupDiscounts["2"];
    }

    if (rawVal) {
      if (typeof rawVal === 'number') return rawVal;
      if (typeof rawVal === 'string') {
        const num = parseFloat(rawVal.replace(/[^0-9.]/g, ''));
        if (!isNaN(num) && num > 0) return num;
      }
    }

    const base = getBasePriceNum();
    if (!base) return 0;
    
    // Fallback Group discount logic
    if (pax >= 16) return Math.max(0, base - 145);
    if (pax >= 12) return Math.max(0, base - 140);
    if (pax >= 8) return Math.max(0, base - 115);
    if (pax >= 4) return Math.max(0, base - 95);
    return base;
  };

  const calculatePrice = () => {
    const discountedBase = getDiscountedPerPersonPrice(persons);
    if (!discountedBase) return trek?.price || null;
    
    let multiplier = 1;
    if (packageType === 'Comfort') multiplier = 1.3;
    if (packageType === 'Standard') multiplier = 1.5;
    if (packageType === 'Luxury') multiplier = 1.8;
    
    const finalPrice = Math.round(discountedBase * persons * multiplier);
    return `US$${finalPrice}`;
  };

  const currentPrice = calculatePrice();
  const perPersonPrice = getDiscountedPerPersonPrice(persons);

  const handleBookPackage = () => {
    navigate(`/checkout?pkg=${id}&travelers=${persons}&date=${date}`);
  };

  const handleQuickInquiry = () => {
    const message = `Hi! I have some questions about the ${trek.title}. Can you please help me?`;
    window.open(`https://wa.me/9779767476521?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleDownloadPDF = () => {
    const element = document.createElement('div');
    element.style.padding = '40px';
    element.style.fontFamily = 'sans-serif';
    element.style.color = '#333';
    
    // Add header branding
    const headerHtml = `
      <div style="border-bottom: 2px solid #e53a24; padding-bottom: 20px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h1 style="color: #1e3a8a; margin: 0; font-size: 28px;">Zenex Travels and Tours</h1>
          <p style="color: #e53a24; margin: 5px 0 0 0; font-size: 14px; font-weight: bold;">Himalayan Tours & Trekking Experts</p>
        </div>
        <div style="text-align: right;">
          <p style="margin: 0; font-size: 12px; color: #666;">Web: zenextravels.com</p>
          <p style="margin: 3px 0 0 0; font-size: 12px; color: #666;">Phone: +977 9767476521</p>
        </div>
      </div>
    `;
    
    // Add trip details
    const tripTitleHtml = `
      <div style="margin-bottom: 25px;">
        <span style="background-color: #e53a24; color: white; padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: bold; text-transform: uppercase;">Trekking</span>
        <h2 style="color: #1e3a8a; font-size: 24px; margin: 10px 0 5px 0;">${trek.title}</h2>
        <p style="color: #666; font-size: 13px; margin: 0;">Duration: ${trek.duration || 'N/A'} ${trek.price ? `| Price: From ${trek.price}` : ''}</p>
      </div>
    `;

    // Quick Facts
    const facts = trek.quickFacts || {};
    const factsHtml = `
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 15px; margin-bottom: 25px;">
        <h3 style="color: #1e3a8a; margin: 0 0 10px 0; font-size: 16px; border-bottom: 1px solid #cbd5e1; padding-bottom: 5px;">Quick Facts</h3>
        <table style="width: 100%; font-size: 13px; border-collapse: collapse;">
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #475569; width: 35%;">Duration:</td>
            <td style="padding: 6px 0; color: #0f172a;">${trek.duration || 'N/A'}</td>
            <td style="padding: 6px 0; font-weight: bold; color: #475569; width: 30%;">Difficulty:</td>
            <td style="padding: 6px 0; color: #0f172a;">${trek.difficulty || 'Easy'}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #475569;">Max Altitude:</td>
            <td style="padding: 6px 0; color: #0f172a;">${facts.maxAltitude || 'N/A'}</td>
            <td style="padding: 6px 0; font-weight: bold; color: #475569;">Best Season:</td>
            <td style="padding: 6px 0; color: #0f172a;">${facts.bestSeason || 'Spring & Autumn'}</td>
          </tr>
        </table>
      </div>
    `;

    // Overview / Description
    const overviewHtml = `
      <div style="margin-bottom: 25px;">
        <h3 style="color: #1e3a8a; font-size: 16px; margin: 0 0 10px 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px;">Overview</h3>
        <div style="font-size: 13px; line-height: 1.6; color: #334155; margin: 0;">${trek.description || ''}</div>
      </div>
    `;

    // Highlights
    let highlightsHtml = '';
    if (trek.highlights && trek.highlights.length > 0) {
      highlightsHtml = `
        <div style="margin-bottom: 25px; page-break-inside: avoid;">
          <h3 style="color: #1e3a8a; font-size: 16px; margin: 0 0 10px 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px;">Highlights</h3>
          <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #334155; line-height: 1.6;">
            ${trek.highlights.map(h => `<li>${h}</li>`).join('')}
          </ul>
        </div>
      `;
    }

    // Itinerary
    let itineraryHtml = '';
    if (trek.itinerary && trek.itinerary.length > 0) {
      itineraryHtml = `
        <div style="page-break-before: always;">
          <h3 style="color: #1e3a8a; font-size: 18px; margin: 0 0 15px 0; border-bottom: 2px solid #1e3a8a; padding-bottom: 5px;">Day-by-Day Itinerary</h3>
          ${trek.itinerary.map((day, idx) => `
            <div style="margin-bottom: 20px; border-left: 3px solid #10b981; padding-left: 15px; page-break-inside: avoid;">
              <h4 style="margin: 0 0 5px 0; color: #0f172a; font-size: 14px; font-weight: bold;">Day ${day.dayNumber || (idx + 1)}: ${day.title}</h4>
              <p style="margin: 0; font-size: 12.5px; line-height: 1.5; color: #475569;">${day.description || day.desc || ''}</p>
            </div>
          `).join('')}
        </div>
      `;
    }

    // Inclusions & Exclusions
    let costDetailsHtml = '';
    if ((trek.costIncludes && trek.costIncludes.length > 0) || (trek.costExcludes && trek.costExcludes.length > 0)) {
      costDetailsHtml = `
        <div style="page-break-before: always; margin-top: 20px;">
          <h3 style="color: #1e3a8a; font-size: 18px; margin: 0 0 15px 0; border-bottom: 2px solid #1e3a8a; padding-bottom: 5px;">Cost Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="width: 50%; vertical-align: top; padding-right: 15px;">
                <h4 style="color: #10b981; font-size: 14px; margin: 0 0 10px 0;">What's Included</h4>
                <ul style="margin: 0; padding-left: 20px; font-size: 12px; color: #334155; line-height: 1.5;">
                  ${(trek.costIncludes || []).map(inc => `<li>${inc}</li>`).join('')}
                </ul>
              </td>
              <td style="width: 50%; vertical-align: top; padding-left: 15px; border-left: 1px solid #e2e8f0;">
                <h4 style="color: #e53a24; font-size: 14px; margin: 0 0 10px 0;">What's Excluded</h4>
                <ul style="margin: 0; padding-left: 20px; font-size: 12px; color: #334155; line-height: 1.5;">
                  ${(trek.costExcludes || []).map(exc => `<li>${exc}</li>`).join('')}
                </ul>
              </td>
            </tr>
          </table>
        </div>
      `;
    }

    // Additional Package Information (Essential Info, Equipment, FAQs)
    let extraInfoHtml = '';
    const essential = trek.essentialInfo || trek.usefulInfo || trek.information;
    const gear = trek.equipment || trek.packingList;
    const faqs = trek.faqs || [];

    if (essential || gear || (faqs && faqs.length > 0)) {
      let content = '';
      if (essential) {
        content += `<h4 style="color:#1e3a8a;margin-top:15px;margin-bottom:5px;font-size:14px;">Essential & Useful Information</h4><div style="font-size:12px;line-height:1.6;color:#334155;">${essential.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n\n/g, '<br/>')}</div>`;
      }
      if (gear) {
        content += `<h4 style="color:#1e3a8a;margin-top:15px;margin-bottom:5px;font-size:14px;">Equipment & Packing Checklist</h4><div style="font-size:12px;line-height:1.5;color:#334155;">${Array.isArray(gear) ? `<ul style="padding-left:20px;margin:5px 0;">${gear.map(i => `<li>${i}</li>`).join('')}</ul>` : gear}</div>`;
      }
      if (faqs && faqs.length > 0) {
        content += `<h4 style="color:#1e3a8a;margin-top:15px;margin-bottom:5px;font-size:14px;">Frequently Asked Questions</h4>`;
        faqs.forEach(faq => {
          content += `<div style="margin-bottom:8px;"><strong style="font-size:12.5px;color:#0f172a;">Q: ${faq.question || faq.title}</strong><p style="margin:2px 0 0 0;font-size:12px;color:#475569;">${faq.answer || faq.desc}</p></div>`;
        });
      }
      extraInfoHtml = `
        <div style="margin-top: 25px; page-break-inside: avoid;">
          <h3 style="color: #1e3a8a; font-size: 16px; margin: 0 0 10px 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px;">Package Details & Essential Info</h3>
          ${content}
        </div>
      `;
    }

    // Footer info
    const footerHtml = `
      <div style="margin-top: 40px; border-top: 1px dashed #cbd5e1; padding-top: 15px; text-align: center; font-size: 11px; color: #94a3b8; page-break-inside: avoid;">
        <p>Thank you for choosing Zenex Travels and Tours. For bookings and inquiries, please visit our website or contact us.</p>
        <p style="margin: 5px 0 0 0;">© ${new Date().getFullYear()} Zenex Travels and Tours. All Rights Reserved.</p>
      </div>
    `;

    element.innerHTML = `
      ${headerHtml}
      ${tripTitleHtml}
      ${factsHtml}
      ${overviewHtml}
      ${highlightsHtml}
      ${itineraryHtml}
      ${costDetailsHtml}
      ${extraInfoHtml}
      ${footerHtml}
    `;

    const opt = {
      margin:       10,
      filename:     `${trek.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_itinerary.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { 
        scale: 2, 
        useCORS: true,
        onclone: (clonedDoc) => {
          const styles = clonedDoc.querySelectorAll('style');
          styles.forEach(s => {
            if (s.textContent && s.textContent.includes('oklch')) {
              s.textContent = s.textContent.replace(/oklch\([^)]+\)/g, '#333333');
            }
          });
        }
      },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(element).set(opt).save();
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Offset for sticky nav height
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
      // Note: activeTab will also update automatically via scroll listener, but setting it here provides instant feedback
      setActiveTab(sectionId);
    }
  };

  const [isScrolledDown, setIsScrolledDown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > 100) {
        setIsScrolledDown(true);
      } else {
        setIsScrolledDown(false);
      }

      const sections = ['overview', 'gallery', 'itinerary', 'cost', 'info', 'faqs'];
      const scrollPosition = currentY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section);
        if (element) {
          const elementTop = element.getBoundingClientRect().top + currentY;
          if (scrollPosition >= elementTop) {
            setActiveTab(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-slide subnav scrollable container to keep active tab centered as user scrolls
  useEffect(() => {
    if (!activeTab) return;
    const activeBtn = document.getElementById(`trek-subnav-btn-${activeTab}`);
    const navContainer = document.getElementById('trek-subnav-scroll-container');
    if (activeBtn && navContainer) {
      const containerWidth = navContainer.clientWidth;
      const btnLeft = activeBtn.offsetLeft;
      const btnWidth = activeBtn.clientWidth;
      const targetScrollLeft = btnLeft - (containerWidth / 2) + (btnWidth / 2);
      navContainer.scrollTo({
        left: Math.max(0, targetScrollLeft),
        behavior: 'smooth'
      });
    }
  }, [activeTab]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const foundTrek = treks.find(t => t.id === id || t.slug === id || t.id === `TRIP-${id}` || t.slug === `TRIP-${id}`);
    setTrek(foundTrek);
  }, [id, treks]);

  useEffect(() => {
    if (!trek) return;
    const images = trek.gallery?.length ? trek.gallery : [trek.image || '/images/trek.png'];
    if (images.length > 1) {
      const timer = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [trek]);

  if (!trek) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Trek not found</h2>
          <Link to="/treks" className="text-[#e53a24] hover:underline flex items-center justify-center gap-2">
            <ArrowLeft size={16} /> Back to Treks
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-white">
      <SEO 
        title={`${trek.title} | Zenex Rental`}
        description={trek.description}
      />

      {/* Hero Section (Clean Image Banner / Flex Accordion Gallery) */}
      <div className="relative h-[75vh] min-h-[550px] w-full overflow-hidden bg-gray-900 p-2 md:p-3">
        {(() => {
          const images = [];
          if (trek.image) images.push(trek.image);
          if (trek.gallery && trek.gallery.length > 0) {
            trek.gallery.forEach(img => {
              if (!images.includes(img)) images.push(img);
            });
          }
          const displayImages = images.length > 0 ? images : ['/images/trek.png'];

          if (displayImages.length === 1) {
            return (
              <div 
                className="absolute inset-0 w-full h-full bg-cover bg-center opacity-85"
                style={{ backgroundImage: `url("${displayImages[0]}")` }}
              />
            );
          }

          if (displayImages.length === 2) {
            return (
              <div className="flex h-full w-full gap-2 md:gap-3 relative z-0">
                {displayImages.slice(0, 2).map((img, idx) => (
                  <div 
                    key={idx}
                    className="relative h-full rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-in-out flex-1 hover:flex-[1.2] group"
                  >
                    <div 
                      className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-105"
                      style={{ backgroundImage: `url("${img}")` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />
                  </div>
                ))}
              </div>
            );
          }

          return (
            <div className="flex h-full w-full gap-2 md:gap-3 relative z-0">
              <div className="relative h-full rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-in-out flex-[2] hover:flex-[2.5] group">
                <div 
                  className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-105"
                  style={{ backgroundImage: `url("${displayImages[0]}")` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />
              </div>
              <div className="relative h-full rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-in-out flex-[1] hover:flex-[1.4] group">
                <div 
                  className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-105"
                  style={{ backgroundImage: `url("${displayImages[1] || displayImages[0]}")` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />
              </div>
              <div className="relative h-full rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-in-out flex-[1] hover:flex-[1.4] group">
                <div 
                  className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-105"
                  style={{ backgroundImage: `url("${displayImages[2] || displayImages[0]}")` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />
              </div>
            </div>
          );
        })()}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none z-10" />
      </div>

      {/* Trek Header details below Hero */}
      <div className="bg-white border-b border-gray-150 pt-8 pb-6">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Link to="/treks" className="inline-flex items-center gap-1.5 text-slate-500 hover:text-[#e53a24] mb-4 text-xs font-bold uppercase tracking-wider transition-colors">
            <ArrowLeft size={14} /> Back to Treks
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 leading-tight tracking-tight">{trek.title}</h1>
          <TrustReviewBadges title={trek.title} />
          
          <div className="flex flex-wrap items-center gap-6 text-slate-600">
            {trek.rating && (
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-bold text-slate-800">
                  {trek.rating} <span className="text-xs font-normal text-slate-500">({trek.reviewsCount || 0} reviews)</span>
                </span>
              </div>
            )}
            {trek.duration && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-semibold text-slate-700">{trek.duration}</span>
              </div>
            )}
            {trek.difficulty && (
              <div className="flex items-center gap-1.5">
                <Mountain className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-semibold text-slate-700">{trek.difficulty}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Navigation Bar */}
      <div className={`bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky ${isScrolledDown ? 'top-0' : 'top-[56px] md:top-[68px]'} z-40 shadow-sm w-full transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-2 md:px-8">
          <div id="trek-subnav-scroll-container" className="flex items-center gap-1 md:gap-2 overflow-x-auto whitespace-nowrap scroll-smooth touch-pan-x [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-1">
            {[
              { id: 'overview', label: 'Overview', icon: FileText },
              { id: 'gallery', label: 'Gallery', icon: ImageIcon },
              { id: 'itinerary', label: 'Itinerary', icon: MapIcon },
              { id: 'cost', label: 'Cost Details', icon: DollarSign },
              { id: 'info', label: 'Essential Info', icon: Info },
              { id: 'faqs', label: 'FAQs', icon: HelpCircle }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  id={`trek-subnav-btn-${tab.id}`}
                  onClick={() => scrollToSection(tab.id)}
                  className={`flex items-center gap-1.5 py-3 md:py-3.5 px-3.5 md:px-4 font-bold text-xs uppercase tracking-wider border-b-2 md:border-b-4 transition-all duration-200 shrink-0 select-none cursor-pointer rounded-t-lg ${
                    activeTab === tab.id
                      ? 'border-[#e53a24] text-[#e53a24] bg-red-50/50 scale-[1.02]'
                      : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon size={14} className="shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Main Content */}
            <div id="trek-details-content" className="lg:col-span-2 space-y-10">
              
              {/* Quick Facts Grid (Redesigned) */}
              <div id="overview" className="bg-[#eff6f1] rounded-2xl p-6 md:p-8 border border-green-100 shadow-sm scroll-mt-40">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif">Trip Facts</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4">
                {trek.facts ? (
                  Object.entries(trek.facts).map(([key, value], idx) => {
                    const icons = {
                      "Country": MapPin,
                      "Duration": Calendar,
                      "Trip Grade": Mountain,
                      "Max. Altitude": Mountain,
                      "Starts": MapIcon,
                      "Ends": CheckCircle2,
                      "Activities": Users,
                      "Accomodation": Bed,
                      "Meals": Utensils,
                      "Best Time": Sun
                    };
                    const IconComponent = icons[key] || CheckCircle2;
                    return (
                      <div key={idx} className="flex gap-3">
                        <IconComponent className="w-6 h-6 text-gray-500 shrink-0" />
                        <div>
                          <p className="text-[11px] text-gray-500 uppercase font-semibold">{key}</p>
                          <p className="text-sm font-bold text-gray-900">{value}</p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <>
                    <div className="flex gap-3">
                      <MapPin className="w-6 h-6 text-gray-500 shrink-0" />
                      <div><p className="text-[11px] text-gray-500 uppercase font-semibold">Country</p><p className="text-sm font-bold text-gray-900">Nepal</p></div>
                    </div>
                    <div className="flex gap-3">
                      <Calendar className="w-6 h-6 text-gray-500 shrink-0" />
                      <div><p className="text-[11px] text-gray-500 uppercase font-semibold">Duration</p><p className="text-sm font-bold text-gray-900">{trek.duration}</p></div>
                    </div>
                    <div className="flex gap-3">
                      <Mountain className="w-6 h-6 text-gray-500 shrink-0" />
                      <div><p className="text-[11px] text-gray-500 uppercase font-semibold">Trip Grade</p><p className="text-sm font-bold text-gray-900">{trek.difficulty}</p></div>
                    </div>
                    {trek.quickFacts?.maxAltitude && (
                      <div className="flex gap-3">
                        <Mountain className="w-6 h-6 text-gray-500 shrink-0" />
                        <div><p className="text-[11px] text-gray-500 uppercase font-semibold">Max. Altitude</p><p className="text-sm font-bold text-gray-900">{trek.quickFacts.maxAltitude}</p></div>
                      </div>
                    )}
                    {trek.quickFacts?.region && (
                      <div className="flex gap-3">
                        <MapIcon className="w-6 h-6 text-gray-500 shrink-0" />
                        <div><p className="text-[11px] text-gray-500 uppercase font-semibold">Starts</p><p className="text-sm font-bold text-gray-900">Kathmandu</p></div>
                      </div>
                    )}
                    {trek.quickFacts?.region && (
                      <div className="flex gap-3">
                        <CheckCircle2 className="w-6 h-6 text-gray-500 shrink-0" />
                        <div><p className="text-[11px] text-gray-500 uppercase font-semibold">Ends</p><p className="text-sm font-bold text-gray-900">Kathmandu</p></div>
                      </div>
                    )}
                    <div className="flex gap-3">
                      <Users className="w-6 h-6 text-gray-500 shrink-0" />
                      <div><p className="text-[11px] text-gray-500 uppercase font-semibold">Activities</p><p className="text-sm font-bold text-gray-900">{trek.activity || 'Trekking'}</p></div>
                    </div>
                    <div className="flex gap-3">
                      <Bed className="w-6 h-6 text-gray-500 shrink-0" />
                      <div><p className="text-[11px] text-gray-500 uppercase font-semibold">Accommodation</p><p className="text-sm font-bold text-gray-900 line-clamp-1">{trek.quickFacts?.accommodation || 'Hotel / Lodges'}</p></div>
                    </div>
                    <div className="flex gap-3">
                      <Utensils className="w-6 h-6 text-gray-500 shrink-0" />
                      <div><p className="text-[11px] text-gray-500 uppercase font-semibold">Meals</p><p className="text-sm font-bold text-gray-900 line-clamp-1">{trek.quickFacts?.meals || 'Breakfast, Lunch & Dinner'}</p></div>
                    </div>
                    <div className="flex gap-3">
                      <Sun className="w-6 h-6 text-gray-500 shrink-0" />
                      <div><p className="text-[11px] text-gray-500 uppercase font-semibold">Best Time</p><p className="text-sm font-bold text-gray-900 line-clamp-1">{trek.quickFacts?.bestSeason || 'Spring & Autumn'}</p></div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Highlights */}
            {trek.highlights && trek.highlights.length > 0 && (
              <div className="pb-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif">Highlights of {trek.title}</h2>
                <ul className="space-y-4">
                  {trek.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <div className="mt-0.5">
                        <CheckCircle2 className="w-6 h-6 text-green-500" strokeWidth={2} />
                      </div>
                      <span className="text-gray-700 leading-relaxed text-[15px]">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Overview text */}
            <div className="pb-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif">Explore {trek.title}</h2>
              <p className="text-[15px] text-gray-600 leading-relaxed whitespace-pre-wrap">
                {trek.description}
              </p>
            </div>

            {/* Gallery Section */}
            {trek.gallery && trek.gallery.length > 0 && (
              <div id="gallery" className="scroll-mt-40 pb-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif">Trip Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {trek.gallery.map((img, idx) => (
                    <div key={idx} className="aspect-square rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                      <img 
                        src={img} 
                        alt={`Gallery ${idx + 1}`} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Route Map Section */}
            {trek.routeMap && (
              <div className="scroll-mt-40 pb-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif">Route Map</h2>
                <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white">
                  <img 
                    src={trek.routeMap} 
                    alt={`${trek.title} Route Map`} 
                    className="w-full h-auto object-contain" 
                  />
                </div>
              </div>
            )}

            {/* Outline Itinerary */}
            {trek.itinerary && trek.itinerary.length > 0 && (
              <div id="outline-itinerary" className="scroll-mt-40 pb-8 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif flex items-center gap-2">
                  <Calendar className="text-himalayan-blue" size={24} />
                  Outline Itinerary
                </h2>
                <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm bg-white">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-slate-900 text-white font-semibold">
                        <th className="py-3.5 px-4 rounded-tl-2xl">Day & Title</th>
                        <th className="py-3.5 px-4">Max Altitude</th>
                        <th className="py-3.5 px-4 rounded-tr-2xl">Activity / Travel</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-700">
                      {trek.itinerary.map((day, idx) => {
                        let dayLabel = day.day ? day.day.trim() : `Day ${String(idx + 1).padStart(2, '0')}`;
                        if (/^D\s+Day/i.test(dayLabel)) dayLabel = dayLabel.replace(/^D\s+/i, '');
                        return (
                          <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3 px-4 font-medium text-gray-900">
                              <span className="font-bold text-himalayan-blue mr-2">{dayLabel}:</span>
                              {day.title}
                            </td>
                            <td className="py-3 px-4 text-gray-600 whitespace-nowrap">
                              {day.maxAltitude || '-'}
                            </td>
                            <td className="py-3 px-4 text-gray-600 whitespace-nowrap">
                              {day.travelMode || day.modeOfTravel || (day.activities ? day.activities : 'Walking')}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Detailed Itinerary */}
            {trek.itinerary && trek.itinerary.length > 0 && (
              <div id="itinerary" className="scroll-mt-40 pb-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 font-serif">Detailed Itinerary</h2>
                <div className="space-y-6">
                  {trek.itinerary.map((day, index) => {
                    const colors = [
                      "bg-blue-50 border-blue-100 text-blue-600 dot-bg-blue-400",
                      "bg-green-50 border-green-100 text-green-600 dot-bg-green-400",
                      "bg-orange-50 border-orange-100 text-orange-600 dot-bg-orange-400",
                      "bg-purple-50 border-purple-100 text-purple-600 dot-bg-purple-400",
                      "bg-rose-50 border-rose-100 text-rose-600 dot-bg-rose-400",
                      "bg-teal-50 border-teal-100 text-teal-600 dot-bg-teal-400"
                    ];
                    const currentColors = colors[index % colors.length];
                    const circleClass = currentColors.split(' ').slice(0, 3).join(' ');
                    const dotClass = currentColors.split(' ')[3].replace('dot-', '');

                    // Extract clean day label, e.g. "Day 01" or "01"
                    let dayLabel = day.day ? day.day.trim() : `Day ${String(index + 1).padStart(2, '0')}`;
                    if (/^D\s+Day/i.test(dayLabel)) dayLabel = dayLabel.replace(/^D\s+/i, '');
                    
                    const descriptionText = day.details || day.description || day.desc || '';
                    const travelModeText = day.travelMode || day.modeOfTravel;

                    return (
                    <div key={day.day || index} className="flex gap-4 group">
                      <div className="flex flex-col items-center">
                        <div className={`w-14 h-14 rounded-full border-2 flex flex-col items-center justify-center font-bold text-xs shrink-0 text-center shadow-sm leading-tight p-1 ${circleClass}`}>
                          <span>{dayLabel}</span>
                        </div>
                        <div className="w-px h-full bg-gray-200 my-2 group-last:hidden"></div>
                      </div>
                      <div className="pb-6 flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{day.title}</h3>
                        {descriptionText && (
                          <p className="text-gray-600 leading-relaxed text-[15px] whitespace-pre-line mb-3">{descriptionText}</p>
                        )}

                        {/* Day Metadata (Altitude, Accommodation, Meals, Travel Mode, Duration) */}
                        {(day.maxAltitude || day.accommodation || day.meals || travelModeText || day.duration) && (
                          <div className="mt-3 bg-slate-50/80 rounded-xl p-3.5 border border-slate-100 text-xs text-slate-700 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                            {day.maxAltitude && (
                              <div className="flex items-center gap-2">
                                <Mountain size={14} className="text-slate-400 shrink-0" />
                                <span><strong className="font-semibold text-slate-800">Max Altitude:</strong> {day.maxAltitude}</span>
                              </div>
                            )}
                            {day.accommodation && (
                              <div className="flex items-center gap-2">
                                <Bed size={14} className="text-slate-400 shrink-0" />
                                <span><strong className="font-semibold text-slate-800">Accommodation:</strong> {day.accommodation}</span>
                              </div>
                            )}
                            {day.meals && (
                              <div className="flex items-center gap-2">
                                <Utensils size={14} className="text-slate-400 shrink-0" />
                                <span><strong className="font-semibold text-slate-800">Meals:</strong> {Array.isArray(day.meals) ? day.meals.join(', ') : day.meals}</span>
                              </div>
                            )}
                            {travelModeText && (
                              <div className="flex items-center gap-2">
                                <Car size={14} className="text-slate-400 shrink-0" />
                                <span><strong className="font-semibold text-slate-800">Mode of Travel:</strong> {travelModeText}</span>
                              </div>
                            )}
                            {day.duration && (
                              <div className="flex items-center gap-2">
                                <Clock size={14} className="text-slate-400 shrink-0" />
                                <span><strong className="font-semibold text-slate-800">Duration:</strong> {day.duration}</span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Day Highlights */}
                        {day.highlights && (
                          <div className="mt-3 bg-amber-50/50 rounded-xl p-3.5 border border-amber-100/80">
                            <h4 className="font-bold text-slate-900 mb-2 text-xs uppercase tracking-wider flex items-center gap-1.5">
                              <Star className="text-amber-500 w-3.5 h-3.5 fill-current" />
                              Day Highlights
                            </h4>
                            {Array.isArray(day.highlights) ? (
                              <ul className="space-y-1.5 text-xs text-slate-700">
                                {day.highlights.map((h, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1 shrink-0"></div>
                                    <span>{h}</span>
                                  </li>
                                ))}
                              </ul>
                            ) : typeof day.highlights === 'object' ? (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-4 text-xs text-slate-700">
                                {Object.entries(day.highlights).map(([k, v]) => (
                                  <div key={k} className="flex items-start gap-2">
                                    <div className={`w-1.5 h-1.5 rounded-full mt-1 shrink-0 ${dotClass}`}></div>
                                    <span className="font-semibold text-slate-800">{k}:</span> {v}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-xs text-slate-700">{String(day.highlights)}</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )})}
                </div>
              </div>
            )}

            {/* Includes / Excludes */}
            {((trek.costIncludes && trek.costIncludes.length > 0) || (trek.includes && trek.includes.length > 0) || (trek.costExcludes && trek.costExcludes.length > 0) || (trek.excludes && trek.excludes.length > 0)) && (
              <div id="cost" className="scroll-mt-40 pb-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 font-serif">Cost Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {((trek.costIncludes && trek.costIncludes.length > 0) || (trek.includes && trek.includes.length > 0)) && (
                    <div className="bg-green-50 p-6 rounded-2xl">
                      <h4 className="font-bold text-green-800 mb-4 flex items-center gap-2">
                        <Check className="text-green-600" /> What's Included
                      </h4>
                      <ul className="space-y-3">
                        {(trek.costIncludes || trek.includes).map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                            <Check size={16} className="text-green-500 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {((trek.costExcludes && trek.costExcludes.length > 0) || (trek.excludes && trek.excludes.length > 0)) && (
                    <div className="bg-red-50 p-6 rounded-2xl">
                      <h4 className="font-bold text-red-800 mb-4 flex items-center gap-2">
                        <X className="text-red-600" /> What's Excluded
                      </h4>
                      <ul className="space-y-3">
                        {(trek.costExcludes || trek.excludes).map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                            <X size={16} className="text-red-500 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Add-ons & Exclusive Options */}
                {trek.addOns && trek.addOns.length > 0 && (
                  <div className="mt-8 bg-purple-50/70 border border-purple-100 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-purple-900 mb-4 flex items-center gap-2">
                      <Plus className="text-purple-600" size={20} />
                      Add-ons & Exclusive Upgrade Options
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      {trek.addOns.map((addon, idx) => (
                        <div key={idx} className="bg-white/80 rounded-xl p-4 border border-purple-100/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <h4 className="font-bold text-purple-950 text-sm">{addon.title}</h4>
                            {addon.details && <p className="text-xs text-purple-800/80 mt-1">{addon.details}</p>}
                          </div>
                          {addon.price && (
                            <span className="bg-purple-100 text-purple-900 font-bold text-xs px-3 py-1.5 rounded-lg shrink-0 w-fit">
                              {addon.price}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Essential Info (Rich Design) */}
            {(trek.additionalInfo || trek.difficultyInfo || trek.altitudeSickness || trek.equipmentList || trek.equipment || trek.flightInfo || trek.extendedInfo || trek.luklaFlightInfo) && (
              <div id="info" className="scroll-mt-40 pb-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif">Essential Info</h2>
                
                {/* Lukla Flight Info */}
                {trek.luklaFlightInfo && (
                  <div className="bg-sky-50/70 border border-sky-100 rounded-2xl p-6 mb-6 hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-bold text-sky-900 mb-4 flex items-center gap-2">
                      <Info className="text-sky-600" size={24} /> 
                      Lukla Flight Information
                    </h3>
                    <div className="space-y-4">
                      {trek.luklaFlightInfo.map((info, idx) => (
                        <div key={idx} className="bg-white/60 rounded-xl p-4 border border-sky-50">
                          <h4 className="font-bold text-sky-800 mb-1">{info.season}</h4>
                          <p className="text-sky-900/80 text-sm leading-relaxed">{info.details}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Trek Difficulty */}
                {trek.difficultyInfo && (
                  <div className="bg-orange-50/70 border border-orange-100 rounded-2xl p-6 mb-6 hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-bold text-orange-900 mb-3 flex items-center gap-2">
                      <Mountain className="text-orange-600" size={24} /> 
                      Difficulty Level
                    </h3>
                    <p className="text-orange-900/80 leading-relaxed text-[15px]">
                      {typeof trek.difficultyInfo === 'object'
                        ? trek.difficultyInfo.details || trek.difficultyInfo.grade
                        : trek.difficultyInfo}
                    </p>
                  </div>
                )}

                {/* Flight Info */}
                {trek.flightInfo && (
                  <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-6 mb-6 hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-bold text-indigo-900 mb-4 flex items-center gap-2">
                      <PlaneTakeoff className="text-indigo-600" size={24} /> 
                      {trek.flightInfo.title}
                    </h3>
                    <div className="space-y-4">
                      {trek.flightInfo.routes.map((route, idx) => (
                        <div key={idx} className="bg-white/60 rounded-xl p-4 border border-indigo-50">
                          <h4 className="font-bold text-indigo-800 mb-2 flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-indigo-500" />
                            {route.name}
                          </h4>
                          <p className="text-indigo-900/80 text-sm leading-relaxed pl-6">
                            {route.details}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Altitude Sickness */}
                {trek.altitudeSickness && (
                  <div className="bg-red-50/70 border border-red-100 rounded-2xl p-6 mb-6 hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-bold text-red-900 mb-3 flex items-center gap-2">
                      <AlertTriangle className="text-red-600" size={24} /> 
                      Altitude Sickness & Remedies
                    </h3>
                    <p className="text-red-900/80 leading-relaxed text-[15px] mb-4">
                      {trek.altitudeSickness.description}
                    </p>
                    <div className="space-y-2">
                      {(Array.isArray(trek?.altitudeSickness?.prevention)
                        ? trek.altitudeSickness.prevention
                        : trek?.altitudeSickness?.prevention
                        ? [trek.altitudeSickness.prevention]
                        : []
                      ).map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 size={18} className="text-red-500 shrink-0 mt-0.5" />
                          <span className="text-red-900/80 text-[15px]">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Equipment List */}
                {(trek.equipmentList || trek.equipment) && (
                  <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-6 mb-6 hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                      <Backpack className="text-blue-600" size={24} /> 
                      Equipment List
                    </h3>
                    {trek.equipment && trek.equipment.description && (
                      <p className="text-blue-900/80 leading-relaxed text-[15px] mb-6">
                        {trek.equipment.description}
                      </p>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {(trek.equipmentList || trek.equipment?.categories || []).map((category, idx) => (
                        <div key={idx}>
                          <h4 className="font-bold text-blue-800 mb-2">{typeof category === 'string' ? category : (category.category || category.name)}</h4>
                          {category.items && Array.isArray(category.items) && (
                            <ul className="space-y-1">
                              {category.items.map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-blue-900/80">
                                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0"></div>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Fallback for simple additional Info */}
                {trek.additionalInfo && !trek.difficultyInfo && !trek.altitudeSickness && !trek.equipmentList && (
                  <div className="bg-blue-50 rounded-2xl p-6">
                    <p className="text-blue-900 leading-relaxed text-[15px]">
                      {trek.additionalInfo}
                    </p>
                  </div>
                )}

                {/* Extended Info Array */}
                {trek.extendedInfo && trek.extendedInfo.map((section, idx) => (
                  <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-6 mb-6 hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h3>
                    
                    {section.description && (
                      <p className="text-gray-700 leading-relaxed text-[15px] mb-4">{section.description}</p>
                    )}
                    
                    {section.paragraphs && (
                      <div className="space-y-4 mb-4">
                        {section.paragraphs.map((p, i) => (
                          <p key={i} className="text-gray-700 leading-relaxed text-[15px]">{p}</p>
                        ))}
                      </div>
                    )}
                    
                    {section.items && (
                      <ul className="space-y-3 mb-4">
                        {section.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-gray-700 text-[15px]">
                            <div className="mt-1.5"><CheckCircle2 className="w-5 h-5 text-green-500" strokeWidth={2} /></div>
                            <span className="leading-relaxed">
                              {item.split('**').map((text, index) => 
                                index % 2 === 1 ? <strong key={index} className="font-bold text-gray-900">{text}</strong> : text
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    {section.subsections && (
                      <div className="space-y-6 mb-4">
                        {section.subsections.map((sub, i) => (
                          <div key={i}>
                            <h4 className="font-bold text-gray-800 mb-3">{sub.subtitle}</h4>
                            {sub.description && (
                              <p className="text-gray-700 leading-relaxed text-[15px] mb-3">{sub.description}</p>
                            )}
                            {sub.items && (
                              <ul className="space-y-2">
                                {sub.items.map((item, j) => (
                                  <li key={j} className="flex items-start gap-2 text-gray-700 text-[15px]">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0"></div>
                                    <span className="leading-relaxed">
                                      {item.split('**').map((text, index) => 
                                        index % 2 === 1 ? <strong key={index} className="font-bold text-gray-900">{text}</strong> : text
                                      )}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {section.table && (
                      <div className="overflow-x-auto mb-4 rounded-xl border border-gray-200">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                              {section.table.headers.map((th, i) => (
                                <th key={i} className="p-4 font-bold text-gray-800 text-sm">{th}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {section.table.rows.map((row, i) => (
                              <tr key={i} className="border-b border-gray-100 hover:bg-gray-50/50">
                                {row.map((cell, j) => (
                                  <td key={j} className="p-4 text-gray-700 text-[15px]">{cell}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                    
                    {section.footer && (
                      <div className="mt-4 p-4 bg-gray-50/50 rounded-xl border border-gray-100">
                        <p className="text-gray-700 leading-relaxed text-[15px] whitespace-pre-line">
                          {section.footer.split('**').map((text, index) => 
                            index % 2 === 1 ? <strong key={index} className="font-bold text-gray-900">{text}</strong> : text
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Dates & Availability */}
            {trek.datesAvailability && (
              <div className="scroll-mt-40 pb-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-serif">Dates & Availability</h2>
                <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                  <p className="text-gray-700 leading-relaxed text-[15px]">{trek.datesAvailability}</p>
                </div>
              </div>
            )}

            {/* Add-ons & Options */}
            {trek.addOns && (
              <div className="scroll-mt-40 pb-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-serif">Add-ons & Options</h2>
                <div className="space-y-4">
                  {trek.addOns.intro && <p className="text-gray-600 mb-4">{trek.addOns.intro}</p>}
                  {Array.isArray(trek.addOns) ? (
                    trek.addOns.map((opt, idx) => (
                      <div key={idx} className="bg-orange-50/50 p-5 rounded-xl border border-orange-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <span className="font-bold text-orange-900 text-sm block">{opt.title}</span>
                          {opt.details && <span className="text-gray-700 text-xs mt-1 block">{opt.details}</span>}
                          {opt.description && <span className="text-gray-700 text-xs mt-1 block">{opt.description}</span>}
                        </div>
                        {opt.price && (
                          <span className="bg-orange-100 text-orange-900 font-bold text-xs px-3 py-1.5 rounded-lg shrink-0 w-fit">
                            {opt.price}
                          </span>
                        )}
                      </div>
                    ))
                  ) : trek.addOns.options && Array.isArray(trek.addOns.options) ? (
                    trek.addOns.options.map((opt, idx) => (
                      <div key={idx} className="bg-orange-50/50 p-5 rounded-xl border border-orange-100">
                        <p className="text-gray-800 text-[15px]">
                          <span className="font-bold text-orange-800">{opt.title}:</span> {opt.description}
                        </p>
                      </div>
                    ))
                  ) : null}
                </div>
              </div>
            )}

            {/* Booking Steps */}
            {trek.bookingSteps && trek.bookingSteps.steps && Array.isArray(trek.bookingSteps.steps) && (
              <div className="scroll-mt-40 pb-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-serif">Booking Process</h2>
                {trek.bookingSteps.intro && <p className="text-gray-600 mb-6">{trek.bookingSteps.intro}</p>}
                <div className="space-y-3">
                  {trek.bookingSteps.steps.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold shrink-0">
                        {idx + 1}
                      </div>
                      <span className="text-gray-700 font-medium">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQs */}
            {trek.faqs && trek.faqs.length > 0 && (
              <div id="faqs" className="scroll-mt-40">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {trek.faqs.map((faq, index) => (
                    <div key={index} className="border border-gray-100 rounded-xl p-5 bg-gray-50/50">
                      <h4 className="font-bold text-gray-900 mb-2">{faq.question}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-44 space-y-6">
              
              {/* Main Booking Card (Redesigned) */}
              <div className="bg-white border border-gray-100 p-7 rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-6">
                
                {/* Header Area */}
                <div className="flex justify-between items-start border-b border-gray-100 pb-5">
                  <div>
                    <span className="text-[10px] font-extrabold text-[#0F766E] uppercase tracking-widest mb-1 block">Price Per Person</span>
                    <div className="flex items-baseline gap-2.5">
                      <span className="text-3xl font-black text-[#1e3a8a] tracking-tight">
                        {perPersonPrice ? `US$${typeof perPersonPrice === 'number' ? perPersonPrice.toLocaleString() : perPersonPrice}` : (trek?.price || 'TBA')}
                      </span>
                      {trek.originalPrice && (
                        <span className="text-sm text-gray-400 line-through font-semibold">
                          {trek.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Favorite Icon */}
                  <button className="group flex flex-col items-center focus:outline-none">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm border border-gray-200 bg-gray-50 text-gray-400 group-hover:text-[#E59A2F] group-hover:border-[#E59A2F] transition-all duration-300">
                      <Heart size={18} fill="none" strokeWidth={2} className="group-hover:fill-current transition-colors" />
                    </div>
                    <span className="text-[9px] text-gray-500 font-bold mt-1.5 uppercase tracking-wider">Save</span>
                  </button>
                </div>

                {/* Group Discount Price Card */}
                <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-gray-100">
                  <div 
                    onClick={() => setIsDiscountOpen(!isDiscountOpen)}
                    className="flex justify-between items-center cursor-pointer select-none group"
                  >
                    <span className="font-bold text-[#1e3a8a] text-sm flex items-center gap-2">
                      <Activity size={16} className="text-[#0F766E]" />
                      Group Discounts
                    </span>
                    <ChevronDown size={18} className={`text-gray-400 group-hover:text-[#1e3a8a] transition-transform duration-300 ${isDiscountOpen ? 'rotate-180' : ''}`} />
                  </div>
                  
                  {isDiscountOpen && (
                    <div className="mt-4 pt-4 border-t border-gray-200/60 overflow-hidden">
                      <table className="w-full text-left text-sm">
                        <thead>
                          <tr className="text-[#64748B] font-medium border-b border-gray-200 pb-2">
                            <th className="pb-2 font-semibold text-xs uppercase tracking-wider">Group Size</th>
                            <th className="pb-2 text-right font-semibold text-xs uppercase tracking-wider">Price / Pax</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          <tr className="hover:bg-white transition-colors">
                            <td className="py-3 text-[#172033] font-medium text-xs">2 - 3 pax</td>
                            <td className="py-3 text-right font-bold text-[#1e3a8a]">US${getDiscountedPerPersonPrice(2)}</td>
                          </tr>
                          <tr className="hover:bg-white transition-colors">
                            <td className="py-3 text-[#172033] font-medium text-xs">4 - 7 pax</td>
                            <td className="py-3 text-right font-bold text-[#1e3a8a]">US${getDiscountedPerPersonPrice(4)}</td>
                          </tr>
                          <tr className="hover:bg-white transition-colors">
                            <td className="py-3 text-[#172033] font-medium text-xs">8 - 11 pax</td>
                            <td className="py-3 text-right font-bold text-[#1e3a8a]">US${getDiscountedPerPersonPrice(8)}</td>
                          </tr>
                          <tr className="hover:bg-white transition-colors">
                            <td className="py-3 text-[#172033] font-medium text-xs">12 - 15 pax</td>
                            <td className="py-3 text-right font-bold text-[#1e3a8a]">US${getDiscountedPerPersonPrice(12)}</td>
                          </tr>
                          <tr className="hover:bg-white transition-colors">
                            <td className="py-3 text-[#172033] font-medium text-xs">16 - 20 pax</td>
                            <td className="py-3 text-right font-bold text-[#1e3a8a]">US${getDiscountedPerPersonPrice(16)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
                
                {/* Inputs */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white border border-gray-200 rounded-xl p-3 flex flex-col justify-center focus-within:border-[#0F766E] focus-within:ring-1 focus-within:ring-[#0F766E] transition-all">
                    <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-1">Date</span>
                    <div className="flex items-center justify-between">
                      <input 
                        type="date" 
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full text-sm font-semibold text-[#1e3a8a] bg-transparent outline-none cursor-pointer" 
                      />
                    </div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-3 flex flex-col justify-center focus-within:border-[#0F766E] focus-within:ring-1 focus-within:ring-[#0F766E] transition-all">
                    <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-1">Travelers</span>
                    <select 
                      value={persons}
                      onChange={(e) => setPersons(Number(e.target.value))}
                      className="w-full text-sm font-semibold text-[#1e3a8a] bg-transparent outline-none cursor-pointer appearance-none"
                    >
                      <option value={1}>1 Person</option>
                      <option value={2}>2 Persons</option>
                      <option value={3}>3 Persons</option>
                      <option value={4}>4 Persons</option>
                      <option value={5}>5+ Persons</option>
                    </select>
                  </div>
                </div>

                {/* Buttons */}
                <div className="space-y-3 pt-2">
                  <button onClick={handleBookPackage} className="w-full flex justify-center bg-[#1e3a8a] text-white font-bold py-3.5 rounded-xl hover:bg-[#10224b] transition-all shadow-md hover:shadow-lg uppercase tracking-wider text-sm">
                    BOOK THIS TRIP
                  </button>
                  <button onClick={handleQuickInquiry} className="w-full flex justify-center bg-white text-[#1e3a8a] border-2 border-[#1e3a8a] font-bold py-3.5 rounded-xl hover:bg-[#F8FAFC] transition-colors uppercase tracking-wider text-sm">
                    MAKE AN INQUIRY
                  </button>
                  <button onClick={handleDownloadPDF} className="w-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 py-3.5 rounded-xl font-bold hover:shadow-sm transition-all text-sm uppercase tracking-wider text-center flex justify-center items-center gap-2">
                    <FileText size={16} className="text-[#e53a24]" /> DOWNLOAD AS PDF
                  </button>
                </div>
                  
                {/* Extension Note */}
                <p className="text-xs text-center text-gray-500 mt-4 italic">
                  It is possible to extend this trek with Everest Base Camp or Everest Gokyo Ri Trekking
                </p>
              </div>
              

            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default TrekDetail;
