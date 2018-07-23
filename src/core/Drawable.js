import { Vector2 } from '../math/Vector2';

export class Drawable {
    /**
     * Dummy draw function. Should be implemented in child classes.
     * @param {Vector2} origin (optional) the origin to draw from
     * @returns {void}
     */
    draw(origin) {
        if(!origin) {
            origin = new Vector2(0);
        }
    }
}