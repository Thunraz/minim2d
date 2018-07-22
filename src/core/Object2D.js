import { Drawable } from './Drawable';
import { Vector2 } from '../math/Vector2';

const CIRCLE = Math.PI * 2;
const _objects = [ ];

export class Object2D extends Drawable {
    /**
     * Creates a new Object2D instance
     * @param {Object} options Options to initialize this instance with
     */
    constructor(options) {
        super();

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
     * Adds a new Drawable to the object.
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
     * Updates this instance.
     * @param {Number} dt Delta time
     * @returns {void}
     */
    update(dt) {
        _objects.forEach((value) => {
            if(typeof value.update === 'function') {
                value.update(dt);
            }
        });
    }

    /**
     * Draws this Object2D on the screen
     * @param {Vector2} origin (optional) the origin to draw from
     * @returns {void}
     */
    draw(origin) {
        super.draw();

        if(!origin) {
            origin = new Vector2(0);
        }

        _objects.forEach((obj) => {
            if(typeof obj.draw === 'function') {
                obj.draw(origin + this.position);
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
