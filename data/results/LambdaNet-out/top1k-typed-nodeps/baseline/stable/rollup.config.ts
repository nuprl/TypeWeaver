const fs: string = require('fs');
const pkg: any[] = require('./package.json');

const banner: string = fs.readFileSync('./src/banner.js', 'utf8')
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
