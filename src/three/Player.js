import * as THREE from 'three';
import Pointer from './Pointer';
//import Crosshair from './Crosshair';

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
    const material = new THREE.MeshStandardMaterial({ color: 0xff0000, wireframe: true });
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
    player.add(new THREE.AxesHelper(5));

    return player;
  };

  this.createTrack = (subject) => {
    //const track = new THREE.Vector3(0, 0, 0);
    const track = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.LineBasicMaterial({ color: 0xff0000 })
    );
    track.add(subject);
    scene.add(track);
    return track;
  }

  const player = this.render();
  const trackX = this.createTrack(player);
  const trackY = this.createTrack(trackX);

  camera.follow(player);
  camera.reset();

  const pointer = new Pointer(camera);
  pointer.control(player);
  
  let radius = 900 - 1.5;

  this.reset = () => {
    player.position.set(0, -radius, 0);
    player.rotation.set(0, 0, 0);
    camera.reset();
    pointer.reset();
  }

  this.reset();

  this.triggers = {};

  this.trigger = (name, action, interval = 100) => {
    this.triggers[name] && clearInterval(this.triggers[name]);
    if (action() === false) {
      return;
    }
    this.triggers[name] = setInterval(action, interval);
  }

  this.turn = (side) => {
    this.rotation += side * 1;
    if (this.rotation >= 180) {
      this.rotation = -180;
    }
    else if (this.rotation < -180) {
      this.rotation = 180;
    }
  }

  this.accelerate = () => {
    if (this.acceleration >= 10) {
      return false;
    }
    this.acceleration++
  }

  this.brake = () => {
    if (this.acceleration <= 0) {
      this.stop();
      return false;
    }
    this.acceleration--;
  }

  this.stop = () => {
    this.accelerating && clearInterval(this.accelerating);
    this.acceleration = 0;
  }

  /*document.addEventListener('mousemove', e => {
    const x = e.clientX - (window.innerWidth / 2);
    const angle = window.innerWidth / 2;
    const offset = camera.getDistance() * angle;
  });*/

  document.addEventListener('mouseout', e => {
    this.reset();
  });

  document.addEventListener('keydown', e => {
    switch (e.keyCode) {
      case 83:
        this.trigger('accelerate', this.brake);
        break;
      case 87:
        this.trigger('accelerate', this.accelerate);
        break;
      case 65:
        this.trigger('turn', () => this.turn(-45), 500);
        break;
      case 68:
        this.trigger('turn', () => this.turn(45), 500);
        break;
      default:
        break;
    }
  });

  document.addEventListener('keyup', e => {
    if ((e.keyCode === 65 || e.keyCode === 68) && this.triggers['turn']) {
      clearInterval(this.triggers['turn']);
      delete this.triggers['turn'];
    }
    if ((e.keyCode === 83 || e.keyCode === 87) && this.accelerating) {
      clearInterval(this.accelerating);
      this.accelerating = null;
    }
  });
  
  const absoluteDegree = (degree) => {
    return degree >= 0 ? degree : (360 + degree);
  };

  this.lat = 0;
  this.lon = 0;

  this.update = () => {

    //player.sphere.rotation.x += 0.01 * this.acceleration;
    player.rotation.y = -THREE.Math.degToRad(absoluteDegree(this.rotation));

    const angle = Math.abs(this.rotation);
    let latAngle = (Math.abs(angle - 90) / 90) * (angle > 90 ? -1 : 1);
    let lonAngle = (1 - Math.abs(latAngle)) * (this.rotation > 0 ? -1 : 1);

    this.lat += 0.01 * this.acceleration * latAngle;
    this.lon += 0.01 * this.acceleration * lonAngle;

    if (this.lat >= 360) {
      this.lat = 0;
    }
    if (this.lon >= 360) {
      this.lon = 0;
    }

    trackX.rotation.x = -THREE.Math.degToRad(absoluteDegree(this.lat));
    trackY.rotation.y = THREE.Math.degToRad(absoluteDegree(this.lon));

    console.log(
      this.rotation,
      Math.round(latAngle * 100),
      Math.round(lonAngle * 100),
      0.01 * this.acceleration * latAngle, '/', this.lat,
      0.01 * this.acceleration * lonAngle, '/', this.lon
    )
  };

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
