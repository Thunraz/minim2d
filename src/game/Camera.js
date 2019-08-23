import { Vector2 } from '../math/Vector2';

export class Camera {
    /**
     * Initializes the camera
     * @param {Vector2} position (optional) the camera's inital position
     */
    constructor(position) {
        this.position = position || new Vector2();
    }

    /**
     * @param {CanvasRenderingContext2D} context The 2D rendering context
     * @param {Object2D} object The object to render
     * @returns {void}
     */
    render(context, object) {
        object.draw(context, this);
    }
}

export default Camera;
