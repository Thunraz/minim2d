// eslint-disable-next-line import/order
import * as pkg from './package.json';

import babel       from 'rollup-plugin-babel';
import { eslint  } from 'rollup-plugin-eslint';
import replace     from 'rollup-plugin-replace';

export default {
    input:   'src/Minim2D.js',
    plugins: [
        eslint(),
        replace({
            VERSION: pkg.version,
        }),
        babel({
            exclude: 'node_modules/**', // only transpile our source code
        }),
    ],
    output: [
        {
            format:    'umd',
            name:      'Minim2D',
            file:      'build/minim2d.js',
            indent:    '    ',
            sourcemap: false,
        },
        {
            format:    'es',
            file:      'build/minim2d.module.js',
            indent:    '    ',
            sourcemap: false,
        },
    ],
};
