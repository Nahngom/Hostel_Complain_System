import { scene, camera, controls } from "./Scene_Setup.js";
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.131/build/three.module.js";
import * as TWEEN from "https://cdnjs.cloudflare.com/ajax/libs/tween.js/18.6.4/tween.esm.js";
function findObjectByName(name) {
    return scene.getObjectByName(name);
}

function moveCameraToObject(objectName) {
    const object = findObjectByName(objectName);
    if (!object) {
        console.error(`Object "${objectName}" not found`);
        return;
    }

    const targetPosition = object.position.clone().add(new THREE.Vector3(0, 2, 5)); // Offset camera
    const duration = 1.5; // animation length

    new TWEEN.Tween(camera.position)
        .to(targetPosition, duration * 1000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .start();

    new TWEEN.Tween(controls.target)
        .to(object.position, duration * 1000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .start();
}

function navigateToObject() {
    const name = document.getElementById("objectName").value;
    moveCameraToObject(name);
}

// Attach event listener to the search button after DOM loads
document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("navigateButton");
    if (button) {
        button.addEventListener("click", navigateToObject);
    }
});

function updateAnimations() {
    requestAnimationFrame(updateAnimations);
    TWEEN.update();
}

updateAnimations();

export { moveCameraToObject, navigateToObject };

