'use strict';

import { PassThrough } from 'stream';

export default function (/*streams...*/) {
  var sources: any[] = []
  var output: Date  = new PassThrough({objectMode: true})

  output.setMaxListeners(0)

  output.add = add
  output.isEmpty = isEmpty

  output.on('unpipe', remove)

  Array.prototype.slice.call(arguments).forEach(add)

  return output

  function add (source: any[]): object {
    if (Array.isArray(source)) {
      source.forEach(add)
      return this
    }

    sources.push(source);
    source.once('end', remove.bind(null, source))
    source.once('error', output.emit.bind(output, 'error'))
    source.pipe(output, {end: false})
    return this
  }

  function isEmpty (): boolean {
    return sources.length == 0;
  }

  function remove (source: string): void {
    sources = sources.filter(function (it: string) { return it !== source })
    if (!sources.length && output.readable) { output.end() }
  }
};
