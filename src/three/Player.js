import * as THREE from 'three';

export default function Player(scene, camera) {

  const geometry = new THREE.SphereGeometry(2, 32, 32);
  const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  const sphere = new THREE.Mesh(geometry, material);
	sphere.position.set(0, 0, 48);
  sphere.castShadow = true; //default is false
  sphere.receiveShadow = true; //default
  scene.add(sphere);

  let angle = 0;

  this.update = function(time) { 
    /*sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;*/
    angle += 0.01;
    sphere.position.x = Math.sin(angle) * 48;
    sphere.position.z = Math.cos(angle) * 48;
    //sphere.position.z = Math.cos(angle) * 48;
    //camera.rotation.y = 0;
    camera.position.x = sphere.position.x + Math.sin(angle);
    camera.position.y = sphere.position.y + 2;
    camera.position.z = sphere.position.z + Math.sin(angle) * 5;
    camera.lookAt(new THREE.Vector3(sphere.position.x, 0, sphere.position.z));
  }
}
