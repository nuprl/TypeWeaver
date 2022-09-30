/*global window, global*/
import util from 'util'
import assert from 'assert'
function now(): number { return new Date().getTime() }

var slice: any[] = Array.prototype.slice
var console: Console
var times: {} = {}

if (typeof global !== "undefined" && global.console) {
    console = global.console
} else if (typeof window !== "undefined" && window.console) {
    console = window.console
} else {
    console = {}
}

var functions: any[] = [
    [log, "log"],
    [info, "info"],
    [warn, "warn"],
    [error, "error"],
    [time, "time"],
    [timeEnd, "timeEnd"],
    [trace, "trace"],
    [dir, "dir"],
    [consoleAssert, "assert"]
]

for (var i = 0; i < functions.length; i++) {
    var tuple: any = functions[i]
    var f: any = tuple[0]
    var name: any = tuple[1]

    if (!console[name]) {
        console[name] = f
    }
}

module.exports = console

function log(): void {}

function info(): void {
    console.log.apply(console, arguments)
}

function warn(): void {
    console.log.apply(console, arguments)
}

function error(): void {
    console.warn.apply(console, arguments)
}

function time(label: string): void {
    times[label] = now()
}

function timeEnd(label: string): void {
    var time: any = times[label]
    if (!time) {
        throw new Error("No such label: " + label)
    }

    delete times[label]
    var duration: number = now() - time
    console.log(label + ": " + duration + "ms")
}

function trace(): void {
    var err: Error = new Error()
    err.name = "Trace"
    err.message = util.format.apply(null, arguments)
    console.error(err.stack)
}

function dir(object: any): void {
    console.log(util.inspect(object) + "\n")
}

function consoleAssert(expression: string): void {
    if (!expression) {
        var arr: any[] = slice.call(arguments, 1)
        assert.ok(false, util.format.apply(null, arr))
    }
}
