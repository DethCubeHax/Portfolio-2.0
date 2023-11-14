import React, { useEffect, useRef } from 'react';

const PhotoFrame = ({ image }) => {
  const frameRef = useRef(null);
  const imageRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const frame = frameRef.current;
    const image = imageRef.current;
    const line = lineRef.current;

    // Initial state
    line.style.height = '100%';

    // Animation
    const animateFrame = () => {
      line.style.display = 'block';
      let height = 100;
      const frameAnimation = setInterval(() => {
        height -= 10;
        line.style.height = height + '%';
        if (height <= 0) {
          clearInterval(frameAnimation);
          image.style.opacity = '1';
        }
      }, 50);
    };

    // Cleanup
    const cleanup = () => {
      frame.removeEventListener('mouseenter', animateFrame);
    };

    // Event listener
    frame.addEventListener('mouseenter', animateFrame);

    // Load event listener
    const handleImageLoad = () => {
      animateFrame();
    };
    image.addEventListener('load', handleImageLoad);

    return () => {
      cleanup();
      image.removeEventListener('load', handleImageLoad);
    };
  }, [image]);

  return (
    <div className="PhotoFrame" ref={frameRef}>
      <div className="PhotoFrameWrapper">
        <img src={image} alt="Image" className="PhotoFrameImage" ref={imageRef} />
      </div>
      <div className="PhotoFrameLine" ref={lineRef}></div>
    </div>
  );
};

export default PhotoFrame;