import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.131/build/three.module.js';
import { EffectComposer } from 'https://cdn.jsdelivr.net/npm/three@0.131/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://cdn.jsdelivr.net/npm/three@0.131/examples/jsm/postprocessing/RenderPass.js';
import { OutlinePass } from 'https://cdn.jsdelivr.net/npm/three@0.131/examples/jsm/postprocessing/OutlinePass.js';
import { scene, camera, renderer, controls } from './Scene_Setup.js';

const width = window.innerWidth;
const height = window.innerHeight;

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

function animate() {
    requestAnimationFrame(animate);
    composer.render();
    controls.update();
}

export { composer, outlinePass, animate };
