    // import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.131/build/three.module.js';
    // import { EffectComposer } from 'https://cdn.jsdelivr.net/npm/three@0.131/examples/jsm/postprocessing/EffectComposer.js';
    // import { RenderPass } from 'https://cdn.jsdelivr.net/npm/three@0.131/examples/jsm/postprocessing/RenderPass.js';
    // import { OutlinePass } from 'https://cdn.jsdelivr.net/npm/three@0.131/examples/jsm/postprocessing/OutlinePass.js';
    // import { scene, camera, renderer, controls } from './Scene_Setup.js';

    // const width = window.innerWidth;
    // const height = window.innerHeight;

    // const composer = new EffectComposer(renderer);
    // const renderPass = new RenderPass(scene, camera);
    // composer.addPass(renderPass);

    // const outlinePass = new OutlinePass(new THREE.Vector2(width, height), scene, camera);
    // outlinePass.edgeStrength = 4;
    // outlinePass.edgeGlow = 1;
    // outlinePass.edgeThickness = 3;
    // outlinePass.pulsePeriod = 0;
    // outlinePass.visibleEdgeColor.set('#0000ff');
    // outlinePass.hiddenEdgeColor.set('#0000ff');
    // composer.addPass(outlinePass);

    // function animate() {
    //     requestAnimationFrame(animate);
    //     composer.render();
    //     controls.update();
    // }

    // export { composer, outlinePass, animate };


    import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.131/build/three.module.js';
import { EffectComposer } from 'https://cdn.jsdelivr.net/npm/three@0.131/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://cdn.jsdelivr.net/npm/three@0.131/examples/jsm/postprocessing/RenderPass.js';
import { OutlinePass } from 'https://cdn.jsdelivr.net/npm/three@0.131/examples/jsm/postprocessing/OutlinePass.js';
import { SceneSetup } from './Scene_Setup.js';

class PostProcessing {
    constructor(scene, camera, controls, renderer) {
        
        this.scene = scene
        this.camera = camera;
        this.controls = controls;
        this.renderer = renderer;
        console.log("Renderer inside PostProcessing:", this.renderer);
        if (!this.renderer || !(this.renderer instanceof THREE.WebGLRenderer)) {
        throw new Error("Invalid renderer passed to PostProcessing!");
        }
        const width = window.innerWidth;
        const height = window.innerHeight;

        this.composer = new EffectComposer(this.renderer);
        const renderPass = new RenderPass(this.scene, this.camera);
        this.composer.addPass(renderPass);

        this.outlinePass = new OutlinePass(new THREE.Vector2(width, height), this.scene, this.camera);
        this.outlinePass.edgeStrength = 4;
        this.outlinePass.edgeGlow = 1;
        this.outlinePass.edgeThickness = 3;
        this.outlinePass.pulsePeriod = 0;
        this.outlinePass.visibleEdgeColor.set('#0000ff');
        this.outlinePass.hiddenEdgeColor.set('#0000ff');
        this.composer.addPass(this.outlinePass);
        //this.animate();
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.composer.render();
        this.controls.update();
    }

    getOutlinePass() {
        return this.outlinePass;
    }
}

export { PostProcessing };
