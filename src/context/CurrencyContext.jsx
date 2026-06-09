import React, { createContext, useContext, useState } from 'react';

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('NPR');
  
  // Only NPR available for now as requested
  const availableCurrencies = ['NPR'];

  const formatPrice = (price) => {
    // Base prices are now stored in NPR natively
    const nprPrice = Number(price);
    return `Rs. ${nprPrice.toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, availableCurrencies, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
