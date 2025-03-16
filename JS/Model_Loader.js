import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.131/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.131/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'https://cdn.jsdelivr.net/npm/three@0.131/examples/jsm/loaders/DRACOLoader.js';

function loadModel(scene) {
    const loader = new GLTFLoader();
    
    // Set up DRACO Loader
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('./Draco/'); // Ensure Draco files are inside this folder
    dracoLoader.setDecoderConfig({type: 'wasm'});
    loader.setDRACOLoader(dracoLoader);

    loader.load('./Assets/Hostel37.glb', (gltf) => {
        console.log("Model loaded successfully:", gltf);
        const model = gltf.scene;

        model.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = false;
                child.receiveShadow = false;
                child.material.metalness = 0;
                child.material.roughness = 1;
                child.userData.name = child.name || "Unnamed Object";
            }
        });

        scene.add(model);
    }, undefined, (error) => {
        console.error("Error loading model:", error);
    });
}

export { loadModel };

