var Stream: any = require("stream")
var writeMethods: string[] = ["write", "end", "destroy"]
var readMethods: string[] = ["resume", "pause"]
var readEvents: string[] = ["data", "close"]
var slice: any[] = Array.prototype.slice

module.exports = duplex

function forEach (arr: any, fn: any): void {
    if (arr.forEach) {
        return arr.forEach(fn)
    }

    for (var i = 0; i < arr.length; i++) {
        fn(arr[i], i)
    }
}

function duplex(writer: EwsServiceXmlWriter, reader: EwsXmlReader): void {
    var stream: any = new Stream()
    var ended: boolean = false

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

    function proxyWriter(methodName: string): void {
        stream[methodName] = method

        function method(): any {
            return writer[methodName].apply(writer, arguments)
        }
    }

    function proxyReader(methodName: string): void {
        stream[methodName] = method

        function method(): void {
            stream.emit(methodName)
            var func: any = reader[methodName]
            if (func) {
                return func.apply(reader, arguments)
            }
            reader.emit(methodName)
        }
    }

    function proxyStream(methodName: string): void {
        reader.on(methodName, reemit)

        function reemit(): void {
            var args: any[] = slice.call(arguments)
            args.unshift(methodName)
            stream.emit.apply(stream, args)
        }
    }

    function handleEnd(): void {
        if (ended) {
            return
        }
        ended = true
        var args: any[] = slice.call(arguments)
        args.unshift("end")
        stream.emit.apply(stream, args)
    }

    function reemit(err: any): void {
        stream.emit("error", err)
    }
}
