import { Object2D } from './Object2D';

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
     * @param {Camera} camera (optional) the camera used to render this object.
     * If not supplied, will render to screen coordinates.
     * @returns {void}
     */
    draw(context, camera) {
        super.draw(context, camera);

        context.save();
        this.translate(context, camera);

        context.drawImage(
            this.image,
            this.currentFrame * this.width,
            0,
            this.width,
            this.height,
            (-this.width  / 2) * this.scale + this.origin.x,
            (-this.height / 2) * this.scale + this.origin.y,
            this.width * this.scale,
            this.height * this.scale,
        );

        context.restore();
    }
}

export default Bitmap;
