// import { scene, camera, controls } from "./Scene_Setup.js";
// import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.131/build/three.module.js";
// import * as TWEEN from "https://cdnjs.cloudflare.com/ajax/libs/tween.js/18.6.4/tween.esm.js";


// function findObjectByName(name) {
//     return scene.getObjectByName(name);
// }

// function moveCameraToObject(objectName) {
//     const object = findObjectByName(objectName);
//     if (!object) {
//         console.error(`Object "${objectName}" not found`);
//         return;
//     }

//     const targetPosition = object.position.clone().add(new THREE.Vector3(2, 3, 0)); // Offset camera
//     const duration = 1.5; // animation length

//     new TWEEN.Tween(camera.position)
//         .to(targetPosition, duration * 1000)
//         .easing(TWEEN.Easing.Quadratic.Out)
//         .start();

//     new TWEEN.Tween(controls.target)
//         .to(object.position, duration * 1000)
//         .easing(TWEEN.Easing.Quadratic.Out)
//         .start();
// }

// function navigateToObject() {
//     const name = document.getElementById("objectName").value;
//     moveCameraToObject(name);
// }

// document.addEventListener("DOMContentLoaded", () => {
//     const button = document.getElementById("navigateButton");
//     if (button) {
//         button.addEventListener("click", navigateToObject);
//     }
// });

// function updateAnimations() {
//     requestAnimationFrame(updateAnimations);
//     TWEEN.update();
// }

// updateAnimations();

// export { moveCameraToObject, navigateToObject };


import { SceneSetup } from "./Scene_Setup.js";
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.131/build/three.module.js";
import * as TWEEN from "https://cdnjs.cloudflare.com/ajax/libs/tween.js/18.6.4/tween.esm.js";

class RoomNavigation {
    constructor(scene, camera, controls) {
        this.scene = scene;
        this.camera = camera;
        this.controls = controls;
        this.initNavigationButton();
        this.updateAnimations();
    }

    findObjectByName(name) {
        return this.scene.getObjectByName(name);
    }

    moveCameraToObject(objectName) {
        const object = this.findObjectByName(objectName);
        if (!object) {
            console.error(`Object "${objectName}" not found`);
            return;
        }

        const targetPosition = object.position.clone().add(new THREE.Vector3(2, 3, 0)); // Offset camera
        const duration = 1.5; // animation length

        new TWEEN.Tween(this.camera.position)
            .to(targetPosition, duration * 1000)
            .easing(TWEEN.Easing.Quadratic.Out)
            .start();

        new TWEEN.Tween(this.controls.target)
            .to(object.position, duration * 1000)
            .easing(TWEEN.Easing.Quadratic.Out)
            .start();
    }

    navigateToObject() {
        const name = document.getElementById("objectName").value;
        const name1 = document.getElementById("reportedObj").value;
        if(name)
        this.moveCameraToObject(name);
        else if(name1) this.moveCameraToObject(name);
        else return;
    }

    initNavigationButton() {
        document.addEventListener("DOMContentLoaded", () => {
            const button = document.getElementById("navigateButton");
            if (button) {
                button.addEventListener("click", () => this.navigateToObject());
            }
        });
    }

    updateAnimations() {
        requestAnimationFrame(() => this.updateAnimations());
        TWEEN.update();
    }
}

export { RoomNavigation };
