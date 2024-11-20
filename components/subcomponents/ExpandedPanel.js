import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Carousel } from 'react-responsive-carousel';

const ExpandedPanel = ({ project, toggleExpanded }) => {
  return (
    <div className="absolute top-0 right-0 w-full h-full bg-white shadow-lg overflow-auto">
      <div className="relative h-full p-4 md:p-8 lg:p-16 flex flex-col">
        <button className="absolute top-4 left-4 bg-gray-700 text-white rounded-full w-12 h-12 flex items-center justify-center" onClick={toggleExpanded}>
          <FaArrowLeft />
        </button>
        <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
        <Carousel
          useKeyboardArrows={true}
          emulateTouch={true}
          showThumbs={false}
          showStatus={false}
          infiniteLoop={true}
        >
          {project.screenshots.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Screenshot ${index + 1}`} className="rounded-lg" />
            </div>
          ))}
        </Carousel>
        <p className="mt-4 text-gray-800">{project.description}</p>
        <div className="mt-4 text-gray-600">
          <p><strong>Stacks Used:</strong> {project.stacks.join(', ')}</p>
          <p><strong>Development Time:</strong> {project.developmentTime}</p>
        </div>
      </div>
    </div>
  );
};

export default ExpandedPanel;
