import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';
// eslint-disable-next-line sort-imports
import * as pkg from './package.json';

const isDevelopment = process.env.NODE_ENV === 'development';

const builds = [
    {
        input:   'src/Minim2D.js',
        plugins: [
            replace({ __VERSION__: pkg.version }),
        ],
        output: [
            {
                format: 'esm',
                file:   'build/minim2d.module.js',
            },
        ],
    },
    {
        input:   'src/Minim2D.js',
        plugins: [
            replace({ __VERSION__: pkg.version }),
        ],
        output: [
            {
                format: 'umd',
                name:   'Minim2D',
                file:   'build/minim2d.js',
                indent: '    ',
            },
        ],
    },
];

if (!isDevelopment) {
    builds.push({
        input:   'src/Minim2D.js',
        plugins: [
            replace({ __VERSION__: pkg.version }),
            terser(),
        ],
        output: [
            {
                format:    'esm',
                file:      'build/minim2d.module.min.js',
                sourcemap: true,
            },
        ],
    });

    builds.push({
        input:   'src/Minim2D.js',
        plugins: [
            replace({ __VERSION__: pkg.version }),
            terser(),
        ],
        output: [
            {
                format:    'umd',
                name:      'Minim2D',
                file:      'build/minim2d.min.js',
                sourcemap: true,
            },
        ],
    });
}

export default builds;
