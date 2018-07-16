import * as THREE from 'three';

export default function World(scene) {
  const geometry = new THREE.SphereGeometry(50, 32, 32);
  const material = new THREE.MeshStandardMaterial({ color: 0x666666, wireframe: true });
  const sphere = new THREE.Mesh(geometry, material);
  material.side = THREE.DoubleSide;
  sphere.position.set(0, 0, 0);
  sphere.receiveShadow = true;
  scene.add(sphere);
  let radius = 0;
  this.update = function() { 
    /*radius += 1;
    sphere.radius += Math.sin(radius) * 100;
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    sphere.rotation.z += 0.01;*/
    //console.log(radius, Math.sin(radius) * 100);
  }
}