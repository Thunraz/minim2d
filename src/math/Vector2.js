export class Vector2 {
    /**
     * Initializes the vector
     * @param {Number} x (optional) the x coordinate. Default is 0.
     * @param {Number} y (optional) the y coordinate. Default is 0.
     */
    constructor(x, y) {
        if(x === undefined) {
            this.x = 0;
            this.y = 0;
        } else {
            this.x = x;
            
            if(y === undefined) {
                this.y = x;
            } else {
                this.y = y;
            }
        }
    }

    /**
     * Calculates the dot product.
     * @param {Vector2} v another Vector2
     * @returns {Number} dot product result
     */
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }

    /**
     * Calculates the cross product.
     * @param {Vector2} v another Vector2
     * @returns {Number} cross product result
     */
    cross(v) {
        return this.x * v.y - v.x * this.y;
    }

    /**
     * Returns a new Vector2 multiplied by the scalar.
     * @param {Number} s The scalar to multiply the vector by.
     * @returns {Vector2} A new Vector2 that has been multiplied by the scalar.
     */
    multiplyScalar(s) {
        return new Vector2(this.x * s, this.y * s);
    }

    /**
     * Calculates the vector's length.
     * @returns {Number} The vector's length.
     */
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    /**
     * Returns a new Vector2 divided by the scalar.
     * @param {Number} s The scalar to divide the vector by.
     * @returns {Vector2} A new Vector2 that has been divided by the scalar.
     */
    divideScalar(s) {
        return new Vector2(this.x / s, this.y / s);
    }

    /**
     * Returns a new normalized Vector2.
     * @returns {Vector2} A new normalized Vector2.
     */
    normalize() {
        return this.divideScalar(this.length() || 1);
    }
}
