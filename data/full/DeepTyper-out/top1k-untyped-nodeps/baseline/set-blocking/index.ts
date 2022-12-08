module.exports = function (blocking: any) {
  [process.stdout, process.stderr].forEach(function (stream: any) {
    if (stream._handle && stream.isTTY && typeof stream._handle.setBlocking === 'function') {
      stream._handle.setBlocking(blocking)
    }
  })
}
