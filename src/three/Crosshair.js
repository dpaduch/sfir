import * as THREE from 'three';

export default function Crosshair() {
  const material = new THREE.LineBasicMaterial({ color: 0xAAFFAA });

  // crosshair size
  const width = 0.05, height = 0.05;
  const radius = 2;

  const geometry = new THREE.Geometry();

  // crosshair
  geometry.vertices.push(new THREE.Vector3(0, height, 0));
  geometry.vertices.push(new THREE.Vector3(0, -height, 0));
  geometry.vertices.push(new THREE.Vector3(0, 0, 0));
  geometry.vertices.push(new THREE.Vector3(width, 0, 0));    
  geometry.vertices.push(new THREE.Vector3(-width, 0, 0));

  const element = new THREE.Line(geometry, material);

  const defaultCrosshairPosition = new THREE.Vector3(0, 0, -radius);

  this.update = () => { 
  }

  this.reset = () => {
    element.position.copy(defaultCrosshairPosition);
    console.log(
      defaultCrosshairPosition.x,
      defaultCrosshairPosition.y,
      defaultCrosshairPosition.z
    );
  }

  this.move = (point) => {
    
    const pos = new THREE.Vector3(point.x, point.y, point.z);
    console.log(pos.x, pos.y, pos.z);
    element.position.copy(pos);

/*
    //element.rotation.y = x * -0.3;
    //element.rotation.x = y * 0.3;

    const phi = (90 + (y * 30)) * (Math.PI / 180);
    const theta = ((x * 90) + 90) * (Math.PI / 180)

    const posX = -((radius) * Math.sin(phi) * Math.cos(theta));
    const posZ = ((radius) * Math.sin(phi) * Math.sin(theta));
    const posY = ((radius) * Math.cos(phi));

    //const multiplier = 1; //(Math.PI * Math.pow(2, 2));
    element.position.x = posX;
    //element.position.z = posZ;
    element.position.y = posY;

    console.log(x, phi, theta, posX, posY);*/

  }

  this.place = (camera) => {
    camera.add(element);
    this.reset();
  }
}