import React from 'react';
import { FaLinkedin, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import TypewriterTitle from './TypewriterTitle';

const PageLayout = ({ title, children }) => {
  return (
    <div className="p-4 sm:p-8 md:p-16 font-trebuchet relative animate-fadeIn">
      <TypewriterTitle title={title} />
      <div className="absolute top-4 sm:top-8 md:top-16 right-4 sm:right-8 md:right-16 hidden lg:flex space-x-2 sm:space-x-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl animate-fadeInLeftToRight">
        <a href="https://www.linkedin.com/in/nafis-ul-islam-207932230/" target="_blank" rel="noopener noreferrer" className="text-text opacity-65 transition duration-300 hover:text-highlight">
          <FaLinkedin />
        </a>
        <a href="https://wa.me/85260621024" target="_blank" rel="noopener noreferrer" className="text-text opacity-65 transition duration-300 hover:text-highlight">
          <FaWhatsapp />
        </a>
        <a href="https://www.instagram.com/pixquisitee/" target="_blank" rel="noopener noreferrer" className="text-text opacity-65 transition duration-300 hover:text-highlight">
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
