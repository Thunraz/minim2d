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
        _objects.push(obj);
    }
}
