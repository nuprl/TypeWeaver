import { existsSync } from "node:fs";
import * as path from "path";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import DeepTyper from "./deeptyper";
import LambdaNet from "./lambdanet";

const yargsBuilder = yargs(hideBin(process.argv))
    .option("format", {
        alias: "f",
        demandOption: true,
        describe: "specify CSV format",
        choices: ["DeepTyper", "LambdaNet"]
    })
    .option("types", {
        alias: "t",
        describe: "specify CSV file containing type annotations",
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

const jsFilename: string = argv._[0].toString();
const jsPath: path.ParsedPath = path.parse(jsFilename);
const csvFilename: string = argv.types
    ? argv.types
    : path.join(jsPath.dir, jsPath.name + ".csv");

if (!existsSync(jsFilename)) {
    console.log("File does not exist: " + jsFilename);
    yargsBuilder.showHelp();
} else if (!existsSync(csvFilename)) {
    console.log("File does not exist: " + csvFilename);
    yargsBuilder.showHelp();
}

switch (argv.format) {
    case "DeepTyper":
        (new DeepTyper(jsFilename, csvFilename, argv.debug)).run();
        break;
    case "LambdaNet":
        (new LambdaNet(jsFilename, csvFilename, argv.debug)).run();
        break;
}
