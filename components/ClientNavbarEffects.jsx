"use client";

import React, { useState, useEffect } from 'react';

const ClientNavbarEffects = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsTextVisible(true);
  };

  const handleMouseLeave = () => {
    setIsTextVisible(false);
    setTimeout(() => {
      setIsHovered(false);
    }, 500);
  };

  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (callback) => {
    setIsOpen(false); // Trigger collapse animation
    callback(); // Execute the link's click handler
  };

  return (
    <div 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
    >
      {React.cloneElement(children, { isHovered, isTextVisible, isOpen, handleToggleOpen, handleSelectOption })}
    </div>
  );
};

export default ClientNavbarEffects;
