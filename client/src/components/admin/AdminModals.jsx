import React, { useState, useRef } from 'react';
import {
  X,
  Car,
  UserCheck,
  CalendarCheck,
  CreditCard,
  MapPin,
  Clock,
  ShieldCheck,
  Check,
  AlertTriangle,
  Upload,
  Image as ImageIcon,
  Trash2,
  FileText,
  Building2,
  DollarSign,
  Layers,
  Sparkles,
  Info,
  CheckCircle2,
} from 'lucide-react';
import api from '../../services/api';

const PRESET_VEHICLE_IMAGES = [
  { name: 'Hyundai Creta (White SUV)', url: '/cars/creta.png' },
  { name: 'Toyota Fortuner (Black SUV)', url: '/cars/fortuner.jpg' },
  { name: 'Suzuki Swift (White Hatchback)', url: '/cars/swift.jpg' },
  { name: 'Toyota Hiace (Tourist Van)', url: '/cars/hiace.jpg' },
  { name: 'Mahindra Scorpio (Rugged 4x4)', url: '/cars/scorpio.jpg' },
  { name: 'BYD Atto 3 (Electric EV)', url: '/cars/ev.jpg' },
];

const AVAILABLE_FEATURES = [
  'Air Conditioning',
  'Touchscreen Infotainment',
  'Bluetooth & Apple CarPlay',
  'Reverse Parking Camera',
  'ABS & Airbags',
  'Roof Rails',
  '4x4 Offroad Terrain System',
  'Dual Climate AC',
  'Leather Seating',
  'Cruise Control',
  'GPS Navigation System',
  'Fast Charging Support',
  'Power Steering',
  'Sunroof',
];

const APPROVED_PARTNERS = [
  'Himalayan Fleet Partners (Pvt.) Ltd.',
  'Pokhara Auto Alliance',
  'Everest Wheels & Tours',
  'Kathmandu Valley Chauffeurs Co.',
  'Annapurna Mobility Services',
];

const OCCASIONS_LIST = [
  { id: 'wedding', label: 'Wedding & Marriage' },
  { id: 'family-trip', label: 'Family Trips & Vacations' },
  { id: 'airport-transfer', label: 'Airport Pickup & Drop' },
  { id: 'tourism', label: 'Tourism & Sightseeing' },
  { id: 'pilgrimage', label: 'Religious Trips & Pilgrimage' },
  { id: 'corporate', label: 'Business & Corporate Travel' },
  { id: 'special-celebration', label: 'Birthday & Special Events' },
  { id: 'festivals', label: 'Festivals (Dashain/Tihar/Chhath)' },
  { id: 'events', label: 'Concerts & Events' },
  { id: 'medical-travel', label: 'Medical & Emergency Travel' },
  { id: 'photoshoot', label: 'Photoshoots & Film Production' },
  { id: 'group-travel', label: 'Group Travel & Tours' },
];

