import Stream from 'stream';
var writeMethods: any[] = ["write", "end", "destroy"]
var readMethods: any[] = ["resume", "pause"]
var readEvents: any[] = ["data", "close"]
var slice: Function = Array.prototype.slice

export default duplex;

function forEach (arr: any[], fn: Function): Void {
    if (arr.forEach) {
        return arr.forEach(fn)
    }

    for (var i = 0; i < arr.length; i++) {
        fn(arr[i], i)
    }
}

function duplex(writer: object, reader: any[]): HTMLElement {
    var stream: HTMLElement = new Stream()
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

    function proxyWriter(methodName: string): Void {
        stream[methodName] = method

        function method(): Promise {
            return writer[methodName].apply(writer, arguments)
        }
    }

    function proxyReader(methodName: string): Void {
        stream[methodName] = method

        function method(): Promise {
            stream.emit(methodName)
            var func: any[] = reader[methodName]
            if (func) {
                return func.apply(reader, arguments)
            }
            reader.emit(methodName)
        }
    }

    function proxyStream(methodName: string): Void {
        reader.on(methodName, reemit)

        function reemit(): Void {
            var args: any[] = slice.call(arguments)
            args.unshift(methodName)
            stream.emit.apply(stream, args)
        }
    }

    function handleEnd(): Void {
        if (ended) {
            return
        }
        ended = true
        var args: any[] = slice.call(arguments)
        args.unshift("end")
        stream.emit.apply(stream, args)
    }

    function reemit(err: string): Void {
        stream.emit("error", err)
    }
}
