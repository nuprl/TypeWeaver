export default function (blocking: string) {
  [process.stdout, process.stderr].forEach(function (stream: boolean) {
    if (stream._handle && stream.isTTY && typeof stream._handle.setBlocking === 'function') {
      stream._handle.setBlocking(blocking)
    }
  })
};
