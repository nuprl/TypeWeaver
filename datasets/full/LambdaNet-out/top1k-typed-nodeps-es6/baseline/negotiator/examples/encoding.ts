(function() {
  var Negotiator: object, gbuf: string, http: number, messages: object;

  Negotiator = require('../lib/negotiator').Negotiator;

  http = require('http');

  gbuf = require('gzip-buffer');

  messages = {
    identity: 'Hello World'
  };

  gbuf.gzip(messages.identity, function(zipped: any[]) {
    var availableEncodings: Function, key: string, server: object, val: Function;
    messages.gzip = zipped;
    availableEncodings = (function() {
      var _results: any[];
      _results = [];
      for (key in messages) {
        val = messages[key];
        _results.push(key);
      }
      return _results;
    })();
    console.log(availableEncodings);
    server = http.createServer(function(req: object, res: any[]) {
      var encoding: string, negotiator: object;
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
