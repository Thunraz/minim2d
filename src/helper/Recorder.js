export class Recorder {
    /**
     * Initializes the recorder.
     * @param {HTMLElement} canvas The reference to the canvas HTML element
     * @param {String} filename (optional) the output filename (including extension '.webm')
     * @param {Number} bitsPerSecond (optional) bit rate of the resulting video, default is 4000000 (4000 kBit)
     */
    constructor(canvas, filename, bitsPerSecond) {
        if(!canvas || !(canvas instanceof HTMLElement)) {
            throw new Error('Parameter canvas has not been supplied is of the wrong type.');
        }
        this.canvas        = canvas;
        this.filename      = filename      || 'output.webm';
        this.bitsPerSecond = bitsPerSecond || 4000e3;
        this.isRecording   = false;
    }

    /**
     * Start/stop recording.
     * @returns {void}
     */
    toggleRecording() {
        if(!this.isRecording) {
            this.startRecording();
        } else {
            this.stopRecording();
        }
    }

    /**
     * Starts a new recording
     * @returns {void}
     */
    startRecording() {
        if(this.isRecording) {
            throw new Error('Already recording! Can\'t start recording.');
        }

        /* eslint-disable-next-line */
        console.log('Starting to record');
        this.stream = this.canvas.captureStream();
        this.recordedBlobs = [];

        let options = { mimeType: 'video/webm', videoBitsPerSecond: this.bitsPerSecond };
        try {
            this.mediaRecorder = new MediaRecorder(this.stream, options);

            this.mediaRecorder.ondataavailable = (event) => {
                if (event.data && event.data.size > 0) {
                    this.recordedBlobs.push(event.data);
                }
            };
            this.mediaRecorder.start();
            this.isRecording = true;
        } catch(e) {
            console.warn('Unable to create MediaRecorder with options Object: ', e);
        }
    }

    /**
     * Stops the current recording
     * @returns {void}
     */
    stopRecording() {
        if(!this.isRecording) {
            throw new Error('Can\'t stop recording, no recording running right now.');
        }

        /* eslint-disable-next-line */
        console.log('Stopping to record');
        this.mediaRecorder.stop();
        this.isRecording = false;

        let blob = new Blob(this.recordedBlobs, { type: 'video/webm' });
        let url  = window.URL.createObjectURL(blob);
        
        // Create anchor to download the file
        let anchor           = document.createElement('a');
        anchor.style.display = 'none';
        anchor.href          = url;
        anchor.download      = this.filename;
        document.body.appendChild(anchor);
        anchor.click();
        
        // Remove anchor again after a small timeout
        setTimeout(() => {
            document.body.removeChild(anchor);
            window.URL.revokeObjectURL(url);
        }, 100);
    }
}