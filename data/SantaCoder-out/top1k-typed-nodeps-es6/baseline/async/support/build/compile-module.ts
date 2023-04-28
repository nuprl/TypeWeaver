#!/usr/bin/env nodeimport yargs from 'yargs';
import fs from 'fs';
import { transformFile } from 'babel-core';
import pluginCJS from 'babel-plugin-transform-es2015-modules-commonjs';
import pluginModuleExports from 'babel-plugin-add-module-exports';

compileModule(yargs.argv, (err) => {
    if (err) throw err;
})

function compileModule(options: TransformOptions, callback: any) {
    const {file, output} = options;
    const plugins = [
        pluginModuleExports,
        pluginCJS
    ];

    transformFile(file, {
        babelrc: false,
        ast: false,
        plugins
    }, (err, content) => {
        if (err) return callback(err);
        if (!output) {
            process.stdout.write(content.code);
            return callback();
        }
        fs.writeFile(output, content.code, callback)
    })
}