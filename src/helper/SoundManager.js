import { Game } from '../game/Game';

export class SoundManager {
    /**
     * 
     * @param {Game} game the game instance
     */
    constructor(game) {
        if(!game || !(game instanceof Game)) {
            throw new Error('Parameter \'game\' has not been passed or is not an instance of Game');
        }

        this.game = game;

        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioContext = new AudioContext();
        } catch(e) {
            console.error('Could not start audio context.');
            throw e;
        }
    }

    /**
     * 
     * @param {String} url the url to the sound file
     * @returns {void}
     */
    loadSound(url) {
        if(!url) {
            throw new Error('Parameter url has to be provided!');
        }

        let source = this.audioContext.createBufferSource();

        fetch(url)
            .then(
                (response) => { return response.arrayBuffer(); },
                (reason)   => { throw reason; }
            )
            .then((buffer) => {
                this.audioContext.decodeAudioData(buffer, (decodedData) => {
                    source.buffer = decodedData;
                    source.connect(this.audioContext.destination);

                    return source;
                });
            });

        return source;
    }
}