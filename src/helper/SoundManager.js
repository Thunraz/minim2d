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
            this.loadSounds();
        } catch(e) {
            console.error('Could not start audio context.');
            throw e;
        }
    }
}