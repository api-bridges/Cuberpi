import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import './style.css';
 
// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);
 
// Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(8, 8, 8);
 
// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.toneMapping = THREE.ReinhardToneMapping;
document.getElementById('app').appendChild(renderer.domElement);
 
// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
 
// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);
 
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);
 
// Reflective floor
const floorGeometry = new THREE.PlaneGeometry(20, 20);
const reflector = new Reflector(floorGeometry, {
  clipBias: 0.003,
  textureWidth: window.innerWidth * window.devicePixelRatio,
  textureHeight: window.innerHeight * window.devicePixelRatio,
  color: 0x888888,
});
reflector.rotation.x = -Math.PI / 2;
scene.add(reflector);
 
// Grid of cubes
const gridSize = 8;
const cubeSize = 0.8;
const spacing = 1.2;
const offset = (gridSize - 1) * spacing / 2;
 
const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
 
for (let x = 0; x < gridSize; x++) {
  for (let z = 0; z < gridSize; z++) {
    let color = 0x444444;
    let emissiveIntensity = 0.5;
    let opacity = 0.6;
 
    if (x === 1 && z === 1) {
      color = 0x00ff00; // Green
      emissiveIntensity = 5;
      opacity = 0.9;
    } else if (x === 6 && z === 2) {
      color = 0xff00ff; // Pink
      emissiveIntensity = 5;
      opacity = 0.9;
    } else if (x === 3 && z === 5) {
      color = 0x00ffff; // Cyan
      emissiveIntensity = 5;
      opacity = 0.9;
    }
 
    const material = new THREE.MeshStandardMaterial({
      color: color,
      emissive: color,
      emissiveIntensity: emissiveIntensity,
      transparent: true,
      opacity: opacity,
      roughness: 0.1,
      metalness: 0.5,
    });
 
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(x * spacing - offset, cubeSize / 2 + 0.01, z * spacing - offset);
    scene.add(cube);
  }
}

 
// Post-processing
const renderScene = new RenderPass(scene, camera);
 
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  2.0, // strength
  0.5, // radius
  0.1 // threshold
);
 
const composer = new EffectComposer(renderer);
composer.addPass(renderScene);
composer.addPass(bloomPass);
 
// Resize handler
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
});
 
// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  composer.render();
}
 
animate();
