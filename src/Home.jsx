import React, { useEffect, useRef } from 'react';
import './Home.css';

import Nafis from './assets/Nafis.jpg';
import LinkedIn from './assets/LinkedIn.png';
import PhotoFrame from './components/PhotoFrame';

import { initializeParticles } from './components/Particles';
import typewriter from './components/Typewriter';
import NavPanel from './NavPanel';

const Home = () => {
  const canvasRef = useRef(null);
  const canvasTextRef = useRef(null);
  const titleFNTextRef = useRef(null);
  const titleMNTextRef = useRef(null);
  const titleLNTextRef = useRef(null);

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

    return () => {
      cleanup();
    };
  }, []);

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
          <div className="HomeHeaderTitleButtonHolder">
            <a href="https://www.linkedin.com/in/nafis-ul-islam-207932230/">
              <img src={LinkedIn} className="HomeHeaderTitleButton" alt="LinkedIn" />
            </a>
          </div>
        </div>
      </div>
      <div className="Spacer"></div>
      <PhotoFrame image={Nafis} />
      <div ref={canvasTextRef} className="TypewriterText"></div>
      {window.innerWidth > 600 && <NavPanel />}
      <canvas ref={canvasRef} className="ParticleCanvas" />
    </div>
  );
};

export default Home;