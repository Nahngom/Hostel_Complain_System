import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.131/build/three.module.js';
import { outlinePass } from './Post_Processing.js';

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let SELECTED_OBJECT = null;

function setupInteractions(scene, camera) {
    window.addEventListener('dblclick', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children, true);

        if (intersects.length > 0) {
            SELECTED_OBJECT = intersects[0].object;
            console.log("Selected Object:", SELECTED_OBJECT.userData.name);
            outlinePass.selectedObjects = [SELECTED_OBJECT];
        } else {
            outlinePass.selectedObjects = [];
        }
    });
}

export { setupInteractions };
