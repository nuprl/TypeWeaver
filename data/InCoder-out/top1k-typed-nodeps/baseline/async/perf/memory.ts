if (process.execArgv[0] !== "--expose-gc") {
    console.error("please run with node --expose-gc");
    process.exit(1);
}

var async = require("../");
global.gc();
var startMem = process.memoryUsage().heapUsed;

function waterfallTest(done: DoneCallback) {
    var functions = [];

    for(var i = 0; i < 10000; i++) {
        functions.push((next) => {
            function func1(cb: Function) {return cb(); }

            function func2(callback: Function) {
                callback();
                //return next();  // Should be callback here.
            }

            function func3(cb: Function) {return cb(); }

            async.waterfall([
                func1,
                func2,
                func3
            ], next);
        });
    }

    async.parallel(functions, done);
}

function reportMemory() {
    global.gc();
    var increase = process.memoryUsage().heapUsed - startMem;
    console.log("memory increase: " +
        (+(increase / 1024).toPrecision(3)) + "kB");
}

waterfallTest(() => {
    setTimeout(reportMemory, 0);
});