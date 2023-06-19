import { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import smokeTexture from './assets/nebula.jpg';

const Space = () => {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const starCount = 1000;
    const starsGeometry = new THREE.BufferGeometry();
    const starVertices = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const x = Math.random() * 2000 - 1000;
      const y = Math.random() * 2000 - 1000;
      const z = Math.random() * 2000 - 1000;

      starVertices[i * 3] = x;
      starVertices[i * 3 + 1] = y;
      starVertices[i * 3 + 2] = z;
    }

    const geometry = new THREE.SphereGeometry( 1, 1000, 1000 );
    const material = new THREE.MeshBasicMaterial( { color: 0xFFB300 } );
    const sun = new THREE.Mesh( geometry, material );
    scene.add( sun );

    let ambientLight = new THREE.AmbientLight(0x555555);
    scene.add(ambientLight);

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starVertices, 3));
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    const nebulaGeometry = new THREE.SphereGeometry(200, 32, 32);
    const nebulaTexture = new THREE.TextureLoader().load(smokeTexture);
    const nebulaMaterial = new THREE.MeshBasicMaterial({ map: nebulaTexture, side: THREE.BackSide });
    nebulaMaterial.transparent = true;
    nebulaMaterial.opacity = 0.1;
    const nebula = new THREE.Mesh(nebulaGeometry, nebulaMaterial);
    scene.add(nebula);

    const controls = new OrbitControls(camera, renderer.domElement);
    const ring1 = new THREE.Mesh(
      new THREE.RingGeometry(10, 10, 32),
      new THREE.MeshBasicMaterial({ color: 0xaaaaaa, wireframe: true })
    );
    scene.add(ring1);
    const ring2 = new THREE.Mesh(
        new THREE.RingGeometry(15, 15, 32),
        new THREE.MeshBasicMaterial({ color: 0xaaaaaa, wireframe: true })
      );
      scene.add(ring2);

    camera.position.z = 20;
    const ring3 = new THREE.Mesh(
        new THREE.RingGeometry(20, 20, 32),
        new THREE.MeshBasicMaterial({ color: 0xaaaaaa, wireframe: true })
      );
      scene.add(ring3);

    function animate() {
      requestAnimationFrame(animate);
      controls.update();

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      document.body.removeChild(renderer.domElement);
    };
  }, []);

  return null;
}

export default Space;