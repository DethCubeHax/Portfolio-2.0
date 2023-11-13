import React, { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import './Home.css';

import DethCubeHax from './assets/DethCubeHax.png';

// Easing function: easeOutQuad
function easeOutQuad(t) {
  return t * (2 - t);
}

function Logo({ onClick }) {
  const DethCubeLogo = useMemo(() => new THREE.TextureLoader().load(DethCubeHax), []);
  const meshRef = useRef();
  const initialScale = 1; // Initial scale of the mesh
  const targetScale = 5; // Target scale for zooming
  const animationDuration = 1000; // Animation duration in milliseconds

  const handleZoomIn = () => {
    const initialTime = performance.now();
    const animate = (time) => {
      const elapsedTime = time - initialTime;
      const progress = Math.min(elapsedTime / animationDuration, 1); // Normalize progress from 0 to 1
      const easedProgress = easeOutQuad(progress); // Apply easing function

      meshRef.current.scale.set(
        initialScale + (targetScale - initialScale) * easedProgress,
        initialScale + (targetScale - initialScale) * easedProgress,
        initialScale + (targetScale - initialScale) * easedProgress
      );

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  const handleZoomOut = () => {
    const initialTime = performance.now();
    const animate = (time) => {
      const elapsedTime = time - initialTime;
      const progress = Math.min(elapsedTime / animationDuration, 1); // Normalize progress from 0 to 1
      const easedProgress = easeOutQuad(progress); // Apply easing function

      meshRef.current.scale.set(
        targetScale - (targetScale - initialScale) * easedProgress,
        targetScale - (targetScale - initialScale) * easedProgress,
        targetScale - (targetScale - initialScale) * easedProgress
      );

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  const handleClick = () => {
    if (meshRef.current.scale.x === initialScale) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  return (
    <mesh ref={meshRef} onClick={handleClick}>
      <planeGeometry attach="geometry" args={[2, 2]} />
      <meshBasicMaterial attach="material" map={DethCubeLogo} transparent />
    </mesh>
  );
}

const Home = () => {
  const [zoomedIn, setZoomedIn] = useState(false);

  const handleUsernameClick = () => {
    setZoomedIn(!zoomedIn);
  };

  return (
    <div className="Home">
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {zoomedIn ? null : <Logo />}
      </Canvas>
    </div>
  );
};

export default Home;