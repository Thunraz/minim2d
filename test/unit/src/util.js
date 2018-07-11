export class Random {
    /**
     * Creates a pseudo-random value generator. The seed must be an integer.
     *
     * Uses an optimized version of the Park-Miller PRNG.
     * http://www.firstpr.com.au/dsp/rand31/
     * @param {Number} seed The PRNG's seed
    */
    constructor(seed) {
        this._seed = seed % 2147483647;
        if (this._seed <= 0) this._seed += 2147483646;
    }
  
    /**
    * @returns {Number} a pseudo-random value between 1 and 2^32 - 2.
    */
    next() {
        return this._seed = this._seed * 16807 % 2147483647;
    }
  
  
    /**
    * @returns {Number} a pseudo-random floating point number in range [0, 1).
    */
    nextFloat() {
        // We know that result of next() will be 1 to 2147483646 (inclusive).
        return (this.next() - 1) / 2147483646;
    }

    /**
     * @param {Number} min (optional) lower boundary
     * @param {Number} max (optional) upper boundary
     * @returns {Number} a pseudo-random integer in the given range
     */
    nextInt(min, max) {
        return Math.floor(this.nextFloat() * (max - min) + min);
    }
};
