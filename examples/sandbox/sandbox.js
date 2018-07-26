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

class Recorder {
    constructor(canvas) {
        this.canvas = canvas;
        this.isRecording = false;
    }

    toggleRecording() {
        this.isRecording = !this.isRecording;

        if(this.isRecording) {
            /* eslint-disable-next-line */
            console.log('Starting to record');
            this.stream = this.canvas.captureStream();
            this.recordedBlobs = [];

            let options = { mimeType: 'video/webm', videoBitsPerSecond: 4000e3 };
            try {
                this.mediaRecorder = new MediaRecorder(this.stream, options);

                this.mediaRecorder.ondataavailable = (event) => {
                    if (event.data && event.data.size > 0) {
                        this.recordedBlobs.push(event.data);
                    }
                };
                this.mediaRecorder.start(100); // collect 100ms of data
            } catch(e) {
                console.warn('Unable to create MediaRecorder with options Object: ', e);
            }
        } else {
            /* eslint-disable-next-line */
            console.log('Stopping to record');
            this.mediaRecorder.stop();
            let blob = new Blob(this.recordedBlobs, { type: 'video/webm' });
            let url  = window.URL.createObjectURL(blob);
            let a    = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'output.webm';
            document.body.appendChild(a);
            a.click();
            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 100);
        }
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
    game.setScene(scene);
    game.gameLoop();

    recorder = new Recorder(game.canvas);

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
    square3.fixed = true;
    scene.add(square4);
})();