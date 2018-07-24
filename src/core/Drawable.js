export class Drawable {
    /**
     * @param {Number} width Drawable width
     * @param {Number} height Drawable height
     */
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    /* eslint-disable no-unused-vars */
    /**
     * Dummy draw function. Should be implemented in child classes.
     * @param {CanvasRenderingContext2D} context The 2D rendering context
     * @param {Vector2} origin (optional) the origin to draw from
     * @returns {void}
     */
    draw(context, origin) { }
}