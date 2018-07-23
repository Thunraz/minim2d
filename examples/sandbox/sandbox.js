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

        this.add(this.bitmap);
        this.timer = 0.0;
        
        this.position.x = 100;
        this.position.y = 100;
    }

    update(dt) {
        super.update(dt);

        this.timer += dt;

        this.position.x = 100 +  Math.cos(this.timer) * 10;
        this.position.y = 100 +  Math.sin(this.timer) * 10;
    }

    draw(context, origin) {
        if(!origin) {
            origin = new Minim2D.Vector2(0);
        }

        super.draw(context, this.position.add(origin));
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