import React, { createContext, useContext, useState, useEffect } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || '';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('zenex_bookings');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('zenex_bookings', JSON.stringify(bookings));
  }, [bookings]);

  const addBooking = async (bookingData) => {
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });
      const data = await res.json();
      if (data.success) {
        setBookings(prev => [...prev, data.booking]);
        return data.booking;
      }
    } catch (err) {
      console.error("Error saving booking on backend", err);
    }

    let maxNum = 0;
    bookings.forEach(b => {
      if (b && b.id) {
        const match = String(b.id).match(/ZNX\s*-\s*(\d+)/i) || String(b.id).match(/(\d+)/);
        if (match) {
          const num = parseInt(match[1], 10);
          if (num > maxNum) maxNum = num;
        }
      }
    });
    const nextNum = maxNum + 1;
    const newBooking = {
      ...bookingData,
      id: `ZNX - ${String(nextNum).padStart(3, '0')}`,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setBookings(prev => [...prev, newBooking]);
    return newBooking;
  };

  const updateBookingStatus = (id, status) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  // Helper to check if date ranges overlap
  const datesOverlap = (start1, end1, start2, end2) => {
    const s1 = new Date(start1).getTime();
    const e1 = new Date(end1).getTime();
    const s2 = new Date(start2).getTime();
    const e2 = new Date(end2).getTime();
    return s1 <= e2 && s2 <= e1;
  };

  const isVehicleAvailable = (vehicleId, startDate, endDate) => {
    if (!startDate || !endDate) return true;
    
    // Check if any booking for this vehicle overlaps with requested dates
    // Only care about active bookings (pending, confirmed)
    const conflictingBooking = bookings.find(b => 
      b.vehicleId === vehicleId && 
      ['pending', 'confirmed'].includes(b.status) &&
      datesOverlap(startDate, endDate, b.dates.start, b.dates.end)
    );
    
    return !conflictingBooking;
  };

  // Get all booked date ranges for a specific vehicle
  const getBookedDatesForVehicle = (vehicleId) => {
    return bookings
      .filter(b => b.vehicleId === vehicleId && ['pending', 'confirmed'].includes(b.status))
      .map(b => ({ start: new Date(b.dates.start), end: new Date(b.dates.end) }));
  };

  return (
    <BookingContext.Provider value={{ 
      bookings, 
      addBooking, 
      updateBookingStatus, 
      isVehicleAvailable,
      getBookedDatesForVehicle
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
