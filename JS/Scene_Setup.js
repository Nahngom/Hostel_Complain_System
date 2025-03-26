// import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.131/build/three.module.js';
// import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.131/examples/jsm/controls/OrbitControls.js';

// const scene = new THREE.Scene();
// const width = window.innerWidth;
// const height = window.innerHeight;

// const camera = new THREE.PerspectiveCamera(75, width / height, 0.5, 1000);
// camera.position.set(20, 20, 20);

// const renderer = new THREE.WebGLRenderer({ antialias: true, precision: "highp" });
// renderer.setSize(width, height);
// renderer.outputEncoding = THREE.sRGBEncoding;
// renderer.toneMapping = THREE.ACESFilmicToneMapping;
// renderer.toneMappingExposure = 1;
// renderer.shadowMap.enabled = true; // Enable soft shadows
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;

// // Fix: Add Ambient Light to reduce dark shadows
// const ambientLight = new THREE.AmbientLight(0xffffff, 1.2); // Bright ambient light
// scene.add(ambientLight);

// // Fix: Adjust Hemisphere Light for a soft global effect
// const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6); // Increase intensity
// scene.add(hemiLight);

// // Fix: Enable Soft Shadows for Directional Light
// const sunLight = new THREE.DirectionalLight(0xffffff, 2);
// sunLight.position.set(10, 20, 10);
// sunLight.castShadow = true; // Enable soft shadows
// sunLight.shadow.mapSize.set(2048, 2048); // Higher resolution shadows
// sunLight.shadow.camera.near = 0.5;
// sunLight.shadow.camera.far = 500;
// sunLight.shadow.bias = -0.001; // Reduce shadow acne
// scene.add(sunLight);

// // Fix: Adjust Scene Background (Sky)
// scene.background = new THREE.Color(0x87ceeb); // Light blue sky

// export { scene, camera, renderer, controls };

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.131/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.131/examples/jsm/controls/OrbitControls.js';

class SceneSetup {
    constructor() {
        this.scene = new THREE.Scene();
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.5, 1000);
        this.camera.position.set(20, 20, 20);

        this.renderer = new THREE.WebGLRenderer({ antialias: true, precision: "highp" });
        this.renderer.setSize(this.width, this.height);
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;

        this.addLights();
        this.setBackground();
    }

    addLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
        this.scene.add(ambientLight);

        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
        this.scene.add(hemiLight);

        this.sunLight = new THREE.DirectionalLight(0xffffff, 2);
        this.sunLight.position.set(10, 20, 10);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.mapSize.set(2048, 2048);
        this.sunLight.shadow.camera.near = 0.5;
        this.sunLight.shadow.camera.far = 500;
        this.sunLight.shadow.bias = -0.001;
        this.scene.add(this.sunLight);
    }
    setBackground() {
        this.scene.background = new THREE.Color(0x87CEEB);  // ✅ Example: Set sky blue background
    }

    getScene() {
        return this.scene;
    }

    getCamera() {
        return this.camera;
    }

    getRenderer() {
        return this.renderer;
    }
    getControls() {
        return this.controls;
    }
}

export { SceneSetup };
