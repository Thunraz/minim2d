/* eslint-disable import/no-extraneous-dependencies */
const { build } = require('esbuild');
const { replace } = require('esbuild-plugin-replace');
const pkg = require('./package.json');
/* eslint-enable import/no-extraneous-dependencies */

const args = process.argv.slice(2);
const options = {
    watch:  false,
    minify: false,
};

args.forEach((v) => {
    switch (v) {
    case 'watch':
        options.watch = true;
        // eslint-disable-next-line no-console
        console.log('Watching for file changes');
        break;
    case 'minify':
        options.minify = true;
        // eslint-disable-next-line no-console
        console.log('Minifying output');
        break;
    default:
        break;
    }
});

const examplePlugin = {
    name: 'example',
    setup(b) {
        let startDate;

        b.onStart(() => {
            // eslint-disable-next-line no-console
            console.log('Build started');
            startDate = new Date();
        });
        
        b.onEnd(() => {
            const endDate = new Date();
            // eslint-disable-next-line no-console
            console.log(`Build finished in ${(endDate - startDate)}ms`);
        });
    },
};

build({
    entryPoints: ['src/Minim2D.js'],
    bundle:      true,
    sourcemap:   true,
    incremental: true,
    watch:       options.watch,
    minify:      options.minify,
    outfile:     'build/minim2d.js',
    target:      'es6',
    format:      'iife',
    globalName:  'Minim2D',
    plugins:     [
        replace({
            __VERSION__: pkg.version,
        }),
        examplePlugin,
    ],
})
    .catch(() => process.exit(1));
