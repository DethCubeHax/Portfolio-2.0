import React, { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import './Home.css';

import DethCubeHax from './assets/DethCubeHax.png';

function Logo({ onClick }) {
  const DethCubeLogo = useMemo(() => new THREE.TextureLoader().load(DethCubeHax), []);
  const meshRef = useRef();
  const initialScale = 1; // Initial scale of the mesh
  const targetScale = 5; // Target scale for zooming

  const handleZoomIn = () => {
    meshRef.current.scale.set(targetScale, targetScale, targetScale); // Set the scale to zoom in
  };

  return (
    <mesh ref={meshRef} onClick={handleZoomIn}>
      <planeGeometry attach="geometry" args={[2, 2]} />
      <meshBasicMaterial attach="material" map={DethCubeLogo} transparent />
    </mesh>
  );
}

const Home = () => {
  const [zoomedIn, setZoomedIn] = useState(false);

  const handleUsernameClick = () => {
    setZoomedIn(true);
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