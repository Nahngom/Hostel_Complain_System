// import { scene, camera, renderer, controls } from "./Scene_Setup.js";
// import { loadModel } from "./Model_Loader.js";
// import { setupInteractions } from "./Interaction_Handler.js";
// import { composer, animate } from "./Post_Processing.js";
// import { moveCameraToObject, navigateToObject } from "./Room_Navigation.js";

// document.body.appendChild(renderer.domElement);

// loadModel(scene);
// setupInteractions(scene, camera);
// animate();

import { SceneSetup } from "./Scene_Setup.js";
import { ModelLoader } from "./Model_Loader.js";
import { PostProcessing } from "./Post_Processing.js";
import { RoomNavigation } from "./Room_Navigation.js";
import { InteractionHandler } from "./Interaction_Handler.js";

const sceneSetup = new SceneSetup();
const scene = sceneSetup.getScene();
const camera = sceneSetup.getCamera();
const renderer = sceneSetup.getRenderer();
const controls = sceneSetup.getControls();

document.body.appendChild(renderer.domElement);

const modelLoader = new ModelLoader(scene);
modelLoader.loadModel();

const roomNavigation = new RoomNavigation(scene, camera, controls);

const postProcessing = new PostProcessing(scene, camera, controls, renderer);

const interactionHandler = new InteractionHandler(scene, camera, postProcessing.getOutlinePass());

postProcessing.animate();


