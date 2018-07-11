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
        let rotation = options.position || 0.0;

        Object.defineProperties(this, {
            position: {
                enumerable: true,
                value: position,
                writable: true
            },
            rotation: {
                enumerable: true,
                value: rotation,
                writable: true
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

    /**
     * 
     * @param {Number|Vector2} x delta x to move by or a Vector2 instance
     * @param {Number} y delta y to move by (optional if x is Vector2)
     * @returns {void}
     */
    move(x, y) {
        let vec;
        
        if(x instanceof Vector2) {
            vec = x;
        } else {
            vec = new Vector2(x, y);
        }

        this.position = this.position.add(vec);
    }
}
