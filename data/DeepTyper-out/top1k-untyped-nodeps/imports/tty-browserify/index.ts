exports.isatty = function () { return false; };

function ReadStream(): any {
  throw new Error('tty.ReadStream is not implemented');
}
exports.ReadStream = ReadStream;

function WriteStream(): any {
  throw new Error('tty.WriteStream is not implemented');
}
exports.WriteStream = WriteStream;
