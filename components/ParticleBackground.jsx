"use client";

import React, { useRef, useEffect } from 'react';
import { initializeParticles } from './subcomponents/Particles';

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cleanup = initializeParticles(canvasRef);
    return () => cleanup();
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0 opacity-30" />;
};

export default ParticleBackground;
