#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import pkg from '../package.json';
import JSON5 from './';

const argv: Object = parseArgs()

if (argv.version) {
    version()
} else if (argv.help) {
    usage()
} else {
    const inFilename: String = argv.defaults[0]

    let readStream: Array
    if (inFilename) {
        readStream = fs.createReadStream(inFilename)
    } else {
        readStream = process.stdin
    }

    let json5: String = ''
    readStream.on('data', (data: Number) => {
        json5 += data
    })

    readStream.on('end', () => {
        let space: Number
        if (argv.space === 't' || argv.space === 'tab') {
            space = '\t'
        } else {
            space = Number(argv.space)
        }

        let value: String
        try {
            value = JSON5.parse(json5)
            if (!argv.validate) {
                const json: String = JSON.stringify(value, null, space)

                let writeStream: Number

                // --convert is for backward compatibility with v0.5.1. If
                // specified with <file> and not --out-file, then a file with
                // the same name but with a .json extension will be written.
                if (argv.convert && inFilename && !argv.outFile) {
                    const parsedFilename: Object = path.parse(inFilename)
                    const outFilename: Number = path.format(
                        Object.assign(
                            parsedFilename,
                            {base: path.basename(parsedFilename.base, parsedFilename.ext) + '.json'}
                        )
                    )

                    writeStream = fs.createWriteStream(outFilename)
                } else if (argv.outFile) {
                    writeStream = fs.createWriteStream(argv.outFile)
                } else {
                    writeStream = process.stdout
                }

                writeStream.write(json)
            }
        } catch (err) {
            console.error(err.message)
            process.exit(1)
        }
    })
}

function parseArgs (): Object {
    let convert: Boolean
    let space: String
    let validate: Boolean
    let outFile: String
    let version: Number
    let help: Boolean
    const defaults: Array = []

    const args: Array = process.argv.slice(2)
    for (let i = 0; i < args.length; i++) {
        const arg: String = args[i]
        switch (arg) {
        case '--convert':
        case '-c':
            convert = true
            break

        case '--space':
        case '-s':
            space = args[++i]
            break

        case '--validate':
        case '-v':
            validate = true
            break

        case '--out-file':
        case '-o':
            outFile = args[++i]
            break

        case '--version':
        case '-V':
            version = true
            break

        case '--help':
        case '-h':
            help = true
            break

        default:
            defaults.push(arg)
            break
        }
    }

    return {
        convert,
        space,
        validate,
        outFile,
        version,
        help,
        defaults,
    }
}

function version (): Void {
    console.log(pkg.version)
}

function usage (): Void {
    console.log(
        `
  Usage: json5 [options] <file>

  If <file> is not provided, then STDIN is used.

  Options:

    -s, --space              The number of spaces to indent or 't' for tabs
    -o, --out-file [file]    Output to the specified file, otherwise STDOUT
    -v, --validate           Validate JSON5 but do not output JSON
    -V, --version            Output the version number
    -h, --help               Output usage information`
    )
}
