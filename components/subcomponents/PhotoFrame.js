import React, { useEffect, useRef } from 'react';

const PhotoFrame = ({ image }) => {
  const imageRef = useRef(null);
  const didAnimateRef = useRef(false);

  useEffect(() => {
    const img = imageRef.current;

    // Initial state
    img.style.clipPath = 'inset(0 0 100% 0)';

    // Animation
    const animateFrame = () => {
      if (didAnimateRef.current) return; // If animation has occurred, do nothing
      img.style.display = 'block';
      let height = 100;
      const frameAnimation = setInterval(() => {
        height -= 2; // More steps for smoother transition
        img.style.clipPath = `inset(0 0 ${height}% 0)`;
        if (height <= 0) {
          clearInterval(frameAnimation);
          img.style.opacity = '1';
          didAnimateRef.current = true; // Set animation to occurred
        }
      }, 10);
    };

    animateFrame(); // Directly call the animation function
  }, [image]);

  return (
    <div className="relative flex justify-center items-center w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-112 lg:h-112">
      <div className="absolute inset-0 flex justify-center items-center rounded-full overflow-hidden">
        <img src={image} alt="Image" className="w-full h-full object-cover rounded-full transition-opacity duration-500" ref={imageRef} />
      </div>
    </div>
  );
};

export default PhotoFrame;
