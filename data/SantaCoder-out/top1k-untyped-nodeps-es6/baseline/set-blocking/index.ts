export default function (blocking: boolean) {
  [process.stdout, process.stderr].forEach(function (stream: Readable) {
    if (stream._handle && stream.isTTY && typeof stream._handle.setBlocking === 'function') {
      stream._handle.setBlocking(blocking)
    }
  })
};