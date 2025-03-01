import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.131/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.131/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.131/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'https://cdn.jsdelivr.net/npm/three@0.131/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://cdn.jsdelivr.net/npm/three@0.131/examples/jsm/postprocessing/RenderPass.js';
import { OutlinePass } from 'https://cdn.jsdelivr.net/npm/three@0.131/examples/jsm/postprocessing/OutlinePass.js';
import { RGBELoader } from 'https://cdn.jsdelivr.net/npm/three@0.131/examples/jsm/loaders/RGBELoader.js';

const scene = new THREE.Scene();

const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.set(0, 2, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const ctrls = new OrbitControls(camera, renderer.domElement);
ctrls.enableDamping = true;

// Load HDR Environment Map (like Blender's World Lighting)
new RGBELoader().load('https://threejs.org/examples/textures/equirectangular/royal_esplanade_1k.hdr', function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;
    //scene.background = null;  // Uncomment if you want background
});


const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, .1);
scene.add(hemiLight);
const sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
sunLight.position.set(5, 10, 5);
sunLight.castShadow = true;
sunLight.shadow.mapSize.set(1024, 1024);
scene.add(sunLight);


const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let SELECTED_OBJECT = null;

const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const outlinePass = new OutlinePass(new THREE.Vector2(width, height), scene, camera);
outlinePass.edgeStrength = 5;
outlinePass.edgeGlow = 0.5;
outlinePass.edgeThickness = 3;
outlinePass.pulsePeriod = 0;
outlinePass.visibleEdgeColor.set('#0000ff');
outlinePass.hiddenEdgeColor.set('#0000ff');
composer.addPass(outlinePass);

// Load 3D Model
const gltfLoader = new GLTFLoader();
gltfLoader.load('./Assets/Hostel18.glb', (gltf) => {
    console.log("Model loaded successfully:", gltf);
    const MyModel = gltf.scene;

    MyModel.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;

            if (child.material) {
                child.material.metalness = 0;
                child.material.roughness = 1;
            }

            child.userData.name = child.name || "Unnamed Object";  // Store name for selection
        }
    });

    scene.add(MyModel);
}, undefined, (error) => {
    console.error("Error loading model:", error);
});

// Double Left Click Event for Selection
window.addEventListener('dblclick', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
        SELECTED_OBJECT = intersects[0].object;
        console.log("Selected Object:", SELECTED_OBJECT.userData.name);

        // Highlight selected object
        outlinePass.selectedObjects = [SELECTED_OBJECT];
    } else {
        // Deselect if clicked on empty space
        outlinePass.selectedObjects = [];
    }
});

// Render Loop
function animate() {
    requestAnimationFrame(animate);
    composer.render();
    ctrls.update();
}

animate();
