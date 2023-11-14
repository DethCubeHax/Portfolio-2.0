import React, { useEffect, useRef, useState } from 'react';
import './Home.css';

import Nafis from './assets/Nafis.jpg';
import HamburgerMenu from './assets/HamburgerMenu.png';
import Research from './assets/Research.png';
import Art from './assets/Art.png';
import PhotoFrame from './components/PhotoFrame';
import Project from './assets/Project.png';
import Work from './assets/Work.png';

import { initializeParticles } from './components/Particles';
import typewriter from './components/Typewriter';
import NavPanel from './NavPanel';
import Sidebar from './Sidebar';

const Home = () => {
  const canvasRef = useRef(null);
  const canvasTextRef = useRef(null);
  const titleFNTextRef = useRef(null);
  const titleMNTextRef = useRef(null);
  const titleLNTextRef = useRef(null);
  const manyMore = useRef(null);
  const [showSkills, setShowSkills] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  useEffect(() => {
    const cleanup = initializeParticles(canvasRef);

    typewriter(titleFNTextRef.current, 'Nafis', 100, 0);
    typewriter(titleMNTextRef.current, 'ul', 100, 0.5);
    typewriter(titleLNTextRef.current, 'Islam', 100, 1);
    typewriter(
      canvasTextRef.current,
      "Hi there! I'm Nafis, aka DethCubeHax, a software engineer in the making.",
      100,
      2
    );
    typewriter(manyMore.current, 'And more.', 100, 12);

    const timer = setTimeout(() => {
      setShowSkills(true);
    }, 10000);

    return () => {
      clearTimeout(timer);
      cleanup();
    };
  }, []);

  useEffect(() => {
    if (showSkills) {
      const timer = setTimeout(() => {
        const skillsDiv = document.querySelector('.Skills');
        if (skillsDiv) {
          skillsDiv.classList.add('SkillsVisible');
        }
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showSkills]);

  useEffect(() => {
    // Add the fade-in effect to the sidebar
    setIsSidebarVisible(showSidebar);
  }, [showSidebar]);

  return (
    <div className="Home" id="Home">
      <div className="HomeHeader">
        <div></div>
        <div className="HomeHeaderTitle">
          <div className="HomeHeaderTitleHolder">
            <div className="HomeHeaderTitleFN" ref={titleFNTextRef}></div>
            <div className="HomeHeaderTitleMN" ref={titleMNTextRef}></div>
            <div className="HomeHeaderTitleLN" ref={titleLNTextRef}></div>
          </div>
          {window.innerWidth < 600 && 
                  <div className="HomeHeaderTitleButtonHolder">
                    <img
                      src={HamburgerMenu}
                      className="HomeHeaderTitleButton"
                      alt="Hamburger Menu"
                      style={{zIndex:"2000"}}
                      onClick={() => setShowSidebar((prevState) => !prevState)}
                    />
                  </div>
          }

        </div>
      </div>
      <div className="SpacerHeader"></div>
      <PhotoFrame image={Nafis} />
      {window.innerWidth > 600 && <div className="Spacer"></div>}
      <div ref={canvasTextRef} className="TypewriterText"></div>
      {window.innerWidth > 600 && <NavPanel />}
      <canvas ref={canvasRef} className="ParticleCanvas" />
      <div className={`Skills ${showSkills ? 'SkillsVisible' : ''}`}>
        <a className="TypewriterTextSmall" href="projects">
          <div>
            <img src={Project} className="SkillIcon" alt="Project" />
          </div>
          I do projects.
        </a>
        <a className="TypewriterTextSmall" href="research">
          <div>
            <img src={Research} className="SkillIcon" alt="Research" />
          </div>
          I do research.
        </a>
        <a className="TypewriterTextSmall" href="work">
          <div>
            <img src={Work} className="SkillIcon" alt="Art" />
          </div>
          I do work.
        </a>
      </div>

      <div className="TypewriterTextSmallLast" ref={manyMore}></div>

      {isSidebarVisible && <Sidebar onClose={() => setShowSidebar((prevState) => !prevState)} />}
    </div>
  );
};

export default Home;