"use client";

import React, { useEffect, useRef } from 'react';
import typewriter from './subcomponents/Typewriter';

const TypewriterTitle = ({ title }) => {
  const firstPartRef = useRef(null);
  const lastPartRef = useRef(null);

  useEffect(() => {
    if (firstPartRef.current && lastPartRef.current) {
      firstPartRef.current.style.visibility = 'hidden';
      lastPartRef.current.style.visibility = 'hidden';
      firstPartRef.current.textContent = '';
      lastPartRef.current.textContent = '';

      setTimeout(() => {
        firstPartRef.current.style.visibility = 'visible';
        typewriter(firstPartRef.current, title.split(' ').slice(0, -1).join(' '), 100);
      }, 0);

      setTimeout(() => {
        lastPartRef.current.style.visibility = 'visible';
        typewriter(lastPartRef.current, ' ' + title.split(' ').slice(-1).join(' '), 100);
      }, title.split(' ').slice(0, -1).join(' ').length * 100);
    }
  }, [title]);

  const titleWords = title.split(' ');
  const firstWords = titleWords.slice(0, -1).join(' ');
  const lastWord = titleWords[titleWords.length - 1];

  return (
    <h1 className="text-center lg:text-left text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-regular mb-8 sm:mb-12 md:mb-16">
      <span ref={firstPartRef} className="text-text"></span>
      <span ref={lastPartRef} className="text-highlight"></span>
    </h1>
  );
};

export default TypewriterTitle;
