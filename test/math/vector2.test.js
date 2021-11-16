const Minim2D = require('../../build/minim2d.cjs.js');
const each = require('jest-each').default;

test('defaults x and y to 0 when no parameter given', () => {
    const vec = new Minim2D.Vector2();

    expect(vec.x).toBe(0);
    expect(vec.y).toBe(0);
});

test('sets x and y to same given single parameter', () => {
    const value = 42;
    const vec = new Minim2D.Vector2(value);

    expect(vec.x).toBe(value);
    expect(vec.y).toBe(value);
});

test('sets x and y to given parameters', () => {
    const val1 = 42;
    const val2 = 37;
    const vec = new Minim2D.Vector2(val1, val2);

    expect(vec.x).toBe(val1);
    expect(vec.y).toBe(val2);
});

test('adds two vectors correctly', () => {
    const vec1 = new Minim2D.Vector2(3, 8);
    const vec2 = new Minim2D.Vector2(7, 12);

    const expectedX = 10;
    const expectedY = 20;

    const vec3 = vec1.add(vec2);

    expect(vec3.x).toBe(expectedX);
    expect(vec3.y).toBe(expectedY);
});

test('calculates dot product correctly', () => {
    const vec1 = new Minim2D.Vector2(3, 8);
    const vec2 = new Minim2D.Vector2(7, 12);

    const expectedResult = 117;
    expect(vec1.dot(vec2)).toBe(expectedResult);
});

test('calculates cross product correctly', () => {
    const vec1 = new Minim2D.Vector2(3, 8);
    const vec2 = new Minim2D.Vector2(7, 12);

    const expectedResult = -20;
    expect(vec1.cross(vec2)).toBe(expectedResult);
});

describe('scalar multiplication returns correct result vector', () => {
    each([
        [new Minim2D.Vector2(1, 0), 2, 2, 0],
        [new Minim2D.Vector2(0, 1), 2, 0, 2],
        [new Minim2D.Vector2(1.5, 3.5), 3, 4.5, 10.5],
        [new Minim2D.Vector2(7, 14), 7, 49, 98],
        [new Minim2D.Vector2(25, 50), 2, 50, 100],
    ]).test('for %s', (vec, scalar, expectedX, expectedY) => {
        const newVec = vec.multiplyScalar(scalar);

        expect(newVec.x).toBe(expectedX);
        expect(newVec.y).toBe(expectedY);
    });
});

describe('scalar division returns correct result vector', () => {
    each([
        [new Minim2D.Vector2(5, 10), 2.5, 2, 4],
        [new Minim2D.Vector2(10, 5), 2.5, 4, 2],
        [new Minim2D.Vector2(13, 11), 1, 13, 11],
        [new Minim2D.Vector2(7, 14), 7, 1, 2],
        [new Minim2D.Vector2(25, 50), 5, 5, 10],
    ]).test('for %s', (vec, scalar, expectedX, expectedY) => {
        const newVec = vec.divideScalar(scalar);

        expect(newVec.x).toBe(expectedX);
        expect(newVec.y).toBe(expectedY);
    });
});

describe('vector length is correct', () => {
    each([
        [new Minim2D.Vector2(5, 10), 11.18],
        [new Minim2D.Vector2(10, 5), 11.18],
        [new Minim2D.Vector2(1, 0), 1],
        [new Minim2D.Vector2(0, 1), 1],
        [new Minim2D.Vector2(0, 10), 10],
    ]).test('for %s', (vec, expectedResult) => {
        const length = vec.length();
        expect(length).toBeCloseTo(expectedResult);
    });
});

describe('vector is normalized', () => {
    each([
        [new Minim2D.Vector2(10, 0), 1, 0],
        [new Minim2D.Vector2(1, 2), 0.447, 0.892],
        [new Minim2D.Vector2(3, 4), 0.6, 0.8],
        [new Minim2D.Vector2(5, 5), 0.707, 0.707],
        [new Minim2D.Vector2(27, 28), 0.694, 0.719],
    ]).test('for %s', (vec, expectedX, expectedY) => {
        const newVec = vec.normalize();
        expect(newVec.x).toBeCloseTo(expectedX);
        expect(newVec.y).toBeCloseTo(expectedY);
    });
});
