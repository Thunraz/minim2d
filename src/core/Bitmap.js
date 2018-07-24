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
     * @param {Boolean} fixed (optional) if true, draw bitmap onto screen coordinates
     */
    constructor(src, width, height, scale, numberOfFrames, fixed) {
        super();
        
        this.image = new Image(width, height);
        this.image.src = src;

        this.width  = width;
        this.height = height;
        this.scale  = scale;

        this.numberOfFrames = numberOfFrames || 0;
        this.currentFrame = 0;

        this.fixed = fixed;
    }

    /**
     * Draw the bitmap onto the canvas.
     * @param {CanvasRenderingContext2D} context The 2D rendering context
     * @param {Camera} camera The rendering camera
     * @param {Vector2} position (optional) offset position
     * @param {Vector2} rotation (optional) rotation
     * @returns {void}
     */
    draw(context, camera, position, rotation) {
        position = position || new Vector2(0);
        rotation = rotation || 0;
        
        let drawPosition = this.position.add(position);
        super.draw(context, camera, drawPosition);

        context.save();

        if(this.fixed) {
            context.translate(drawPosition.x * this.scale, drawPosition.y * this.scale);
        } else {
            //console.log('drawing @', camera.position, drawPosition);
            context.translate(
                (drawPosition.x - camera.position.x) * this.scale,
                (drawPosition.y - camera.position.y) * this.scale
            );
        }

        context.rotate(this.rotation + rotation);

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
