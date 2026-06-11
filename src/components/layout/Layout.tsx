import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { Toaster } from 'react-hot-toast';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_top_left,rgba(251,146,60,0.15),transparent_34%),radial-gradient(circle_at_top_right,rgba(20,184,166,0.16),transparent_30%)]" />
      <Header />
      <main className="relative z-10 flex-grow container mx-auto px-4 py-10 sm:py-12">
        <Outlet />
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
};

export default Layout;