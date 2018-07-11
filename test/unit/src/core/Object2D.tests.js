import * as Minim2D from '../../../../src/Minim2D';
import * as util from '../util';

import QUnit from 'qunit';

export default QUnit.module('Core', () => {
    QUnit.module('Object2D', () => {

        const CIRCLE = Math.PI * 2;
        const SEED = 20180711;

        QUnit.test('Rotate', (assert) => {
            let o = new Minim2D.Object2D();
            let random = new util.Random(SEED);
            let alpha = random.nextInt(0, 360);
            let beta  = random.nextInt(0, 360);
            
            
            o.rotate(alpha);
            assert.strictEqual(o.rotation, alpha % CIRCLE);
            
            o.rotate(beta);
            assert.strictEqual(o.rotation, (alpha + beta) % CIRCLE);
        });

        QUnit.test('Move', (assert) => {
            let o = new Minim2D.Object2D();
            let random = new util.Random(SEED);
            let dx = random.next(0, 10);
            let dy = random.next(0, 10);
            let vec = new Minim2D.Vector2(dx, dy);

            o.position = vec;
            assert.deepEqual(o.position, vec);

            o.move(vec);
            assert.deepEqual(o.position, vec.add(vec));
        });

    });
});