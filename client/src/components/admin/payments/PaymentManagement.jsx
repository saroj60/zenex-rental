import React, { useState, useEffect, useCallback } from 'react';
import {
  CreditCard,
  Plus,
  RefreshCw,
  Download,
  ShieldCheck,
  RotateCcw,
  Banknote,
  CheckCircle,
  AlertCircle,
  Layers,
  ArrowUpRight,
  Receipt
} from 'lucide-react';
import api from '../../../services/api';

// Subcomponents
import PaymentStatsCards from './PaymentStatsCards';
import PaymentCharts from './PaymentCharts';
import PaymentFilterToolbar from './PaymentFilterToolbar';
import PaymentTableView from './PaymentTableView';
import PaymentDetailsModal from './PaymentDetailsModal';
import RecordCashModal from './RecordCashModal';
import RefundModal from './RefundModal';
import SettleDepositModal from './SettleDepositModal';
import ReceiptInvoiceModal from './ReceiptInvoiceModal';

export default function PaymentManagement() {
  // Navigation & Subtab State
  const [activeSubTab, setActiveSubTab] = useState('transactions'); // 'transactions' | 'refunds' | 'security_deposits'

  // Data State
  const [stats, setStats] = useState({
    totalRevenue: 1504000,
    totalCollected: 1620000,
    pendingPayments: 48000,
    refunds: 116000,
    todayCollection: 45000,
    outstandingAmount: 285000,
    charts: {
      monthlyRevenue: [],
      dailyCollections: [],
      methodDistribution: [],
      statusDistribution: []
    }
  });

  const [payments, setPayments] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1
  });
  const [securityDeposits, setSecurityDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [notification, setNotification] = useState(null);

  // Filters State
  const [search, setSearch] = useState('');
  const [method, setMethod] = useState('all');
  const [status, setStatus] = useState('all');
  const [paymentType, setPaymentType] = useState('all');
  const [datePreset, setDatePreset] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  // Modal States
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isRecordCashOpen, setIsRecordCashOpen] = useState(false);
  const [isRefundOpen, setIsRefundOpen] = useState(false);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [isSettleDepositOpen, setIsSettleDepositOpen] = useState(false);
  const [selectedDeposit, setSelectedDeposit] = useState(null);

  const showToast = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Fetch Statistics & Charts
  const fetchStats = useCallback(async () => {
    try {
      const res = await api.get('/payments/statistics');
      if (res.data?.data) {
        setStats(res.data.data);
      }
    } catch (err) {
      console.warn('Could not fetch live payment stats, using local cache:', err.message);
    }
  }, []);

  // Fetch Payments List
  const fetchPayments = useCallback(async () => {
    try {
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        search: search.trim() || undefined,
        paymentMethod: method !== 'all' ? method : undefined,
        status: status !== 'all' ? status : undefined,
        paymentType: paymentType !== 'all' ? paymentType : undefined,
        datePreset: datePreset !== 'all' ? datePreset : undefined,
        sortBy,
        sortOrder
      };

      const res = await api.get('/payments', { params });
      if (res.data?.data) {
        setPayments(res.data.data);
        if (res.data.pagination) {
          setPagination(res.data.pagination);
        } else if (typeof res.data.total === 'number') {
          setPagination(prev => ({
            ...prev,
            total: res.data.total,
            page: res.data.page || prev.page,
            totalPages: res.data.totalPages || 1
          }));
        }
      }
    } catch (err) {
      console.warn('Could not fetch payments list:', err.message);
    }
  }, [pagination.page, pagination.limit, search, method, status, paymentType, datePreset, sortBy, sortOrder]);

  // Fetch Security Deposits List
  const fetchSecurityDeposits = useCallback(async () => {
    try {
      const res = await api.get('/payments/security-deposits');
      if (res.data?.data) {
        setSecurityDeposits(res.data.data);
      }
    } catch (err) {
      console.warn('Could not fetch security deposits:', err.message);
    }
  }, []);

  // Initial Load
  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      await Promise.all([fetchStats(), fetchPayments(), fetchSecurityDeposits()]);
      setLoading(false);
    };
    loadAll();
  }, [fetchStats, fetchPayments, fetchSecurityDeposits]);

  // Refresh handler
  const handleRefresh = async () => {
    setRefreshing(true);
    await Promise.all([fetchStats(), fetchPayments(), fetchSecurityDeposits()]);
    setRefreshing(false);
    showToast('Payment records and statistics updated from database.');
  };

  // KPI Card click filter
  const handleCardFilter = (filterKey, filterValue) => {
    if (filterKey === 'status') {
      setStatus(filterValue);
      setActiveSubTab('transactions');
    } else if (filterKey === 'type') {
      setActiveSubTab(filterValue === 'security_deposit' ? 'security_deposits' : 'transactions');
    } else if (filterKey === 'subtab') {
      setActiveSubTab(filterValue);
    }
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearch('');
    setMethod('all');
    setStatus('all');
    setPaymentType('all');
    setDatePreset('all');
    setSortBy('createdAt');
    setSortOrder('desc');
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  // Export CSV
  const handleExportCSV = () => {
    if (!payments.length) {
      showToast('No payment transactions to export.', 'error');
      return;
    }
    const headers = [
      'Transaction ID',
      'Booking ID',
      'Customer Name',
      'Customer Phone',
      'Vehicle',
      'Payment Method',
      'Payment Type',
      'Amount (NPR)',
      'Status',
      'Reference',
      'Date'
    ];
    const rows = payments.map(p => [
      p.transactionId,
      p.booking?.bookingId || p.booking?._id || 'N/A',
      p.customer?.name || p.customerName || 'N/A',
      p.customer?.phone || p.customerPhone || 'N/A',
      p.vehicle?.name || p.vehicleName || 'N/A',
      p.paymentMethod,
      p.paymentType,
      p.amount,
      p.status,
      p.paymentReference || '',
      new Date(p.createdAt).toLocaleDateString()
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map(r => r.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Nepal_Car_Rental_Payments_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Payment ledger exported to CSV successfully.');
  };

  // Payment Verification Handler
  const handleVerifyPayment = async (payment) => {
    try {
      const res = await api.post(`/payments/${payment._id}/verify`);
      showToast(`Payment ${payment.transactionId} marked as verified & paid!`);
      handleRefresh();
    } catch (err) {
      showToast(err.response?.data?.message || 'Verification failed.', 'error');
    }
  };

  // Settle Security Deposit Trigger
  const handleOpenSettle = (depositItem) => {
    setSelectedDeposit(depositItem);
    setIsSettleDepositOpen(true);
  };

  // Filtered deposits for the deposits tab
  const filteredDeposits = securityDeposits.filter(d => {
    const q = search.toLowerCase();
    const tId = (d.transactionId || '').toLowerCase();
    const bId = (d.booking?.bookingId || '').toLowerCase();
    const cName = (d.customer?.name || d.customerName || '').toLowerCase();
    return tId.includes(q) || bId.includes(q) || cName.includes(q);
  });

  // Filtered refunds for the refunds tab
  const refundPayments = payments.filter(p => p.status === 'refunded' || p.status === 'partially_refunded' || p.refund?.amount > 0);

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {notification && (
        <div className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-xl shadow-lg border flex items-center gap-3 text-xs font-bold animate-in slide-in-from-top-4 duration-300 ${
          notification.type === 'error'
            ? 'bg-rose-50 border-rose-200 text-rose-800'
            : 'bg-emerald-50 border-emerald-200 text-emerald-800'
        }`}>
          {notification.type === 'error' ? (
            <AlertCircle className="w-4 h-4 text-rose-600" />
          ) : (
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-soft">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0755C9] flex items-center justify-center font-black">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight">Payment Management</h1>
              <p className="text-xs text-slate-500 font-semibold">
                Manage transactions, collections, refunds, eSewa/Khalti settlements and security deposits
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleRefresh}
            disabled={refreshing}
            className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-1.5 text-xs font-bold"
            title="Refresh payments and statistics"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-[#0755C9]' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <button
            type="button"
            onClick={handleExportCSV}
            className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2 text-xs font-bold"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export CSV</span>
          </button>

          <button
            type="button"
            onClick={() => setIsRecordCashOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-600/20 flex items-center gap-2 transition-all"
          >
            <Banknote className="w-4 h-4" />
            <span>Record Cash Payment</span>
          </button>
        </div>
      </div>

      {/* 2. KPI Statistics Cards */}
      <PaymentStatsCards stats={stats} onFilterClick={handleCardFilter} />

      {/* 3. Interactive Charts */}
      <PaymentCharts charts={stats.charts} />

      {/* 4. Filter Toolbar & Subtabs */}
      <PaymentFilterToolbar
        activeSubTab={activeSubTab}
        setActiveSubTab={setActiveSubTab}
        search={search}
        setSearch={setSearch}
        method={method}
        setMethod={setMethod}
        status={status}
        setStatus={setStatus}
        paymentType={paymentType}
        setPaymentType={setPaymentType}
        datePreset={datePreset}
        setDatePreset={setDatePreset}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        onReset={handleResetFilters}
        onOpenRecordCash={() => setIsRecordCashOpen(true)}
        onExportCSV={handleExportCSV}
        counts={{
          all: pagination.total || payments.length,
          refunds: refundPayments.length,
          deposits: securityDeposits.length
        }}
      />

      {/* 5. Subtab Views */}

      {/* TAB 1: ALL TRANSACTIONS */}
      {activeSubTab === 'transactions' && (
        <PaymentTableView
          payments={payments}
          loading={loading}
          pagination={pagination}
          setPagination={setPagination}
          onViewDetails={(payment) => {
            setSelectedPayment(payment);
            setIsDetailsOpen(true);
          }}
          onPrintReceipt={(payment) => {
            setSelectedPayment(payment);
            setIsReceiptOpen(true);
          }}
          onVerifyPayment={handleVerifyPayment}
          onInitiateRefund={(payment) => {
            setSelectedPayment(payment);
            setIsRefundOpen(true);
          }}
        />
      )}

      {/* TAB 2: REFUND MANAGEMENT */}
      {activeSubTab === 'refunds' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-soft overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-rose-600" />
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                Processed & Pending Customer Refunds ({refundPayments.length})
              </h3>
            </div>
            <span className="text-[11px] font-bold text-slate-500">
              Total Refunded: <span className="font-mono font-black text-rose-600">NPR {stats.refunds?.toLocaleString()}</span>
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-black text-[10px]">
                <tr>
                  <th className="py-3 px-4">Transaction ID</th>
                  <th className="py-3 px-4">Booking ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Original Amount</th>
                  <th className="py-3 px-4">Refund Amount</th>
                  <th className="py-3 px-4">Refund Reason</th>
                  <th className="py-3 px-4">Refund Ref</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {refundPayments.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-8 text-center text-slate-400">
                      No customer refunds recorded in this period.
                    </td>
                  </tr>
                ) : (
                  refundPayments.map((p) => (
                    <tr key={p._id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#0755C9]">{p.transactionId}</td>
                      <td className="py-3.5 px-4 font-mono text-slate-700">{p.booking?.bookingId || p.booking?._id?.slice(-6) || 'N/A'}</td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">{p.customer?.name || p.customerName}</td>
                      <td className="py-3.5 px-4 text-slate-600">NPR {p.amount?.toLocaleString()}</td>
                      <td className="py-3.5 px-4 font-black text-rose-600">
                        NPR {(p.refund?.amount || p.amount)?.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 max-w-xs truncate" title={p.refund?.reason}>
                        {p.refund?.reason || 'Customer cancellation'}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                        {p.refund?.refundReference || 'REF-NPR'}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-rose-50 text-rose-700 border border-rose-200">
                          {p.refund?.status || p.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-1.5">
                        <button
                          onClick={() => {
                            setSelectedPayment(p);
                            setIsDetailsOpen(true);
                          }}
                          className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-100 text-[11px] font-bold"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => {
                            setSelectedPayment(p);
                            setIsReceiptOpen(true);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold"
                        >
                          Voucher
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: SECURITY DEPOSITS */}
      {activeSubTab === 'security_deposits' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-soft overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#0755C9]" />
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                Vehicle Security Deposits & Guarantee Funds ({filteredDeposits.length})
              </h3>
            </div>
            <span className="text-[11px] text-slate-500 font-semibold">
              Refund Formula: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-[#0755C9] font-mono">Deposit Refund = Received - Deductions</code>
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-black text-[10px]">
                <tr>
                  <th className="py-3 px-4">Deposit ID</th>
                  <th className="py-3 px-4">Booking ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Vehicle Model</th>
                  <th className="py-3 px-4">Deposit Received</th>
                  <th className="py-3 px-4">Deductions</th>
                  <th className="py-3 px-4">Net Refund</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredDeposits.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-8 text-center text-slate-400">
                      No security deposit records found.
                    </td>
                  </tr>
                ) : (
                  filteredDeposits.map((dep) => {
                    const received = dep.securityDeposit?.amountReceived || dep.amount || 0;
                    const deductions = (dep.securityDeposit?.deductions?.damageCharges || 0) + (dep.securityDeposit?.deductions?.trafficFines || 0);
                    const netRefund = dep.securityDeposit?.status === 'settled'
                      ? dep.securityDeposit?.amountRefunded
                      : Math.max(0, received - deductions);
                    const statusVal = dep.securityDeposit?.status || 'held';

                    return (
                      <tr key={dep._id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-[#0755C9]">{dep.transactionId}</td>
                        <td className="py-3.5 px-4 font-mono text-slate-700">{dep.booking?.bookingId || dep.booking?._id?.slice(-6) || 'N/A'}</td>
                        <td className="py-3.5 px-4 font-bold text-slate-900">{dep.customer?.name || dep.customerName}</td>
                        <td className="py-3.5 px-4 text-slate-700 font-semibold">{dep.vehicle?.name || dep.vehicleName || 'Fleet Car'}</td>
                        <td className="py-3.5 px-4 font-bold text-slate-900">NPR {received.toLocaleString()}</td>
                        <td className="py-3.5 px-4 text-rose-600 font-semibold">
                          {deductions > 0 ? `- NPR ${deductions.toLocaleString()}` : 'NPR 0'}
                        </td>
                        <td className="py-3.5 px-4 font-black text-emerald-700">
                          NPR {netRefund?.toLocaleString()}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                            statusVal === 'settled'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : statusVal === 'forfeited'
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {statusVal}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-1.5">
                          {statusVal === 'held' ? (
                            <button
                              onClick={() => handleOpenSettle(dep)}
                              className="px-3 py-1 rounded-lg bg-[#0755C9] hover:bg-blue-700 text-white text-[11px] font-bold shadow-sm"
                            >
                              Settle Deposit
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                setSelectedPayment(dep);
                                setIsReceiptOpen(true);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold"
                            >
                              Receipt
                            </button>
                          )}
                          <button
                            onClick={() => {
                              setSelectedPayment(dep);
                              setIsDetailsOpen(true);
                            }}
                            className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-100 text-[11px] font-bold"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modals */}
      <RecordCashModal
        isOpen={isRecordCashOpen}
        onClose={() => setIsRecordCashOpen(false)}
        onSuccess={(newPayment) => {
          showToast('Cash payment recorded successfully.');
          handleRefresh();
          if (newPayment) {
            setSelectedPayment(newPayment);
            setIsReceiptOpen(true);
          }
        }}
      />

      <PaymentDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        payment={selectedPayment}
        onPrintReceipt={(p) => {
          setIsDetailsOpen(false);
          setSelectedPayment(p);
          setIsReceiptOpen(true);
        }}
        onInitiateRefund={(p) => {
          setIsDetailsOpen(false);
          setSelectedPayment(p);
          setIsRefundOpen(true);
        }}
      />

      <RefundModal
        isOpen={isRefundOpen}
        onClose={() => setIsRefundOpen(false)}
        payment={selectedPayment}
        onSuccess={() => {
          showToast('Refund processed successfully.');
          handleRefresh();
        }}
      />

      <SettleDepositModal
        isOpen={isSettleDepositOpen}
        onClose={() => setIsSettleDepositOpen(false)}
        deposit={selectedDeposit}
        onSuccess={() => {
          showToast('Security deposit settled and recorded.');
          handleRefresh();
        }}
      />

      <ReceiptInvoiceModal
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
        payment={selectedPayment}
      />

    </div>
  );
}
