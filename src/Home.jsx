import React, { useEffect, useRef } from 'react';
import './Home.css';

import DethCubeHax from './assets/DethCubeHax.png';
import LinkedIn from './assets/LinkedIn.png';

import { initializeParticles } from './components/Particles';

const Home = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cleanup = initializeParticles(canvasRef);

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
            <div className="HomeHeaderTitleFN">
              Nafis
            </div>
            <div className="HomeHeaderTitleMN">
              ul
            </div>
            <div className="HomeHeaderTitleLN">
              Islam
            </div>
          </div>
          <div className="HomeHeaderTitleButtonHolder">
            <a href="https://www.linkedin.com/in/nafis-ul-islam-207932230/">
              <img src={LinkedIn} className="HomeHeaderTitleButton" alt="LinkedIn" />
            </a>
          </div>
        </div>
      </div>
      <canvas ref={canvasRef} className="ParticleCanvas" />
    </div>
  );
};

export default Home;