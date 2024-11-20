"use client";

import React, { useState, useEffect } from 'react';

const ClientNavbarEffects = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
