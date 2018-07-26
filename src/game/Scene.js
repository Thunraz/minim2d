import { Object2D } from '../core/Object2D';

export class Scene {
    /**
     * Initializes the scene
     */
    constructor() {
        this.objects = [];
    }

    /**
     * Adds a new Object2D to the scene.
     * @param {Object2D} object The drawable to add to the Object
     * @returns {void}
     */
    add(object) {
        if(object instanceof Object2D) {
            this.objects.push(object);
            this.objects.sort((a, b) => {
                if(a.zIndex === b.zIndex) {
                    return a.id > b.id;
                }
                return a.zIndex >= b.zIndex;
            });
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
        this.objects.forEach((object) => {
            object.update(dt);
        });
    }

    /**
     * Renders the scene onto the canvas.
     * @param {CanvasRenderingContext2D} context The 2D rendering context
     * @param {Camera} camera The camera used to render the scene
     * @returns {void}
     */
    render(context, camera) {
        this.objects.forEach((object) => {
            if(object instanceof Object2D) {
                camera.render(context, object);
            }
        });
    }
}
