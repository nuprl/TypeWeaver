#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import pkg from '../package.json';
import JSON5 from './';

const argv: object = parseArgs()

if (argv.version) {
    version()
} else if (argv.help) {
    usage()
} else {
    const inFilename: string = argv.defaults[0]

    let readStream: any[]
    if (inFilename) {
        readStream = fs.createReadStream(inFilename)
    } else {
        readStream = process.stdin
    }

    let json5: string = ''
    readStream.on('data', (data: number) => {
        json5 += data
    })

    readStream.on('end', () => {
        let space: number
        if (argv.space === 't' || argv.space === 'tab') {
            space = '\t'
        } else {
            space = Number(argv.space)
        }

        let value: string
        try {
            value = JSON5.parse(json5)
            if (!argv.validate) {
                const json: string = JSON.stringify(value, null, space)

                let writeStream: number

                // --convert is for backward compatibility with v0.5.1. If
                // specified with <file> and not --out-file, then a file with
                // the same name but with a .json extension will be written.
                if (argv.convert && inFilename && !argv.outFile) {
                    const parsedFilename: object = path.parse(inFilename)
                    const outFilename: number = path.format(
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

function parseArgs (): object {
    let convert: boolean
    let space: string
    let validate: boolean
    let outFile: string
    let version: number
    let help: boolean
    const defaults: any[] = []

    const args: any[] = process.argv.slice(2)
    for (let i = 0; i < args.length; i++) {
        const arg: string = args[i]
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
