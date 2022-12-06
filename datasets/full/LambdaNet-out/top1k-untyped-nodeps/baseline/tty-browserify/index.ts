exports.isatty = function () { return false; };

function ReadStream(): void {
  throw new Error('tty.ReadStream is not implemented');
}
exports.ReadStream = ReadStream;

function WriteStream(): void {
  throw new Error('tty.WriteStream is not implemented');
}
exports.WriteStream = WriteStream;
