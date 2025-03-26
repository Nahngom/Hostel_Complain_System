// import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.131/build/three.module.js';
// import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.131/examples/jsm/loaders/GLTFLoader.js';
// import { DRACOLoader } from 'https://cdn.jsdelivr.net/npm/three@0.131/examples/jsm/loaders/DRACOLoader.js';

// function loadModel(scene) {
//     const loader = new GLTFLoader();
    
//     const dracoLoader = new DRACOLoader();
//     dracoLoader.setDecoderPath('./Draco/'); 
//     dracoLoader.setDecoderConfig({type: 'wasm'});
//     loader.setDRACOLoader(dracoLoader);

//     loader.load('./Assets/Hostel43.glb', (gltf) => {
//         console.log("Model loaded successfully:", gltf);
//         const model = gltf.scene;

//         model.traverse((child) => {
//             if (child.isMesh) {
//                 child.castShadow = false;
//                 child.receiveShadow = false;
//                 child.material.metalness = 0;
//                 child.material.roughness = 1;
//                 child.userData.name = child.name || "Unnamed Object";
//             }
//         });

//         scene.add(model);
//     }, undefined, (error) => {
//         console.error("Error loading model:", error);
//     });
// }

// export { loadModel };

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.131/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.131/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'https://cdn.jsdelivr.net/npm/three@0.131/examples/jsm/loaders/DRACOLoader.js';

class ModelLoader {
    constructor(scene) {
        this.scene = scene;
        this.loader = new GLTFLoader();
        
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('./Draco/');
        dracoLoader.setDecoderConfig({ type: 'wasm' });
        this.loader.setDRACOLoader(dracoLoader);
    }

    loadModel(modelPath = './Assets/Hostel43.glb') {
        this.loader.load(
            modelPath,
            (gltf) => {
                console.log("Model loaded successfully:", gltf);
                const model = gltf.scene;//

                model.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow = false;
                        child.receiveShadow = false;
                        child.material.metalness = 0;
                        child.material.roughness = 1;
                        child.userData.name = child.name || "Unnamed Object";
                    }
                });

                this.scene.add(model);
            },
            undefined,
            (error) => {
                console.error("Error loading model:", error);
            }
        );
    }
}

export { ModelLoader };
