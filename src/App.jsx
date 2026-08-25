import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import useScrollReveal from './hooks/useScrollReveal';


import WhatsAppButton from './components/WhatsAppButton';

function App() {
  const { pathname } = useLocation();
  
  // Initialize scroll animations globally
  useScrollReveal();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('header');
      if (header) {
        if (window.scrollY > 50) {
          header.classList.add('shadow-md');
          header.classList.remove('shadow-sm');
        } else {
          header.classList.add('shadow-sm');
          header.classList.remove('shadow-md');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-everest-white font-body-md text-on-surface leading-relaxed min-h-screen flex flex-col">
      <Header />
      <main className="relative flex-1">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />

      <WhatsAppButton />
    </div>
  );
}

export default App;
