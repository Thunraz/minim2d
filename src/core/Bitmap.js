import { Drawable } from './Drawable';
import { Vector2 } from '../math/Vector2';

export class Bitmap extends Drawable {
    /**
     * Creates a new Bitmap
     * @param {String} src URL to the image
     * @param {Number} width Bitmap width
     * @param {Number} height Bitmap height
     * @param {Number} scale Scale factor
     * @param {Number} numberOfFrames (optional) the number of frames the bitmap has. Default is 0.
     * @param {Boolean} fixed (optional) if true, draw bitmap onto screen coordinates
     */
    constructor(src, width, height, scale, numberOfFrames, fixed) {
        super(width, height);
        
        this.image = new Image(width, height);
        this.image.src = src;

        this.scale = scale;

        this.numberOfFrames = numberOfFrames || 0;
        this.currentFrame = 0;

        this.fixed = fixed;
    }

    /**
     * Draw the bitmap onto the canvas.
     * @param {CanvasRenderingContext2D} context The 2D rendering context
     * @param {Vector2} origin (optional) the origin to draw from
     * @returns {void}
     */
    draw(context, origin) {
        super.draw(context, origin);

        if(!origin) {
            origin = new Vector2(0);
        }

        context.save();

        if(this.fixed) {
            context.translate(origin.x * this.scale, origin.y * this.scale);
        } else {
            // TODO Implement camera
            context.translate(origin.x * this.scale, origin.y * this.scale);
        }

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
