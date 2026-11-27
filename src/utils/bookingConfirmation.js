export const getBookingCustomerName = (b) => {
  if (b?.customer && typeof b.customer === 'string') return b.customer;
  if (b?.customerDetails) {
    const name = `${b.customerDetails.firstName || ''} ${b.customerDetails.lastName || ''}`.trim();
    if (name) return name;
  }
  return 'Valued Traveler';
};

export const getBookingCustomerEmail = (b) => b?.customerDetails?.email || b?.email || '';

export const getBookingCustomerPhone = (b) =>
  b?.customerDetails?.phone || b?.customerDetails?.whatsapp || b?.phone || '';

export const getBookingItemName = (b) =>
  b?.itemName || b?.vehicle || b?.title || 'Tour / Trek Package';

export const formatBookingDates = (dates) => {
  if (!dates) return 'N/A';
  if (typeof dates === 'object') {
    if (dates.start && dates.end && dates.start !== dates.end) {
      return `${dates.start} - ${dates.end}`;
    }
    return dates.start || dates.end || dates.duration || 'Flexible';
  }
  return String(dates);
};

export const buildConfirmationMessage = (b) => {
  const name = getBookingCustomerName(b);
  const item = getBookingItemName(b);
  const dates = formatBookingDates(b?.dates);
  const travelers = b?.travelersCount || 1;
  const amount = b?.amount || 'N/A';
  const payment = b?.paymentOption || 'Pay on Arrival';

  return (
    `Dear ${name},\n\n` +
    `We are pleased to confirm your booking #${b?.id || ''} for "${item}".\n\n` +
    `Trip Dates: ${dates}\n` +
    `Travelers: ${travelers} person(s)\n` +
    `Total Price: ${amount}\n` +
    `Payment Preference: ${payment}\n\n` +
    `Our operations desk will contact you regarding airport pickup and tour schedule.\n\n` +
    `Warm regards,\nZenex Travels & Tours\ninfo@zenextravels.com | +977 9767476521`
  );
};

export const buildConfirmationMailto = (b) => {
  const email = getBookingCustomerEmail(b);
  if (!email) return '';
  const subject = encodeURIComponent(
    `[Confirmed] Booking Order #${b?.id || ''} - ${getBookingItemName(b)} | Zenex Travels`
  );
  const body = encodeURIComponent(buildConfirmationMessage(b));
  return `mailto:${email}?subject=${subject}&body=${body}`;
};

export const buildConfirmationWhatsAppUrl = (b) => {
  const rawPhone = getBookingCustomerPhone(b);
  const digits = String(rawPhone).replace(/[^\d]/g, '');
  if (!digits) return '';
  const text = encodeURIComponent(buildConfirmationMessage(b));
  return `https://wa.me/${digits}?text=${text}`;
};
