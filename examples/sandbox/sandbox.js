/* global Minim2D */
/* eslint-disable require-jsdoc */
class Square extends Minim2D.Object2D {
    constructor() {
        super();

        this.bitmap = new Minim2D.Bitmap(
            './minim2d.png',
            32,
            32,
            1,
            1
        );
        //this.bitmap.position.x = 20;

        this.add(this.bitmap);
        this.timer = 0.0;
        
        this.position.x = 150 +  Math.cos(this.timer) * 100;
        this.position.y = 150 +  Math.sin(this.timer) * 100;
    }

    update(dt) {
        super.update(dt);

        this.timer += dt;

        this.position.x = 150 +  Math.cos(this.timer) * 100;
        this.position.y = 150 +  Math.sin(this.timer) * 100;

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
let recorder;

function handleControls(states) {
    if(states.record && states.buttonTimeout <= 0.0 && recorder) {
        states.resetButtonTimeout(BUTTON_TIMEOUT);
        recorder.toggleRecording();
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

    window.addEventListener('handleControls', (e) => handleControls(e.detail), false);

    let square = new Square();
    scene.add(square);
})();