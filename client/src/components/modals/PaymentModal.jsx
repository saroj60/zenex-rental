import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, X, Smartphone, CreditCard, Banknote } from 'lucide-react';
import api from '../../services/api';

const PaymentModal = ({ isOpen, onClose, booking, onPaymentSuccess }) => {
  const [selectedMethod, setSelectedMethod] = useState('esewa');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !booking) return null;

  const totalAmount = booking.pricingBreakdown?.grandTotal || 8500;

  const handleProcessPayment = async () => {
    setProcessing(true);
    setError('');

    try {
      if (selectedMethod === 'esewa') {
        const verifyRes = await api.post('/payments/esewa/verify', {
          bookingId: booking.bookingId || booking._id,
          transaction_uuid: `ESEWA-${booking.bookingId}-${Date.now()}`,
          total_amount: totalAmount,
          ref_id: `REF-${Math.floor(100000 + Math.random() * 900000)}`,
        });
        onPaymentSuccess(verifyRes.data.data, 'esewa');
      } else if (selectedMethod === 'khalti') {
        const verifyRes = await api.post('/payments/khalti/verify', {
          bookingId: booking.bookingId || booking._id,
          pidx: `khalti_pidx_${Date.now()}`,
          transaction_id: `KHLT-${Date.now()}`,
          amount: totalAmount,
        });
        onPaymentSuccess(verifyRes.data.data, 'khalti');
      } else if (selectedMethod === 'fonepay') {
        const verifyRes = await api.post('/payments/esewa/verify', {
          bookingId: booking.bookingId || booking._id,
          transaction_uuid: `FONE-${booking.bookingId}-${Date.now()}`,
          total_amount: totalAmount,
          ref_id: `FONE-${Math.floor(100000 + Math.random() * 900000)}`,
        });
        onPaymentSuccess(verifyRes.data.data, 'fonepay');
      } else {
        // Cash
        const cashRes = await api.post('/payments/cash', {
          bookingId: booking._id,
          amount: totalAmount,
          remarks: 'Cash collected upon delivery',
        });
        onPaymentSuccess(cashRes.data.data, 'cash');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Payment processing failed. Please retry.');
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-200">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-blue-50 text-[#0755C9] rounded-2xl flex items-center justify-center mx-auto mb-3">
            <CreditCard className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Select Nepal Payment Gateway</h2>
          <p className="text-xs text-slate-500 mt-1">
            Booking ID: <span className="font-semibold text-slate-700">{booking.bookingId}</span>
          </p>
          <div className="text-2xl font-black text-[#0755C9] mt-2">
            NPR {totalAmount.toLocaleString()}
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 text-rose-600 rounded-xl text-xs font-medium">
            {error}
          </div>
        )}

        {/* Payment Methods */}
        <div className="space-y-3 mb-6">
          {/* eSewa */}
          <label
            onClick={() => setSelectedMethod('esewa')}
            className={`flex items-center justify-between p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
              selectedMethod === 'esewa'
                ? 'border-[#60BB46] bg-[#60BB46]/5 shadow-xs'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#60BB46] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                eS
              </div>
              <div className="text-left">
                <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  eSewa Digital Wallet
                  <span className="text-[10px] font-bold bg-[#60BB46] text-white px-1.5 py-0.2 rounded">POPULAR</span>
                </div>
                <div className="text-[11px] text-slate-500">Test ID: 9841000000 | MPIN: 1122</div>
              </div>
            </div>
            <input
              type="radio"
              checked={selectedMethod === 'esewa'}
              onChange={() => setSelectedMethod('esewa')}
              className="accent-[#60BB46] w-4 h-4"
            />
          </label>

          {/* Khalti */}
          <label
            onClick={() => setSelectedMethod('khalti')}
            className={`flex items-center justify-between p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
              selectedMethod === 'khalti'
                ? 'border-[#5C2D91] bg-[#5C2D91]/5 shadow-xs'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#5C2D91] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                K
              </div>
              <div className="text-left">
                <div className="font-bold text-slate-900 text-sm">Khalti Pay</div>
                <div className="text-[11px] text-slate-500">Test ID: 9800000000 | MPIN: 1111</div>
              </div>
            </div>
            <input
              type="radio"
              checked={selectedMethod === 'khalti'}
              onChange={() => setSelectedMethod('khalti')}
              className="accent-[#5C2D91] w-4 h-4"
            />
          </label>

          {/* Cash on Pickup */}
          <label
            onClick={() => setSelectedMethod('cash')}
            className={`flex items-center justify-between p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
              selectedMethod === 'cash'
                ? 'border-[#0755C9] bg-blue-50/50 shadow-xs'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                <Banknote className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="font-bold text-slate-900 text-sm">Pay Upon Vehicle Handover</div>
                <div className="text-[11px] text-slate-500">Cash / Mobile Banking on pickup</div>
              </div>
            </div>
            <input
              type="radio"
              checked={selectedMethod === 'cash'}
              onChange={() => setSelectedMethod('cash')}
              className="accent-[#0755C9] w-4 h-4"
            />
          </label>
        </div>

        <button
          type="button"
          disabled={processing}
          onClick={handleProcessPayment}
          className={`w-full py-3.5 rounded-2xl font-bold text-white transition-all shadow-md flex items-center justify-center gap-2 ${
            selectedMethod === 'esewa'
              ? 'bg-[#60BB46] hover:bg-[#52a13b]'
              : selectedMethod === 'khalti'
              ? 'bg-[#5C2D91] hover:bg-[#4d2479]'
              : 'bg-[#0755C9] hover:bg-blue-700'
          } ${processing ? 'opacity-80 cursor-wait' : ''}`}
        >
          {processing ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Verifying Transaction...</span>
            </div>
          ) : (
            <>
              <span>
                Confirm {selectedMethod === 'cash' ? 'Cash Booking' : `Pay NPR ${totalAmount.toLocaleString()}`}
              </span>
              <ShieldCheck className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;
