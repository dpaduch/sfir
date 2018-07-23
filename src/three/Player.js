import * as THREE from 'three';
import Pointer from './Pointer';
import Crosshair from './Crosshair';

export default function Player(scene, camera) {

  let longitude = 90;
  let latitude = 0;
  

  this.render = () => {
    const player = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.LineBasicMaterial({ color: 0xff0000 })
    );

    // skin
    const geometry = new THREE.SphereGeometry(2, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    player.add(sphere);

    player.add(new THREE.AxisHelper(5));

    return player;
  };

  const player = this.render();
  player.position.set(0, 0, 0);
  scene.add(player);

  player.add(camera.get());
  camera.reset();

  const pointer = new Pointer(camera);
  pointer.control(player);

  this.reset = () => {
    camera.reset();
    pointer.reset();
    player.rotation.y = 0;
  }

  document.addEventListener('mouseout', e => {
    this.reset();
  });

  /*const crosshair = new Crosshair(scene);
  crosshair.place(camera);*/

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

  /*const mouse = new THREE.Vector2();
  
  var plane = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20), 
    new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} ));
  scene.add(plane);
  plane.position.set(10, 10, -5);

  const raycaster = new THREE.Raycaster();*/

  document.addEventListener('mousemove', e => {

    //if (handle != null) {
      //const deltaX = (e.clientX - handle.x);
      //const deltaY = (e.clientY - handle.y);
    const x = e.clientX - (window.innerWidth / 2);
    //console.log(camera.getFilmWidth() , diffX, diffX / ((window.innerWidth + 80) / 2));
    const y = e.clientY - (window.innerHeight / 2);

    const angle = {
      x: x / (window.innerWidth / 2),
      y: y / ((window.innerHeight - 80) / 2)
    }

/*
    const mouse = new THREE.Vector2();
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 - 1;

    var plane = new THREE.Plane();
    var raycaster = new THREE.Raycaster();

    var planeNormal = new THREE.Vector3();
    planeNormal.copy(camera.position).normalize();
    plane.setFromNormalAndCoplanarPoint(planeNormal, scene.position);

    raycaster.setFromCamera(mouse, camera);

    var point = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, point);*/

    //mouse.x = e.clientX / window.innerWidth * 2 - 1;
    //mouse.y = -e.clientY / window.innerHeight * 2 + 1;

    //mouse3D.unproject(camera);
    //mouse3D.sub(camera.position);
    //mouse3D.normalize(); 

    //crosshair.move(rayVector);
  });

  this.update = function(time) { 

    //player.lookAt(new THREE.Vector3(0, 0, 0));
    //sphere.rotation.x += 0.1;
    //player.rotation.z = 0.5;
    //player.rotation.x += 0.01;
    
    //sphere.rotation.x += 1.01;
    //sphere.rotation.y += 0.01;

    //angle += 0.01;

    //latitude -= 0.5;
    //longitude += 1.5;

    if (Math.abs(latitude) >= 180) {
      latitude *= -1;
    }
    if (Math.abs(longitude) >= 180) {
      longitude *= -1;
    }

    //console.log(latitude, longitude);
    player.rotation.x = -Math.abs((90 - latitude) / 90);

//    sphere.position.x = Math.sin(angle) * radius;
//    sphere.position.z = Math.cos(angle) * radius;
    
    const target = calculateVector();
    //player.position.set(target.x, target.y, target.z);

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
