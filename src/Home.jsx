import { createRoot } from 'react-dom/client'
import React, { useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import './Home.css'

import DethCubeHax from './assets/DethCubeHax.png';

function Logo() {
    const DethCubeLogo = new THREE.TextureLoader().load(DethCubeHax);
    return(
        <mesh>
            <planeGeometry attach="geometry" args={[2, 2]} />
            <meshBasicMaterial attach="material" map={DethCubeLogo} transparent />
        </mesh>
    )
}

const Home = () => {
    // Add the asteroids to the canvas
    return (
        <div className="Home">
            <Canvas>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />                
                <Logo />
            </Canvas>
        
        </div>
    );
};

export default Home;