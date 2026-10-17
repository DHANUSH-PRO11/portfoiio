import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import './MainLayout.css';
import { Navbar } from '../components/Navbar/Navbar';
import { Footer } from '../components/Footer/Footer';

export function MainLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="site-layout">
      {/* Ambient background light orbs */}
      <div className="bg-ambient-lights" aria-hidden="true">
        <div className="ambient-orb ambient-orb-red"></div>
        <div className="ambient-orb ambient-orb-green"></div>
      </div>

      <Navbar />

      <main className="site-main" id="main-content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
