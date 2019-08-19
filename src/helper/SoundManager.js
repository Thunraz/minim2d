import { Game  } from '../game/Game';
import { Sound } from './Sound';

export class SoundManager {
    /**
     * @param {Game} game the game instance
     */
    constructor(game) {
        if (!game || !(game instanceof Game)) {
            throw new Error('Parameter \'game\' has not been passed or is not an instance of Game');
        }

        this.game   = game;
        this.sounds = [];

        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioContext = new AudioContext();
        } catch (e) {
            // eslint-disable-next-line no-console
            console.error('Could not start audio context.');
            throw e;
        }

        // We need to resume the audio context, thanks to the Chrome Web Audio autoplay policy
        window.addEventListener('firstUnpaused', () => { this.audioContext.resume(); }, false);
    }

    /**
     * @param {String} url the url to the sound file
     * @param {String} name the name to give the file
     * @returns {void}
     */
    async loadSound(url, name) {
        if (!url) {
            throw new Error('Parameter url has to be provided!');
        }

        if (!name) {
            throw new Error('Parameter name has to be provided!');
        }

        const scope = this;
        const audioData = await fetch(url)
            .then((response) => response.arrayBuffer())
            .then(async (arrayBuffer) => scope.audioContext.decodeAudioData(arrayBuffer));
            
        for (let i = 0; i < this.sounds.length; i++) {
            if (this.sounds[i].name === name) {
                // eslint-disable-next-line no-console
                console.warn(`Sound '${name}' has already been loaded. Canceling load...`);
                return;
            }
        }
        this.sounds.push(new Sound(name, audioData));
    }

    /**
     * Plays a specified sound.
     * @param {String} name the name of the sound
     * @returns {void}
     */
    play(name) {
        if (!name) {
            throw new Error('Parameter name has to be provided!');
        }

        let sound;
        for (let i = 0; i < this.sounds.length; i++) {
            if (this.sounds[i].name === name) {
                sound = this.sounds[i];
            }
        }
        if (!sound) {
            throw new Error(`Could not find sound '${name}'!`);
        }

        const source = this.audioContext.createBufferSource();
        source.buffer = sound.buffer;
        source.connect(this.audioContext.destination);
        source.start(0);
    }
}

export default SoundManager;
