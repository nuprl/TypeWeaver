(function() {
  var Buffer: Object, Iconv: Object, Negotiator: Object, availableCharsets: Function, http: Number, iconv: HTMLElement, key: String, message: String, messages: Object, server: Object, val: Function;

  Negotiator = require('../lib/negotiator').Negotiator;

  http = require('http');

  Buffer = require('buffer').Buffer;

  Iconv = require('iconv').Iconv;

  iconv = new Iconv('UTF-8', 'ISO-8859-1');

  message = "ë";

  messages = {
    'utf-8': message,
    'iso-8859-1': iconv.convert(new Buffer(message))
  };

  availableCharsets = (function() {
    var _results: Array;
    _results = [];
    for (key in messages) {
      val = messages[key];
      _results.push(key);
    }
    return _results;
  })();

  server = http.createServer(function(req: Object, res: Array) {
    var charset: String, negotiator: HTMLElement;
    negotiator = new Negotiator(req);
    console.log("Accept-Charset: " + req.headers['accept-charset']);
    console.log("Preferred: " + (negotiator.charsets()));
    console.log("Possible: " + (negotiator.charsets(availableCharsets)));
    charset = negotiator.charset(availableCharsets);
    console.log("Selected: " + charset);
    if (charset) {
      res.writeHead(200, {
        'Content-Type': "text/html; charset=" + charset
      });
      return res.end(messages[charset]);
    } else {
      res.writeHead(406);
      return res.end();
    }
  });

  server.listen(8080);

}).call(this);
