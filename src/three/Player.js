import * as THREE from 'three';

export default function Player(scene) {

  const geometry = new THREE.BoxGeometry(10, 10, 10, 20, 20, 20);
  const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  const sphere = new THREE.Mesh(geometry, material);
	sphere.position.set(0, 0, -21);
  sphere.castShadow = true; //default is false
  sphere.receiveShadow = true; //default
  scene.add(sphere);

  this.update = function(time) { 
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
  }
}
