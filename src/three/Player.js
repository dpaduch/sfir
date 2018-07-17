import * as THREE from 'three';

export default function Player(scene, camera) {

  const geometry = new THREE.SphereGeometry(2, 32, 32);
  const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  const sphere = new THREE.Mesh(geometry, material);
	sphere.position.set(0, 0, 48);
  sphere.castShadow = true; //default is false
  sphere.receiveShadow = true; //default
  scene.add(sphere);

  //camera.up = new THREE.Vector3(0, 0, 1);
  //camera.rotation.z = 0.25;

  let longitude = 0;
  let latitude = 0;
  let radius = 52;

  let angle = 0;
  let handle = null;

  const calculateVector = () => {

    const phi = (90 - latitude) * (Math.PI / 180);
    const theta = (longitude + 180) * (Math.PI / 180);

    const x = -((radius) * Math.sin(phi) * Math.cos(theta));
    const z = ((radius) * Math.sin(phi) * Math.sin(theta));
    const y = ((radius) * Math.cos(phi));

    return new THREE.Vector3(x, y, z);
  };

  document.addEventListener('mousemove', e => {

    //if (handle != null) {
      //const deltaX = (e.clientX - handle.x);
      //const deltaY = (e.clientY - handle.y);
    const diff = e.clientX - (window.innerWidth / 2);
    this.turn(diff / ((window.innerWidth - 80) / 2));
    /*if (e.clientX < window.innerWidth / 2) {
      
    }
    else {
      this.turn(diff / ((window.innerWidth - 80) / 2));
    }*/
    //}
    //handle = { x: e.clientX, y: e.clientY };
  });

  this.turn = (angle) => {
    console.log(angle);
  };

  this.update = function(time) { 
    /*sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;*/

    angle += 0.01;
    latitude += 0.5;
    longitude += 1.5;

    /*if (latitude >= 90 || latitude <= -90) {
      const diff = latitude > 0 ? latitude - 90 : latitude + 90;
      latitude = latitude * -1 - diff;
    }
     if (longitude >= 180 || longitude <= -180) {
      const diff = longitude > 0 ? longitude - 180 : longitude + 180;
      longitude = longitude -1 - diff;
    }*/
    if (latitude >= 360) {
      latitude = 0;
    }
    if (longitude >= 360) {
      longitude = 0;
    }

    //console.log(latitude, longitude);

//    sphere.position.x = Math.sin(angle) * radius;
//    sphere.position.z = Math.cos(angle) * radius;
    
    const target = calculateVector();
    sphere.position.set(target.x, target.y, target.z);
    //camera.position.set(target.x, target.y, target.z);

    //sphere.rotation.y -= 0.01;
    //sphere.position.z = Math.cos(angle) * 48;
    //camera.rotation.y = 0;
    //camera.position.x = Math.sin(angle) * 48;
    //camera.position.z = Math.cos(angle) * 48;
    //camera.position.z = sphere.position.z + Math.cos(angle) * 5;
    //camera.lookAt(new THREE.Vector3(sphere.position.x, 0, sphere.position.z));
    //const pointer

//    camera.position.y = sphere.position.y;
//    camera.position.x = Math.sin(angle - 0.2) * radius;
//    camera.position.z = Math.cos(angle - 0.2) * radius;

    //console.log(sphere.position.x, sphere.position.y, sphere.position.z);
    /*camera.up = new THREE.Vector3(
      sphere.position.x === 0 ? 0 : sphere.position.x > 0 ? -1 : 1,
      sphere.position.y === 0 ? 0 : sphere.position.y > 0 ? -1 : 1,
      sphere.position.z === 0 ? 0 : sphere.position.z > 0 ? -1 : 1
    );*/
    
    camera.lookAt(new THREE.Vector3(0, 0, 0)); //sphere.position);
    camera.position.set(0, 0, -200);

    //sphere.add(camera);
  }
}
