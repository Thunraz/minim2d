/* global Minim2D */
/* eslint-disable require-jsdoc */
class Square extends Minim2D.Object2D {
    constructor(url, orbitSpeed) {
        super();

        this.bitmap = new Minim2D.Bitmap(url, 32, 32, 1, 1);

        this.add(this.bitmap);
        this.timer = 0.0;
        
        this.position.x = 150 +  Math.cos(this.timer) * 100;
        this.position.y = 150 +  Math.sin(this.timer) * 100;

        this.orbitSpeed = orbitSpeed;
    }

    update(dt) {
        super.update(dt);

        this.timer += dt;

        this.position.x = 150 +  Math.cos(this.timer * this.orbitSpeed) * 100;
        this.position.y = 150 +  Math.sin(this.timer * this.orbitSpeed) * 100;

        this.rotation = Math.sin(this.timer * dt * 100) * 10;
    }
}

const BUTTON_TIMEOUT = 0.25;
const CAMERA_PAN_AMT = 2;
let recorder;

function handleControls(states, camera) {
    if(states.record && states.buttonTimeout <= 0.0 && recorder) {
        states.resetButtonTimeout(BUTTON_TIMEOUT);
        recorder.toggleRecording();
    }

    if(states.up && !states.down) {
        camera.position.y -= CAMERA_PAN_AMT;
    } else if(states.down && !states.up) {
        camera.position.y += CAMERA_PAN_AMT;
    }

    if(states.left && !states.right) {
        camera.position.x -= CAMERA_PAN_AMT;
    } else if(states.right && !states.left) {
        camera.position.x += CAMERA_PAN_AMT;
    }
}


(function() {
    let customKeyCodes = {
        80: 'record'
    };
    let camera = new Minim2D.Camera();
    let game   = new Minim2D.Game(camera, document.getElementById('g'), { customKeyCodes, buttonTimeout: BUTTON_TIMEOUT });
    let scene  = new Minim2D.Scene();

    let soundManager = new Minim2D.SoundManager(game);
    soundManager.loadSound('./assets/blip.wav', 'blip');

    game.setScene(scene);
    game.gameLoop();

    recorder = new Minim2D.Recorder(game.canvas);

    window.addEventListener('handleControls', (e) => handleControls(e.detail, camera), false);

    let square1 = new Square('./minim2d_a.png', 1.0);
    scene.add(square1);

    let square2 = new Square('./minim2d_a.png', 2.0);
    scene.add(square2);

    let square3 = new Square('./minim2d_a.png', 3.0);
    square3.zIndex = -1;
    square3.bitmap.position.x = 20;
    scene.add(square3);

    let square4 = new Square('./minim2d_b.png', 0);
    square4.renderFixed = true;
    scene.add(square4);
})();