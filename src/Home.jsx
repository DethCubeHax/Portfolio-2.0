import React, { useMemo, useRef, useState } from 'react';
import './Home.css';

import DethCubeHax from './assets/DethCubeHax.png';
import LinkedIn from './assets/LinkedIn.png';

const Home = () => {

  return (
    <div className="Home">
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
              <img src={LinkedIn} className="HomeHeaderTitleButton" />
            </a>
          </div>
        </div>
      </div>
      <div className="CoreGrid">
      </div>
    </div>
  );
};

export default Home;