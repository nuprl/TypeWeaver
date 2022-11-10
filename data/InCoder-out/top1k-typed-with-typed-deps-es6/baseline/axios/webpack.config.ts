import TerserPlugin from 'terser-webpack-plugin';
import webpack from 'webpack';
var config = {};

function generateConfig(name: string | undefined) {
  var compress = name.indexOf('min') > -1;
  var config = {
    entry: './index.js',
    output: {
      path: __dirname + '/dist/',
      filename: name + '.js',
      sourceMapFilename: name + '.map',
      library: 'axios',
      libraryTarget: 'umd',
      globalObject: 'this'
    },
    node: false,
    devtool: 'source-map',
    mode: compress ? 'production' : 'development'
  };
  return config;
}

['axios', 'axios.min'].forEach(function (key: any) {
  config[key] = generateConfig(key);
});

export default config;