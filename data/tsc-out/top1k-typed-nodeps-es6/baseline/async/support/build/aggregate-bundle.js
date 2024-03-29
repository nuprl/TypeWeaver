import { rollup } from 'rollup';
import nodeResolve from 'rollup-plugin-node-resolve';

rollup({
    input: 'build-es/index.js',
    plugins: [ nodeResolve() ]
})
    .then(( bundle ) => {
        return bundle.write({
            format: 'umd',
            name: 'async',
            file: 'build/dist/async.js'
        });
    })
    .catch((err) => { throw err; });
