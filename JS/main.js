import { scene, camera, renderer, controls } from "./Scene_Setup.js";
import { loadModel } from "./Model_Loader.js";
import { setupInteractions } from "./Interaction_Handler.js";
import { composer, animate } from "./Post_Processing.js";
import { moveCameraToObject, navigateToObject } from "./Room_Navigation.js"; // Import navigation functions

document.body.appendChild(renderer.domElement); // Adds rendering canvas to HTML document

loadModel(scene);
setupInteractions(scene, camera);
animate();
