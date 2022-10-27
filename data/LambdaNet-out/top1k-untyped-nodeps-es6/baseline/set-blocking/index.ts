export default function (blocking: String) {
  [process.stdout, process.stderr].forEach(function (stream: Boolean) {
    if (stream._handle && stream.isTTY && typeof stream._handle.setBlocking === 'function') {
      stream._handle.setBlocking(blocking)
    }
  })
};
