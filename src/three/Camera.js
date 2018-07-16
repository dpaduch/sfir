import * as THREE from 'three';

export default function Camera(center) {
  let handle = null;
  let camera = null;
  document.addEventListener('mousedown', e => {
    handle = { 
      x: e.clientX, 
      y: e.clientY
    };
  });
  document.addEventListener('mousemove', e => {
    if (handle != null) {
      let x = camera.position.x;
      let y = camera.position.y;
      let z = camera.position.z;
      const diffX = (handle.x - e.clientX) / 20;
      const diffY = (handle.y - e.clientY) / 20;
      //camera.position.z = z * Math.cos(rotSpeed) - x * Math.sin(rotSpeed);
      //camera.position.z = z * Math.cos(rotSpeed) + x * Math.sin(rotSpeed);
      
      //camera.rotation.x += x * Math.cos(rotSpeed) + z * Math.sin(rotSpeed);
      //camera.rotation.y += diffY / 20;
      camera.lookAt(center);
      //console.log(diffX, diffY);
      handle = { 
        x: e.clientX,
        y: e.clientY
      };
    }
  });
  document.addEventListener('mouseup', e => {
    handle = null;
  });
  this.build = function({ width, height }) {
    const aspectRatio = width / height;
    const fieldOfView = 60;
    const nearPlane = 10;
    const farPlane = 1000; 
    camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
    camera.position.z = 20;

    camera.lookAt(center);

    return camera;
  }
}
