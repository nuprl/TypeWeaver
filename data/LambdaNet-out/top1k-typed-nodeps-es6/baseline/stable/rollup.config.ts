import fs from 'fs';
import pkg from './package.json';

const banner: String = fs.readFileSync('./src/banner.js', 'utf8')
    .replace('${version}', pkg.version);

export default {
    input: './src/stable.js',
    output: [{
        banner,
        file: pkg.main,
        format: 'umd',
        name: 'stable'
    }]
};
