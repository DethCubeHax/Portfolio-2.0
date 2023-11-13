import React, { useState, useEffect } from 'react';
import Mail from './assets/Mail.png';
import Project from './assets/Project.png';

const NavPanel = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 150);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`NavPanel${isLoaded ? ' loaded' : ''}`}>
      <div className='PanelButtonContainer'>
        <img src={Project} className="NavPanelButton" alt="Project" />
        <div>Projects</div>
      </div>
      <div className='PanelButtonContainer'>
        <img src={Mail} className="NavPanelButton" alt="Mail" />
        <div>Mail</div>
      </div>
    </div>
  );
};

export default NavPanel;