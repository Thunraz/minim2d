import { Vector2 } from '../math/Vector2';

const CIRCLE = Math.PI * 2;

export class Object2D {
    /**
     * 
     */
    constructor() {
        let position = new Vector2();
        let rotation = 0.0;

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
