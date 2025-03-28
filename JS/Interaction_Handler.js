import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.131/build/three.module.js";
import { PostProcessing } from "./Post_Processing.js";
import { fetchReports } from "./Search_Reported.js";// take care

class InteractionHandler {
    constructor(scene, camera, outlinePass) {
        this.scene = scene;
        this.camera = camera;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.selectedObject = null;
        this.lastRightClickTime = 0;
        this.outlinePass = outlinePass;
        this.initEventListeners();
    }

    initEventListeners() {
        window.addEventListener("dblclick", (event) => this.onDoubleClick(event));
        window.addEventListener("contextmenu", (event) => event.preventDefault()); // Disable right-click menu
        window.addEventListener("mousedown", (event) => this.onRightClick(event));
    }

    onDoubleClick(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);

        if (intersects.length > 0) {
            this.selectedObject = intersects[0].object;
            console.log("Selected Object:", this.selectedObject.userData.name);
            this.outlinePass.selectedObjects = [this.selectedObject];
        } else {
            this.outlinePass.selectedObjects = [];
        }
    }

    onRightClick(event) {
        if (event.button === 2) {
            let now = Date.now();
            if (now - this.lastRightClickTime < 300) {
                if (this.selectedObject) {
                    this.showPopup(this.selectedObject.userData.name);
                }
            }
            this.lastRightClickTime = now;
        }
    }

    showPopup(objectName) {
        let popup = document.createElement("div");
        popup.id = "object-popup";
        popup.style.position = "absolute";
        popup.style.top = "50%";
        popup.style.left = "50%";
        popup.style.transform = "translate(-50%, -50%)";
        popup.style.backgroundColor = "white";
        popup.style.padding = "15px";
        popup.style.border = "2px solid black";
        popup.style.boxShadow = "0px 4px 6px rgba(0,0,0,0.1)";
        popup.style.zIndex = "1000";
        popup.innerHTML = `
            <p><strong>Object Name:</strong> ${objectName}</p>
            
            <button id="report-btn">Report</button>
            <button id="close-btn">Close</button>
        `;

        document.body.appendChild(popup);

        document.getElementById("close-btn").addEventListener("click", () => {
            document.body.removeChild(popup);
        });

        document.getElementById("report-btn").addEventListener("click", () => {
            this.reportObject(objectName);
            alert(`${objectName} has been reported!`);
            document.body.removeChild(popup);
        });
    }

    reportObject(objectName) {
        fetch("http://localhost:3000/report-object", { // backendurl :)
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ objectName }),
        })
        .then((response) => response.json())
        .then((data) => {console.log("Report status:", data); fetchReports()})
        .catch((error) => console.error("Error reporting object:", error));
    }
    
}

export { InteractionHandler };