export const AddVehicleModal = ({ isOpen, onClose, onVehicleAdded }) => {
  const [activeStep, setActiveStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // 1. Basic Information
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [modelYear, setModelYear] = useState(2024);
  const [category, setCategory] = useState('SUV');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [color, setColor] = useState('Polar White');
  const [description, setDescription] = useState('');

  // 2. Specifications
  const [seats, setSeats] = useState(5);
  const [transmission, setTransmission] = useState('Automatic');
  const [fuelType, setFuelType] = useState('Petrol');
  const [hasAC, setHasAC] = useState(true);
  const [mileage, setMileage] = useState('16.8 km/l');
  const [features, setFeatures] = useState([
    'Air Conditioning',
    'Bluetooth & Apple CarPlay',
    'Reverse Parking Camera',
    'ABS & Airbags',
  ]);
  const [customFeature, setCustomFeature] = useState('');
  const [suitableFor, setSuitableFor] = useState(['tourism', 'family-trip', 'festivals']);

  const toggleOccasion = (occId) => {
    if (suitableFor.includes(occId)) {
      setSuitableFor(suitableFor.filter((o) => o !== occId));
    } else {
      setSuitableFor([...suitableFor, occId]);
    }
  };

  // 3. Rental Pricing
  const [allowsWithDriver, setAllowsWithDriver] = useState(true);
  const [hourlyRateWithDriver, setHourlyRateWithDriver] = useState(1200);
  const [dailyWithDriver, setDailyWithDriver] = useState(8500);
  const [weeklyWithDriver, setWeeklyWithDriver] = useState(55000);
  const [monthlyWithDriver, setMonthlyWithDriver] = useState(180000);

  const [allowsSelfDrive, setAllowsSelfDrive] = useState(true);
  const [hourlyRateSelfDrive, setHourlyRateSelfDrive] = useState(900);
  const [dailySelfDrive, setDailySelfDrive] = useState(7000);
  const [weeklySelfDrive, setWeeklySelfDrive] = useState(45000);
  const [monthlySelfDrive, setMonthlySelfDrive] = useState(150000);

  const [securityDeposit, setSecurityDeposit] = useState(25000);

  // 4. Images
  const [images, setImages] = useState(['/cars/creta.png']);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  // 5. Ownership
  const [ownership, setOwnership] = useState('Company Owned');
  const [partnerName, setPartnerName] = useState(APPROVED_PARTNERS[0]);

  // 6. Documents
  const [documents, setDocuments] = useState({
    registrationCertificate: { url: '', expiryDate: '' },
    insurance: { url: '', expiryDate: '' },
    taxDocument: { url: '', expiryDate: '' },
  });

  // 7. Availability / Status
  const [status, setStatus] = useState('Available');

  if (!isOpen) return null;

  // Toggle Feature Chips
  const toggleFeature = (feat) => {
    if (features.includes(feat)) {
      setFeatures(features.filter((f) => f !== feat));
    } else {
      setFeatures([...features, feat]);
    }
  };

  const handleAddCustomFeature = (e) => {
    e.preventDefault();
    if (customFeature.trim() && !features.includes(customFeature.trim())) {
      setFeatures([...features, customFeature.trim()]);
      setCustomFeature('');
    }
  };

  // Image Upload Handling
  const handleFilesUpload = async (filesList) => {
    setErrorMsg('');
    const validFiles = [];
    const maxSizeBytes = 5 * 1024 * 1024; // 5MB

    for (let i = 0; i < filesList.length; i++) {
      const file = filesList[i];
      const ext = file.name.split('.').pop().toLowerCase();
      if (!['jpg', 'jpeg', 'png', 'webp'].includes(ext)) {
        setErrorMsg(`"${file.name}" is not supported. Please upload JPG, PNG, or WebP.`);
        return;
      }
      if (file.size > maxSizeBytes) {
        setErrorMsg(`"${file.name}" exceeds the 5MB file size limit.`);
        return;
      }
      validFiles.push(file);
    }

    if (validFiles.length === 0) return;

    setIsUploadingImage(true);
    const formData = new FormData();
    validFiles.forEach((f) => formData.append('images', f));

    try {
      const res = await api.post('/vehicles/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res.data?.urls) {
        setImages((prev) => [...prev, ...res.data.urls]);
      }
    } catch (err) {
      console.error('Image upload failed, fallback to preview:', err);
      // Fallback: create client-side previews if network fails
      const fallbackUrls = validFiles.map((f) => URL.createObjectURL(f));
      setImages((prev) => [...prev, ...fallbackUrls]);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesUpload(e.dataTransfer.files);
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setImages(images.filter((_, idx) => idx !== indexToRemove));
  };

  const handleAddPresetImage = (url) => {
    if (!images.includes(url)) {
      setImages([...images, url]);
    }
  };

  // Document Upload Handling
  const handleDocUpload = async (docType, file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append('document', file);
    try {
      const res = await api.post('/vehicles/upload-doc', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res.data?.url) {
        setDocuments((prev) => ({
          ...prev,
          [docType]: { ...prev[docType], url: res.data.url },
        }));
      }
    } catch (err) {
      setDocuments((prev) => ({
        ...prev,
        [docType]: { ...prev[docType], url: file.name },
      }));
    }
  };

  // Form Validation & Submit
  const validateForm = () => {
    if (!name.trim()) return 'Vehicle Model Name is required.';
    if (!brand.trim()) return 'Brand / Manufacturer is required.';
    if (!registrationNumber.trim()) return 'Registration Plate (Nepal) is required.';
    if (!modelYear || modelYear < 1990 || modelYear > new Date().getFullYear() + 1) {
      return `Manufacturing Year must be between 1990 and ${new Date().getFullYear() + 1}.`;
    }
    if (!allowsWithDriver && !allowsSelfDrive) {
      return 'Please enable at least one rental mode: With Driver or Self Drive.';
    }
    if (allowsWithDriver) {
      if (dailyWithDriver < 0 || hourlyRateWithDriver < 0 || weeklyWithDriver < 0 || monthlyWithDriver < 0) {
        return 'With Driver rental rates cannot be negative.';
      }
    }
    if (allowsSelfDrive) {
      if (dailySelfDrive < 0 || hourlyRateSelfDrive < 0 || weeklySelfDrive < 0 || monthlySelfDrive < 0) {
        return 'Self Drive rental rates cannot be negative.';
      }
    }
    if (securityDeposit < 0) {
      return 'Security Deposit cannot be negative.';
    }
    if (!images || images.length === 0) {
      return 'At least one vehicle photograph is required.';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    const validationError = validateForm();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        name: name.trim(),
        brand: brand.trim(),
        modelYear: Number(modelYear),
        category,
        registrationNumber: registrationNumber.trim().toUpperCase(),
        seats: Number(seats),
        transmission,
        fuelType,
        hasAC,
        specifications: {
          color: color.trim() || 'Polar White',
          mileage: mileage.trim() || '16.8 km/l',
        },
        features,
        description: description.trim() || `${brand} ${name} available for rent in Nepal.`,
        pricing: {
          dailyWithDriver: allowsWithDriver ? Number(dailyWithDriver) : Number(dailySelfDrive),
          hourlyRateWithDriver: Number(hourlyRateWithDriver),
          weeklyWithDriver: Number(weeklyWithDriver),
          monthlyWithDriver: Number(monthlyWithDriver),
          dailySelfDrive: allowsSelfDrive ? Number(dailySelfDrive) : Number(dailyWithDriver),
          hourlyRateSelfDrive: Number(hourlyRateSelfDrive),
          weeklySelfDrive: Number(weeklySelfDrive),
          monthlySelfDrive: Number(monthlySelfDrive),
          securityDeposit: Number(securityDeposit),
          hourlyRate: Number(hourlyRateSelfDrive || hourlyRateWithDriver),
          monthlyRate: Number(monthlySelfDrive || monthlyWithDriver),
        },
        options: {
          allowsWithDriver,
          allowsSelfDrive,
        },
        images,
        ownership,
        partnerName: ownership === 'Partner Owned' ? partnerName : '',
        documents,
        status,
        suitableFor,
      };

      const res = await api.post('/vehicles', payload);
      setSuccessMsg('Vehicle successfully registered in the fleet!');

      if (onVehicleAdded && res.data?.data) {
        onVehicleAdded(res.data.data);
      }

      setTimeout(() => {
        setIsSubmitting(false);
        onClose();
      }, 900);
    } catch (err) {
      setIsSubmitting(false);
      const serverMsg = err.response?.data?.message || 'Failed to register vehicle. Please verify input fields.';
      setErrorMsg(serverMsg);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 max-h-[92vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between flex-shrink-0 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#0755C9] flex items-center justify-center shadow-2xs">
              <Car className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-base leading-tight">
                Register New Vehicle
              </h3>
              <p className="text-[11px] text-slate-400 font-semibold">
                Add a certified car, SUV, van or EV to Nepal rental fleet
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Navigation Tabs */}
        <div className="px-6 pt-3 pb-2 border-b border-slate-100 bg-[#F8FAFC] flex items-center gap-2 overflow-x-auto no-scrollbar flex-shrink-0 text-xs font-bold">
          {[
            { step: 1, label: '1. Basic & Specs' },
            { step: 2, label: '2. Rental Pricing' },
            { step: 3, label: '3. Vehicle Images' },
            { step: 4, label: '4. Ownership & Docs' },
          ].map((tab) => (
            <button
              key={tab.step}
              type="button"
              onClick={() => setActiveStep(tab.step)}
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex-shrink-0 ${
                activeStep === tab.step
                  ? 'bg-[#0755C9] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 scrollbar-thin scrollbar-thumb-slate-200">
          {/* Error & Success Banners */}
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200/80 text-rose-800 text-xs flex items-center gap-2.5 animate-in fade-in">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 text-rose-600" />
              <span className="font-bold flex-1">{errorMsg}</span>
              <button type="button" onClick={() => setErrorMsg('')}>
                <X className="w-3.5 h-3.5 text-rose-500" />
              </button>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600" />
              <span className="font-bold flex-1">{successMsg}</span>
            </div>
          )}

          {/* ===================== STEP 1: BASIC INFORMATION & SPECIFICATIONS ===================== */}
          {activeStep === 1 && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="font-black text-slate-800 block mb-1">
                    Vehicle Model Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Hyundai Creta SX(O)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0755C9] focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="font-black text-slate-800 block mb-1">
                    Brand / Manufacturer *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Hyundai, Toyota, Suzuki"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0755C9] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Manufacturing Year *
                  </label>
                  <input
                    type="number"
                    min="1990"
                    max={new Date().getFullYear() + 1}
                    value={modelYear}
                    onChange={(e) => setModelYear(Number(e.target.value))}
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Vehicle Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-900"
                  >
                    <option value="SUV">SUV</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Premium">Premium</option>
                    <option value="Van/Hiace">Van / Hiace</option>
                    <option value="Electric Vehicles">Electric Vehicles (EV)</option>
                    <option value="Micro/Bus">Micro / Bus</option>
                  </select>
                </div>
                <div>
                  <label className="font-black text-slate-800 block mb-1">
                    Registration Plate (Nepal) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="BA 18 CHA 4291"
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value.toUpperCase())}
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3 py-2 font-mono font-bold text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Seats</label>
                  <input
                    type="number"
                    min="2"
                    max="30"
                    value={seats}
                    onChange={(e) => setSeats(Number(e.target.value))}
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Transmission</label>
                  <select
                    value={transmission}
                    onChange={(e) => setTransmission(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-900"
                  >
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Fuel Type</label>
                  <select
                    value={fuelType}
                    onChange={(e) => setFuelType(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-900"
                  >
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">AC Climate</label>
                  <div className="grid grid-cols-2 gap-1 bg-[#F8FAFC] p-1 rounded-xl border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setHasAC(true)}
                      className={`py-1 rounded-lg font-black transition-all ${
                        hasAC ? 'bg-[#0755C9] text-white shadow-2xs' : 'text-slate-600'
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setHasAC(false)}
                      className={`py-1 rounded-lg font-black transition-all ${
                        !hasAC ? 'bg-slate-700 text-white shadow-2xs' : 'text-slate-600'
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Color</label>
                  <input
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    placeholder="e.g. Polar White, Diamond Black"
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-800"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Mileage / Range</label>
                  <input
                    type="text"
                    value={mileage}
                    onChange={(e) => setMileage(e.target.value)}
                    placeholder="e.g. 16.8 km/l or 420 km range"
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-800"
                  />
                </div>
              </div>

              {/* Vehicle Features Chip Selector */}
              <div>
                <label className="font-black text-slate-800 block mb-1.5">
                  Vehicle Features & Equipment
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {AVAILABLE_FEATURES.map((feat) => {
                    const isSelected = features.includes(feat);
                    return (
                      <button
                        key={feat}
                        type="button"
                        onClick={() => toggleFeature(feat)}
                        className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border transition-all ${
                          isSelected
                            ? 'bg-blue-50 text-[#0755C9] border-[#0755C9]/40 shadow-2xs'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {feat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Suitable For / Rental Occasions Multi-Select */}
              <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <label className="font-black text-slate-800 block text-xs">
                      Suitable For / Rental Occasions
                    </label>
                    <span className="text-[10px] text-slate-400 font-semibold">
                      Categorize which travel events this vehicle is best suited for ({suitableFor.length} selected)
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 text-[#0755C9] font-black text-[10px]">
                    {suitableFor.length}/12
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {OCCASIONS_LIST.map((occ) => {
                    const isSelected = suitableFor.includes(occ.id);
                    return (
                      <button
                        key={occ.id}
                        type="button"
                        onClick={() => toggleOccasion(occ.id)}
                        className={`px-2.5 py-1.5 rounded-xl text-left text-[11px] font-bold border flex items-center justify-between transition-all ${
                          isSelected
                            ? 'bg-blue-50 text-[#0755C9] border-[#0755C9] shadow-2xs font-extrabold'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <span className="truncate">{occ.label}</span>
                        {isSelected ? (
                          <Check className="w-3.5 h-3.5 text-[#0755C9] shrink-0 ml-1" />
                        ) : (
                          <span className="text-slate-300 shrink-0 ml-1">+</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Notes on vehicle condition, highway performance, luggage capacity..."
                  className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl p-3 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0755C9]"
                />
              </div>
            </div>
          )}

          {/* ===================== STEP 2: RENTAL PRICING ===================== */}
          {activeStep === 2 && (
            <div className="space-y-5 text-xs">
              {/* Option A: With Driver Pricing */}
              <div className="p-4 rounded-2xl border border-slate-200/90 bg-[#F8FAFC] space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="allowWithDriver"
                      checked={allowsWithDriver}
                      onChange={(e) => setAllowsWithDriver(e.target.checked)}
                      className="w-4 h-4 text-[#0755C9] rounded accent-[#0755C9] cursor-pointer"
                    />
                    <label htmlFor="allowWithDriver" className="font-black text-slate-900 cursor-pointer">
                      Enable "With Driver" Bookings
                    </label>
                  </div>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                    Chauffeur Driven
                  </span>
                </div>

                {allowsWithDriver ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                    <div>
                      <label className="font-bold text-slate-600 block mb-1 text-[11px]">
                        Hourly (NPR)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={hourlyRateWithDriver}
                        onChange={(e) => setHourlyRateWithDriver(Number(e.target.value))}
                        className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 font-black text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-600 block mb-1 text-[11px]">
                        Daily (NPR) *
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={dailyWithDriver}
                        onChange={(e) => setDailyWithDriver(Number(e.target.value))}
                        className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 font-black text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-600 block mb-1 text-[11px]">
                        Weekly (NPR)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={weeklyWithDriver}
                        onChange={(e) => setWeeklyWithDriver(Number(e.target.value))}
                        className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 font-black text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-600 block mb-1 text-[11px]">
                        Monthly (NPR)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={monthlyWithDriver}
                        onChange={(e) => setMonthlyWithDriver(Number(e.target.value))}
                        className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 font-black text-slate-900"
                      />
                    </div>
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-400 italic">
                    With Driver rentals disabled for this vehicle.
                  </p>
                )}
              </div>

              {/* Option B: Self Drive Pricing */}
              <div className="p-4 rounded-2xl border border-slate-200/90 bg-[#F8FAFC] space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="allowSelfDrive"
                      checked={allowsSelfDrive}
                      onChange={(e) => setAllowsSelfDrive(e.target.checked)}
                      className="w-4 h-4 text-[#0755C9] rounded accent-[#0755C9] cursor-pointer"
                    />
                    <label htmlFor="allowSelfDrive" className="font-black text-slate-900 cursor-pointer">
                      Enable "Self Drive" Bookings
                    </label>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    Self Drive Freedom
                  </span>
                </div>

                {allowsSelfDrive ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                    <div>
                      <label className="font-bold text-slate-600 block mb-1 text-[11px]">
                        Hourly (NPR)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={hourlyRateSelfDrive}
                        onChange={(e) => setHourlyRateSelfDrive(Number(e.target.value))}
                        className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 font-black text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-600 block mb-1 text-[11px]">
                        Daily (NPR) *
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={dailySelfDrive}
                        onChange={(e) => setDailySelfDrive(Number(e.target.value))}
                        className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 font-black text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-600 block mb-1 text-[11px]">
                        Weekly (NPR)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={weeklySelfDrive}
                        onChange={(e) => setWeeklySelfDrive(Number(e.target.value))}
                        className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 font-black text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-600 block mb-1 text-[11px]">
                        Monthly (NPR)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={monthlySelfDrive}
                        onChange={(e) => setMonthlySelfDrive(Number(e.target.value))}
                        className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 font-black text-slate-900"
                      />
                    </div>
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-400 italic">
                    Self Drive rentals disabled for this vehicle (e.g. 14-seater Hiace).
                  </p>
                )}
              </div>

              {/* Security Deposit */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200">
                <label className="font-black text-slate-800 block mb-1">
                  Refundable Security Deposit (NPR)
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-bold">NPR</span>
                  <input
                    type="number"
                    min="0"
                    value={securityDeposit}
                    onChange={(e) => setSecurityDeposit(Number(e.target.value))}
                    className="w-full max-w-xs bg-[#F8FAFC] border border-slate-200 rounded-xl px-3 py-2 font-black text-slate-900"
                  />
                  <span className="text-[11px] text-slate-400 font-medium">
                    (Hold on credit card or eSewa for damages / violations)
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ===================== STEP 3: VEHICLE IMAGES ===================== */}
          {activeStep === 3 && (
            <div className="space-y-4 text-xs">
              <div>
                <h4 className="font-black text-slate-900 text-sm">
                  Vehicle Photographs ({images.length} added) *
                </h4>
                <p className="text-[11px] text-slate-400 font-medium">
                  Upload multiple exterior and interior photos. Supported: JPG, PNG, WebP (Max 5MB each).
                </p>
              </div>

              {/* Drag & Drop Upload Zone */}
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`p-6 border-2 border-dashed rounded-3xl text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
                  dragActive
                    ? 'border-[#0755C9] bg-blue-50/60 scale-[1.01]'
                    : 'border-slate-200 hover:border-[#0755C9]/50 hover:bg-slate-50'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".jpg,.jpeg,.png,.webp"
                  onChange={(e) => e.target.files && handleFilesUpload(e.target.files)}
                  className="hidden"
                />

                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0755C9] flex items-center justify-center shadow-xs">
                  <Upload className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <span className="font-extrabold text-slate-900 text-xs block">
                    {isUploadingImage ? 'Uploading images...' : 'Click to browse or drag & drop files here'}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    JPEG, PNG, WebP up to 5MB per file
                  </span>
                </div>
              </div>

              {/* Quick Pick Presets */}
              <div>
                <span className="text-[11px] font-bold text-slate-500 block mb-1.5">
                  Or pick from verified Nepal fleet photography presets:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {PRESET_VEHICLE_IMAGES.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => handleAddPresetImage(preset.url)}
                      className="p-2 rounded-xl border border-slate-200/80 bg-[#F8FAFC] hover:bg-blue-50/50 hover:border-blue-300 flex items-center gap-2 text-left transition-all"
                    >
                      <div className="w-9 h-7 rounded-lg bg-white p-0.5 flex-shrink-0 flex items-center justify-center overflow-hidden border border-slate-100">
                        <img src={preset.url} alt="Car" className="w-full h-full object-contain" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-800 truncate">
                        {preset.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Uploaded Images Preview Grid */}
              {images.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-extrabold text-slate-700 block">
                    Selected Image Gallery (First is Cover Photo):
                  </span>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                    {images.map((imgUrl, idx) => (
                      <div
                        key={idx}
                        className="relative h-24 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 p-1 group shadow-2xs"
                      >
                        <img
                          src={imgUrl}
                          alt={`Vehicle ${idx + 1}`}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.target.src = '/cars/creta.png';
                          }}
                        />
                        {idx === 0 && (
                          <span className="absolute top-1.5 left-1.5 bg-[#0755C9] text-white text-[9px] font-black px-1.5 py-0.2 rounded-md shadow-2xs">
                            Cover
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute top-1.5 right-1.5 p-1 bg-white/90 hover:bg-rose-50 text-slate-600 hover:text-rose-600 rounded-lg shadow-2xs transition-colors"
                          title="Remove image"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ===================== STEP 4: OWNERSHIP, DOCUMENTS & AVAILABILITY ===================== */}
          {activeStep === 4 && (
            <div className="space-y-4 text-xs">
              {/* Ownership Information */}
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-3">
                <label className="font-black text-slate-900 block">
                  Ownership Model *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Company Owned', 'Partner Owned'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setOwnership(opt)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                        ownership === opt
                          ? 'bg-[#0755C9] text-white border-[#0755C9] shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {ownership === 'Partner Owned' && (
                  <div className="pt-2 animate-in fade-in">
                    <label className="font-bold text-slate-700 block mb-1">
                      Select Approved Nepal Rental Partner
                    </label>
                    <select
                      value={partnerName}
                      onChange={(e) => setPartnerName(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-900"
                    >
                      {APPROVED_PARTNERS.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Vehicle Documents & Expiry Dates */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3">
                <div>
                  <h4 className="font-black text-slate-900 text-xs">
                    Nepal Vehicle Documents & Expiry
                  </h4>
                  <p className="text-[10px] text-slate-400 font-medium">
                    Bluebook registration certificate, commercial insurance & road tax tokens
                  </p>
                </div>

                {/* Doc 1: Registration Certificate */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 items-center p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div>
                    <span className="font-bold text-slate-800 block text-[11px]">
                      1. Bluebook / Registration Certificate
                    </span>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => e.target.files && handleDocUpload('registrationCertificate', e.target.files[0])}
                      className="text-[10px] text-slate-500 mt-1 file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-blue-50 file:text-[#0755C9]"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-500 block text-[10px] mb-0.5">
                      Certificate Renewal Date
                    </label>
                    <input
                      type="date"
                      value={documents.registrationCertificate.expiryDate}
                      onChange={(e) =>
                        setDocuments({
                          ...documents,
                          registrationCertificate: {
                            ...documents.registrationCertificate,
                            expiryDate: e.target.value,
                          },
                        })
                      }
                      className="w-full bg-white border border-slate-200 rounded-lg p-1.5 text-xs font-medium"
                    />
                  </div>
                </div>

                {/* Doc 2: Insurance Document */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 items-center p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div>
                    <span className="font-bold text-slate-800 block text-[11px]">
                      2. Commercial Insurance Document
                    </span>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => e.target.files && handleDocUpload('insurance', e.target.files[0])}
                      className="text-[10px] text-slate-500 mt-1 file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-blue-50 file:text-[#0755C9]"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-500 block text-[10px] mb-0.5">
                      Insurance Expiry Date
                    </label>
                    <input
                      type="date"
                      value={documents.insurance.expiryDate}
                      onChange={(e) =>
                        setDocuments({
                          ...documents,
                          insurance: {
                            ...documents.insurance,
                            expiryDate: e.target.value,
                          },
                        })
                      }
                      className="w-full bg-white border border-slate-200 rounded-lg p-1.5 text-xs font-medium"
                    />
                  </div>
                </div>

                {/* Doc 3: Tax Document */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 items-center p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div>
                    <span className="font-bold text-slate-800 block text-[11px]">
                      3. Road Tax Clearance Token
                    </span>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => e.target.files && handleDocUpload('taxDocument', e.target.files[0])}
                      className="text-[10px] text-slate-500 mt-1 file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-blue-50 file:text-[#0755C9]"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-500 block text-[10px] mb-0.5">
                      Tax Token Expiry Date
                    </label>
                    <input
                      type="date"
                      value={documents.taxDocument.expiryDate}
                      onChange={(e) =>
                        setDocuments({
                          ...documents,
                          taxDocument: {
                            ...documents.taxDocument,
                            expiryDate: e.target.value,
                          },
                        })
                      }
                      className="w-full bg-white border border-slate-200 rounded-lg p-1.5 text-xs font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* 7. Availability Status */}
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-2">
                <label className="font-black text-slate-900 block">
                  Initial Vehicle Availability Status *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'Available', color: 'bg-emerald-500', desc: 'Ready for booking' },
                    { id: 'Inactive', color: 'bg-slate-500', desc: 'Not listed online' },
                    { id: 'Maintenance', color: 'bg-amber-500', desc: 'In workshop' },
                  ].map((st) => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setStatus(st.id)}
                      className={`p-2.5 rounded-xl text-left border transition-all ${
                        status === st.id
                          ? 'bg-white border-[#0755C9] shadow-xs ring-2 ring-[#0755C9]/20'
                          : 'bg-white border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-black text-xs text-slate-900">
                        <span className={`w-2 h-2 rounded-full ${st.color}`}></span>
                        <span>{st.id}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                        {st.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-3.5 border-t border-slate-100 bg-[#F8FAFC] flex items-center justify-between flex-shrink-0">
          <div>
            {activeStep > 1 && (
              <button
                type="button"
                onClick={() => setActiveStep(activeStep - 1)}
                className="px-4 py-2 rounded-xl text-slate-600 font-bold text-xs hover:bg-slate-200/60 transition-colors"
              >
                ← Back
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 rounded-xl text-slate-600 font-bold text-xs hover:bg-slate-200/60 transition-colors"
            >
              Cancel
            </button>

            {activeStep < 4 ? (
              <button
                type="button"
                onClick={() => setActiveStep(activeStep + 1)}
                className="px-5 py-2 rounded-xl bg-[#0755C9] text-white font-black text-xs shadow-md hover:bg-[#053e94] transition-colors"
              >
                Next Step →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2 rounded-xl bg-[#0755C9] text-white font-black text-xs shadow-md hover:bg-[#053e94] disabled:opacity-50 transition-all flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Registering Vehicle...</span>
                  </>
                ) : (
                  <span>Register Vehicle</span>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const AddDriverModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '+977 98',
    licenseNumber: '01-06-',
    experienceYears: 6,
    status: 'available',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-base">Onboard New Driver</h3>
              <p className="text-[11px] text-slate-400 font-semibold">Nepal licensed mountain chauffeur</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Driver Full Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Dawa Sherpa"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0755C9]"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Mobile Phone (+977) *</label>
            <input
              type="text"
              required
              placeholder="+977 9841000000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0755C9]"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Nepal Driving License Number *</label>
            <input
              type="text"
              required
              placeholder="01-06-00981244"
              value={formData.licenseNumber}
              onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
              className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0755C9]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Experience (Years)</label>
              <input
                type="number"
                min="1"
                max="35"
                value={formData.experienceYears}
                onChange={(e) => setFormData({ ...formData, experienceYears: Number(e.target.value) })}
                className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-800"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-800"
              >
                <option value="available">Available</option>
                <option value="on_trip">On Trip</option>
                <option value="off_duty">Off Duty</option>
              </select>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 font-bold hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#0755C9] text-white font-black shadow-md hover:bg-[#053e94] transition-colors"
            >
              Onboard Driver
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const BookingDetailModal = ({ isOpen, booking, onClose, onUpdateStatus }) => {
  if (!isOpen || !booking) return null;

  const grandTotal = booking.pricingBreakdown?.grandTotal || booking.pricing?.grandTotal || booking.totalAmount || 17000;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4 max-h-[90vh] overflow-y-auto no-scrollbar">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-lg text-[#0755C9]">{booking.bookingId || '#NCR-10458'}</span>
              <span className="text-xs font-bold text-slate-400">Order Details</span>
            </div>
            <p className="text-[11px] text-slate-500 font-semibold">Nepal Car Rental Reservation</p>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Customer & Vehicle Info */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-bold">CUSTOMER</span>
            <span className="font-extrabold text-slate-900">{booking.customer?.name || 'Saroj'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-bold">PHONE / EMAIL</span>
            <span className="font-semibold text-slate-700">{booking.customer?.phone || '+977 9841892011'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-bold">VEHICLE</span>
            <span className="font-extrabold text-slate-900">{booking.vehicle?.name || 'Hyundai Creta'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-bold">RENTAL TYPE</span>
            <span className="font-bold text-[#0755C9]">
              {booking.rentalType === 'self_drive' ? 'Self Drive' : 'With Driver'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-bold">ROUTE</span>
            <span className="font-bold text-slate-800">
              {booking.pickupLocation?.name || 'Kathmandu'} → {booking.dropoffLocation?.name || 'Pokhara'}
            </span>
          </div>
        </div>

        {/* Financial Breakdown */}
        <div className="space-y-1.5 text-xs">
          <div className="flex items-center justify-between py-1 border-b border-slate-100 text-slate-600">
            <span>Payment Method</span>
            <span className="font-bold text-slate-900">{booking.paymentMethod || 'eSewa'}</span>
          </div>
          <div className="flex items-center justify-between py-1 border-b border-slate-100 text-slate-600">
            <span>Payment Status</span>
            <span className="font-black text-emerald-600 uppercase">
              {booking.paymentStatus || 'Completed'}
            </span>
          </div>
          <div className="flex items-center justify-between pt-2 text-sm font-black text-slate-900">
            <span>Total Amount</span>
            <span>NPR {Number(grandTotal).toLocaleString()}</span>
          </div>
        </div>

        {/* Change Status Buttons */}
        <div className="pt-3 border-t border-slate-100 space-y-2">
          <span className="text-[11px] font-bold text-slate-500 block">Update Booking Status:</span>
          <div className="grid grid-cols-4 gap-1.5 text-xs font-bold">
            {['pending', 'confirmed', 'ongoing', 'completed'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => {
                  onUpdateStatus && onUpdateStatus(booking._id, st);
                  onClose();
                }}
                className={`py-1.5 rounded-xl capitalize transition-colors ${
                  booking.status === st
                    ? 'bg-[#0755C9] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
