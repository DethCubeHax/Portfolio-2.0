import { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starVertices, 3));
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    const geometry = new THREE.SphereGeometry( 1, 1000, 1000 );
    const material = new THREE.MeshBasicMaterial( { color: 0xFFB300 } );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    const controls = new OrbitControls(camera, renderer.domElement);
    const floor = new THREE.Mesh(
      new THREE.RingGeometry(10, 10, 10),
      new THREE.MeshBasicMaterial({ color: 0xaaaaaa, wireframe: true })
    );
    scene.add(floor);

    camera.position.z = 20;

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
