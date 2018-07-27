import * as THREE from 'three';

export default function Camera(center) {

  let camera;
  this.defaultPosition = new THREE.Vector3(0, 100, -300);

  this.build = ({ width, height }) => {
    camera = new THREE.PerspectiveCamera(60, width / height, 0.01, 2000);
    return camera;
  }

  this.get = () => {
    return camera;
  }

  this.follow = (object) => {
    object.add(camera);
  }

  this.updateScreenDimensions = ({ width,  height }) => {
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  this.reset = () => {
    camera.up = new THREE.Vector3(0, 1, 0);
    camera.position.copy(this.defaultPosition);
  }

  this.getDistance = () => {
    return camera.getFilmWidth() / 2;
  }

/*
  let handle = null;
  let camera = null;
  document.addEventListener('mousedown', e => {
    handle = { 
      x: e.clientX, 
      y: e.clientY
    };
  });
  let angleX = 0;
  let angleY = 0;
  document.addEventListener('mousemove', e => {
    if (handle != null) {

      const deltaX = (e.clientX - handle.x);
      const deltaY = (e.clientY - handle.y);

      //angleX += deltaX / 100;
      //angleY += deltaY / 100;

      let radPerPixel = (Math.PI / 450),
        deltaPhi = radPerPixel * deltaX,
        deltaTheta = radPerPixel * deltaY,
        pos = camera.position.sub(center),
        radius = pos.length(),
        theta = Math.acos(pos.z / radius),
        phi = Math.atan2(pos.y, pos.x);

      // Subtract deltaTheta and deltaPhi
      theta = Math.min(Math.max(theta - deltaTheta, 0), Math.PI);
      phi -= deltaPhi;

      // Turn back into Cartesian coordinates
      pos.x = radius * Math.sin(theta) * Math.cos(phi);
      pos.y = radius * Math.sin(theta) * Math.sin(phi);
      pos.z = radius * Math.cos(theta);

      if (deltaX != 0) {
        camera.position.x = Math.sin(angleX) * 100;
      }
      if (deltaY != 0) {
        camera.position.y = Math.sin(angleY) * 100;
      }
      camera.position.z = Math.cos(angleX + angleY) * 100;

      //camera.position.add(center);
      camera.lookAt(center);

      handle = { x: e.clientX, y: e.clientY };
    }
  });
  document.addEventListener('mouseup', e => {
    handle = null;
  });
  document.addEventListener('mousewheel', e => {
    //const pos = camera.position.sub(center);
    //pos.multiplyScalar(e.wheelDelta > 0 ? 0.9: 1.1).add(center);
  }, false);

  */
}
