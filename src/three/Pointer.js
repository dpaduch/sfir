import * as THREE from 'three';

export default function Pointer(camera) {

  this.defaultPosition = new THREE.Vector3(0, 10, 10);
  const pointer = new THREE.Vector3();

  this.reset = () => {
    pointer.copy(this.defaultPosition);
    camera.get().lookAt(pointer);
  }

  this.reset();

  document.addEventListener('mousemove', e => {
    const x = e.clientX - (window.innerWidth / 2);
    const y = e.clientY - (window.innerHeight / 2);
    const angle = {
      x: x / (window.innerWidth / 2),
      y: y / ((window.innerHeight - 80) / 2)
    };
    this.turn(angle);
  });

  this.turn = ({ x, y }) => {
    if (x !== 0) {
      const offset = camera.getDistance() * x;
      pointer.setX(-offset);
      camera.get().position.setX(offset * 0.25);
    }
    if (y !== 0) {
      pointer.setY(this.defaultPosition.y + (y + 1) * 4);
      if (y > 0) {
        camera.get().position.setZ(camera.defaultPosition.z + y * 6);
      }
      else {
        camera.get().position.setZ(camera.defaultPosition.z - y * 2);
      }
    }
    camera.get().lookAt(pointer);
  };

  this.update = function(time) { 
  }

  this.control = (player) => {
    player.add(pointer);
  }
}
