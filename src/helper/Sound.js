export class Sound {
    /**
     * @param {String} name The sound's name, used for referencing, must be unique.
     * @param {AudioBufferSourceNode} buffer The sound data
     */
    constructor(name, buffer) {
        this.name   = name;
        this.buffer = buffer;
    }
}

export default Sound;
