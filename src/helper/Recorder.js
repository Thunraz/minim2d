export class Recorder {
    /**
     * Initializes the recorder.
     * @param {HTMLElement} canvas The reference to the canvas HTML element
     * @param {String} filename (optional) the output filename (including extension '.webm')
     * @param {Number} bitsPerSecond (optional) bit rate of the resulting video,
     *      default is 4000000 (4000 kBit)
     */
    constructor(canvas, filename, bitsPerSecond) {
        if (!canvas || !(canvas instanceof HTMLElement)) {
            throw new Error('Parameter canvas has not been supplied is of the wrong type.');
        }
        this.canvas        = canvas;
        this.filename      = filename      || 'output.webm';
        this.bitsPerSecond = bitsPerSecond || null;
        this.isRecording   = false;
    }

    /**
     * Checks browser for best video type support
     * @returns {Object} Best mime type possible along with a bitrate
     */
    // eslint-disable-next-line class-methods-use-this
    determineBestType() {
        const bitrate = 18e6;
        const codecs = [
            { mime: 'video/webm;codecs=vp8,vp9,opus', bitrate },
            { mime: 'video/webm;codecs=vp9,opus', bitrate },
            { mime: 'video/webm;codecs=VP8,OPUS', bitrate },
            { mime: 'video/webm;codecs=vp8,pcm', bitrate },
            { mime: 'video/webm;codecs=vp8,opus', bitrate },
            { mime: 'video/webm;codecs=vp9.0', bitrate },
            { mime: 'video/webm;codecs=vp8.0', bitrate },
            { mime: 'video/webm;codecs=vp9', bitrate },
            { mime: 'video/webm;codecs=vp8', bitrate },
            { mime: 'video/webm', bitrate },
        ];

        for (let i = 0; i < codecs.length; i++) {
            if (MediaRecorder.isTypeSupported(codecs[i].mime)) {
                // eslint-disable-next-line
                console.log(`Recorder: Using MIME type ${codecs[i].mime} with bitrate ${codecs[i].bitrate / 1e6} MBit/s`);
                return codecs[i];
            }
        }

        // Let browser choose
        return 'video/webm';
    }

    /**
     * Start/stop recording.
     * @returns {void}
     */
    toggleRecording() {
        if (!this.isRecording) {
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
        if (this.isRecording) {
            throw new Error('Already recording! Can\'t start recording.');
        }

        /* eslint-disable-next-line */
        console.log('Starting to record');

        if (!this.mimeType) {
            const mimeType = this.determineBestType();
            this.mimeType = mimeType.mime;
            this.bitsPerSecond = this.bitsPerSecond || mimeType.bitrate;
        }

        this.stream = this.canvas.captureStream();
        this.recordedBlobs = [];

        const options = {
            mimeType:           this.mimeType,
            videoBitsPerSecond: this.bitsPerSecond,
        };

        try {
            this.mediaRecorder = new MediaRecorder(this.stream, options);

            this.mediaRecorder.ondataavailable = (event) => {
                if (event.data && event.data.size > 0) {
                    this.recordedBlobs.push(event.data);
                }
            };
            // Start recording in 100 ms blocks
            this.mediaRecorder.start(100);
            this.isRecording = true;
        } catch (e) {
            // eslint-disable-next-line no-console
            console.warn('Unable to create MediaRecorder with options Object: ', e);
        }
    }

    /**
     * Stops the current recording
     * @returns {void}
     */
    stopRecording() {
        if (!this.isRecording) {
            throw new Error('Can\'t stop recording, no recording running right now.');
        }

        /* eslint-disable-next-line */
        console.log('Stopping to record');
        this.mediaRecorder.stop();
        this.isRecording = false;

        const blob = new Blob(this.recordedBlobs, { type: this.mimeType });
        const url  = window.URL.createObjectURL(blob);
        
        // Create anchor to download the file
        const anchor         = document.createElement('a');
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

export default Recorder;
