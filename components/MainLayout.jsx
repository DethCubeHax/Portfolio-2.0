'use client'
import React from 'react';
import Navbar from './Navbar';
import ParticleBackground from './ParticleBackground';

const MainLayout = ({ children }) => {
  return (
    <div className="relative bg-background min-h-screen flex flex-col justify-between">
        <ParticleBackground className=" animate-fadeInLeftToRight"/>
      <main className="relative z-10 flex-grow p-4 text-white">
        {children}
        <Navbar className="relative z-auto" />
      </main>
    </div>
  );
};

export default MainLayout;
