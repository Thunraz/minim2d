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
        let origin   = options.origin   || new Vector2();
        let fixed    = options.fixed    || false;

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
            },
            origin: {
                enumerable: true,
                value: origin,
                writable: true
            },
            fixed: {
                enumerable: true,
                value: fixed,
                writable: true
            }
        });

        this.objects = [];
    }

    /**
     * Adds a new Object2D to the object.
     * @param {Object2D} object The object to add as subobject
     * @returns {void}
     */
    add(object) {
        if(object instanceof Object2D) {
            this.objects.push(object);
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
        this.objects.forEach((value) => {
            if(typeof value.update === 'function') {
                value.update(dt);
            }
        });
    }

    /**
     * Draws this Object2D on the screen
     * @param {CanvasRenderingContext2D} context The 2D rendering context
     * @param {Camera} camera the camera used to render this object
     * @param {Vector2} position (optional) offset position
     * @param {Vector2} rotation (optional) rotation
     * @returns {void}
     */
    draw(context, camera) {
        context.save();

        context.translate(
            (this.position.x - camera.position.x),
            (this.position.y - camera.position.y)
        );

        context.rotate(this.rotation);

        this.objects.forEach((obj) => {
            if(typeof obj.draw === 'function') {
                obj.draw(context, camera);
            }
        });

        context.restore();
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
