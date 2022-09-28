var Stream: Array = require("stream")
var writeMethods: Array = ["write", "end", "destroy"]
var readMethods: Array = ["resume", "pause"]
var readEvents: Array = ["data", "close"]
var slice: Function = Array.prototype.slice

module.exports = duplex

function forEach (arr: Array, fn: Function): Void {
    if (arr.forEach) {
        return arr.forEach(fn)
    }

    for (var i = 0; i < arr.length; i++) {
        fn(arr[i], i)
    }
}

function duplex(writer: Object, reader: Array): Object {
    var stream: HTMLElement = new Stream()
    var ended: Boolean = false

    forEach(writeMethods, proxyWriter)

    forEach(readMethods, proxyReader)

    forEach(readEvents, proxyStream)

    reader.on("end", handleEnd)

    writer.on("drain", function() {
      stream.emit("drain")
    })

    writer.on("error", reemit)
    reader.on("error", reemit)

    stream.writable = writer.writable
    stream.readable = reader.readable

    return stream

    function proxyWriter(methodName: String): Void {
        stream[methodName] = method

        function method(): Promise {
            return writer[methodName].apply(writer, arguments)
        }
    }

    function proxyReader(methodName: String): Void {
        stream[methodName] = method

        function method(): Promise {
            stream.emit(methodName)
            var func: Array = reader[methodName]
            if (func) {
                return func.apply(reader, arguments)
            }
            reader.emit(methodName)
        }
    }

    function proxyStream(methodName: String): Void {
        reader.on(methodName, reemit)

        function reemit(): Void {
            var args: Array = slice.call(arguments)
            args.unshift(methodName)
            stream.emit.apply(stream, args)
        }
    }

    function handleEnd(): Void {
        if (ended) {
            return
        }
        ended = true
        var args: Array = slice.call(arguments)
        args.unshift("end")
        stream.emit.apply(stream, args)
    }

    function reemit(err: String): Void {
        stream.emit("error", err)
    }
}
