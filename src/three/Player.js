import * as THREE from 'three';
import Pointer from './Pointer';
import Crosshair from './Crosshair';

export default function Player(scene, camera) {

  this.longitude = 0;
  this.latitude = -90;
  this.rotation = 0;
  this.acceleration = 0;

  this.render = () => {
    const player = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.LineBasicMaterial({ color: 0xff0000 })
    );

    const geometry = new THREE.SphereGeometry(2, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    /*const texture = new THREE.TextureLoader().load("paper-blue.jpg");
    const bmap =  new THREE.TextureLoader().load("rock2.jpg");
    const material = new THREE.MeshPhongMaterial({
      shininess: 20,
      bumpScale: 0.1,
      map: texture,
      bumpMap: bmap
    });*/
    const sphere = new THREE.Mesh(geometry, material);
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    sphere.rotation.z = 2;
    player.add(sphere);

    player.sphere = sphere;
    //player.add(new THREE.AxesHelper(5));

    return player;
  };

  const player = this.render();
  scene.add(player);

  camera.follow(player);
  camera.reset();

  const pointer = new Pointer(camera);
  pointer.control(player);
  
  let radius = 900 - 1.5;

  this.reset = () => {
    player.position.set(0, 0, 0);
    player.rotation.set(0, 0, 0);
    camera.reset();
    pointer.reset();
  }

  this.turn = (side) => {
    this.turning && clearInterval(this.turning);
    this.turning = setInterval(() => {
      this.rotation += side * 2;
      if (this.rotation >= 360) {
        this.rotation = 0;
      }
      else if (this.rotation < 0) {
        this.rotation = 360;
      }
    }, 1);
  }

  this.accelerate = () => {
    this.accelerating && clearInterval(this.accelerating);
    if (this.acceleration >= 10) {
      return;
    }
    this.accelerating = setInterval(() => this.acceleration++);
  }

  this.brake = () => {
    if (this.acceleration <= 0) {
      this.stop();
      return;
    }
    this.accelerating && clearInterval(this.accelerating);
    this.accelerating = setInterval(() => this.acceleration--);
  }

  this.stop = () => {
    this.accelerating && clearInterval(this.accelerating);
    this.acceleration = 0;
  }

  document.addEventListener('mousemove', e => {
    const x = e.clientX - (window.innerWidth / 2);
    const angle = window.innerWidth / 2;
    const offset = camera.getDistance() * angle;
  });

  document.addEventListener('mouseout', e => {
    this.reset();
  });

  document.addEventListener('keydown', e => {
    switch (e.keyCode) {
      case 83:
        this.brake();
        break;
      case 87:
        this.accelerate();
        break;
      case 65:
        this.turn(-1);
        break;
      case 68:
        this.turn(1);
        break;
    }
  });

  document.addEventListener('keyup', e => {
    if ((e.keyCode === 65 || e.keyCode === 68) && this.turning) {
      clearInterval(this.turning);
      this.turning = null;
    }
    if ((e.keyCode === 83 || e.keyCode === 87) && this.accelerating) {
      clearInterval(this.accelerating);
      this.accelerating = null;
    }
  });

  const calculateVector = () => {
  
    const phi = (90 - this.latitude) * (Math.PI / 180);
    const theta = (this.longitude + 90) * (Math.PI / 180);
  
    const x = -((radius) * Math.sin(phi) * Math.cos(theta));
    const z = ((radius) * Math.sin(phi) * Math.sin(theta));
    const y = ((radius) * Math.cos(phi));
  
    return new THREE.Vector3(x, y, z);
  };

  this.update = () => {

    if (this.acceleration > 0) {
      let latAngle = (Math.abs(this.rotation - 180) - 90) / 90;
      this.latitude += 0.001 * this.acceleration * latAngle;
      let lonAngle = (Math.abs(this.rotation - 180) - 90) / 90;
      this.longitude += 0.001 * this.acceleration * lonAngle;
      console.log(this.rotation, latAngle, lonAngle);

      /*this.latitude += 0.001 * this.acceleration;
      if (this.rotation) {
        this.longitude += 0.001 * this.rotation * this.acceleration;
      }*/
    }

    player.sphere.rotation.x += 0.01 * this.acceleration;
    player.rotation.y = (this.rotation / 360) * 6;

    if (Math.abs(this.latitude) > 180) {
      this.latitude *= -1;
    }
    if (Math.abs(this.longitude) > 180) {
      this.longitude *= -1;
    }

    const target = calculateVector();
    player.position.copy(target);

    //player.rotation.x = -((180 + this.latitude) / 360) * 6 + 1.5;
    //player.rotation.z = -((180 + this.longitude) / 360) * 6 + 3;
  }

  /*const crosshair = new Crosshair(scene);
  crosshair.place(camera);

  let angle = 0;
  let handle = null;

  const mouse = new THREE.Vector2();
  
  var plane = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20), 
    new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} ));
  scene.add(plane);
  plane.position.set(10, 10, -5);

  const raycaster = new THREE.Raycaster();

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
    raycaster.ray.intersectPlane(plane, point);

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
    );
    camera.position.set(target.x, target.y, target.z);

    camera.up = new THREE.Vector3(
      0, 1, 0
    );
    camera.lookAt(sphere.position);

    //sphere.add(camera);
  }*/
}
