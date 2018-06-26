import babel from 'rollup-plugin-babel';

export default {
    input: 'src/Minim2D.js',
    plugins: [
        babel({
            exclude: 'node_modules/**' // only transpile our source code
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
