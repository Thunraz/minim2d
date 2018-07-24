import { Object2D } from '../core/Object2D';

const _objects = [];

export class Scene {
    /**
     * Initializes the scene
     */
    constructor() {
        
    }

    /**
     * Adds a new Object2D to the scene.
     * @param {Object2D} object The drawable to add to the Object
     * @returns {void}
     */
    add(object) {
        if(object instanceof Object2D) {
            _objects.push(object);
        } else {
            console.error('Can\'t add object. Must be an instance or derivative of Object2D.');
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
     * Renders the scene onto the canvas.
     * @param {CanvasRenderingContext2D} context The 2D rendering context
     * @param {Camera} camera The camera used to render the scene
     * @returns {void}
     */
    render(context, camera) {
        _objects.forEach((object) => {
            if(object instanceof Object2D) {
                camera.render(context, object);
            }
        });
    }
}
