import React from 'react';
import { FaLinkedin, FaWhatsapp, FaInstagram } from 'react-icons/fa';

const PageLayout = ({ title, children }) => {
  const titleWords = title.split(' ');
  const firstWords = titleWords.slice(0, -1).join(' ');
  const lastWord = titleWords[titleWords.length - 1];

  return (
    <div className="p-16 font-trebuchet relative">
      <h1 className="text-6xl font-regular mb-16">
        <span className="text-text">{firstWords}</span> <span className="text-highlight">{lastWord}</span>
      </h1>
      <div className="absolute top-16 right-16 flex space-x-4">
        <a href="https://www.linkedin.com/in/nafis-ul-islam-207932230/" target="_blank" rel="noopener noreferrer" className="text-text hover:text-highlight text-5xl opacity-65">
          <FaLinkedin />
        </a>
        <a href="https://wa.me/85260621024" target="_blank" rel="noopener noreferrer" className="text-text hover:text-highlight text-5xl opacity-65">
          <FaWhatsapp />
        </a>
        <a href="https://www.instagram.com/pixquisitee/" target="_blank" rel="noopener noreferrer" className="text-text hover:text-highlight text-5xl opacity-65">
          <FaInstagram />
        </a>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default PageLayout;