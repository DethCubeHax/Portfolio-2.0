import React from 'react';

const PhotoFrame = ({ image }) => {
  return (
    <div className="relative flex justify-center items-center w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-112 lg:h-112">
      <div className="absolute inset-0 flex justify-center items-center rounded-full overflow-hidden">
        <img 
          src={image} 
          alt="Image" 
          className="w-full h-full object-cover rounded-full opacity-0 animate-fadeIn" 
        />
      </div>
    </div>
  );
};

export default PhotoFrame;
