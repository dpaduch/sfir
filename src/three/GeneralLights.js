import * as THREE from 'three';

export default function World(scene) {

	const light = new THREE.PointLight("#ffffff", 1);
  light.position.set( 0, 10, 0 );
  scene.add(light);
  //Set up shadow properties for the light
  light.shadow.mapSize.width = 512;  // default
  light.shadow.mapSize.height = 512; // default
  light.shadow.camera.near = 0.5;       // default
  light.shadow.camera.far = 1500      // default

  light.castShadow = true;            // default false

  const ambient = new THREE.AmbientLight( 0x404040 ); // soft white light
  scene.add(ambient);

  this.update = function(time) { 
    //light.intensity = (Math.sin(time)+1.5)/1.5;
		//light.color.setHSL( Math.sin(time), 0.5, 0.5 );
  }
}
