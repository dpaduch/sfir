import * as THREE from 'three';

export default function Player(scene, camera) {

  let longitude = 90;
  let latitude = 0;
  let radius = 52;

  const player = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 32),
    new THREE.MeshStandardMaterial()
  );

  const axisHelper = new THREE.AxisHelper(5);
  player.add(axisHelper);
  scene.add(player);

  const geometry = new THREE.SphereGeometry(2, 32, 32);
  const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.castShadow = true; //default is false
  sphere.receiveShadow = true; //default

  player.add(sphere);

  /*const dotGeometry = new THREE.Geometry();
  dotGeometry.vertices.push(new THREE.Vector3( 0, 0, 0));
  const pointer = new THREE.Points(
    dotGeometry,
    new THREE.PointsMaterial( { size: 1, sizeAttenuation: false } );
  );*/

  camera.up = new THREE.Vector3(0, 1, 0);
  camera.lookAt(new THREE.Vector3(0, 0, 4));
  camera.position.set(0, 3, -6);
  player.add(camera);

  //camera.up = new THREE.Vector3(0, 0, 1);
  //camera.rotation.z = 0.25;

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

    //player.lookAt(new THREE.Vector3(0, 0, 0));
    //player.rotation.x = 0.5;
    //player.rotation.z = 0.5;
    //player.rotation.x += 0.01;
    
    //sphere.rotation.x += 1.01;
    //sphere.rotation.y += 0.01;

    //angle += 0.01;

    latitude -= 0.5;
    //longitude += 1.5;

    player.rotation.x = -Math.abs((90 - latitude) / 90);

    if (Math.abs(latitude) >= 180) {
      latitude *= -1;
    }
    if (Math.abs(longitude) >= 180) {
      longitude *= -1;
    }

    //console.log(latitude, longitude);

//    sphere.position.x = Math.sin(angle) * radius;
//    sphere.position.z = Math.cos(angle) * radius;
    
    const target = calculateVector();
    player.position.set(target.x, target.y, target.z);

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



/*
    camera.position.set(target.x, target.y, target.z);

    camera.up = new THREE.Vector3(
      0, 1, 0
    );
    camera.lookAt(sphere.position);
*/  
    //sphere.add(camera);
  }
}
