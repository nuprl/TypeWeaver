(function() {
  var Negotiator, gbuf, http, messages;

  Negotiator = require('../lib/negotiator').Negotiator;

  http = require('http');

  gbuf = require('gzip-buffer');

  messages = {
    identity: 'Hello World'
  };

  gbuf.gzip(messages.identity, function(zipped: boolean) {
    var availableEncodings, key, server, val;
    messages.gzip = zipped;
    availableEncodings = (function() {
      var _results;
      _results = [];
      for (key in messages) {
        val = messages[key];
        _results.push(key);
      }
      return _results;
    })();
    console.log(availableEncodings);
    server = http.createServer(function(req: Request, res: Response) {
      var encoding, negotiator;
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