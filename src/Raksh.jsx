import React, { useEffect, useRef, useState } from 'react';
import './Raksh.css';
import { initializeParticles } from './components/Particles';

function Raksh() {
  const canvasRef = useRef(null);
  const [typedText, setTypedText] = useState('');
  const [textVisible, setTextVisible] = useState(false);
  const [additionalDivVisible, setAdditionalDivVisible] = useState(false);
  const [daysInUniversity, setDaysInUniversity] = useState(0);

  useEffect(() => {
    const text = 'Happy Birthday, Rakshanda!';
    let currentIndex = 0;

    const intervalId = setInterval(() => {
      setTypedText(text.slice(0, currentIndex));
      currentIndex++;

      if (currentIndex > text.length) {
        clearInterval(intervalId);
        setTimeout(() => setTextVisible(true), 1000);
      }
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (textVisible) {
      setTimeout(() => setAdditionalDivVisible(true), 2000);
    }
  }, [textVisible]);

  useEffect(() => {
    const calculateDaysInUniversity = () => {
      const universityStartDate = new Date('September 2, 2024');
      const currentDate = new Date();
      const daysInUniversity = (currentDate - universityStartDate) / (1000 * 60 * 60 * 24);
      setDaysInUniversity(daysInUniversity.toFixed(10));
    };

    calculateDaysInUniversity();
    const interval = setInterval(calculateDaysInUniversity, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const cleanup = initializeParticles(canvasRef);

    return () => {
      cleanup();
    };
  }, []);

  const calculateAge = () => {
    const birthDate = new Date('September 17, 2004');
    const currentDate = new Date();
    const ageInMilliseconds = currentDate - birthDate;
    const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
    return ageInYears.toFixed(13);
  };

  const age = calculateAge();

  return (
    <div>
      <style>{`
        .cake {
          position: relative;
          width: 200px;
          height: 200px;
          margin: 0 auto;
          transform: perspective(600px) rotateX(10deg);
        }

        .plate {
          width: 220px;
          height: 20px;
          background: #ddd;
          border-radius: 50%;
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
        }

        .layer {
          width: 200px;
          height: 50px;
          background: #f39c12;
          border-radius: 10px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        .layer-bottom {
          bottom: 20px;
        }

        .layer-middle {
          bottom: 70px;
        }

        .layer-top {
          bottom: 120px;
        }

        .icing {
          width: 200px;
          height: 10px;
          background: #fff;
          border-radius: 50%;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .icing-bottom {
          bottom: 70px;
        }

        .icing-middle {
          bottom: 118px;
        }

        .icing-top {
          bottom: 170px;
        }

        .candle {
          width: 10px;
          height: 60px;
          background: #fff;
          position: absolute;
          top: 10px;
          left: 50%;
          transform: translateX(-50%);
        }

        .flame {
          width: 10px;
          height: 20px;
          background: radial-gradient(circle, yellow, orange);
          border-radius: 50%;
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
          animation: flicker 0.1s infinite alternate;
        }

        @keyframes flicker {
          0% { transform: translateX(-50%) scale(1); }
          100% { transform: translateX(-50%) scale(1.2); }
        }
      `}</style>
      <div className="main-body">
        <canvas className="Particles" ref={canvasRef}></canvas>
        <div className="cake">
          <div className="plate"></div>
          <div className="layer layer-bottom"></div>
          
          <div className="layer layer-middle"></div>
          <div className="icing icing-middle"></div>
          <div className="candle">
            <div className="flame"></div>
          </div>
        </div>
        <h1>{typedText}</h1>
        {textVisible && (
          <>
            <h2 className={`fade-in ${textVisible ? 'fade-in' : ''}`}>
              You are {age} years old as of today, congrats on becoming an adult! 🎉
            </h2>
            <h3 className={`fade-in ${textVisible ? 'fade-in' : ''}`}>
              You have been in university for {daysInUniversity} days, keep up the good work! 📚
            </h3>
            {additionalDivVisible && (
              <div className={`additional-div fades-in ${additionalDivVisible ? 'fade-in' : ''}`}>
                I wish you the best for the years ahead :D
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Raksh;
