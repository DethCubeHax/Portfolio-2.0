"use client";

import React, { useEffect } from 'react';

const ClientNavbar = ({ children }) => {
  useEffect(() => {
    const navbarElement = document.querySelector('#navbar');
    navbarElement.style.opacity = '0'; // Hide initially
    navbarElement.style.visibility = 'hidden'; // Ensure it's not visible at the start

    setTimeout(() => {
      navbarElement.style.opacity = '1';
      navbarElement.style.visibility = 'visible'; // Make it visible as it fades in
      navbarElement.style.transition = 'opacity 1s ease, visibility 1s ease';
    }, 100); // Small delay before starting the fade-in
  }, []);

  return <>{children}</>;
};

export default ClientNavbar;
