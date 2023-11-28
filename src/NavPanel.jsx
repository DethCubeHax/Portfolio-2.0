import React, { useState, useEffect } from 'react';
import DethCubeHax from './assets/DethCubeHax.png';
import Research from './assets/Research.png';
import Work from './assets/Work.png';
import Project from './assets/Project.png';
import Blog from './assets/Blog.png';
import Mail from './assets/Mail.png';

const NavPanel = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isIconLoaded, setIsIconLoaded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTextLoaded, setIsTextLoaded] = useState(false);

  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
      const expandTimer = setTimeout(() => {
        setIsExpanded(true);
      }, 2000); // Adjust this time according to your panel expansion duration
      const iconTimer = setTimeout(() => {
        setIsIconLoaded(true);
      }, 300);
      return () => {
        clearTimeout(loadTimer);
        clearTimeout(expandTimer);
        clearTimeout(iconTimer);
      };
    }, 150);
  }, []);

  useEffect(() => {
    if (isExpanded) {
      const textTimer = setTimeout(() => {
        setIsTextLoaded(true);
      }, 100); // Text appears 100ms after panel has fully expanded
      return () => {
        clearTimeout(textTimer);
      };
    }
  }, [isExpanded]);

  return (
    <div className={`NavPanel${isLoaded ? ' loaded' : ''}`}>
      <a className='PanelButtonContainer' href="/">
        <img src={DethCubeHax} className={`NavPanelButton${isIconLoaded ? ' icon-loaded' : ''}`} alt="DethCubeHax" />
        <div className={`NavPanelText${isTextLoaded ? ' text-loaded' : ''}`}>Home</div>
      </a>
      <a className='PanelButtonContainer' href="projects">
        <img src={Project} className={`NavPanelButton${isIconLoaded ? ' icon-loaded' : ''}`} alt="Project" />
        <div className={`NavPanelText${isTextLoaded ? ' text-loaded' : ''}`}>Projects</div>
      </a>
      <a className='PanelButtonContainer' href="work">
        <img src={Work} className={`NavPanelButton${isIconLoaded ? ' icon-loaded' : ''}`} alt="Work" />
        <div className={`NavPanelText${isTextLoaded ? ' text-loaded' : ''}`}>Work</div>
      </a>
      <a className='PanelButtonContainer' href="research">
        <img src={Research} className={`NavPanelButton${isIconLoaded ? ' icon-loaded' : ''}`} alt="Research" />
        <div className={`NavPanelText${isTextLoaded ? ' text-loaded' : ''}`}>Research</div>
      </a>
      <a className='PanelButtonContainer' href="blog">
        <img src={Blog} className={`NavPanelButton${isIconLoaded ? ' icon-loaded' : ''}`} alt="Blog" />
        <div className={`NavPanelText${isTextLoaded ? ' text-loaded' : ''}`}>Blog</div>
      </a>
      <a className='PanelButtonContainer' href="mailto:ultimate.nafis.bhadra11@gmail.com">
        <img src={Mail} className={`NavPanelButton${isIconLoaded ? ' icon-loaded' : ''}`} alt="Mail" />
        <div className={`NavPanelText${isTextLoaded ? ' text-loaded' : ''}`}>Mail</div>
      </a>
    </div>
  );
};

export default NavPanel;