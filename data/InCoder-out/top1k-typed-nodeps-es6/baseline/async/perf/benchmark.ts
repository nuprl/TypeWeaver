#!/usr/bin/env node
import _ from 'lodash';
import Benchmark from 'benchmark';
import { exec, execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import async from '../index.js';
import suiteConfigs from './suites.js';
import semver from 'semver';

var args = require("yargs")
    .usage("Usage: $0 [options] [tag1] [tag2]")
    .describe("g", "run only benchmarks whose names match this regex")
    .alias("g", "grep")
    .default("g", ".*")
    .describe("i", "skip benchmarks whose names match this regex")
    .alias("i", "reject")
    .default("i", "^$")
    .describe("l", "maximum running time per test (in seconds)")
    .alias("l", "limit")
    .default("l", 2)
    .help("h")
    .alias("h", "help")
    .example("$0 0.9.2 0.9.0", "Compare v0.9.2 with v0.9.0")
    .example("$0 0.9.2", "Compare v0.9.2 with the current working version")
    .example("$0", "Compare the latest tag with the current working version")
    .example("$0 -g each", "only run the each(), eachLimit() and  " +
        "eachSeries() benchmarks")
    .example("")
    .argv;

var grep = new RegExp(args.g, "i");
var reject = new RegExp(args.i, "i");

function getLatestVersion() {
    var tags = execSync("git tag");
    var latest = _(tags).split("\n")
        .compact()
        .sort(semver.gt)
        .last();
    console.log("Latest tag is ", latest);
    return latest;
}

var version0 = args._[0] || getLatestVersion();
var version1 = args._[1] || "current";
var versionNames = [version0, version1];
var benchOptions = {defer: true, minSamples: 1, maxTime: +args.l};
var versions;
var wins = {};
var totalTime = {};
totalTime[version0] = wins[version0] = 0;
totalTime[version1] = wins[version1] = 0;

console.log("Comparing " + version0 + " with " + version1 +
  " on Node " + process.version);
console.log("--------------------------------------");


async.eachSeries(versionNames, cloneVersion, (err) => {
    if (err) { throw err; }
    versions = versionNames.map(requireVersion);

    var suites = suiteConfigs
        .map(setDefaultOptions)
        .reduce(handleMultipleArgs, [])
        .map(setName)
        .filter(matchesGrep)
        .filter(doesNotMatch)
        .map(createSuite);

    async.eachSeries(suites, runSuite, () => {
        var totalTime0 = +totalTime[version0].toPrecision(3);
        var totalTime1 = +totalTime[version1].toPrecision(3);

        var wins0 = wins[version0];
        var wins1 = wins[version1];

        if ( Math.abs((totalTime0 / totalTime1) - 1) < 0.01) {
            // if < 1% difference, we're likely within the margins of error
            console.log("Both versions are about equal " +
                "(" + totalTime0 + "ms total vs. " + totalTime1  + "ms total)");
        } else if (totalTime0 < totalTime1) {
            console.log(version0 + " faster overall " +
                "(" + totalTime0 + "ms total vs. " + totalTime1  + "ms total)");
        } else if (totalTime1 < totalTime0) {
            console.log(version1 + " faster overall " +
                "(" + totalTime1 + "ms total vs. " + totalTime0  + "ms total)");
        }

        if (wins0 > wins1) {
            console.log(version0 + " won more benchmarks " +
                "(" + wins0 + " vs. " + wins1  + ")");
        } else if (wins1 > wins0) {
            console.log(version1 + " won more benchmarks " +
                "(" + wins1 + " vs. " + wins0  + ")");
        } else {
            console.log("Both versions won the same number of benchmarks " +
                "(" + wins0 + " vs. " + wins1  + ")");
        }
    });
});

function runSuite(suite: Suite,  callback: Function) {
    suite.on("complete", () => {
        callback();
    }).run({async: true});
}

function setDefaultOptions(suiteConfig: SuiteConfig) {
    suiteConfig.args = suiteConfig.args || [[]];
    suiteConfig.setup = suiteConfig.setup || function () {};
    return suiteConfig;
}

function handleMultipleArgs(list: Array<any>,  suiteConfig: SuiteConfig) {
    return list.concat(suiteConfig.args.map((suiteArgs) => {
        return _.defaults({args: suiteArgs}, suiteConfig);
    }));
}

function setName(suiteConfig: SuiteConfig) {
    suiteConfig.name = suiteConfig.name + "(" + suiteConfig.args.join(",") + ")";
    return suiteConfig;
}

function matchesGrep(suiteConfig: SuiteConfig) {
    return !!grep.exec(suiteConfig.name);
}

function doesNotMatch(suiteConfig: SuiteConfig) {
    return !reject.exec(suiteConfig.name);
}

function createSuite(suiteConfig: SuiteConfig) {
    var suite = new Benchmark.Suite();
    var errored = false;

    function addBench(version: number,  versionName: string | undefined) {
        var name = suiteConfig.name + " " + versionName;

        try {
            suiteConfig.setup(1);
            suiteConfig.fn(version, () => {});
        } catch (e) {
            console.error(name + " Errored");
            errored = true;
            return;
        }

        var options = _.extend({
            versionName,
            setup() {
                suiteConfig.setup(...suiteConfig.args);
            },
            onError (err) {
                console.log(err.stack);
            }
        }, benchOptions);

        suite.add(name, (deferred) => {
            suiteConfig.fn(version, () => {
                deferred.resolve();
            });
        }, options);
    }

    addBench(versions[0], versionNames[0]);
    addBench(versions[1], versionNames[1]);


    return suite.on('cycle', (event) => {
        var mean = event.target.stats.mean * 1000;
        console.log(event.target + ", " + mean.toPrecision(3) + "ms per run");
        var version = event.target.options.versionName;
        if (errored) return;
        totalTime[version] += mean;
    })
        .on('error', (err) => { console.error(err); })
        .on('complete', function() {
            if (!errored) {
                var fastest = this.filter('fastest');
                if (fastest.length === 2) {
                    console.log("Tie");
                } else {
                    var winner = fastest[0].options.versionName;
                    console.log(winner + ' is faster');
                    wins[winner]++;
                }
            }
            console.log("--------------------------------------");
        });

}

function requireVersion(tag: any) {
    if (tag === "current") {
        return async;
    }

    return require("./versions/" + tag + "/");
}

function cloneVersion(tag: Tag,  callback: Callback) {
    if (tag === "current") return callback();

    var versionDir = __dirname + "/versions/" + tag;
    mkdirp.sync(versionDir);
    fs.open(versionDir + "/package.json", "r", (err, handle) => {
        if (!err) {
            // version has already been cloned
            return fs.close(handle, callback);
        }

        var repoPath = path.join(__dirname, "..");

        var cmd = "git clone --branch " + tag + " " + repoPath + " " + versionDir;

        exec(cmd, callback);

    });
}