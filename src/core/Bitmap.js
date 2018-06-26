export class Bitmap{
    /**
     * Creates a new Bitmap
     * @param {String} src URL to the image
     * @param {Number} width Bitmap width
     * @param {Number} height Bitmap height
     * @param {Number} numberOfFrames (optional) the number of frames the bitmap has. Default is 0.
     */
    constructor(src, width, height, numberOfFrames) {
        this.image = new Image(width, height);
        this.image.src = src;

        this.numberOfFrames = numberOfFrames || 0;
        this.currentFrame = 0;
    }
}