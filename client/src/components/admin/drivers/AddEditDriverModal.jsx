import React, { useState } from 'react';
import {
  X,
  User,
  ShieldCheck,
  Briefcase,
  Upload,
  CheckCircle,
  AlertCircle,
  FileText,
  Car,
} from 'lucide-react';
import api from '../../../services/api';

const NEPAL_PROVINCES = [
  'Bagmati Province',
  'Gandaki Province',
  'Koshi Province',
  'Madhesh Province',
  'Lumbini Province',
  'Karnali Province',
  'Sudurpashchim Province',
];

const NEPAL_DISTRICTS = [
  'Kathmandu',
  'Lalitpur',
  'Bhaktapur',
  'Kaski (Pokhara)',
  'Chitwan',
  'Kavrepalanchok',
  'Makwanpur',
  'Lamjung',
  'Tanahun',
  'Gorkha',
  'Morang',
  'Sunsari',
  'Rupandehi',
  'Banke',
  'Kailali',
];

const LICENCE_CATEGORIES = [
  'Category B (Car / Jeep / Delivery Van)',
  'Category C (Heavy Vehicle / Bus / Truck)',
  'Category A (Motorcycle / Scooter)',
  'Category D (Mini Bus / Tractor)',
];

const AddEditDriverModal = ({ driver, onClose, onSuccess }) => {
  const isEditing = !!driver?._id;

  // Active form section tab
  const [activeTab, setActiveTab] = useState('personal'); // 'personal' | 'licence' | 'employment'

  // Form State
  const [formData, setFormData] = useState({
    // 1. Personal
    name: driver?.name || '',
    phone: driver?.phone || '+977 ',
    email: driver?.email || '',
    dob: driver?.dob ? new Date(driver.dob).toISOString().slice(0, 10) : '1992-05-15',
    gender: driver?.gender || 'Male',
    permanentAddress: driver?.permanentAddress || '',
    currentAddress: driver?.currentAddress || '',
    province: driver?.province || 'Bagmati Province',
    district: driver?.district || 'Kathmandu',
    municipality: driver?.municipality || 'Kathmandu Metropolitan City',
    emergencyName: driver?.emergencyContact?.name || '',
    emergencyPhone: driver?.emergencyContact?.phone || '',
    emergencyRelation: driver?.emergencyContact?.relation || 'Spouse',
    avatar: driver?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',

    // 2. Licence
    licenseNumber: driver?.licenseNumber || '',
    licenseCategory: driver?.licenseCategory || ['Category B (Car / Jeep / Delivery Van)'],
    issuingAuthority: driver?.issuingAuthority || 'Transport Management Office (Ekantakuna, Lalitpur)',
    licenseIssueDate: driver?.licenseIssueDate
      ? new Date(driver.licenseIssueDate).toISOString().slice(0, 10)
      : '2020-01-15',
    licenseExpiry: driver?.licenseExpiry
      ? new Date(driver.licenseExpiry).toISOString().slice(0, 10)
      : '2029-01-14',
    licenseFrontImage: driver?.licenseFrontImage || '',
    licenseBackImage: driver?.licenseBackImage || '',
    licenseVerificationStatus: driver?.licenseVerificationStatus || 'verified',

    // 3. Employment
    employeeId: driver?.employeeId || driver?.driverId || '',
    joiningDate: driver?.joiningDate
      ? new Date(driver.joiningDate).toISOString().slice(0, 10)
      : new Date().toISOString().slice(0, 10),
    employmentType: driver?.employmentType || 'Full Time',
    payType: driver?.salaryOrCommission?.payType || 'Monthly Salary',
    payAmount: driver?.salaryOrCommission?.amount || 38000,
    status: driver?.status || 'available',
    experienceYears: driver?.experienceYears || 5,
    rating: driver?.rating || 4.9,
    tripsCompleted: driver?.tripsCompleted || 0,
    languages: driver?.languages?.join(', ') || 'Nepali, English, Hindi',
    notes: driver?.notes || '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Toggle Category Checkbox
  const toggleCategory = (cat) => {
    setFormData((prev) => {
      const exists = prev.licenseCategory.includes(cat);
      return {
        ...prev,
        licenseCategory: exists
          ? prev.licenseCategory.filter((c) => c !== cat)
          : [...prev.licenseCategory, cat],
      };
    });
  };

  // File Upload Helper
  const handleFileUpload = async (file, fieldName) => {
    if (!file) return;
    setUploadingImage(true);
    setErrorMsg('');
    try {
      const data = new FormData();
      data.append('file', file);
      const res = await api.post('/admin/drivers/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res.data?.success) {
        setFormData((prev) => ({ ...prev, [fieldName]: res.data.url }));
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'File upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || !formData.phone.trim() || !formData.licenseNumber.trim()) {
      setErrorMsg('Full Name, Phone Number, and Licence Number are required.');
      return;
    }

    if (!formData.licenseExpiry) {
      setErrorMsg('Licence expiry date is required.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        dob: formData.dob,
        gender: formData.gender,
        permanentAddress: formData.permanentAddress,
        currentAddress: formData.currentAddress,
        province: formData.province,
        district: formData.district,
        municipality: formData.municipality,
        emergencyContact: {
          name: formData.emergencyName,
          phone: formData.emergencyPhone,
          relation: formData.emergencyRelation,
        },
        avatar: formData.avatar,
        licenseNumber: formData.licenseNumber.trim(),
        licenseCategory: formData.licenseCategory,
        issuingAuthority: formData.issuingAuthority,
        licenseIssueDate: formData.licenseIssueDate,
        licenseExpiry: formData.licenseExpiry,
        licenseFrontImage: formData.licenseFrontImage,
        licenseBackImage: formData.licenseBackImage,
        licenseVerificationStatus: formData.licenseVerificationStatus,
        employeeId: formData.employeeId || undefined,
        joiningDate: formData.joiningDate,
        employmentType: formData.employmentType,
        salaryOrCommission: {
          payType: formData.payType,
          amount: Number(formData.payAmount) || 35000,
        },
        status: formData.status,
        experienceYears: Number(formData.experienceYears) || 5,
        rating: Number(formData.rating) || 4.9,
        tripsCompleted: Number(formData.tripsCompleted) || 0,
        languages: formData.languages.split(',').map((s) => s.trim()).filter(Boolean),
        notes: formData.notes,
      };

      let res;
      if (isEditing) {
        res = await api.put(`/admin/drivers/${driver._id}`, payload);
      } else {
        res = await api.post('/admin/drivers', payload);
      }

      if (res.data?.success) {
        onSuccess(res.data.data, isEditing ? 'Driver updated successfully!' : 'New driver onboarded successfully!');
        onClose();
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to save driver profile');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-base font-black text-slate-900">
              {isEditing ? `Edit Driver: ${driver.name} (${driver.driverId})` : 'Register New Nepal Chauffeur'}
            </h2>
            <p className="text-xs text-slate-400 font-medium">
              Verify personal credentials, driving licence card, and employment contract
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center gap-2 px-6 pt-3 bg-slate-50/50 border-b border-slate-100 text-xs shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('personal')}
            className={`pb-2.5 px-3 font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'personal'
                ? 'border-[#0755C9] text-[#0755C9]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>1. Personal Information</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('licence')}
            className={`pb-2.5 px-3 font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'licence'
                ? 'border-[#0755C9] text-[#0755C9]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>2. Driving Licence</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('employment')}
            className={`pb-2.5 px-3 font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'employment'
                ? 'border-[#0755C9] text-[#0755C9]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>3. Employment & Status</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center gap-2 font-bold">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* TAB 1: PERSONAL INFORMATION */}
          {activeTab === 'personal' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <img
                  src={formData.avatar}
                  alt="Driver Avatar"
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-sm"
                />
                <div className="flex-1 space-y-1 text-center sm:text-left">
                  <span className="text-[11px] font-bold text-slate-700 block">
                    Profile Photograph
                  </span>
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      id="avatar-upload"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e.target.files[0], 'avatar')}
                    />
                    <label
                      htmlFor="avatar-upload"
                      className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-50 cursor-pointer shadow-xs inline-flex items-center gap-1"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploadingImage ? 'Uploading...' : 'Upload Photo'}</span>
                    </label>
                    <input
                      type="text"
                      name="avatar"
                      value={formData.avatar}
                      onChange={handleChange}
                      placeholder="Or enter image URL"
                      className="flex-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-700"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Ram Bahadur Thapa"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0755C9]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
                    Phone Number (Nepal Mobile) *
                  </label>
                  <input
                    type="text"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+977 98XXXXXXXX"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold font-mono text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0755C9]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="driver@nepalcarrental.com"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0755C9]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0755C9]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0755C9]"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
                    Province
                  </label>
                  <select
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0755C9]"
                  >
                    {NEPAL_PROVINCES.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
                    District
                  </label>
                  <select
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0755C9]"
                  >
                    {NEPAL_DISTRICTS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
                    Permanent Address
                  </label>
                  <input
                    type="text"
                    name="permanentAddress"
                    value={formData.permanentAddress}
                    onChange={handleChange}
                    placeholder="e.g. Besisahar-3, Lamjung"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0755C9]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
                    Current Address
                  </label>
                  <input
                    type="text"
                    name="currentAddress"
                    value={formData.currentAddress}
                    onChange={handleChange}
                    placeholder="e.g. Kalanki, Kathmandu"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0755C9]"
                  />
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <span className="text-[10px] font-black uppercase text-slate-400 block">
                  Emergency Contact Details
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    name="emergencyName"
                    value={formData.emergencyName}
                    onChange={handleChange}
                    placeholder="Contact Name"
                    className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                  />
                  <input
                    type="text"
                    name="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={handleChange}
                    placeholder="Contact Phone"
                    className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono"
                  />
                  <input
                    type="text"
                    name="emergencyRelation"
                    value={formData.emergencyRelation}
                    onChange={handleChange}
                    placeholder="Relation (e.g. Spouse, Brother)"
                    className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DRIVING LICENCE */}
          {activeTab === 'licence' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
                    Licence Number (Nepal Smart Card) *
                  </label>
                  <input
                    type="text"
                    required
                    name="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={handleChange}
                    placeholder="01-05-99887711"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold font-mono text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0755C9]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
                    Issuing Authority *
                  </label>
                  <input
                    type="text"
                    required
                    name="issuingAuthority"
                    value={formData.issuingAuthority}
                    onChange={handleChange}
                    placeholder="e.g. Ekantakuna, Lalitpur"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0755C9]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
                    Issue Date
                  </label>
                  <input
                    type="date"
                    name="licenseIssueDate"
                    value={formData.licenseIssueDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0755C9]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
                    Expiry Date *
                  </label>
                  <input
                    type="date"
                    required
                    name="licenseExpiry"
                    value={formData.licenseExpiry}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0755C9]"
                  />
                </div>
              </div>

              {/* Licence Categories */}
              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase text-slate-400">
                  Authorized Vehicle Categories:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {LICENCE_CATEGORIES.map((cat) => {
                    const checked = formData.licenseCategory.includes(cat);
                    return (
                      <label
                        key={cat}
                        className={`flex items-center gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-all ${
                          checked
                            ? 'bg-blue-50/60 border-blue-200 text-[#0755C9] font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-600'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleCategory(cat)}
                          className="rounded text-[#0755C9] focus:ring-[#0755C9]"
                        />
                        <span>{cat}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Licence Verification Status */}
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
                  Licence Verification Status
                </label>
                <select
                  name="licenseVerificationStatus"
                  value={formData.licenseVerificationStatus}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0755C9]"
                >
                  <option value="verified">Verified (Approved)</option>
                  <option value="pending">Pending Admin Check</option>
                  <option value="expired">Expired</option>
                  <option value="rejected">Rejected / Invalid</option>
                </select>
              </div>

              {/* Upload Front and Back */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-[10px] font-black uppercase text-slate-400 block">
                    Licence Card Front Image
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    id="licence-front-upload"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e.target.files[0], 'licenseFrontImage')}
                  />
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="licence-front-upload"
                      className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-bold text-slate-700 hover:bg-slate-100 cursor-pointer text-xs"
                    >
                      Browse Front
                    </label>
                    <input
                      type="text"
                      name="licenseFrontImage"
                      value={formData.licenseFrontImage}
                      onChange={handleChange}
                      placeholder="Or enter image URL"
                      className="flex-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-[10px] font-black uppercase text-slate-400 block">
                    Licence Card Back Image
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    id="licence-back-upload"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e.target.files[0], 'licenseBackImage')}
                  />
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="licence-back-upload"
                      className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-bold text-slate-700 hover:bg-slate-100 cursor-pointer text-xs"
                    >
                      Browse Back
                    </label>
                    <input
                      type="text"
                      name="licenseBackImage"
                      value={formData.licenseBackImage}
                      onChange={handleChange}
                      placeholder="Or enter image URL"
                      className="flex-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: EMPLOYMENT & STATUS */}
          {activeTab === 'employment' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
                    Employee ID
                  </label>
                  <input
                    type="text"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleChange}
                    placeholder="Auto-generated if left empty"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0755C9]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
                    Joining Date
                  </label>
                  <input
                    type="date"
                    name="joiningDate"
                    value={formData.joiningDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0755C9]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
                    Employment Type
                  </label>
                  <select
                    name="employmentType"
                    value={formData.employmentType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0755C9]"
                  >
                    <option value="Full Time">Full Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Partner Driver">Partner Driver</option>
                    <option value="On-Demand">On-Demand</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
                    Initial Availability Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0755C9]"
                  >
                    <option value="available">Available (Ready for Trips)</option>
                    <option value="unavailable">Unavailable</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
                    Salary / Compensation Type
                  </label>
                  <select
                    name="payType"
                    value={formData.payType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0755C9]"
                  >
                    <option value="Monthly Salary">Monthly Salary</option>
                    <option value="Daily Allowance">Daily Allowance</option>
                    <option value="Per Trip Commission">Per Trip Commission</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
                    Compensation Amount (NPR)
                  </label>
                  <input
                    type="number"
                    min="0"
                    name="payAmount"
                    value={formData.payAmount}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold font-mono text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0755C9]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
                    Years of Mountain Highway Experience
                  </label>
                  <input
                    type="number"
                    min="0"
                    name="experienceYears"
                    value={formData.experienceYears}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0755C9]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
                    Spoken Languages (Comma separated)
                  </label>
                  <input
                    type="text"
                    name="languages"
                    value={formData.languages}
                    onChange={handleChange}
                    placeholder="Nepali, English, Hindi"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0755C9]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
                  Admin Notes & Driving Background
                </label>
                <textarea
                  rows={2}
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="e.g. Route expertise, safety record, language proficiency"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0755C9]"
                />
              </div>
            </div>
          )}

          {/* Form Action Footer */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {activeTab === 'personal' && (
                <button
                  type="button"
                  onClick={() => setActiveTab('licence')}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
                >
                  Next: Licence Info →
                </button>
              )}
              {activeTab === 'licence' && (
                <button
                  type="button"
                  onClick={() => setActiveTab('employment')}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
                >
                  Next: Employment Info →
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 bg-[#0755C9] hover:bg-[#053e94] text-white rounded-xl text-xs font-black shadow-md shadow-blue-500/20 disabled:opacity-50 transition-colors"
              >
                {submitting ? 'Saving...' : isEditing ? 'Update Driver' : 'Register Driver'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditDriverModal;
