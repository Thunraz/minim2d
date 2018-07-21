import * as pkg from './package.json';

import babel from 'rollup-plugin-babel';
import { eslint  } from 'rollup-plugin-eslint';
import replace from 'rollup-plugin-replace';

export default {
    input: 'src/Minim2D.js',
    plugins: [
        babel({
            exclude: 'node_modules/**' // only transpile our source code
        }),
        eslint(),
        replace({
            VERSION: pkg.version
        })
    ],
    output: [
        {
            format: 'umd',
            name: 'Minim2D',
            file: 'build/minim2d.js',
            indent: '    ',
            sourcemap: false
        },
        {
            format: 'es',
            file: 'build/minim2d.module.js',
            indent: '    ',
            sourcemap: false
        }
    ]
};
