export class Controls {
    /**
     * Initializes the controls.
     * @param {Object} customKeyCodes (optional) custom key codes to add to the keyCodes object
     * @param {Object} customStates (optional) custom states to add to the states object
     */
    constructor(customKeyCodes, customStates) {
        this.paused = true;

        // Add a couple of event listeners
        document.addEventListener('pointerlockchange', () => { this.onPointerLockChange(); }, false);
        document.addEventListener('pointerlockerror',  () => { this.onPointerLockError();  }, false);
        document.addEventListener('mousemove',        (e) => { this.onMouseMove(e);        }, false);
        document.addEventListener('click',            (e) => { this.onMouseClick(e);       }, false);
        document.addEventListener('mouseup',          (e) => { this.onMouseUp(e);          }, false);
        document.addEventListener('mousedown',        (e) => { this.onMouseDown(e);        }, false);
        document.addEventListener('keydown',          (e) => { this.onKeyDown(e);          }, false);
        document.addEventListener('keyup',            (e) => { this.onKeyUp(e);            }, false);

        // TODO: handle game pads

        this.noticeContainer = document.getElementById('notice-container');
        this.blocker         = document.getElementById('blocker');
        this.element         = document.body;

        this.noticeContainer.addEventListener('click', () => {
            this.noticeContainer.style.display = 'none';
            this.element.requestPointerLock();
        }, false );

        // Define keyboard keys
        let keyCodes = {
            // Support arrow keys    
            38: 'up',    // ↑
            40: 'down',  // ↓
            37: 'left',  // ←
            39: 'right', // →

            // Support WASD
            87: 'up',    // W
            83: 'down',  // S
            65: 'left',  // A
            68: 'right', // D

            // Support ZQSD (pour les amis français 🇫🇷)
            87: 'up',    // W
            83: 'down',  // S
            65: 'left',  // A
            68: 'right' // D
        };
        this.keyCodes = Object.assign(keyCodes, customKeyCodes);

        let states = {
            // Mouse
            leftMouseJustClicked: false,
            leftMouseJustUp     : false,
            leftMouseJustDown   : false,
            leftMouseUp         : true,
            leftMouseDown       : false,

            // Keyboard
            up                  : false,
            down                : false,
            left                : false,
            right               : false,
            deltaX              : 0.0,
            deltaY              : 0.0
        };
        this.states = Object.assign(states, customStates);
    }

    /**
     * Callback when point lock changes
     * @returns {void}
     */
    onPointerLockChange() {
        if (document.pointerLockElement === this.element) {
            this.paused = false;

            this.blocker.style.display = 'none';
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
     * @returns {void}
     */
    update() {
        this.states.leftMouseJustClicked = false;
        this.states.leftMouseJustUp      = false;
        this.states.leftMouseJustDown    = false;
        this.states.leftMouseUp          = true;
        this.states.leftMouseDown        = false;
    }

    /**
     * Handles key down events
     * @param {Event} e Key down event
     * @returns {void}
     */
    onKeyDown(e) {
        let code = this.keyCodes[e.which];

        if(code !== undefined) {
            this.states[code] = true;
        }
    }

    /**
     * Handles key up events
     * @param {Event} e Key up event
     * @returns {void}
     */
    onKeyUp(e) {
        let code = this.keyCodes[e.which];
        
        if(code !== undefined) {
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
}