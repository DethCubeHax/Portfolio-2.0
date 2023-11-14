import React, { useEffect, useRef, useState } from 'react';
import './Home.css';
import './Projects.css';

import Nafis from './assets/Nafis.jpg';
import LinkedIn from './assets/LinkedIn.png';
import Research from './assets/Research.png';
import Art from './assets/Art.png';
import PhotoFrame from './components/PhotoFrame';
import Project from './assets/Project.png';

import { initializeParticles } from './components/Particles';
import typewriter from './components/Typewriter';
import NavPanel from './NavPanel';

const Projects = () => {
  const canvasRef = useRef(null);
  const titleMNTextRef = useRef(null);
  const titleLNTextRef = useRef(null);

  useEffect(() => {
    const cleanup = initializeParticles(canvasRef);

    typewriter(titleMNTextRef.current, 'My', 100, 0.5);
    typewriter(titleLNTextRef.current, 'Projects', 100, 1);

    const timer = setTimeout(() => {
      setShowSkills(true);
    }, 1);

    return () => {
      clearTimeout(timer);
      cleanup();
    };
  }, []);

  return (
    <div className="Home" id="Home">
      <div className="HomeHeader">
        <div></div>
        <div className="HomeHeaderTitle">
          <div className="HomeHeaderTitleHolder">
            <div className="HomeHeaderTitleMN" ref={titleMNTextRef}></div>
            <div className="HomeHeaderTitleLN" ref={titleLNTextRef}></div>
          </div>
          <div className="HomeHeaderTitleButtonHolder">
            <a href="https://www.linkedin.com/in/nafis-ul-islam-207932230/">
              <img src={LinkedIn} className="HomeHeaderTitleButton" alt="LinkedIn" />
            </a>
          </div>
        </div>
      </div>
      <div className="SpacerHeader"></div>
      {window.innerWidth > 600 && <div className='Spacer'></div>}
        <div class="ContentWindow">
            This will be the content window.
        </div>
      {window.innerWidth > 600 && <NavPanel />}
      <canvas ref={canvasRef} className="ParticleCanvas" />
    </div>
  );
};

export default Projects;