import React, { createContext, useContext, useState } from 'react';

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('NPR');
  
  const availableCurrencies = ['NPR', 'USD', 'EUR', 'INR'];

  // Approximate exchange rates from NPR
  const exchangeRates = {
    NPR: 1,
    USD: 1 / 133,
    EUR: 1 / 144,
    INR: 1 / 1.6
  };

  const currencySymbols = {
    NPR: 'Rs.',
    USD: '$',
    EUR: '€',
    INR: '₹'
  };

  const formatPrice = (priceInNpr) => {
    const nprAmount = Number(priceInNpr);
    const converted = nprAmount * exchangeRates[currency];
    
    return `${currencySymbols[currency]} ${converted.toLocaleString(undefined, { maximumFractionDigits: currency === 'NPR' || currency === 'INR' ? 0 : 2 })}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, availableCurrencies, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
