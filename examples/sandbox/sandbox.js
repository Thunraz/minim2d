/* eslint-disable require-jsdoc */

class Square extends Minim2D.Object2D {
    constructor() {
        super();

        this.bitmap = new Minim2D.Bitmap(
            './minim2d.png',
            32,
            32,
            1
        );

        this.add(this.bitmap);
    }

    draw() {
        super.draw();
    }
}


(function() {
    let game = new Minim2D.Game(document.getElementById('g'));
    let scene = new Minim2D.Scene();
    game.setScene(scene);
    game.gameLoop();

    let square = new Square();
    scene.add(square);
})();