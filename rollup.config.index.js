import typescript from 'rollup-plugin-typescript';
import replace from 'rollup-plugin-replace'
// import babel   from 'rollup-plugin-babel'
// import es2015 from 'babel-preset-es2015-rollup';
import uglify from 'rollup-plugin-uglify';
// import { minify } from 'uglify-es';
import copy from 'rollup-plugin-copy';

const pkg = require('./package.json');

const bundle = 'index';

console.log(`rollup bindling: '${bundle}'`);

export default {
    entry: `./src/main/${bundle}.ts`,
    plugins: [
        typescript({
            typescript: require('typescript')
        }),
        replace({
            '@VERSION@': pkg.version
        }),
        // babel({
        //     presets: [es2015]
        // }),
        uglify({}/*, minify*/),
        copy({
            "node_modules/incremental-dom/dist/incremental-dom-min.js": "dist/lib/incremental-dom-min.js",
            "node_modules/incremental-dom/dist/incremental-dom-min.js.map": "dist/lib/incremental-dom-min.js.map",
            "node_modules/storejs/dist/store.min.js": "dist/lib/store.js",
            "node_modules/dcorejs-lib/dist/bundle.js": "dist/lib/dcorejs-lib.js",
            "node_modules/dcorejs/dist/dcorejs.umd.js": "dist/lib/dcorejs.js",
            verbose: true
        })
    ],
    globals: {
        // 'jquery': 'jQuery'
    },
    external: Object.keys(pkg.dependencies),
    targets: [
        {
            dest: `./dist/${bundle}.js`,
            format: 'iife',
            // format: 'umd',
            moduleName: pkg.name,
            sourceMap: true
        // },
        // {
        //     dest: './dist/lib/' + pkg.name + '.js',
        //     format: 'es',
        //     sourceMap: true
        }
    ]
}
