/* global Minim2D */
/* eslint-disable require-jsdoc */
class Square extends Minim2D.Object2D {
    constructor(url, orbitSpeed) {
        super();

        this.bitmap = new Minim2D.Bitmap(url, 32, 32, 1, 1);

        this.add(this.bitmap);
        this.timer = 0.0;
        
        // this.position.x = 150 +  Math.cos(this.timer) * 100;
        // this.position.y = 150 +  Math.sin(this.timer) * 100;

        this.orbitSpeed = orbitSpeed;
    }

    update(dt) {
        super.update(dt);

        this.timer += dt;

        // this.position.x = 150 +  Math.cos(this.timer * this.orbitSpeed) * 100;
        // this.position.y = 150 +  Math.sin(this.timer * this.orbitSpeed) * 100;

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

    // square1.handleControls(states, camera, game, dt);
}


(function init() {
    const customKeyCodes = {
        80:   'record',
        88:   'blip',
        KeyQ: 'rotCCW',
        KeyE: 'rotCW',
    };

    const camera = new Minim2D.Camera();
    const game   = new Minim2D.Game(camera, document.getElementById('g'), { customKeyCodes, buttonTimeout: BUTTON_TIMEOUT });
    const scene  = new Minim2D.Scene();

    const soundManager = new Minim2D.SoundManager(game);
    soundManager.loadSound('./assets/blip.wav', 'blip');
    game.soundManager = soundManager;

    game.setScene(scene);
    game.gameLoop();

    recorder = new Minim2D.Recorder(game.canvas);

    window.addEventListener('handleControls', (e) => handleControls(e.detail.states, camera, game, e.detail.deltaT), false);
    
    const square1 = new Square('./minim2d_a.png', 1.0);
    square1.position.x = 150;
    square1.position.y = 150;
    scene.add(square1);

    const square2 = new Square('./minim2d_b.png', 2.0);
    square2.position.x = 40;
    square1.add(square2);
    // scene.add(square2);

    const square3 = new Square('./minim2d_c.png', 3.0);
    square3.position.x = 40;
    square2.add(square3);

    const square4 = new Square('./minim2d_a.png', 3.0);
    square4.position.x = 60;
    square2.add(square4);
}());
