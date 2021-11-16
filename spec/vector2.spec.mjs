import { Vector2 } from '../src/math/Vector2.js';

describe('Vector2', () => {
    it('defaults x and y to 0 when no parameter given', () => {
        const vec = new Vector2();

        expect(vec.x).toBe(0);
        expect(vec.y).toBe(0);
    });

    it('sets x and y to same given single parameter', () => {
        const value = 42;
        const vec = new Vector2(value);

        expect(vec.x).toBe(value);
        expect(vec.y).toBe(value);
    });

    it('sets x and y to given parameters', () => {
        const val1 = 42;
        const val2 = 37;
        const vec = new Vector2(val1, val2);

        expect(vec.x).toBe(val1);
        expect(vec.y).toBe(val2);
    });

    it('adds two vectors correctly', () => {
        const vec1 = new Vector2(3, 8);
        const vec2 = new Vector2(7, 12);

        const expectedX = 10;
        const expectedY = 20;

        const vec3 = vec1.add(vec2);

        expect(vec3.x).toBe(expectedX);
        expect(vec3.y).toBe(expectedY);
    });
});
