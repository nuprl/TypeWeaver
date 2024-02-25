import { rollup } from 'rollup';
import nodeResolve from 'rollup-plugin-node-resolve';

rollup({
    input: 'build-es/index.js',
    plugins: [ nodeResolve() ]
})
    .then(( bundle ) => {
        return bundle.write({
            format: 'esm',
            name: 'async',
            file: 'build/dist/async.mjs'
        });
    })
    .catch((err) => { throw err; });
