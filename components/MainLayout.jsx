// Imports
import React from 'react';
import Navbar from './Navbar';

// Main Layout of the web app
const MainLayout = ({ children }) => {
  return (
    <div className="bg-background min-h-screen flex flex-col justify-between">
      <main className="flex-grow p-4">
        {children}
      </main>
      <Navbar />
    </div>
  );
};

export default MainLayout;