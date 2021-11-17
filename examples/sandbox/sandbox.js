/* global Minim2D */
/* eslint-disable require-jsdoc */
class Square extends Minim2D.Object2D {
    constructor(orbitSpeed) {
        super();

        this.bitmap1 = new Minim2D.Bitmap('./minim2d_a.png', 32, 32, 1, 1);
        this.bitmap2 = new Minim2D.Bitmap('./minim2d_b.png', 32, 32, 1, 1);
        this.bitmap3 = new Minim2D.Bitmap('./minim2d_c.png', 32, 32, 1, 1);

        this.bitmap2.origin = new Minim2D.Vector2(16, 0);

        this.bitmap2.position.x = 35;
        this.bitmap3.position.x = 35;

        this.bitmap1.add(this.bitmap2);
        this.bitmap2.add(this.bitmap3);

        this.add(this.bitmap1);
        this.timer = 0.0;

        // this.position.x = 150 + Math.cos(this.timer * this.orbitSpeed) * 100;
        // this.position.y = 150 + Math.sin(this.timer * this.orbitSpeed) * 100;

        this.orbitSpeed = orbitSpeed;
    }

    update(dt) {
        super.update(dt);

        this.timer += dt;

        // this.position.x = 150 + Math.cos(this.timer * this.orbitSpeed) * 100;
        // this.position.y = 150 + Math.sin(this.timer * this.orbitSpeed) * 100;

        this.rotation = Math.sin(this.timer * dt * 10) * 10;
    }

    handleControls(states, camera, game, dt) {
        if (states.rotCCW && !states.rotCW) {
            this.rotation -= dt;
        } else if (states.rotCW && !states.rotCCW) {
            this.rotation += dt;
        }
    }
}

const BUTTON_TIMEOUT = 0.25;
const CAMERA_PAN_AMT = 2;
let recorder;

function handleControls(states, camera, game, dt) {
    if (states.record && states.buttonTimeout <= 0.0 && recorder) {
        states.resetButtonTimeout(BUTTON_TIMEOUT);
        recorder.toggleRecording();
    }

    if (states.screenshot && states.buttonTimeout <= 0.0) {
        states.resetButtonTimeout(BUTTON_TIMEOUT);
        recorder.takeScreenshot();
    }

    if (states.up && !states.down) {
        camera.position.y -= CAMERA_PAN_AMT;
    } else if (states.down && !states.up) {
        camera.position.y += CAMERA_PAN_AMT;
    }

    if (states.left && !states.right) {
        camera.position.x -= CAMERA_PAN_AMT;
    } else if (states.right && !states.left) {
        camera.position.x += CAMERA_PAN_AMT;
    }

    if (states.blip && states.buttonTimeout <= 0.0) {
        states.resetButtonTimeout(BUTTON_TIMEOUT);
        game.soundManager.play('blip');
    }
}


(function init() {
    const customKeyCodes = {
        KeyX: 'blip',
        KeyP: 'record',
        KeyQ: 'rotCCW',
        KeyE: 'rotCW',
        KeyT: 'screenshot'
    };

    const camera = new Minim2D.Camera();
    const game = new Minim2D.Game(camera, document.getElementById('g'), { customKeyCodes, buttonTimeout: BUTTON_TIMEOUT });
    const scene = new Minim2D.Scene();

    const soundManager = new Minim2D.SoundManager(game);
    soundManager.loadSound('./assets/blip.wav', 'blip');
    game.soundManager = soundManager;

    game.setScene(scene);
    game.gameLoop();

    recorder = new Minim2D.Recorder(game.canvas);

    window.addEventListener('handleControls', (e) => handleControls(e.detail.states, camera, game, e.detail.deltaT), false);

    const square = new Square(1.0);
    square.position.x = 150;
    square.position.y = 150;
    scene.add(square);
}());
