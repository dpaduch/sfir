import * as THREE from 'three';

export default function World(scene) {
  const geometry = new THREE.SphereGeometry(900, 128, 128);
  const material = new THREE.MeshStandardMaterial({ color: 0x666666, wireframe: true });
  const sphere = new THREE.Mesh(geometry, material);
  material.side = THREE.DoubleSide;
  sphere.position.set(0, 0, 0);
  sphere.receiveShadow = true;
  scene.add(sphere);
  this.update = function() { 
  }
}