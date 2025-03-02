import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.131/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.131/examples/jsm/controls/OrbitControls.js';// orbit controls -> rotate, zoom and pan camera
import { RGBELoader } from 'https://cdn.jsdelivr.net/npm/three@0.131/examples/jsm/loaders/RGBELoader.js';

const scene = new THREE.Scene();
const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(75, width / height, 0.5, 1000);
camera.position.set(20, 20, 20);

const renderer = new THREE.WebGLRenderer({ antialias: true, precision: "highup" });
renderer.setSize(width, height);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;// adjust the brigntness of renderer scene -> usinf tone mapping
renderer.shadowMap.enabled = false;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;// false if you dont want smooth movement

new RGBELoader().load('https://threejs.org/examples/textures/equirectangular/royal_esplanade_1k.hdr', (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;
});

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.1);
scene.add(hemiLight);

const sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
sunLight.position.set(5, 10, 5);
sunLight.castShadow = false;
sunLight.shadow.mapSize.set(1024, 1024);
scene.add(sunLight);

export { scene, camera, renderer, controls };
