import replace from 'rollup-plugin-replace';
// eslint-disable-next-line sort-imports
import * as pkg from './package.json';

export default {
    input:   'src/Minim2D.js',
    plugins: [
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
