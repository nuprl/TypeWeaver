const fs: String = require('fs');
const pkg: Array = require('./package.json');

const banner: String = fs.readFileSync('./src/banner.js', 'utf8')
    .replace('${version}', pkg.version);

module.exports = {
    input: './src/stable.js',
    output: [{
        banner,
        file: pkg.main,
        format: 'umd',
        name: 'stable'
    }]
};
