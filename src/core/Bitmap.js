import { Object2D } from './Object2D';
import { Vector2 } from '../math/Vector2';

export class Bitmap extends Object2D {
    /**
     * Creates a new Bitmap
     * @param {String}  src URL to the image
     * @param {Number}  width Bitmap width
     * @param {Number}  height Bitmap height
     * @param {Number}  scale Scale factor
     * @param {Number}  numberOfFrames (optional) the number of frames the bitmap has. Default is 0.
     */
    constructor(src, width, height, scale, numberOfFrames) {
        super();
        
        this.image = new Image(width, height);
        this.image.src = src;

        this.width  = width;
        this.height = height;
        this.scale  = scale;

        this.numberOfFrames = numberOfFrames || 0;
        this.currentFrame = 0;
    }

    /**
     * Draw the bitmap onto the canvas.
     * @param {CanvasRenderingContext2D} context The 2D rendering context
     * @param {Camera} camera The rendering camera
     * @param {Vector2} position (optional) offset position
     * @param {Vector2} rotation (optional) rotation
     * @returns {void}
     */
    draw(context, camera) {
        context.save();

        if(this.fixed) {
            context.translate(
                this.position.x * this.scale,
                this.position.y * this.scale
            );
        } else {
            context.translate(
                (this.position.x - camera.position.x) * this.scale,
                (this.position.y - camera.position.y) * this.scale
            );
        }

        context.rotate(this.rotation);

        context.drawImage(
            this.image,
            this.currentFrame * this.width,
            0,
            this.width,
            this.height,
            -this.width / 2 * this.scale,
            -this.height / 2 * this.scale,
            this.width * this.scale,
            this.height * this.scale
        );

        context.restore();
    }
}
