import * as THREE from 'three';
import Camera from './Camera';
import World from './World';
import GeneralLights from './GeneralLights';
import Player from './Player';

export default canvas => {

  let screenDimensions = { ...getCanvasDimensions() };
  const clock = new THREE.Clock();

  const scene = buildScene();
  const center = new THREE.Vector3();
  const camera = buildCamera();
  const renderer = buildRender(canvas);
  const sceneSubjects = createSceneSubjects(scene);

  function buildScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    return scene;
  }

  function buildCamera() {
    const camera = new Camera(center);
    camera.build(canvas);
    //camera.get().position.set(0, 0, -400);
    //camera.get().lookAt(center);
    return camera;
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
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    return renderer;
  }

  function createSceneSubjects(scene) {
    //const c = new Camera(center);
    //c.build(canvas);
    const sceneSubjects = [ 
      new GeneralLights(scene),
      new Player(scene, camera),
      new World(scene)
    ];
    return sceneSubjects;
  }

  function update() {
    const elapsedTime = clock.getElapsedTime();
    sceneSubjects.map(sceneObject => sceneObject.update(elapsedTime));
    renderer.render(scene, camera.get());
  }

  function onWindowResize() {
    screenDimensions = { ...screenDimensions, ...getCanvasDimensions() };
    camera.updateScreenDimensions(screenDimensions);
    renderer.setSize(screenDimensions.width, screenDimensions.height);
  }

  function getCanvasDimensions() {
    const { width, height } = canvas;
    return { width, height };
  }

  return {
    update,
    onWindowResize
  }
}
