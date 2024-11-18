import React from 'react';
import { FaLinkedin, FaWhatsapp, FaInstagram } from 'react-icons/fa';

const PageLayout = ({ title, children }) => {
  const titleWords = title.split(' ');
  const firstWords = titleWords.slice(0, -1).join(' ');
  const lastWord = titleWords[titleWords.length - 1];

  return (
    <div className="p-4 sm:p-8 md:p-16 font-trebuchet relative animate-fadeIn">
      <h1 className="text-center lg:text-left text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-regular mb-8 sm:mb-12 md:mb-16 animate-fadeInLeftToRight">
        <span className="text-text">{firstWords} </span><span className="text-highlight">{lastWord}</span>
      </h1>
      <div className="absolute top-4 sm:top-8 md:top-16 right-4 sm:right-8 md:right-16 hidden lg:flex space-x-2 sm:space-x-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl animate-fadeInLeftToRight">
        <a href="https://www.linkedin.com/in/nafis-ul-islam-207932230/" target="_blank" rel="noopener noreferrer" className="text-text hover:text-highlight opacity-65">
          <FaLinkedin />
        </a>
        <a href="https://wa.me/85260621024" target="_blank" rel="noopener noreferrer" className="text-text hover:text-highlight opacity-65">
          <FaWhatsapp />
        </a>
        <a href="https://www.instagram.com/pixquisitee/" target="_blank" rel="noopener noreferrer" className="text-text hover:text-highlight opacity-65">
          <FaInstagram />
        </a>
      </div>
      <div className="animate-fadeIn">
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
