import React, { useState, useEffect } from 'react';

const HomeLayout = ({ onCardClick }) => {
  const [animationStep, setAnimationStep] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false); // New state to control fade out



  useEffect(() => {
    const totalSteps = 6;
    let timer;

    if (animationStep < totalSteps) {
      timer = setTimeout(() => {
        setAnimationStep(animationStep + 1);
      }, 100);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [animationStep]);

  const handleCardClick = (cardId) => {
    setIsFadingOut(true); // Trigger the fade-out

    // Delay the onCardClick callback until the fade-out animation is complete
    setTimeout(() => onCardClick(cardId), 500); // Adjust this delay to match your fade-out duration
  };

  const fadeInStyle = (step) => ({
    opacity: isFadingOut ? 0 : animationStep >= step ? 1 : 0, // Use isFadingOut to control opacity
    transition: 'opacity 0.5s ease-in-out',
  })

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-wrap m-16 mb-4" style={{ height: '25vh' }}>
        <div
          style={fadeInStyle(1)}
          className="mt-4 ml-4 mr-4 mb-0 p-4 flex-grow shadow-xl rounded-xl bg-blumine-300 backdrop-blur-lg bg-opacity-50"
          onClick={() => handleCardClick('research')}
        >
          <div className="font-young text-6xl mb-4 text-blumine-100">
            Research
          </div>
          <div className="font-young text-3xl text-blumine-50">
            Discoveries and insights
          </div>
        </div>
        <div
          style={fadeInStyle(2)}
          className="mt-4 ml-4 mr-4 mb-0 p-4 flex-grow shadow-xl rounded-xl bg-blumine-400 backdrop-blur-lg bg-opacity-50"
          onClick={() => handleCardClick('blog')}
        >
          <div className="font-young text-6xl mb-4 text-blumine-100">
            Blog
          </div>
          <div className="font-young text-3xl text-blumine-50">
            Latest posts and articles
          </div>
        </div>
      </div>
      <div className="flex flex-grow m-16 mt-4">
        <div
          style={fadeInStyle(3)}
          className="m-4 p-4 flex-grow shadow-xl rounded-xl bg-blumine-500 backdrop-blur-lg bg-opacity-50"
          onClick={() => handleCardClick('work')}
        >
          <div className="font-young text-6xl text-blumine-100">
            Work
          </div>
          <div className="font-young text-3xl text-blumine-50">
            Projects and professional history
          </div>
        </div>
        <div className="flex flex-col flex-grow">
          <div className="flex flex-grow">
            <div
              style={fadeInStyle(4)}
              className="m-4 p-4 flex-grow shadow-xl rounded-xl bg-blumine-600 backdrop-blur-lg bg-opacity-50"
              onClick={() => handleCardClick('about')}
            >
              <div className="font-young text-6xl text-blumine-100">
                About Me
              </div>
              <div className="font-young text-3xl text-blumine-50">
                A brief bio and background
              </div>
            </div>
            <div
              style={fadeInStyle(5)}
              className="m-4 p-4 flex-grow shadow-xl rounded-xl bg-blumine-700 backdrop-blur-lg bg-opacity-50"
              onClick={() => handleCardClick('contact')}
            >
              <div className="font-young text-6xl text-blumine-100">
                Contact
              </div>
              <div className="font-young text-3xl text-blumine-50">
                How to get in touch
              </div>
            </div>
          </div>
          <div
            style={fadeInStyle(6)}
            className="m-4 p-4 flex-grow shadow-xl rounded-xl bg-blumine-800 backdrop-blur-lg bg-opacity-50"
            onClick={() => handleCardClick('projects')}
          >
            <div className="font-young text-6xl text-blumine-100">
              Projects
            </div>
            <div className="font-young text-3xl text-blumine-50">
              A collection of recent works
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;