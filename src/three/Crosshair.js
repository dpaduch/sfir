import * as THREE from 'three';

export default function Crosshair(scene) {
  var material = new THREE.LineBasicMaterial({ color: 0xAAFFAA });

  // crosshair size
  let x = 0.05, y = 0.05;

  var geometry = new THREE.Geometry();

  // crosshair
  geometry.vertices.push(new THREE.Vector3(0, y, 0));
  geometry.vertices.push(new THREE.Vector3(0, -y, 0));
  geometry.vertices.push(new THREE.Vector3(0, 0, 0));
  geometry.vertices.push(new THREE.Vector3(x, 0, 0));    
  geometry.vertices.push(new THREE.Vector3(-x, 0, 0));

  this.element = new THREE.Line( geometry, material );

  this.update = function() { 
  }
}