'use client';
import React, { useState, useEffect } from 'react';

const BottomBar = ({ isVisible, handleCardClick }) => {
  const [rendered, setRendered] = useState(false);
  const [collapsing, setCollapsing] = useState(false);
  const [homeClicked, setHomeClicked] = useState(false);

  useEffect(() => {
    let timeoutId;
    if (isVisible && !homeClicked) {
      setRendered(true);
      setCollapsing(false);
    } else if (!isVisible || homeClicked) {
      setCollapsing(true);
      timeoutId = setTimeout(() => {
        setRendered(false);
        setCollapsing(false);
        if (homeClicked) {
          handleCardClick('home');
          setHomeClicked(false);
        }
      }, 300 + (tabs.length - 1) * 50);
    }
    return () => clearTimeout(timeoutId);
  }, [isVisible, homeClicked, handleCardClick]);

  const tabs = ['About Me', 'Projects', 'Research', 'Home', 'Work', 'Blog', 'Contact'];
  const tabIds = ['about', 'projects', 'research', 'home', 'work', 'blog', 'contact'];

  const handleTabClick = (tabId) => {
    if (tabId === 'home') {
      setHomeClicked(true);
    } else {
      handleCardClick(tabId);
    }
  };

  const colorClasses = ['bg-blumine-700', 'bg-blumine-600'];

  return (
    <>
      <style jsx>{`
        @keyframes riseTab {
          0% { 
            transform: translateY(100%); 
            opacity: 0; 
          }
          100% { 
            transform: translateY(0); 
            opacity: 1; 
          }
        }
        @keyframes collapseTab {
          0% { 
            transform: translateX(0); 
            opacity: 1; 
          }
          100% { 
            transform: translateX(100%); 
            opacity: 0; 
          }
        }
        @keyframes collapseTabHomeClick {
          0% { 
            transform: translateX(0); 
            opacity: 1; 
          }
          100% { 
            transform: translateX(100%); 
            opacity: 0; 
          }
        }
      `}</style>
      {rendered && (
        <div className="fixed inset-x-0 bottom-0 z-10 flex justify-around items-center backdrop-blur-lg bg-opacity-50 ml-8 mr-8">
          {tabs.map((tabText, index) => (
            <div
              key={tabText}
              onClick={() => handleTabClick(tabIds[index])}
              className={`${colorClasses[index % colorClasses.length]} flex-1 text-center p-2 cursor-pointer rounded-tl-xl rounded-tr-xl ml-2 mr-2`}
              style={{
                animation: 
                  homeClicked
                    ? `collapseTabHomeClick 0.3s ease forwards ${(tabs.length - 1 - index) * 50}ms`
                    : collapsing
                    ? `collapseTab 0.3s ease forwards ${index * 50}ms`
                    : isVisible ? `riseTab 0.3s ease forwards ${index * 100}ms` : 'none',
                opacity: collapsing ? 1 : 0,
                transform: isVisible && !collapsing ? 'translateY(0)' : 'translateY(100%)'
              }}
            >
              <div className="font-young text-xl text-blumine-100">
                {tabText}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default BottomBar;