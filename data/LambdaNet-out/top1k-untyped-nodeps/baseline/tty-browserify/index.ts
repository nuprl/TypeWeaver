exports.isatty = function () { return false; };

function ReadStream(): Void {
  throw new Error('tty.ReadStream is not implemented');
}
exports.ReadStream = ReadStream;

function WriteStream(): Void {
  throw new Error('tty.WriteStream is not implemented');
}
exports.WriteStream = WriteStream;
