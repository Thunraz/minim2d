import * as Minim2D from '../../../../src/Minim2D';
import QUnit from 'qunit';

export default QUnit.module('Core', () => {
    QUnit.module('Object2D', () => {

        const CIRCLE = Math.PI * 2;

        QUnit.test('Rotate', (assert) => {
            let o = new Minim2D.Object2D();
            let angle = 10;
            
            o.rotate(angle);
            assert.strictEqual(o.rotation, angle % CIRCLE);
            
            o.rotate(angle);
            assert.strictEqual(o.rotation, (angle + angle) % CIRCLE);
        });
    });

});