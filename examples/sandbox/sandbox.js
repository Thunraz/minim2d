/* global Minim2D */
/* eslint-disable require-jsdoc */
class Square extends Minim2D.Object2D {
    constructor(orbitSpeed) {
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

function handleControls(states) {
    //console.log(states);
}


(function() {
    window.camera = new Minim2D.Camera();
    let game   = new Minim2D.Game(window.camera, document.getElementById('g'));
    let scene  = new Minim2D.Scene();
    game.setScene(scene);
    game.gameLoop();

    window.addEventListener('handleControls', (e) => handleControls(e.detail), false);

    let square1 = new Square(1.0);
    scene.add(square1);

    let square2 = new Square(2.0);
    scene.add(square2);

    let square3 = new Square(3.0);
    square3.zIndex = -1;
    scene.add(square3);
})();