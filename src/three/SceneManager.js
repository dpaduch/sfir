import * as THREE from 'three';
import Camera from './Camera';
import World from './World';
import GeneralLights from './GeneralLights';
import Player from './Player';

export default canvas => {
  const clock = new THREE.Clock();
  const screenDimensions = {
    width: window.innerWidth,
    height: window.innerHeight
  }
  const scene = buildScene(); 
  const renderer = buildRender(screenDimensions);
  const center = new THREE.Vector3(0, 0, 0);
  const camera = (new Camera(center)).build(screenDimensions);
  const sceneSubjects = createSceneSubjects(scene);
  function buildScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#000");
    return scene;
  }
  function buildRender({ width, height }) {
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    });
    renderer.gammaInput = true;
    renderer.gammaOutput = true; 
    const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
    renderer.setPixelRatio(DPR);
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
    return renderer;
  }
  function createSceneSubjects(scene) {
    const sceneSubjects = [ 
      new GeneralLights(scene),
      new World(scene),
      new Player(scene)
    ];
    return sceneSubjects;
  }
  function update() {
    const elapsedTime = clock.getElapsedTime();
    for(let i=0; i<sceneSubjects.length; i++) {
      sceneSubjects[i].update(elapsedTime);
    }

    renderer.render(scene, camera);
  }
  function onWindowResize() {
    const { width, height } = canvas;

    screenDimensions.width = width;
    screenDimensions.height = height;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    
    renderer.setSize(width, height);
  }
  return {
    update,
    onWindowResize
  }
}
