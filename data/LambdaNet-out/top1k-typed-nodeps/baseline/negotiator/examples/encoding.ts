(function() {
  var Negotiator: Object, gbuf: String, http: Number, messages: Object;

  Negotiator = require('../lib/negotiator').Negotiator;

  http = require('http');

  gbuf = require('gzip-buffer');

  messages = {
    identity: 'Hello World'
  };

  gbuf.gzip(messages.identity, function(zipped: Array) {
    var availableEncodings: Function, key: String, server: Object, val: Function;
    messages.gzip = zipped;
    availableEncodings = (function() {
      var _results: Array;
      _results = [];
      for (key in messages) {
        val = messages[key];
        _results.push(key);
      }
      return _results;
    })();
    console.log(availableEncodings);
    server = http.createServer(function(req: Object, res: Array) {
      var encoding: String, negotiator: Object;
      negotiator = new Negotiator(req);
      console.log("Accept-Encoding: " + req.headers['accept-encoding']);
      console.log("Preferred: " + (negotiator.encodings()));
      console.log("Possible: " + (negotiator.encodings(availableEncodings)));
      encoding = negotiator.encoding(availableEncodings);
      console.log("Selected: " + encoding);
      if (encoding) {
        res.writeHead(200, {
          'Content-Encoding': encoding
        });
        return res.end(messages[encoding]);
      } else {
        res.writeHead(406);
        return res.end();
      }
    });
    return server.listen(8080);
  });

}).call(this);
