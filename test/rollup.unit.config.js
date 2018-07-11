import * as pkg from '../package.json';

import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';

export default [
    // source unit conf
    {
        input: 'test/minim2d.source.unit.js',
        plugins: [
            babel({
                exclude: 'node_modules/**' // only transpile our source code
            }),
            replace({
                VERSION: pkg.version
            })
        ],

        external: [ 'qunit' ],

        // sourceMap: true,
        output: [
            {
                format: 'umd',
                name: 'Minim2D',
                file: 'test/unit/minim2d.source.unit.js',
                intro: 'QUnit.module( "Source", () => {',
                outro: '} );',
                indent: '    ',

                globals: { qunit: 'QUnit' }
            }
        ]
    },
];