import { Vector2 } from '../math/Vector2';

const CIRCLE = Math.PI * 2;

export class Object2D {
    /**
     * Creates a new Object2D instance
     * @param {Object} options Options to initialize this instance with
     */
    constructor(options) {
        options = options || { };
        let position = options.position || new Vector2();
        let rotation = options.rotation || 0.0;

        Object.defineProperties(this, {
            position: {
                enumerable: true,
                value: position
            },
            rotation: {
                enumerable: true,
                value: rotation
            }
        });
    }

    /**
     * Rotates the object by an angle
     * @param {Number} angle the angle in degrees
     * @returns {void}
     */
    rotate(angle) {
        this.rotation = (this.rotation + angle) % CIRCLE;
    }
}
