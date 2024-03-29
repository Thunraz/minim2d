import { Vector2 } from '../math/Vector2.js';

const CIRCLE = Math.PI * 2;
let lastID = 0;

export class Object2D {
    /**
     * Creates a new Object2D instance
     * @param {Object} options Options to initialize this instance with
     */
    constructor(options) {
        options = options || { };
        const position    = options.position    || new Vector2();
        const rotation    = options.rotation    || 0.0;
        const origin      = options.origin      || new Vector2();
        const renderFixed = options.renderFixed || false;
        const zIndex      = options.zIndex      || 1;

        Object.defineProperties(this, {
            position: {
                enumerable: true,
                value:      position,
                writable:   true,
            },
            rotation: {
                enumerable: true,
                value:      rotation,
                writable:   true,
            },
            origin: {
                enumerable: true,
                value:      origin,
                writable:   true,
            },
            renderFixed: {
                enumerable: true,
                value:      renderFixed,
                writable:   true,
            },
            zIndex: {
                enumerable: true,
                value:      zIndex,
                writable:   true,
            },
        });

        this.objects = [];
        this.id = lastID;
        lastID += 1;
    }

    /**
     * Adds a new Object2D to the object.
     * @param {Object2D} object The object to add as subobject
     * @returns {void}
     */
    add(object) {
        if (object instanceof Object2D) {
            this.objects.push(object);
            this.objects.sort((a, b) => {
                if (a.zIndex === b.zIndex) {
                    return a.id > b.id;
                }
                return a.zIndex >= b.zIndex;
            });
        } else {
            // eslint-disable-next-line no-console
            console.error('Can\'t add object. Must be an instance or derivative of Object2D.');
        }
    }

    /**
     * Updates this instance.
     * @param {Number} dt Delta time
     * @returns {void}
     */
    update(dt) {
        this.objects.forEach((object) => {
            if (typeof object.update === 'function') {
                object.update(dt);
            }
        });
    }

    translate(context, camera, offset) {
        offset = offset || new Vector2();

        if (this.renderFixed || typeof camera === 'undefined') {
            context.translate(
                this.position.x + offset.x,
                this.position.y + offset.y,
            );
        } else {
            context.translate(
                this.position.x - camera.position.x + offset.x,
                this.position.y - camera.position.y + offset.y,
            );
        }
        
        context.rotate(this.rotation);
    }

    /**
     * Draws this Object2D on the screen
     * @param {CanvasRenderingContext2D} context The 2D rendering context
     * @param {Camera} camera (optional) the camera used to render this object.
     * If not supplied, will render to screen coordinates.
     * @returns {void}
     */
    draw(context, camera) {
        context.save();
        this.translate(context, camera);

        this.objects.forEach((object) => {
            if (typeof object.draw === 'function') {
                // Since we already did the camera translation,
                // we're not passing the camera object again.
                object.draw(context);
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
     * @param {Number|Vector2} x delta x to move by or a Vector2 instance
     * @param {Number} y delta y to move by (optional if x is Vector2)
     * @returns {void}
     */
    move(x, y) {
        let vec;
        
        if (x instanceof Vector2) {
            vec = x;
        } else {
            vec = new Vector2(x, y);
        }

        this.position = this.position.add(vec);
    }
}

export default Object2D;
