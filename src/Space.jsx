import { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Space = () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    
    const geometry = new THREE.SphereGeometry( 1, 1000, 1000 );
    const material = new THREE.MeshBasicMaterial( { color: 0xFFB300 } );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    const controls = new OrbitControls( camera, renderer.domElement );
    const floor = new THREE.Mesh(
        new THREE.RingGeometry(10, 10, 10),
        new THREE.MeshBasicMaterial({ color: 0xaaaaaa, wireframe: true })
    );
    scene.add(floor);
    camera.position.z = 5;
    

    function animate() {
        requestAnimationFrame( animate );
        controls.update();
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
    
        renderer.render( scene, camera );
    }
    
    animate();
}

export default Space;