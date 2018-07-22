import { Controls } from './Controls';

let lastFrameTime = 0;
let events = {
    handleControls: new Event('handleControls')
};

export class Game {
    /**
     * 
     * @param {HTMLElement} container (optional) the container to inject the game canvas into.
     * @param {Object} controlsOptions (optional) options for the @see Controls controls 
     * If not set, the canvas will be injected to body. If container is canvas, it will be used instead.
     */
    constructor(container, controlsOptions) {
        if(container === undefined) {
            // Create canvas and append it to body
            this.canvas = document.createElement('canvas');
            document.body.appendChild(this.canvas);
        } else if(container.tagName === 'CANVAS') {
            // Canvas has already been created by the user - use it instead
            this.canvas = container;
        } else {
            this.canvas = document.createElement('canvas');
            container.appendChild(this.canvas);
        }
        
        this.context = this.canvas.getContext('2d');
        
        this.frames = 0;
        this.controls = new Controls(controlsOptions);

        this.currentScene = null;
    }

    /**
     * Executes the game loop
     * @param {Number} timestamp Elapsed game time in ms
     * @returns {void}
     */
    gameLoop(timestamp) {
        let deltaT = timestamp - lastFrameTime;
        lastFrameTime = timestamp;

        if(!this.controls.paused) {
            this.controls.update();
            window.dispatchEvent(events.handleControls);

            this.update(deltaT / 1000);
            this.draw();
        } else if(this.frames % 10 === 0) {
            this.draw();
        }

        this.frames++;
    
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
     * Performs object updates before drawing.
     * @param {Number} dt elapsed time since last frame
     * @returns {void}
     */
    update(dt) {
        if(this.currentScene !== null) {
            this.currentScene.update(dt);
        }
    }

    /**
     * Draws the scene onto the canvas.
     * @returns {void}
     */
    draw() {
        if(this.currentScene !== null) {
            this.currentScene.draw();
        }
    }
}
