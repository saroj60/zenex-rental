import React, { createContext, useContext, useState, useEffect } from 'react';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [rentalType, setRentalType] = useState('with_driver'); // 'with_driver' or 'self_drive'
  const [pickupLocation, setPickupLocation] = useState('Kathmandu');
  const [dropoffLocation, setDropoffLocation] = useState('Pokhara');
  const [startDate, setStartDate] = useState('2026-11-05');
  const [endDate, setEndDate] = useState('2026-11-07');
  const [pickupTime, setPickupTime] = useState('09:00 AM');
  const [returnTime, setReturnTime] = useState('06:00 PM');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Favorites persistence
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('ncr_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('ncr_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (vehicleId) => {
    setFavorites((prev) =>
      prev.includes(vehicleId) ? prev.filter((id) => id !== vehicleId) : [...prev, vehicleId]
    );
  };

  const isFavorite = (vehicleId) => favorites.includes(vehicleId);

  return (
    <BookingContext.Provider
      value={{
        rentalType,
        setRentalType,
        pickupLocation,
        setPickupLocation,
        dropoffLocation,
        setDropoffLocation,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        pickupTime,
        setPickupTime,
        returnTime,
        setReturnTime,
        selectedCategory,
        setSelectedCategory,
        favorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
