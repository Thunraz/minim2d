import { Camera   } from './Camera';
import { Controls } from '../input/Controls';

export class Game {
    /**
     * @param {Camera} camera The camera used to render the game
     * @param {HTMLElement} container (optional) the container to inject the game canvas into.
     * @param {Object} controlsOptions (optional) options for the @see Controls controls
     * If not set, the canvas will be injected to body. If container is canvas,
     * it will be used instead.
     */
    constructor(camera, container, controlsOptions) {
        if (!camera || !(camera instanceof Camera)) {
            throw Error('Camera has not been specified');
        } else {
            this.camera = camera;
        }

        if (container === undefined) {
            // Create canvas and append it to body
            this.canvas = document.createElement('canvas');
            this.canvas.height = 300;
            this.canvas.width  = 300;
            document.body.appendChild(this.canvas);
        } else if (container.tagName === 'CANVAS') {
            // Canvas has already been created by the user - use it instead
            this.canvas = container;
        } else {
            this.canvas = document.createElement('canvas');
            this.canvas.height = 300;
            this.canvas.width  = 300;
            container.appendChild(this.canvas);
        }
        
        this.context = this.canvas.getContext('2d');
        
        this.lastFrameTime = 0;
        this.frames = 0;
        this.controls = new Controls(controlsOptions);

        this.currentScene       = null;
        this.preRenderCallback  = null;
        this.postRenderCallback = null;
    }

    /**
     * Executes the game loop
     * @param {Number} timestamp Elapsed game time in ms
     * @returns {void}
     */
    gameLoop(timestamp) {
        const deltaT = timestamp - this.lastFrameTime;
        this.lastFrameTime = timestamp;

        if (!this.controls.paused) {
            this.update(deltaT / 1000);
            this.render();
        } else if (this.frames % 10 === 0) {
            this.render();
        }

        this.frames += 1;
    
        requestAnimationFrame((t) => this.gameLoop(t));
    }

    /**
     * Sets the current scene.
     * @param {Scene} scene The scene to change to.
     * @returns {void}
     */
    setScene(scene) {
        this.currentScene = scene;
    }

    /**
     * Performs object updates before drawing. Should not be called directly.
     * @param {Number} dt elapsed time since last frame
     * @returns {void}
     */
    update(dt) {
        window.dispatchEvent(new CustomEvent('beforeUpdate'));

        this.controls.update(dt);
        const detail = { states: this.controls.states, deltaT: dt };
        window.dispatchEvent(new CustomEvent('handleControls', { detail }));
        
        if (this.currentScene !== null) {
            this.currentScene.update(dt);
        }

        window.dispatchEvent(new CustomEvent('afterUpdate'));
    }

    /**
     * Renders the scene onto the canvas. Should not be called directly.
     * @returns {void}
     */
    render() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (typeof this.preRenderCallback === 'function') {
            this.preRenderCallback(this.context, this.camera);
        }
        
        if (this.currentScene !== null) {
            this.currentScene.render(this.context, this.camera);
        }

        if (typeof this.postRenderCallback === 'function') {
            this.postRenderCallback(this.context, this.camera);
        }
    }
}

export default Game;
