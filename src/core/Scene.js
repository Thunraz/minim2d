import { Object2D } from './Object2D';

const _objects = [];

export class Scene {
    /**
     * Initializes the scene
     */
    constructor() {
        
    }

    /**
     * Adds a new Object2D to the scene.
     * @param {Object2D} obj yo
     * @returns {void}
     */
    add(obj) {
        if(obj instanceof Object2D) {
            _objects.push(obj);
        } else {
            /* eslint-disable-next-line */
            console.error.log('Can\'t add object. Must be an instance or derivative of Object2D.');
        }
    }

    /**
     * Performs object updates before drawing.
     * @param {Number} dt elapsed time since last frame
     * @returns {void}
     */
    update(dt) {
        _objects.forEach((value) => {
            value.update(dt);
        });
    }

    /**
     * Draws the scene onto the canvas.
     * @returns {void}
     */
    draw() {
        _objects.forEach((value) => {
            value.draw();
        });
    }
}
