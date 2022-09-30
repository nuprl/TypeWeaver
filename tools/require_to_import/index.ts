import * as fs from "node:fs";
import * as path from "path";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

function transformRequire(line: string, debug: boolean = false): string {
    const regexes: {pattern: RegExp, replacement: string}[] = [
        {
            //        (var|let|const)   (foo): T      =    require ("    module    " )
            pattern: /(var|let|const)\s+(\S+):\s+\S+\s+=\s+require\(['"]([^.]\S+)['"]\)(;|$)/,
            //            import foo from 'module'
            replacement: "import $2 from '$3'$4"
        }
    ];

    let retVal = line;
    for (const r of regexes) {
        retVal = line.replace(r.pattern, r.replacement);
        if (debug && r.pattern.test(line)) {
            console.log("Matched: " + r.pattern);
            console.log("\tBefore: " + line);
            console.log("\tAfter:  " + retVal);
        }
    }

    return retVal;
}

const yargsBuilder = yargs(hideBin(process.argv))
    .option("output", {
        alias: "o",
        describe: "output file to write",
        type: "string"
    })
    .option("debug", {
        alias: "d",
        describe: "enable debug output",
        type: "boolean",
        default: false
    })
    .check((argv, options) => {
        const files = argv._;
        if (files.length < 1) {
            throw new Error("Input file must be provided.");
        } else if (files.length > 1) {
            throw new Error("Only 1 input file may be provided.");
        } else {
            return true;
        }
    })
    .help("help");

const argv = yargsBuilder.parseSync();

const inputFilename: string = argv._[0].toString();
const outputFilename: string = typeof argv.output === "undefined"
    ? inputFilename
    : argv.output as string;

if (!fs.existsSync(inputFilename)) {
    console.log("File does not exist: " + inputFilename);
    yargsBuilder.showHelp();
}

// Read in file
const contents: string[] = fs.readFileSync(inputFilename).toString().split("\n");
const outputBuffer: string[] = [];

// Transform each line
contents.forEach((line, index) => {
    outputBuffer[index] = transformRequire(line, argv.debug);
});

// Write output file
fs.writeFileSync(outputFilename, outputBuffer.join("\n"));

if (argv.debug) {
    console.log();
    for (const line of outputBuffer) {
        console.log(line);
    }
}
