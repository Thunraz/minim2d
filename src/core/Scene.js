import { Drawable } from './Drawable';

const _objects = [];

export class Scene {
    /**
     * Initializes the scene
     */
    constructor() {
        
    }

    /**
     * Adds a new Drawable to the scene.
     * @param {Drawable} drawable The drawable to add to the Object
     * @returns {void}
     */
    add(drawable) {
        if(drawable instanceof Drawable) {
            _objects.push(drawable);
        } else {
            console.error('Can\'t add object. Must be an instance or derivative of Drawable.');
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
            if(typeof value.draw === 'function') {
                value.draw();
            }
        });
    }
}
