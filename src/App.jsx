import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import AIChatbot from './components/AIChatbot';
import SOSButton from './components/SOSButton';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
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
      <AIChatbot />
      <SOSButton />
      <WhatsAppButton />
    </div>
  );
}

export default App;
