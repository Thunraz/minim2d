export class Controls {
    /**
     * Initializes the controls.
     * @param {Object} options Valid options:
     * * customKeyCodes: custom key codes to add to the keyCodes object
     * * customStates:   custom states to add to the states object
     */
    constructor(options) {
        this.paused = true;

        this.firstUnpaused = true;

        // Make sure we have some default options
        const customKeyCodes = options.customKeyCodes || { };
        const customStates   = options.customStates   || { };
        const buttonTimeout  = options.buttonTimeout  || 0.25;

        // Add a couple of event listeners
        document.addEventListener('pointerlockchange', () => { this.onPointerLockChange(); }, false);
        document.addEventListener('pointerlockerror',  () => { this.onPointerLockError();  }, false);
        document.addEventListener('mousemove',        (e) => { this.onMouseMove(e);        }, false);
        document.addEventListener('click',            (e) => { this.onMouseClick(e);       }, false);
        document.addEventListener('mouseup',          (e) => { this.onMouseUp(e);          }, false);
        document.addEventListener('mousedown',        (e) => { this.onMouseDown(e);        }, false);
        document.addEventListener('wheel',            (e) => { this.onMouseWheel(e);       }, false);
        document.addEventListener('keydown',          (e) => { this.onKeyDown(e);          }, false);
        document.addEventListener('keyup',            (e) => { this.onKeyUp(e);            }, false);

        // TODO: handle game pads

        this.noticeContainer = document.getElementById('notice-container');
        this.blocker         = document.getElementById('blocker');
        this.element         = document.body;

        this.element.addEventListener('click', () => {
            this.element.requestPointerLock();
        }, false);

        // Define keyboard keys
        const keyCodes = {
            // Support the new UI Events API
            KeyW: 'up',
            KeyA: 'left',
            KeyS: 'down',
            KeyD: 'right',
        };
        this.keyCodes = Object.assign(keyCodes, customKeyCodes);

        const states = {
            // Mouse
            leftMouseJustClicked: false,
            leftMouseJustUp:      false,
            leftMouseJustDown:    false,
            leftMouseUp:          true,
            leftMouseDown:        false,

            // Keyboard
            up:                 false,
            down:               false,
            left:               false,
            right:              false,
            deltaX:             0.0,
            deltaY:             0.0,
            scrollX:            0.0,
            scrollY:            0.0,
            scrollZ:            0.0,
            buttonTimeout,
            resetButtonTimeout: this.resetButtonTimeout,
        };
        this.states = Object.assign(states, customStates);
    }

    /**
     * Resets the button timeout
     * @param {Number} maxButtonTimeout The value to reset the timeout to.
     * @returns {void}
     */
    resetButtonTimeout(maxButtonTimeout) {
        this.buttonTimeout += maxButtonTimeout;
    }

    /**
     * Callback when point lock changes
     * @returns {void}
     */
    onPointerLockChange() {
        if (document.pointerLockElement === this.element) {
            this.paused = false;

            this.blocker.style.display = 'none';
            if (this.firstUnpaused) {
                this.firstUnpaused = false;
                window.dispatchEvent(new CustomEvent('firstUnpaused'));
            }
        } else {
            this.paused = true;

            this.blocker.style.display = 'block';
            this.noticeContainer.style.display = '';
        }
    }

    /**
     * Callback when an error during pointer locking occurred
     * @returns {void}
     */
    onPointerLockError() {
        this.noticeContainer.style.display = '';
    }

    /**
     * Update controls
     * @param {Number} dt elapsed time since last frame
     * @returns {void}
     */
    update(dt) {
        this.states.leftMouseJustClicked = false;
        this.states.leftMouseJustUp      = false;
        this.states.leftMouseJustDown    = false;
        this.states.leftMouseUp          = true;
        this.states.leftMouseDown        = false;

        if (this.states.buttonTimeout >= 0.0) {
            this.states.buttonTimeout -= dt;
        }
    }

    /**
     * Handles key down events
     * @param {KeyboardEvent} e Key down event
     * @returns {void}
     */
    onKeyDown(e) {
        const code = this.keyCodes[e.code];

        if (code !== undefined) {
            this.states[code] = true;
        }
    }

    /**
     * Handles key up events
     * @param {KeyboardEvent} e Key up event
     * @returns {void}
     */
    onKeyUp(e) {
        const code = this.keyCodes[e.code];
        
        if (code !== undefined) {
            this.states[code] = false;
        }
    }

    /**
     * Handles mouse move event
     * @param {Event} e Mouse move event
     * @returns {void}
     */
    onMouseMove(e) {
        this.states.movementX = e.movementX;
        this.states.movementY = e.movementY;
    }

    /**
     * Handles mouse click event
     * @returns {void}
     */
    onMouseClick() {
        this.states.leftMouseJustClicked = true;
    }

    /**
     * Handles mouse up event
     * @returns {void}
     */
    onMouseUp() {
        this.states.leftMouseJustUp = true;
        this.states.leftMouseDown   = false;
        this.states.leftMouseUp     = true;
    }

    /**
     * Handles mouse down event
     * @returns {void}
     */
    onMouseDown() {
        this.states.leftMouseJustDown = true;
        this.states.leftMouseDown     = true;
        this.states.leftMouseUp       = false;
    }

    /**
     * Handles mouse wheel event
     * @param {WheelEvent} e Mouse wheel event
     * @returns {void}
     */
    onMouseWheel(e) {
        this.states.scrollX = e.deltaX;
        this.states.scrollY = e.deltaY;
        this.states.scrollZ = e.deltaZ;
    }
}

export default Controls;
